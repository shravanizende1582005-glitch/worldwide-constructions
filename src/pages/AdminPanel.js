import React, { useEffect, useState } from "react";

function AdminPanel() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalContacts: 0,
    totalFeedback: 0,
  });

  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [feedback, setFeedback] = useState([]);

  const [activeSection, setActiveSection] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  // ======================================
  // LOAD ADMIN DATA
  // ======================================

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const [statsResponse, usersResponse, contactsResponse, feedbackResponse] =
          await Promise.all([
            fetch("http://127.0.0.1:5000/api/admin/stats"),
            fetch("http://127.0.0.1:5000/api/admin/users"),
            fetch("http://127.0.0.1:5000/api/admin/contacts"),
            fetch("http://127.0.0.1:5000/api/admin/feedback"),
          ]);

        const statsData = await statsResponse.json();
        const usersData = await usersResponse.json();
        const contactsData = await contactsResponse.json();
        const feedbackData = await feedbackResponse.json();

        if (statsData.success) {
          setStats(statsData.stats);
        }

        if (usersData.success) {
          setUsers(usersData.users);
        }

        if (contactsData.success) {
          setContacts(contactsData.contacts);
        }

        if (feedbackData.success) {
          setFeedback(feedbackData.feedback);
        }
      } catch (error) {
        console.error("Error loading admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAdminData();
  }, []);

  // ======================================
  // FORMAT DATE
  // ======================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // ======================================
  // STAR DISPLAY
  // ======================================

  const displayStars = (rating) => {
    return "★".repeat(Number(rating || 0)) +
      "☆".repeat(5 - Number(rating || 0));
  };

  // ======================================
  // LOADING
  // ======================================

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        Loading Admin Panel...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        fontFamily: "Arial, sans-serif",
        display: "flex",
      }}
    >
      {/* ======================================
          SIDEBAR
      ====================================== */}

      <aside
        style={{
          width: "250px",
          minHeight: "100vh",
          background: "#111827",
          color: "#fff",
          padding: "25px 15px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            padding: "10px 15px 30px",
            borderBottom: "1px solid #374151",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "22px",
            }}
          >
            WORLDWIDE
          </h2>

          <p
            style={{
              margin: "5px 0 0",
              color: "#9ca3af",
              fontSize: "12px",
              letterSpacing: "1px",
            }}
          >
            CONSTRUCTIONS
          </p>

          <span
            style={{
              display: "inline-block",
              marginTop: "15px",
              padding: "5px 10px",
              background: "#2563eb",
              borderRadius: "20px",
              fontSize: "11px",
            }}
          >
            ADMIN PANEL
          </span>
        </div>

        <button
          onClick={() => setActiveSection("dashboard")}
          style={{
            width: "100%",
            padding: "13px 15px",
            marginBottom: "8px",
            textAlign: "left",
            border: "none",
            borderRadius: "8px",
            background:
              activeSection === "dashboard" ? "#2563eb" : "transparent",
            color: "#fff",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          📊 Dashboard
        </button>

        <button
          onClick={() => setActiveSection("users")}
          style={{
            width: "100%",
            padding: "13px 15px",
            marginBottom: "8px",
            textAlign: "left",
            border: "none",
            borderRadius: "8px",
            background:
              activeSection === "users" ? "#2563eb" : "transparent",
            color: "#fff",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          👤 Registered Users
        </button>

        <button
          onClick={() => setActiveSection("contacts")}
          style={{
            width: "100%",
            padding: "13px 15px",
            marginBottom: "8px",
            textAlign: "left",
            border: "none",
            borderRadius: "8px",
            background:
              activeSection === "contacts" ? "#2563eb" : "transparent",
            color: "#fff",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          📩 Contact Enquiries
        </button>

        <button
          onClick={() => setActiveSection("feedback")}
          style={{
            width: "100%",
            padding: "13px 15px",
            marginBottom: "8px",
            textAlign: "left",
            border: "none",
            borderRadius: "8px",
            background:
              activeSection === "feedback" ? "#2563eb" : "transparent",
            color: "#fff",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          ⭐ Feedback
        </button>
      </aside>

      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <main
        style={{
          flex: 1,
          padding: "35px",
          overflowX: "auto",
        }}
      >
        {/* HEADER */}

        <div
          style={{
            marginBottom: "30px",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#6b7280",
              fontSize: "13px",
            }}
          >
            WORLDWIDE CONSTRUCTIONS
          </p>

          <h1
            style={{
              margin: "5px 0",
              fontSize: "30px",
              color: "#111827",
            }}
          >
            Admin Dashboard
          </h1>

          <p
            style={{
              margin: 0,
              color: "#6b7280",
            }}
          >
            Manage your website enquiries, users and feedback.
          </p>
        </div>

        {/* ======================================
            DASHBOARD
        ====================================== */}

        {activeSection === "dashboard" && (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "20px",
                marginBottom: "35px",
              }}
            >
              {/* USERS */}

              <div
                style={{
                  background: "#fff",
                  padding: "25px",
                  borderRadius: "12px",
                  boxShadow: "0 3px 15px rgba(0,0,0,0.06)",
                }}
              >
                <p style={{ color: "#6b7280", margin: 0 }}>
                  TOTAL USERS
                </p>

                <h2
                  style={{
                    fontSize: "35px",
                    margin: "10px 0",
                    color: "#2563eb",
                  }}
                >
                  {stats.totalUsers}
                </h2>

                <span style={{ color: "#6b7280", fontSize: "13px" }}>
                  Registered accounts
                </span>
              </div>

              {/* CONTACTS */}

              <div
                style={{
                  background: "#fff",
                  padding: "25px",
                  borderRadius: "12px",
                  boxShadow: "0 3px 15px rgba(0,0,0,0.06)",
                }}
              >
                <p style={{ color: "#6b7280", margin: 0 }}>
                  CONTACT ENQUIRIES
                </p>

                <h2
                  style={{
                    fontSize: "35px",
                    margin: "10px 0",
                    color: "#059669",
                  }}
                >
                  {stats.totalContacts}
                </h2>

                <span style={{ color: "#6b7280", fontSize: "13px" }}>
                  Project enquiries
                </span>
              </div>

              {/* FEEDBACK */}

              <div
                style={{
                  background: "#fff",
                  padding: "25px",
                  borderRadius: "12px",
                  boxShadow: "0 3px 15px rgba(0,0,0,0.06)",
                }}
              >
                <p style={{ color: "#6b7280", margin: 0 }}>
                  TOTAL FEEDBACK
                </p>

                <h2
                  style={{
                    fontSize: "35px",
                    margin: "10px 0",
                    color: "#d97706",
                  }}
                >
                  {stats.totalFeedback}
                </h2>

                <span style={{ color: "#6b7280", fontSize: "13px" }}>
                  Customer feedback
                </span>
              </div>
            </div>

            {/* RECENT USERS */}

            <div
              style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "12px",
                boxShadow: "0 3px 15px rgba(0,0,0,0.06)",
              }}
            >
              <h2
                style={{
                  marginTop: 0,
                  color: "#111827",
                }}
              >
                Recent Registered Users
              </h2>

              {users.slice(0, 5).map((user) => (
                <div
                  key={user.id}
                  style={{
                    padding: "15px 0",
                    borderBottom: "1px solid #eee",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "20px",
                  }}
                >
                  <div>
                    <strong>{user.name}</strong>
                    <div
                      style={{
                        color: "#6b7280",
                        fontSize: "13px",
                      }}
                    >
                      {user.email}
                    </div>
                  </div>

                  <span
                    style={{
                      color: "#6b7280",
                      fontSize: "12px",
                    }}
                  >
                    {formatDate(user.created_at)}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ======================================
            USERS
        ====================================== */}

        {activeSection === "users" && (
          <section>
            <h2>Registered Users</h2>

            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                overflowX: "auto",
                boxShadow: "0 3px 15px rgba(0,0,0,0.06)",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "650px",
                }}
              >
                <thead>
                  <tr style={{ background: "#111827", color: "#fff" }}>
                    <th style={thStyle}>ID</th>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Email</th>
                    <th style={thStyle}>Registered On</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td style={tdStyle}>{user.id}</td>
                      <td style={tdStyle}>{user.name}</td>
                      <td style={tdStyle}>{user.email}</td>
                      <td style={tdStyle}>
                        {formatDate(user.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ======================================
            CONTACTS
        ====================================== */}

        {activeSection === "contacts" && (
          <section>
            <h2>Contact Enquiries</h2>

            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                overflowX: "auto",
                boxShadow: "0 3px 15px rgba(0,0,0,0.06)",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "1200px",
                }}
              >
                <thead>
                  <tr style={{ background: "#111827", color: "#fff" }}>
                    <th style={thStyle}>ID</th>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Email</th>
                    <th style={thStyle}>Phone</th>
                    <th style={thStyle}>Location</th>
                    <th style={thStyle}>Project</th>
                    <th style={thStyle}>Budget</th>
                    <th style={thStyle}>Timeline</th>
                    <th style={thStyle}>Message</th>
                    <th style={thStyle}>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.id}>
                      <td style={tdStyle}>{contact.id}</td>
                      <td style={tdStyle}>{contact.name}</td>
                      <td style={tdStyle}>{contact.email}</td>
                      <td style={tdStyle}>{contact.phone}</td>
                      <td style={tdStyle}>{contact.location}</td>
                      <td style={tdStyle}>{contact.project_type}</td>
                      <td style={tdStyle}>{contact.budget}</td>
                      <td style={tdStyle}>{contact.timeline}</td>
                      <td style={tdStyle}>{contact.message}</td>
                      <td style={tdStyle}>
                        {formatDate(contact.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ======================================
            FEEDBACK
        ====================================== */}

        {activeSection === "feedback" && (
          <section>
            <h2>Customer Feedback</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
              }}
            >
              {feedback.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: "#fff",
                    padding: "25px",
                    borderRadius: "12px",
                    boxShadow: "0 3px 15px rgba(0,0,0,0.06)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "20px",
                      color: "#f59e0b",
                      marginBottom: "10px",
                    }}
                  >
                    {displayStars(item.rating)}
                  </div>

                  <p
                    style={{
                      color: "#374151",
                      lineHeight: "1.6",
                    }}
                  >
                    "{item.feedback}"
                  </p>

                  <p
                    style={{
                      fontSize: "13px",
                      color: "#6b7280",
                    }}
                  >
                    <strong>Appreciation:</strong>{" "}
                    {item.appreciation_points || "Not provided"}
                  </p>

                  <div
                    style={{
                      borderTop: "1px solid #eee",
                      paddingTop: "12px",
                      marginTop: "15px",
                      fontSize: "12px",
                      color: "#6b7280",
                    }}
                  >
                    {item.name || "Anonymous"}
                    {item.email ? ` • ${item.email}` : ""}
                    <br />
                    {formatDate(item.created_at)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

// ======================================
// TABLE STYLES
// ======================================

const thStyle = {
  padding: "14px",
  textAlign: "left",
  fontSize: "13px",
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "14px",
  borderBottom: "1px solid #eee",
  fontSize: "13px",
  color: "#374151",
  verticalAlign: "top",
};

export default AdminPanel;