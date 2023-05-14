import { useParams } from 'react-router-dom';

const UserProfile = ({ roles }) => {
  const { id } = useParams();

  // Your component logic goes here

  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID: {id}</p>
      {/* Render the user profile based on the ID and roles */}
    </div>
  );
};

export default UserProfile;
