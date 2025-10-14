function Navbar() {
    const user = JSON.parse(localStorage.getItem("user"));
  
    return (
      <nav>
        <h2>Open Lecture</h2>
        <div style={{ float: "right" }}>
          {user ? (
            <>
              <span>Welcome, {user.username}</span>
              <button onClick={() => localStorage.removeItem("user")}>Logout</button>
            </>
          ) : (
            <>
              <a href="/login">Login</a> | <a href="/signup">Sign Up</a>
            </>
          )}
        </div>
      </nav>
    );
  }
  