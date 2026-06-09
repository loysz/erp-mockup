const icons = {
  activity: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M10.3 21a2 2 0 0 0 3.4 0"/><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 6 9 17l-5-5"/><circle cx="12" cy="12" r="10"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  database: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5"/><path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/></svg>',
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8M16 17H8M10 9H8"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 13c0 5-3.5 7.5-7.7 8.9a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.5a1.3 1.3 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
};

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: icons.activity },
  { id: 'advisory', label: 'Advisory & Clients', icon: icons.file },
  { id: 'hr', label: 'HR & Payroll', icon: icons.users },
  { id: 'audit', label: 'Audit Logs (Legal)', icon: icons.shield },
];

const app = document.querySelector('#app');
let activeTab = 'dashboard';

function render() {
  const title = activeTab === 'hr' ? 'HR & Payroll' : tabs.find((tab) => tab.id === activeTab).label;

  app.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand">
          <img class="brand-logo" src="assets/logo.png" alt="M&N logo" />
          <div>
            <h1 class="brand-title">M&amp;N Group</h1>
            <p class="brand-subtitle">ERPNext Desk</p>
          </div>
        </div>
        <p class="sidebar-label">Workspaces</p>
        <nav class="nav" aria-label="Primary">
          ${tabs.map((tab) => navButton(tab)).join('')}
        </nav>
        <div class="local-status">${icons.lock}<span>Self-hosted ERPNext ready</span></div>
      </aside>

      <section class="content">
        <header class="topbar">
          <div>
            <p class="breadcrumb">M&amp;N Group / Workspace</p>
            <h2 class="page-title">${title}</h2>
          </div>
          <div class="topbar-actions">
            <label class="search" aria-label="Search client or passport">
              ${icons.search}
              <input type="text" placeholder="Search or type a command" />
            </label>
            <button class="button-primary top-create" type="button">${icons.file}Create</button>
            <button class="icon-button" type="button" title="Notifications" aria-label="Notifications">
              ${icons.bell}<span class="badge">3</span>
            </button>
            <div class="profile">
              <div class="profile-copy">
                <p class="profile-name">Super Admin</p>
                <p class="profile-role">Board Member</p>
              </div>
              <div class="avatar">SA</div>
            </div>
          </div>
        </header>
        <main class="main">${viewMarkup()}</main>
      </section>
    </div>
  `;

  document.querySelectorAll('[data-tab]').forEach((button) => {
    button.addEventListener('click', () => {
      activeTab = button.dataset.tab;
      render();
    });
  });
}

function navButton(tab) {
  return `
    <button class="nav-button ${activeTab === tab.id ? 'active' : ''}" type="button" data-tab="${tab.id}">
      ${tab.icon}<span>${tab.label}</span>
    </button>
  `;
}

function viewMarkup() {
  if (activeTab === 'dashboard') return dashboardView();
  if (activeTab === 'advisory') return advisoryView();
  if (activeTab === 'hr') return hrView();
  return auditView();
}

function dashboardView() {
  return `
    <div class="view">
      <section class="workspace-block">
        <div class="workspace-heading">
          <div>
            <p class="eyebrow">Workspace</p>
            <h3>Advisory Operations</h3>
          </div>
          <button class="action-link" type="button">Customize</button>
        </div>
        <div class="shortcut-grid">
          ${shortcutCard('New Application', 'Create immigration case', icons.file)}
          ${shortcutCard('Client List', 'Open customer records', icons.users)}
          ${shortcutCard('Document Shortfall', 'Review missing files', icons.alert)}
          ${shortcutCard('Audit Trail', 'View evidence logs', icons.shield)}
        </div>
      </section>
      <div class="stats">
        ${statCard('Pending Client Approvals', '12', icons.clock, 'icon-amber', '+2 this week', true)}
        ${statCard('Missing Documents (Shortfall)', '5', icons.alert, 'icon-red', 'Requires action', true)}
        ${statCard('System Security Status', 'Secure', icons.shield, 'icon-green', 'Last backup: 2 hours ago', false)}
      </div>
      <div class="dashboard-grid">
        <section class="card">
          <div class="panel-header"><h3 class="panel-title">Recent Advisory Applications</h3></div>
          <div class="activity-list">
            ${activityItem('Expatriate Pass (EP) - John Doe', '2 hours ago', 'Missing Passport Copy', 'status-red')}
            ${activityItem('Dependent Pass (DP) - Sarah Lee', '5 hours ago', 'Processing at ESD', 'status-blue')}
            ${activityItem('PVP - Tech Corp Sdn Bhd', '1 day ago', 'Approved', 'status-green')}
          </div>
        </section>
        <section class="card">
          <div class="panel-header"><h3 class="panel-title">${icons.lock}Security &amp; Compliance Alerts</h3></div>
          <div class="alert-list">
            ${alertItem('Successful local database backup to Proxmox server.', 'Today, 03:00 AM', 'success')}
            ${alertItem('Unrecognized login attempt blocked from foreign IP.', 'Yesterday, 11:42 PM', 'warning')}
            ${alertItem('PDPA Data Check: 100% of files encrypted locally.', 'Yesterday, 06:00 AM', 'success')}
          </div>
        </section>
      </div>
    </div>
  `;
}

function advisoryView() {
  const rows = [
    ['Michael Smith', 'Global Tech Sdn Bhd', 'Employment Pass (EP)', 'Missing Degree Cert', 'status-red', '24 Aug 2026'],
    ['Akiro Tanaka', 'Japan Motors MY', 'Professional Visit Pass', 'Pending Approval', 'status-amber', '12 Nov 2026'],
    ['Maria Garcia', 'EduCorp Malaysia', 'Dependent Pass (DP)', 'Approved & Active', 'status-green', '05 Jan 2027'],
  ];

  return `
    <section class="card table-panel view">
      <div class="panel-header">
        <h3 class="panel-title">Client Immigration Tracker</h3>
        <button class="button-primary" type="button">${icons.file}New Application</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Client / Company</th>
              <th>Pass Type</th>
              <th>Status / Shortfall</th>
              <th>Expiry Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>${rows.map(clientRow).join('')}</tbody>
        </table>
      </div>
    </section>
  `;
}

function hrView() {
  return `
    <section class="card table-panel view">
      <div class="panel-header">
        <h3 class="panel-title">Staff Leave &amp; Payroll Operations</h3>
        <button class="button-primary" type="button">Run Payroll (June 2026)</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Leave Request</th>
              <th>Payroll Status</th>
              <th>Approve</th>
            </tr>
          </thead>
          <tbody>
            ${staffRow('Siti Nurhaliza', 'Advisory Team', '<span class="status-pill status-amber">Annual: 2 Days</span>', 'Review')}
            ${staffRow('Ahmad Faiz', 'IT / Infrastructure', '<span class="text-muted">No pending request</span>', 'View')}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function auditView() {
  const rows = [
    ['2026-06-08 14:32:01', 'HR_Admin_01', 'Approved Leave: Siti Nurhaliza (Ref: LV-902)', '192.168.1.45 (Local)', 'text-green', ''],
    ['2026-06-08 11:15:44', 'ADV_Staff_04', 'DELETED File: "Client_Passport_John.pdf"', '192.168.1.12 (Local)', 'text-red', 'row-danger'],
    ['2026-06-08 09:01:22', 'ADV_Manager', 'Sent Document Shortfall Email to Global Tech Sdn Bhd', '192.168.1.5 (Local)', 'text-blue', ''],
    ['2026-06-08 08:30:00', 'SYSTEM_AUTO', 'Encrypted Full Database Backup Completed', 'localhost', 'text-muted', ''],
  ];

  return `
    <section class="card table-panel view">
      <div class="panel-header audit-header">
        <div>
          <h3 class="panel-title">${icons.shield}Immutable Audit Trail (Evidence Log)</h3>
          <p class="panel-subtitle">Legally binding, un-editable system logs for PDPA compliance.</p>
        </div>
        <button class="button-secondary" type="button">${icons.database}Export to PDF</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Exact Timestamp</th>
              <th>User (Staff ID)</th>
              <th>Action Performed</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>${rows.map(auditRow).join('')}</tbody>
        </table>
      </div>
    </section>
  `;
}

function statCard(title, value, icon, iconClass, trend, alert) {
  return `
    <article class="card stat-card">
      <div class="stat-top">
        <div>
          <p class="stat-title">${title}</p>
          <p class="stat-value">${value}</p>
        </div>
        <div class="icon-tile icon-lg ${iconClass}">${icon}</div>
      </div>
      <p class="stat-trend ${alert ? 'trend-alert' : 'trend-ok'}">${trend}</p>
    </article>
  `;
}

function shortcutCard(title, description, icon) {
  return `
    <button class="shortcut-card" type="button">
      <span class="shortcut-icon">${icon}</span>
      <span>
        <strong>${title}</strong>
        <small>${description}</small>
      </span>
    </button>
  `;
}

function activityItem(title, time, status, color) {
  return `
    <div class="activity-row">
      <div>
        <p class="activity-title">${title}</p>
        <p class="activity-time">${time}</p>
      </div>
      <span class="status-pill ${color}">${status}</span>
    </div>
  `;
}

function alertItem(text, time, type) {
  const icon = type === 'success'
    ? `<span class="icon-green">${icons.check}</span>`
    : `<span class="icon-amber">${icons.alert}</span>`;

  return `
    <div class="alert-row">
      ${icon}
      <div>
        <p class="alert-text">${text}</p>
        <p class="alert-time">${time}</p>
      </div>
    </div>
  `;
}

function clientRow([client, company, type, status, color, date]) {
  return `
    <tr>
      <td>
        <p class="client-name">${client}</p>
        <p class="client-company">${company}</p>
      </td>
      <td>${type}</td>
      <td><span class="status-pill ${color}">${status}</span></td>
      <td><strong>${date}</strong></td>
      <td><button class="action-link" type="button">View Profile</button></td>
    </tr>
  `;
}

function staffRow(name, department, leave, action) {
  return `
    <tr>
      <td><p class="staff-name">${name}</p></td>
      <td class="text-muted">${department}</td>
      <td>${leave}</td>
      <td><span class="text-green">${icons.check} Calculated</span></td>
      <td><button class="action-link" type="button">${action}</button></td>
    </tr>
  `;
}

function auditRow([time, user, action, ip, tone, rowClass]) {
  return `
    <tr class="${rowClass}">
      <td class="font-mono text-muted">${time}</td>
      <td class="font-mono"><strong>${user}</strong></td>
      <td class="font-mono ${tone}"><strong>${action}</strong></td>
      <td class="font-mono text-muted">${ip}</td>
    </tr>
  `;
}

render();
