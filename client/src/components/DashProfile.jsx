import {
  Alert,
  Button,
  Label,
  Modal,
  ModalBody,
  TextInput,
} from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [editModes, setEditModes] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    email: false,
    companyName: false,
    companySize: false,
    companyLinkedin: false,
  });
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          'Could not upload image (File must be less than 2MB)'
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const toggleEditMode = (field) => {
    setEditModes((prevModes) => ({
      ...prevModes,
      [field]: !prevModes[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    setPasswordError(null);
  
    if (newPassword && newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (!password && newPassword) {
      setPasswordError('Current password is required to change to a new password');
      return;
    }
  
    if (Object.keys(formData).length === 0 && !newPassword) {
      setUpdateUserError('No changes made');
      return;
    }
  
    if (imageFileUploading) {
      setUpdateUserError('Please wait for the image to upload');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      
      // Add the new and old passwords to formData for updating
      if (newPassword) {
        formData.oldPassword = password;
        formData.newPassword = newPassword;
      }
  
      // Update user information
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };
  
  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePasswordUpdate = () => {
    setPasswordError(null);
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    setFormData({ ...formData, oldPassword: password, newPassword });
    setShowPasswordModal(false);
  };

  return (
    <div className='max-w-lg mx-auto p-3 w-full' style={{ marginTop: '50px' }}>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Label value='First Name' />
            <div className='flex items-center'>
              {editModes.firstName ? (
                <TextInput
                  type='text'
                  id='firstName'
                  placeholder='FirstName'
                  defaultValue={currentUser.firstName}
                  onChange={handleChange}
                />
              ) : (
                <span>{currentUser.firstName}</span>
              )}
              <FiEdit
                className='ml-2 cursor-pointer'
                onClick={() => toggleEditMode('firstName')}
              />
            </div>
          </div>
          <div>
            <Label value='Last Name' />
            <div className='flex items-center'>
              {editModes.lastName ? (
                <TextInput
                  type='text'
                  id='lastName'
                  placeholder='LastName'
                  defaultValue={currentUser.lastName}
                  onChange={handleChange}
                />
              ) : (
                <span>{currentUser.lastName}</span>
              )}
              <FiEdit
                className='ml-2 cursor-pointer'
                onClick={() => toggleEditMode('lastName')}
              />
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Label value='Phone' />
            <div className='flex items-center'>
              {editModes.phone ? (
                <TextInput
                  type='text'
                  id='phone'
                  placeholder='Phone'
                  defaultValue={currentUser.phone}
                  onChange={handleChange}
                />
              ) : (
                <span>{currentUser.phone}</span>
              )}
              <FiEdit
                className='ml-2 cursor-pointer'
                onClick={() => toggleEditMode('phone')}
              />
            </div>
          </div>
          <div>
            <Label value='Email' />
            <div className='flex items-center'>
              {editModes.email ? (
                <TextInput
                  type='email'
                  id='email'
                  placeholder='Email'
                  defaultValue={currentUser.email}
                  onChange={handleChange}
                />
              ) : (
                <span>{currentUser.email}</span>
              )}
              <FiEdit
                className='ml-2 cursor-pointer'
                onClick={() => toggleEditMode('email')}
              />
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Label value='Company Name' />
            <div className='flex items-center'>
              {editModes.companyName ? (
                <TextInput
                  type='text'
                  id='companyName'
                  placeholder='CompanyName'
                  defaultValue={currentUser.companyName}
                  onChange={handleChange}
                />
              ) : (
                <span>{currentUser.companyName}</span>
              )}
              <FiEdit
                className='ml-2 cursor-pointer'
                onClick={() => toggleEditMode('companyName')}
              />
            </div>
          </div>
          <div>
            <Label value='Company Size' />
            <div className='flex items-center'>
              {editModes.companySize ? (
                <Select
                  id='companySize'
                  defaultValue={currentUser.companySize}
                  onChange={handleChange}
                >
                  <option value=''>Select Company Size</option>
                  <option value='1-10'>1-10</option>
                  <option value='10-100'>10-100</option>
                  <option value='100-1000'>100-1000</option>
                </Select>
              ) : (
                <span>{currentUser.companySize}</span>
              )}
              <FiEdit
                className='ml-2 cursor-pointer'
                onClick={() => toggleEditMode('companySize')}
              />
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Label value='Company Linkedin' />
            <div className='flex items-center'>
              {editModes.companyLinkedin ? (
                <TextInput
                  type='text'
                  id='companyLinkedin'
                  placeholder='CompanyLinkedin'
                  defaultValue={currentUser.companyLinkedIn}
                  onChange={handleChange}
                />
              ) : (
                <span className="w-16 truncate ...">{currentUser.companyLinkedIn}</span>
              )}
              <FiEdit
                className='ml-2 cursor-pointer'
                onClick={() => toggleEditMode('companyLinkedin')}
              />
            </div>
          </div>
          <div>
           <Label value='Password' />
            <div className='flex items-center'>
              {editModes.password ? (
                <TextInput
                  type='password'
                  id='password'
                  placeholder='*************'
                  value={password}
                />
              ) : (
                <span>*************</span>
              )}
              <FiEdit
                className='ml-2 cursor-pointer'
                onClick={() => setShowPasswordModal(true)}
              />
           </div>
          </div>
        </div>
        {passwordError && <Alert color='failure'>{passwordError}</Alert>}
        <Button gradientDuoTone='purpleToPink' type='submit' className='mt-4'>
          {loading ? 'Saving changes...' : 'Save changes'}
        </Button>
        {updateUserError && (
          <Alert color='failure' icon={HiOutlineExclamationCircle} className='mt-4'>
            <span>{updateUserError}</span>
          </Alert>
        )}
        {updateUserSuccess && (
          <Alert color='success' className='mt-4'>
            <span>{updateUserSuccess}</span>
          </Alert>
        )}
        <Link onClick={() => setShowModal(true)} className='text-red-600 mt-1'>
          Delete my account
        </Link>
      </form>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ModalBody>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='mx-auto mb-4 text-gray-400 w-14 h-14' />
            <h3 className='mb-5 text-lg font-normal text-gray-500'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        show={showPasswordModal}
        size='md'
        popup={true}
        onClose={() => setShowPasswordModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className='flex flex-col gap-4'>
            <h3 className='text-lg font-normal text-gray-500'>Change Password</h3>
            <div>
              <Label htmlFor='password' value='Current Password' />
              <TextInput
                id='password'
                type='password'
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div>
              <Label htmlFor='newPassword' value='New Password' />
              <TextInput
                id='newPassword'
                type='password'
                value={newPassword}
                onChange={handleNewPasswordChange}
                required
              />
            </div>
            <div>
              <Label htmlFor='confirmPassword' value='Confirm New Password' />
              <TextInput
                id='confirmPassword'
                type='password'
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </div>
            {passwordError && (
              <Alert color='failure'>
                <span>
                  <HiOutlineExclamationCircle className='w-5 h-5 inline mr-2' />
                  {passwordError}
                </span>
              </Alert>
            )}
            <div className='flex justify-end'>
              <Button gradientDuoTone='purpleToPink' onClick={handlePasswordUpdate}>Update Password</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}