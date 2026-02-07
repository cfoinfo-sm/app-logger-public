// Application State
let currentUser = null;
let currentPage = 1;
const EVENTS_PER_PAGE = 10;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeDB();
    checkLogin();
    setupEventListeners();
});

// Initialize database with sample data if empty
function initializeDB() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
    if (!localStorage.getItem('event_types')) {
        const defaultTypes = [
            { type_id: 1, name: 'Exercise' },
            { type_id: 2, name: 'Meal' },
            { type_id: 3, name: 'Work' },
            { type_id: 4, name: 'Social' },
            { type_id: 5, name: 'Sleep' }
        ];
        localStorage.setItem('event_types', JSON.stringify(defaultTypes));
        localStorage.setItem('type_counter', '6');
    }
    if (!localStorage.getItem('events')) {
        localStorage.setItem('events', JSON.stringify([]));
    }
    if (!localStorage.getItem('event_counter')) {
        localStorage.setItem('event_counter', '1');
    }
    if (!localStorage.getItem('user_counter')) {
        localStorage.setItem('user_counter', '1');
    }
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    document.getElementById('forgotPasswordForm').addEventListener('submit', handleForgotPassword);
    document.getElementById('logEventForm').addEventListener('submit', handleLogEvent);
    document.getElementById('addTypeForm').addEventListener('submit', handleAddType);
}

// Page navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
    // Load data when switching to certain pages
    if (pageId === 'dashboardPage') {
        loadRecentEvents();
        loadEventTypesDropdown('eventType');
    } else if (pageId === 'logEventPage') {
        loadEventTypesDropdown('eventType');
        document.getElementById('logEventSuccess').style.display = 'none';
        document.getElementById('logEventError').style.display = 'none';
    } else if (pageId === 'manageTypesPage') {
        loadTypesList();
    } else if (pageId === 'reportPage') {
        loadEventTypesDropdown('reportEventType');
        document.getElementById('reportResults').innerHTML = '';
        document.getElementById('reportPagination').style.display = 'none';
    }
}

// Authentication
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        showPage('dashboardPage');
        document.getElementById('loginError').style.display = 'none';
    } else {
        document.getElementById('loginError').textContent = 'Invalid email or password';
        document.getElementById('loginError').style.display = 'block';
    }
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    const users = JSON.parse(localStorage.getItem('users'));
    
    if (users.find(u => u.email === email)) {
        document.getElementById('registerError').textContent = 'Email already exists';
        document.getElementById('registerError').style.display = 'block';
        document.getElementById('registerSuccess').style.display = 'none';
        return;
    }
    
    const userId = parseInt(localStorage.getItem('user_counter'));
    const newUser = {
        user_id: userId,
        name: name,
        email: email,
        password: password
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user_counter', (userId + 1).toString());
    
    document.getElementById('registerSuccess').textContent = 'Registration successful! You can now login.';
    document.getElementById('registerSuccess').style.display = 'block';
    document.getElementById('registerError').style.display = 'none';
    document.getElementById('registerForm').reset();
    
    setTimeout(() => {
        showPage('loginPage');
    }, 2000);
}

function handleForgotPassword(e) {
    e.preventDefault();
    const email = document.getElementById('forgotEmail').value;
    const newPassword = document.getElementById('forgotNewPassword').value;
    
    const users = JSON.parse(localStorage.getItem('users'));
    const userIndex = users.findIndex(u => u.email === email);
    
    if (userIndex === -1) {
        document.getElementById('forgotError').textContent = 'Email not found';
        document.getElementById('forgotError').style.display = 'block';
        document.getElementById('forgotSuccess').style.display = 'none';
        return;
    }
    
    users[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    
    document.getElementById('forgotSuccess').textContent = 'Password reset successful! You can now login.';
    document.getElementById('forgotSuccess').style.display = 'block';
    document.getElementById('forgotError').style.display = 'none';
    document.getElementById('forgotPasswordForm').reset();
    
    setTimeout(() => {
        showPage('loginPage');
    }, 2000);
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showPage('loginPage');
}

function checkLogin() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showPage('dashboardPage');
    }
}

// Event Management
function loadEventTypesDropdown(selectId) {
    const eventTypes = JSON.parse(localStorage.getItem('event_types'));
    const select = document.getElementById(selectId);
    
    // Clear existing options except first one
    while (select.options.length > 1) {
        select.remove(1);
    }
    
    eventTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type.type_id;
        option.textContent = type.name;
        select.appendChild(option);
    });
}

function handleLogEvent(e) {
    e.preventDefault();
    
    const typeId = parseInt(document.getElementById('eventType').value);
    const note = document.getElementById('eventNote').value;
    
    const events = JSON.parse(localStorage.getItem('events'));
    const eventId = parseInt(localStorage.getItem('event_counter'));
    
    const newEvent = {
        event_id: eventId,
        user_id: currentUser.user_id,
        type: typeId,
        note: note,
        timestamp: new Date().toISOString()
    };
    
    events.push(newEvent);
    localStorage.setItem('events', JSON.stringify(events));
    localStorage.setItem('event_counter', (eventId + 1).toString());
    
    document.getElementById('logEventSuccess').textContent = 'Event logged successfully!';
    document.getElementById('logEventSuccess').style.display = 'block';
    document.getElementById('logEventError').style.display = 'none';
    document.getElementById('logEventForm').reset();
    
    setTimeout(() => {
        showPage('dashboardPage');
    }, 1500);
}

function loadRecentEvents() {
    const events = JSON.parse(localStorage.getItem('events'));
    const eventTypes = JSON.parse(localStorage.getItem('event_types'));
    
    // Filter events for current user and get latest 10
    const userEvents = events
        .filter(e => e.user_id === currentUser.user_id)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 10);
    
    const container = document.getElementById('recentEvents');
    
    if (userEvents.length === 0) {
        container.innerHTML = '<div class="empty-state">No events logged yet. Click "Log Event" to get started!</div>';
        return;
    }
    
    container.innerHTML = userEvents.map(event => {
        const type = eventTypes.find(t => t.type_id === event.type);
        const date = new Date(event.timestamp);
        const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        
        return `
            <div class="event-item" style="margin-bottom: 15px;">
                <div class="event-type">${type ? type.name : 'Unknown'}</div>
                <div class="event-note">${event.note || 'No notes'}</div>
                <div class="event-time">${formattedDate}</div>
            </div>
        `;
    }).join('');
}

// Event Type Management
function handleAddType(e) {
    e.preventDefault();
    
    const typeName = document.getElementById('newTypeName').value;
    const eventTypes = JSON.parse(localStorage.getItem('event_types'));
    
    if (eventTypes.find(t => t.name.toLowerCase() === typeName.toLowerCase())) {
        document.getElementById('typeError').textContent = 'Event type already exists';
        document.getElementById('typeError').style.display = 'block';
        document.getElementById('typeSuccess').style.display = 'none';
        return;
    }
    
    const typeId = parseInt(localStorage.getItem('type_counter'));
    const newType = {
        type_id: typeId,
        name: typeName
    };
    
    eventTypes.push(newType);
    localStorage.setItem('event_types', JSON.stringify(eventTypes));
    localStorage.setItem('type_counter', (typeId + 1).toString());
    
    document.getElementById('typeSuccess').textContent = 'Event type added successfully!';
    document.getElementById('typeSuccess').style.display = 'block';
    document.getElementById('typeError').style.display = 'none';
    document.getElementById('addTypeForm').reset();
    
    loadTypesList();
}

function loadTypesList() {
    const eventTypes = JSON.parse(localStorage.getItem('event_types'));
    const container = document.getElementById('typesList');
    
    if (eventTypes.length === 0) {
        container.innerHTML = '<div class="empty-state">No event types yet.</div>';
        return;
    }
    
    container.innerHTML = eventTypes.map(type => `
        <div class="type-item">
            <span>${type.name}</span>
            <button class="delete-btn" onclick="deleteType(${type.type_id})">Delete</button>
        </div>
    `).join('');
}

function deleteType(typeId) {
    if (!confirm('Are you sure you want to delete this event type? This cannot be undone.')) {
        return;
    }
    
    const eventTypes = JSON.parse(localStorage.getItem('event_types'));
    const updatedTypes = eventTypes.filter(t => t.type_id !== typeId);
    localStorage.setItem('event_types', JSON.stringify(updatedTypes));
    
    loadTypesList();
    document.getElementById('typeSuccess').textContent = 'Event type deleted successfully!';
    document.getElementById('typeSuccess').style.display = 'block';
}

// Reporting
function loadReport() {
    const typeId = parseInt(document.getElementById('reportEventType').value);
    
    if (!typeId) {
        document.getElementById('reportResults').innerHTML = '';
        document.getElementById('reportPagination').style.display = 'none';
        return;
    }
    
    currentPage = 1;
    displayReportPage(typeId);
}

function displayReportPage(typeId) {
    const events = JSON.parse(localStorage.getItem('events'));
    const eventTypes = JSON.parse(localStorage.getItem('event_types'));
    
    // Filter events for current user and selected type
    const filteredEvents = events
        .filter(e => e.user_id === currentUser.user_id && e.type === typeId)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);
    const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
    const endIndex = startIndex + EVENTS_PER_PAGE;
    const pageEvents = filteredEvents.slice(startIndex, endIndex);
    
    const container = document.getElementById('reportResults');
    
    if (filteredEvents.length === 0) {
        container.innerHTML = '<div class="card"><div class="empty-state">No events found for this type.</div></div>';
        document.getElementById('reportPagination').style.display = 'none';
        return;
    }
    
    const type = eventTypes.find(t => t.type_id === typeId);
    
    container.innerHTML = `
        <div class="card">
            <h2>${type.name} Events (${filteredEvents.length} total)</h2>
            ${pageEvents.map(event => {
                const date = new Date(event.timestamp);
                const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
                
                return `
                    <div class="event-item" style="margin-bottom: 15px;">
                        <div class="event-note">${event.note || 'No notes'}</div>
                        <div class="event-time">${formattedDate}</div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
    
    // Show/hide pagination buttons
    if (totalPages > 1) {
        document.getElementById('reportPagination').style.display = 'flex';
        document.getElementById('prevReportBtn').disabled = currentPage === 1;
        document.getElementById('nextReportBtn').disabled = currentPage === totalPages;
    } else {
        document.getElementById('reportPagination').style.display = 'none';
    }
}

function previousReportPage() {
    if (currentPage > 1) {
        currentPage--;
        const typeId = parseInt(document.getElementById('reportEventType').value);
        displayReportPage(typeId);
    }
}

function nextReportPage() {
    const typeId = parseInt(document.getElementById('reportEventType').value);
    const events = JSON.parse(localStorage.getItem('events'));
    const filteredEvents = events.filter(e => e.user_id === currentUser.user_id && e.type === typeId);
    const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);
    
    if (currentPage < totalPages) {
        currentPage++;
        displayReportPage(typeId);
    }
}
