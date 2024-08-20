import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import '../styles/signUp.css';

export default function Signup() {
  const [formState, setFormState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    console.log(event);
    event.preventDefault();
    console.log('this is the formState:', formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
    <div className="wrapper">
      <div className="form-box register">
        <h2>Signup</h2>
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className ="input-box">
                <input
                  className="form-input"
                  placeholder="Your First Name"
                  name="first_name"
                  type="text"
                  value={formState.first_name}
                  onChange={handleChange}
                />
                </div>
                <div className ="input-box">
                <input
                  className="form-input"
                  placeholder="Your Last Name"
                  name="last_name"
                  type="text"
                  value={formState.last_name}
                  onChange={handleChange}
                />
                </div>
                <div className ="input-box">
                <input
                  className="form-input"
                  placeholder="Your Email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                </div>
                <div className ="input-box">
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                </div>
                <button
                  className="change-button btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {'Signup error.'}
              </div>
            )}
          </div>
      </div>
    </>
  );
};

