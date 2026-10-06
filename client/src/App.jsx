import { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  // Ελέγχουμε αν υπάρχει αποθηκευμένος χρήστης στο localStorage όταν φορτώνει η εφαρμογή
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Αποθήκευση χρήστη κατά τη σύνδεση/εγγραφή
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Αφαίρεση χρήστη κατά την αποσύνδεση
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <div className="App">
      <h1>MovieBook</h1>

      {user ? (
        <div style={styles.welcomeContainer}>
          <h2>Welcome, {user.email}!</h2>
          <p>You are logged in.</p>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      ) : isLogin ? (
        <div>
          <Login onLoginSuccess={handleLoginSuccess} />
          <p style={styles.text}>
            Don't have an account?{' '}
            <button 
              onClick={() => setIsLogin(false)} 
              style={styles.toggleBtn}
            >
              Register
            </button>
          </p>
        </div>
      ) : (
        <div>
          <Register onLoginSuccess={handleLoginSuccess} />
          <p style={styles.text}>
            Already have an account?{' '}
            <button 
              onClick={() => setIsLogin(true)} 
              style={styles.toggleBtn}
            >
              Login
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

const styles = {
  text: {
    marginTop: '16px',
    color: '#ccc',
    fontSize: '14px'
  },
  toggleBtn: {
    background: 'none',
    border: 'none',
    color: '#646cff',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    padding: 0
  },
  welcomeContainer: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '24px',
    borderRadius: '8px',
    backgroundColor: '#1e1e1e',
    color: '#ffffff'
  },
  logoutBtn: {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#ff4d4d',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '16px'
  }
};

export default App;