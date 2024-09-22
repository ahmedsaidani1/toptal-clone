import React, { useEffect, useState } from 'react';
import 'flowbite';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Button } from 'flowbite-react';
import './calendar-dark.css'; // Import the dark mode overrides
import { useSelector } from 'react-redux';

const MainContent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { theme } = useSelector((state) => state.theme);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'John', text: 'Hey there!', createdAt: '5 min ago' },
    { sender: 'You', text: 'Hello, how are you?', createdAt: '3 min ago' },
  ]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([
        ...messages,
        { sender: 'You', text: newMessage, createdAt: 'Just now' },
      ]);
      setNewMessage('');
    }
  };

  const feedbackList = [
    { text: 'Great work!', rating: 5 },
    { text: 'Needs improvement.', rating: 3 },
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="container mx-auto p-4 md:p-10 space-y-8">
      {/* Profile Section */}
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-6 md:space-x-6">
        <img
          src="https://scontent.ftun14-1.fna.fbcdn.net/v/t39.30808-6/340219304_184192200657028_613496711251567426_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Lj1oMSgdX7QQ7kNvgGvybcR&_nc_ht=scontent.ftun14-1.fna&oh=00_AYB5sdH4M0dRiAC_crisG_I5PaW2MqD7KTQls8-owB23RQ&oe=66C427BC"
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-blue-500 dark:border-gray-500 shadow-lg transition-transform duration-300 hover:scale-105"
        />
        <div className="text-center md:text-left space-y-1">
          <p className="font-semibold text-gray-800 dark:text-gray-200 text-xl"><strong>Name:</strong> Dev</p>
          <p className="text-gray-600 dark:text-gray-400 text-lg"><strong>Speciality:</strong> Web</p>
          <p className="text-gray-600 dark:text-gray-400 text-lg"><strong>Type of Contract:</strong> Hourly</p>
          <p className="text-gray-600 dark:text-gray-400 text-lg"><strong>Type:</strong> Full-time</p>
          <p className="text-gray-600 dark:text-gray-400 text-lg"><strong>Level:</strong> Mid-senior</p>
          <p className="text-gray-600 dark:text-gray-400 text-lg"><strong>Resume:</strong> <a href='' className='text-blue-500 dark:text-blue-400 underline'> ahmed saidani cv.pdf</a></p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-lg">
        {[
          { label: 'Client Satisfaction', value: '5 stars' },
          { label: 'Worked hours', value: '60h' },
          { label: 'Estimated cost', value: '4000€' },
          { label: 'Actual cost', value: '1500€' },
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <p className="text-xl md:text-3xl font-semibold text-blue-900 dark:text-gray-200">{stat.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Onboarding Checklist */}
          <div className="p-6 bg-white dark:bg-gray-800 border-l-4 border-blue-500 dark:border-gray-600 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Onboarding Checklist</h3>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-400">
              <li className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Meet with supervisor
              </li>
              <li className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Give access to Jira
              </li>
              <li className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Give access to GitHub
              </li>
              <li className="flex items-center">
                <button className="text-blue-500 dark:text-blue-400 hover:underline">+ Add Item</button>
              </li>
            </ul>
          </div>

          {/* Give Feedback */}
          <div className="p-6 bg-white dark:bg-gray-800 border-l-4 border-blue-500 dark:border-gray-600 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Give Feedback</h3>
            <div className="space-y-4">
              <div className="flex justify-center md:justify-start space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className="cursor-pointer text-2xl text-gray-300 dark:text-gray-600 hover:text-yellow-500 transition-colors duration-200"
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea
                placeholder="Write your feedback..."
                className="w-full p-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-500"
              />
              <Button gradientDuoTone='purpleToPink' className="w-full p-3 bg-blue-500 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-800 transition-colors duration-200">
                Submit Feedback
              </Button>
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div className="space-y-8">
          {/* Event Log */}
          <div className="p-6 bg-white dark:bg-gray-800 border-l-4 border-blue-500 dark:border-gray-600 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Event Log</h3>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <div className="relative p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
                <span className="absolute top-1 right-2 text-xs text-gray-500 dark:text-gray-400">5 min ago</span>
                Dev won't be available tomorrow <br />due to public holiday
              </div>
              <div className="relative p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
                <span className="absolute top-1 right-2 text-xs text-gray-500 dark:text-gray-400">5 min ago</span>
                Dev will go on vacation tomorrow
              </div>
            </div>
          </div>

          {/* Feedback Log */}
          <div className="p-6 bg-white dark:bg-gray-800 border-l-4 border-blue-500 dark:border-gray-600 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Feedback Log</h3>
            <ul className="space-y-4">
              {feedbackList.map((feedbackItem, index) => (
                <li key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
                  <div className="flex justify-center md:justify-start space-x-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-2xl ${
                          star <= feedbackItem.rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-800 dark:text-gray-200">{feedbackItem.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Messages */}
          <div className="p-6 bg-white dark:bg-gray-800 border-l-4 border-blue-500 dark:border-gray-600 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Messages</h3>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg shadow-sm ${
                    message.sender === 'You'
                      ? 'bg-blue-100 dark:bg-blue-900 text-right'
                      : 'bg-gray-50 dark:bg-gray-700 text-left'
                  }`}
                >
                  <p className="text-sm text-gray-500 dark:text-gray-400">{`${message.sender} - ${message.createdAt}`}</p>
                  <p className="text-gray-800 dark:text-gray-200">{message.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex">
              <input
                type="text"
                className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button
                gradientDuoTone='purpleToPink'
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded-r-lg shadow-md hover:bg-blue-600 dark:hover:bg-blue-800"
              >
                Send
              </Button>
            </div>
          </div>

          {/* Presence Calendar */}
          <div className={`container mx-auto p-10 space-y-8 ${theme === 'dark' ? 'dark' : ''}`}>
          <div className="p-6 bg-white dark:bg-gray-800 border-l-4 border-blue-500 dark:border-gray-600 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Presence Calendar</h3>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          className={`rounded-lg shadow-sm border border-gray-300 dark:border-gray-600 ${
            theme === 'dark' ? 'calendar-dark' : ''
          }`}
        />
      </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
