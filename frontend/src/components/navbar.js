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
              <Link className="btn btn--outline-dark" to="/login">
                Login
              </Link>

              <Link className="btn btn--dark" to="/signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    );
  }
  