/**
 * StockSphere Elite - Advanced Inventory Web Application Logic
 * Ported from Python Tkinter + SQLite to modern Browser JavaScript + LocalStorage
 */

// ---------------------------------------------------------------------------
// Initial Demo Data Setup (Matches Stock.py)
// ---------------------------------------------------------------------------
const DEFAULT_DEMO_DATA = {
  users: [
    { id: 1, username: 'admin', password: 'admin123', full_name: 'Aarav Sharma', role: 'Administrator' },
    { id: 2, username: 'manager', password: 'manager123', full_name: 'Meera Patel', role: 'Manager' },
    { id: 3, username: 'staff', password: 'staff123', full_name: 'Rohan Verma', role: 'Staff' }
  ],
  suppliers: [
    { id: 1, name: "TechWorld India", contact_person: "Ravi Kumar", email: "sales@techworld.example", phone: "+91 98765 11001", city: "Raipur", address: "MG Road", active: 1 },
    { id: 2, name: "VisionTech Systems", contact_person: "Aman Verma", email: "orders@visiontech.example", phone: "+91 98765 11002", city: "Pune", address: "Hinjewadi Phase 1", active: 1 },
    { id: 3, name: "OfficeKart Supplies", contact_person: "Neha Sharma", email: "hello@officekart.example", phone: "+91 98765 11003", city: "Bhopal", address: "MP Nagar", active: 1 },
    { id: 4, name: "ErgoDesk Solutions", contact_person: "Priya Singh", email: "sales@ergodesk.example", phone: "+91 98765 11004", city: "Bengaluru", address: "Whitefield", active: 1 },
    { id: 5, name: "PaperPlus Wholesale", contact_person: "Mohit Jain", email: "orders@paperplus.example", phone: "+91 98765 11005", city: "Nagpur", address: "Sitabuldi", active: 1 },
    { id: 6, name: "SoundMax Distributors", contact_person: "Arjun Mehta", email: "sales@soundmax.example", phone: "+91 98765 11006", city: "Delhi", address: "Nehru Place", active: 1 },
    { id: 7, name: "PowerHub Electronics", contact_person: "Karan Shah", email: "support@powerhub.example", phone: "+91 98765 11007", city: "Mumbai", address: "Andheri East", active: 1 }
  ],
  products: [
    { id: 1, sku: "SKU-1001", barcode: "890100000001", name: "Wireless Mouse", category: "Electronics", supplier_id: 1, quantity: 42, cost: 430, price: 799, reorder_level: 10, unit: "pcs", location: "A-01", active: 1 },
    { id: 2, sku: "SKU-1002", barcode: "890100000002", name: "Mechanical Keyboard", category: "Electronics", supplier_id: 1, quantity: 18, cost: 1450, price: 2499, reorder_level: 8, unit: "pcs", location: "A-02", active: 1 },
    { id: 3, sku: "SKU-1003", barcode: "890100000003", name: "USB-C Hub 6-in-1", category: "Accessories", supplier_id: 1, quantity: 7, cost: 700, price: 1299, reorder_level: 10, unit: "pcs", location: "A-03", active: 1 },
    { id: 4, sku: "SKU-1004", barcode: "890100000004", name: "Laptop Stand Pro", category: "Office", supplier_id: 4, quantity: 23, cost: 920, price: 1599, reorder_level: 6, unit: "pcs", location: "B-01", active: 1 },
    { id: 5, sku: "SKU-1005", barcode: "890100000005", name: "A4 Premium Notebook", category: "Stationery", supplier_id: 5, quantity: 75, cost: 65, price: 120, reorder_level: 20, unit: "pcs", location: "C-01", active: 1 },
    { id: 6, sku: "SKU-1006", barcode: "890100000006", name: "Gel Pen Pack", category: "Stationery", supplier_id: 5, quantity: 9, cost: 95, price: 180, reorder_level: 12, unit: "packs", location: "C-02", active: 1 },
    { id: 7, sku: "SKU-1007", barcode: "890100000007", name: "HD Business Webcam", category: "Electronics", supplier_id: 2, quantity: 16, cost: 1100, price: 1899, reorder_level: 5, unit: "pcs", location: "A-04", active: 1 },
    { id: 8, sku: "SKU-1008", barcode: "890100000008", name: "LED Desk Lamp", category: "Office", supplier_id: 4, quantity: 4, cost: 580, price: 999, reorder_level: 8, unit: "pcs", location: "B-02", active: 1 },
    { id: 9, sku: "SKU-1009", barcode: "890100000009", name: "Bluetooth Speaker", category: "Electronics", supplier_id: 6, quantity: 31, cost: 1250, price: 2199, reorder_level: 8, unit: "pcs", location: "A-05", active: 1 },
    { id: 10, sku: "SKU-1010", barcode: "890100000010", name: "Ergonomic Office Chair", category: "Furniture", supplier_id: 4, quantity: 6, cost: 5200, price: 7499, reorder_level: 3, unit: "pcs", location: "D-01", active: 1 },
    { id: 11, sku: "SKU-1011", barcode: "890100000011", name: "27-inch Monitor", category: "Electronics", supplier_id: 2, quantity: 12, cost: 9800, price: 13999, reorder_level: 4, unit: "pcs", location: "A-06", active: 1 },
    { id: 12, sku: "SKU-1012", barcode: "890100000012", name: "Wireless Headset", category: "Accessories", supplier_id: 6, quantity: 19, cost: 1700, price: 2999, reorder_level: 6, unit: "pcs", location: "A-07", active: 1 },
    { id: 13, sku: "SKU-1013", barcode: "890100000013", name: "Whiteboard Marker Set", category: "Stationery", supplier_id: 5, quantity: 14, cost: 150, price: 299, reorder_level: 10, unit: "sets", location: "C-03", active: 1 },
    { id: 14, sku: "SKU-1014", barcode: "890100000014", name: "Power Strip 6 Socket", category: "Accessories", supplier_id: 7, quantity: 8, cost: 520, price: 899, reorder_level: 10, unit: "pcs", location: "A-08", active: 1 },
    { id: 15, sku: "SKU-1015", barcode: "890100000015", name: "Document Scanner", category: "Electronics", supplier_id: 2, quantity: 3, cost: 11200, price: 15999, reorder_level: 4, unit: "pcs", location: "A-09", active: 1 },
    { id: 16, sku: "SKU-1016", barcode: "890100000016", name: "Executive Notebook", category: "Stationery", supplier_id: 5, quantity: 34, cost: 140, price: 249, reorder_level: 10, unit: "pcs", location: "C-04", active: 1 },
    { id: 17, sku: "SKU-1017", barcode: "890100000017", name: "USB-C Fast Charger", category: "Accessories", supplier_id: 7, quantity: 27, cost: 850, price: 1499, reorder_level: 8, unit: "pcs", location: "A-10", active: 1 },
    { id: 18, sku: "SKU-1018", barcode: "890100000018", name: "Wireless Presenter", category: "Accessories", supplier_id: 1, quantity: 11, cost: 620, price: 1199, reorder_level: 5, unit: "pcs", location: "A-11", active: 1 }
  ],
  transactions: [
    { id: 1, product_id: 1, transaction_type: "STOCK IN", quantity: 20, unit_price: 430, reference: "OPEN-1001", user_name: "admin", note: "Opening stock", created_at: "2026-09-01 10:00:00" },
    { id: 2, product_id: 1, transaction_type: "SALE", quantity: 2, unit_price: 799, reference: "INV-5001", user_name: "manager", note: "Customer sale", created_at: "2026-09-12 11:30:00" },
    { id: 3, product_id: 1, transaction_type: "SALE", quantity: 1, unit_price: 799, reference: "INV-5002", user_name: "staff", note: "Customer sale", created_at: "2026-09-20 14:15:00" },
    { id: 4, product_id: 2, transaction_type: "STOCK IN", quantity: 15, unit_price: 1450, reference: "OPEN-1002", user_name: "admin", note: "Opening stock", created_at: "2026-09-01 10:15:00" },
    { id: 5, product_id: 2, transaction_type: "SALE", quantity: 2, unit_price: 2499, reference: "INV-5004", user_name: "manager", note: "Customer sale", created_at: "2026-09-15 16:40:00" },
    { id: 6, product_id: 3, transaction_type: "STOCK IN", quantity: 10, unit_price: 700, reference: "OPEN-1003", user_name: "admin", note: "Opening stock", created_at: "2026-09-01 10:30:00" },
    { id: 7, product_id: 3, transaction_type: "SALE", quantity: 3, unit_price: 1299, reference: "INV-5007", user_name: "staff", note: "Customer sale", created_at: "2026-09-18 12:20:00" },
    { id: 8, product_id: 4, transaction_type: "STOCK IN", quantity: 25, unit_price: 920, reference: "OPEN-1004", user_name: "admin", note: "Opening stock", created_at: "2026-09-01 10:45:00" },
    { id: 9, product_id: 4, transaction_type: "SALE", quantity: 2, unit_price: 1599, reference: "INV-5010", user_name: "manager", note: "Customer sale", created_at: "2026-09-22 15:10:00" },
    { id: 10, product_id: 5, transaction_type: "STOCK IN", quantity: 80, unit_price: 65, reference: "OPEN-1005", user_name: "admin", note: "Opening stock", created_at: "2026-09-01 11:00:00" },
    { id: 11, product_id: 5, transaction_type: "SALE", quantity: 5, unit_price: 120, reference: "INV-5013", user_name: "staff", note: "Customer sale", created_at: "2026-09-25 09:45:00" },
    { id: 12, product_id: 9, transaction_type: "STOCK IN", quantity: 35, unit_price: 1250, reference: "OPEN-1009", user_name: "admin", note: "Opening stock", created_at: "2026-09-01 11:15:00" },
    { id: 13, product_id: 9, transaction_type: "SALE", quantity: 4, unit_price: 2199, reference: "INV-5016", user_name: "manager", note: "Customer sale", created_at: "2026-09-27 17:30:00" },
    { id: 14, product_id: 11, transaction_type: "STOCK IN", quantity: 14, unit_price: 9800, reference: "OPEN-1011", user_name: "admin", note: "Opening stock", created_at: "2026-09-01 11:30:00" },
    { id: 15, product_id: 11, transaction_type: "SALE", quantity: 2, unit_price: 13999, reference: "INV-5019", user_name: "manager", note: "Customer sale", created_at: "2026-09-28 13:00:00" }
  ],
  purchase_orders: [
    { id: 1, po_number: "PO-2026-1001", supplier_id: 1, product_id: 1, quantity: 10, unit_cost: 430, status: "Received", created_at: "2026-09-10 09:30:00", received_at: "2026-09-15 14:00:00" },
    { id: 2, po_number: "PO-2026-1002", supplier_id: 1, product_id: 3, quantity: 15, unit_cost: 700, status: "Received", created_at: "2026-09-12 11:00:00", received_at: "2026-09-18 10:30:00" },
    { id: 3, po_number: "PO-2026-1003", supplier_id: 5, product_id: 5, quantity: 20, unit_cost: 65, status: "Received", created_at: "2026-09-15 14:20:00", received_at: "2026-09-20 16:15:00" },
    { id: 4, po_number: "PO-2026-1004", supplier_id: 2, product_id: 7, quantity: 25, unit_cost: 1100, status: "Pending", created_at: "2026-09-25 10:15:00", received_at: null },
    { id: 5, po_number: "PO-2026-1005", supplier_id: 6, product_id: 9, quantity: 30, unit_cost: 1250, status: "Pending", created_at: "2026-09-26 15:45:00", received_at: null },
    { id: 6, po_number: "PO-2026-1006", supplier_id: 2, product_id: 11, quantity: 35, unit_cost: 9800, status: "Pending", created_at: "2026-09-28 11:30:00", received_at: null }
  ]
};

// ---------------------------------------------------------------------------
// Database Manager (LocalStorage Abstraction)
// ---------------------------------------------------------------------------
class AppDatabase {
  constructor() {
    this.storageKey = 'stocksphere_elite_web_db';
    this.load();
  }

  load() {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (data) {
        this.data = JSON.parse(data);
      } else {
        this.resetDemo();
      }
    } catch (e) {
      console.error("Failed to load from localStorage:", e);
      this.resetDemo();
    }
  }

  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
  }

  resetDemo() {
    this.data = JSON.parse(JSON.stringify(DEFAULT_DEMO_DATA));
    this.save();
  }

  getUsers() { return this.data.users || []; }
  getProducts() { return (this.data.products || []).filter(p => p.active !== 0); }
  getAllProducts() { return this.data.products || []; }
  getSuppliers() { return (this.data.suppliers || []).filter(s => s.active !== 0); }
  getTransactions() { return this.data.transactions || []; }
  getPurchaseOrders() { return this.data.purchase_orders || []; }

  findUser(username, password) {
    return this.getUsers().find(u => u.username === username && u.password === password);
  }

  getProductById(id) {
    return this.getAllProducts().find(p => p.id === Number(id));
  }

  getSupplierById(id) {
    return this.getSuppliers().find(s => s.id === Number(id));
  }

  addProduct(product) {
    const nextId = this.data.products.reduce((max, p) => Math.max(max, p.id), 0) + 1;
    product.id = nextId;
    product.active = 1;
    this.data.products.push(product);
    this.save();
    return product;
  }

  updateProduct(id, updated) {
    const idx = this.data.products.findIndex(p => p.id === Number(id));
    if (idx !== -1) {
      this.data.products[idx] = { ...this.data.products[idx], ...updated };
      this.save();
      return true;
    }
    return false;
  }

  archiveProduct(id) {
    return this.updateProduct(id, { active: 0 });
  }

  addTransaction(tx) {
    const nextId = this.data.transactions.reduce((max, t) => Math.max(max, t.id), 0) + 1;
    tx.id = nextId;
    tx.created_at = tx.created_at || nowText();
    this.data.transactions.unshift(tx);
    this.save();
    return tx;
  }

  addSupplier(supplier) {
    const nextId = this.data.suppliers.reduce((max, s) => Math.max(max, s.id), 0) + 1;
    supplier.id = nextId;
    supplier.active = 1;
    this.data.suppliers.push(supplier);
    this.save();
    return supplier;
  }

  updateSupplier(id, updated) {
    const idx = this.data.suppliers.findIndex(s => s.id === Number(id));
    if (idx !== -1) {
      this.data.suppliers[idx] = { ...this.data.suppliers[idx], ...updated };
      this.save();
      return true;
    }
    return false;
  }

  addPurchaseOrder(po) {
    const nextId = this.data.purchase_orders.reduce((max, p) => Math.max(max, p.id), 0) + 1;
    po.id = nextId;
    po.status = "Pending";
    po.created_at = nowText();
    po.received_at = null;
    this.data.purchase_orders.unshift(po);
    this.save();
    return po;
  }

  receivePurchaseOrder(id) {
    const po = this.data.purchase_orders.find(p => p.id === Number(id));
    if (!po || po.status === 'Received') return false;

    po.status = 'Received';
    po.received_at = nowText();

    // Increment product stock
    const product = this.getProductById(po.product_id);
    if (product) {
      product.quantity += po.quantity;
      product.cost = po.unit_cost; // update cost
    }

    // Add transaction
    this.addTransaction({
      product_id: po.product_id,
      transaction_type: 'STOCK IN',
      quantity: po.quantity,
      unit_price: po.unit_cost,
      reference: po.po_number,
      user_name: App.currentUser ? App.currentUser.username : 'system',
      note: 'Purchase order received'
    });

    this.save();
    return true;
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function nowText() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function money(val) {
  const num = Number(val) || 0;
  return '₹' + num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function downloadFile(content, fileName, contentType) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function arrayToCSV(headers, rows) {
  const escapeCsv = (val) => {
    if (val === null || val === undefined) return '""';
    const s = String(val).replace(/"/g, '""');
    return `"${s}"`;
  };
  const headerLine = headers.map(escapeCsv).join(',');
  const rowLines = rows.map(row => row.map(escapeCsv).join(','));
  return [headerLine, ...rowLines].join('\r\n');
}

// ---------------------------------------------------------------------------
// Application Controller
// ---------------------------------------------------------------------------
const App = {
  db: new AppDatabase(),
  currentUser: null,
  currentPage: 'dashboard',
  selectedProductId: null,
  inventoryFilterCategory: 'All',
  inventorySearchQuery: '',

  init() {
    this.checkSession();
    this.bindEvents();
    this.render();
  },

  checkSession() {
    try {
      const savedUser = sessionStorage.getItem('stocksphere_current_user');
      if (savedUser) {
        this.currentUser = JSON.parse(savedUser);
      }
    } catch (e) {
      this.currentUser = null;
    }
  },

  login(username, password) {
    const user = this.db.findUser(username, password);
    if (user) {
      this.currentUser = user;
      sessionStorage.setItem('stocksphere_current_user', JSON.stringify(user));
      this.showToast(`Welcome back, ${user.full_name}!`, 'success');
      this.currentPage = 'dashboard';
      this.render();
      return true;
    }
    return false;
  },

  logout() {
    if (confirm("Are you sure you want to sign out?")) {
      this.currentUser = null;
      sessionStorage.removeItem('stocksphere_current_user');
      this.render();
      this.showToast("Signed out successfully.", "info");
    }
  },

  navigate(page) {
    this.currentPage = page;
    this.render();
  },

  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
    } else if (type === 'error') {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
    } else {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
    }

    toast.innerHTML = `${iconSvg} <span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  },

  // -------------------------------------------------------------------------
  // Rendering
  // -------------------------------------------------------------------------
  render() {
    const loginView = document.getElementById('loginView');
    const appView = document.getElementById('appView');

    if (!this.currentUser) {
      loginView.style.display = 'flex';
      appView.style.display = 'none';
      return;
    }

    loginView.style.display = 'none';
    appView.style.display = 'flex';

    // Update Header & User profile
    document.getElementById('headerUserName').textContent = this.currentUser.full_name;
    document.getElementById('headerUserRole').textContent = this.currentUser.role;
    document.getElementById('sidebarUserName').textContent = this.currentUser.full_name;
    document.getElementById('sidebarUserRole').textContent = this.currentUser.role;
    document.getElementById('sidebarUserInitial').textContent = this.currentUser.full_name.charAt(0);

    // Settings item visibility (Admin only)
    const settingsNavItem = document.getElementById('navSettings');
    if (settingsNavItem) {
      settingsNavItem.style.display = this.currentUser.role === 'Administrator' ? 'flex' : 'none';
    }

    // Update Active Nav
    document.querySelectorAll('.nav-item').forEach(el => {
      const page = el.getAttribute('data-page');
      if (page === this.currentPage) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    // Update Page Title
    const titleMap = {
      dashboard: 'Dashboard',
      inventory: 'Inventory Management',
      transactions: 'Transaction History',
      suppliers: 'Supplier Directory',
      purchase_orders: 'Purchase Orders',
      sales: 'Sales Center',
      reports: 'Reports & Analytics',
      settings: 'System Settings'
    };
    document.getElementById('activePageTitle').textContent = titleMap[this.currentPage] || 'Dashboard';

    // Render Body Content
    const content = document.getElementById('pageContentBody');
    if (this.currentPage === 'dashboard') {
      content.innerHTML = this.renderDashboard();
    } else if (this.currentPage === 'inventory') {
      content.innerHTML = this.renderInventory();
      this.attachInventoryListeners();
    } else if (this.currentPage === 'transactions') {
      content.innerHTML = this.renderTransactions();
    } else if (this.currentPage === 'suppliers') {
      content.innerHTML = this.renderSuppliers();
    } else if (this.currentPage === 'purchase_orders') {
      content.innerHTML = this.renderPurchaseOrders();
    } else if (this.currentPage === 'sales') {
      content.innerHTML = this.renderSales();
      this.attachSalesListeners();
    } else if (this.currentPage === 'reports') {
      content.innerHTML = this.renderReports();
    } else if (this.currentPage === 'settings') {
      content.innerHTML = this.renderSettings();
    }
  },

  // -------------------------------------------------------------------------
  // Page 1: Dashboard
  // -------------------------------------------------------------------------
  renderDashboard() {
    const products = this.db.getProducts();
    const transactions = this.db.getTransactions();

    const totalProducts = products.length;
    const totalUnits = products.reduce((sum, p) => sum + (Number(p.quantity) || 0), 0);
    const stockValue = products.reduce((sum, p) => sum + ((Number(p.quantity) || 0) * (Number(p.cost) || 0)), 0);
    
    const salesTx = transactions.filter(t => t.transaction_type === 'SALE');
    const totalSales = salesTx.reduce((sum, t) => sum + ((Number(t.quantity) || 0) * (Number(t.unit_price) || 0)), 0);

    const outOfStockList = products.filter(p => p.quantity === 0);
    const lowStockList = products.filter(p => p.quantity > 0 && p.quantity <= p.reorder_level);
    const alertCount = outOfStockList.length + lowStockList.length;

    // Categories Breakdown
    const catMap = {};
    products.forEach(p => {
      catMap[p.category] = (catMap[p.category] || 0) + p.quantity;
    });
    const catList = Object.keys(catMap).map(k => ({ category: k, units: catMap[k] })).sort((a, b) => b.units - a.units);
    const maxCatUnits = catList.length > 0 ? Math.max(...catList.map(c => c.units)) : 1;

    // Priority Alerts (sorted by lowest quantity)
    const priorityAlerts = [...outOfStockList, ...lowStockList].sort((a, b) => a.quantity - b.quantity).slice(0, 7);

    return `
      <div class="kpi-grid">
        <div class="kpi-card kpi-blue">
          <div class="kpi-content">
            <div class="kpi-title">Products</div>
            <div class="kpi-value">${totalProducts}</div>
            <div class="kpi-note">Active catalog</div>
          </div>
          <div class="kpi-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
          </div>
        </div>

        <div class="kpi-card kpi-green">
          <div class="kpi-content">
            <div class="kpi-title">Units</div>
            <div class="kpi-value">${totalUnits.toLocaleString('en-IN')}</div>
            <div class="kpi-note">Physical stock</div>
          </div>
          <div class="kpi-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
          </div>
        </div>

        <div class="kpi-card kpi-purple">
          <div class="kpi-content">
            <div class="kpi-title">Stock Value</div>
            <div class="kpi-value">${money(stockValue)}</div>
            <div class="kpi-note">At purchase cost</div>
          </div>
          <div class="kpi-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          </div>
        </div>

        <div class="kpi-card kpi-orange">
          <div class="kpi-content">
            <div class="kpi-title">Sales</div>
            <div class="kpi-value">${money(totalSales)}</div>
            <div class="kpi-note">Recorded sales</div>
          </div>
          <div class="kpi-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
          </div>
        </div>

        <div class="kpi-card kpi-red">
          <div class="kpi-content">
            <div class="kpi-title">Alerts</div>
            <div class="kpi-value">${lowStockList.length} low / ${outOfStockList.length} out</div>
            <div class="kpi-note">Reorder attention</div>
          </div>
          <div class="kpi-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </div>
        </div>
      </div>

      <div class="dashboard-row">
        <!-- Category Chart -->
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">Inventory by Category</div>
              <div class="card-subtitle">Units currently in warehouse stock</div>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="App.navigate('inventory')">View All</button>
          </div>
          <div class="card-body">
            <div class="chart-container">
              ${catList.map(c => `
                <div class="chart-bar-row">
                  <div class="chart-label" title="${escapeHtml(c.category)}">${escapeHtml(c.category)}</div>
                  <div class="chart-track">
                    <div class="chart-fill" style="width: ${Math.max(12, Math.round((c.units / maxCatUnits) * 100))}%;">
                      ${c.units}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Priority Alerts -->
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">Priority Stock Alerts</div>
              <div class="card-subtitle">Products at or below reorder threshold</div>
            </div>
            <span class="badge ${alertCount > 0 ? 'badge-danger' : 'badge-success'}">${alertCount} Attention</span>
          </div>
          <div class="card-body">
            ${priorityAlerts.length === 0 ? `
              <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
                <h3>All stock levels healthy</h3>
                <p>No products are currently low or out of stock.</p>
              </div>
            ` : `
              <div class="alerts-list">
                ${priorityAlerts.map(p => `
                  <div class="alert-item ${p.quantity === 0 ? 'out-of-stock' : 'low-stock'}">
                    <div class="alert-info">
                      <span class="alert-sku">${escapeHtml(p.sku)}</span>
                      <span class="alert-name">${escapeHtml(p.name)}</span>
                    </div>
                    <div>
                      ${p.quantity === 0
                        ? '<span class="badge badge-danger">OUT OF STOCK</span>'
                        : `<span class="badge badge-warning">${p.quantity} left (reorder at ${p.reorder_level})</span>`
                      }
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  },

  // -------------------------------------------------------------------------
  // Page 2: Inventory
  // -------------------------------------------------------------------------
  renderInventory() {
    const products = this.db.getProducts();
    const suppliers = this.db.getSuppliers();
    const supplierMap = {};
    suppliers.forEach(s => supplierMap[s.id] = s.name);

    // Categories for filter
    const categories = ['All', ...new Set(products.map(p => p.category))];

    // Filter products
    const q = this.inventorySearchQuery.toLowerCase().trim();
    const filtered = products.filter(p => {
      const matchCat = this.inventoryFilterCategory === 'All' || p.category === this.inventoryFilterCategory;
      const supplierName = (supplierMap[p.supplier_id] || '').toLowerCase();
      const matchSearch = !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        (p.barcode && p.barcode.toLowerCase().includes(q)) ||
        supplierName.includes(q);
      return matchCat && matchSearch;
    });

    return `
      <div class="toolbar">
        <div class="toolbar-left">
          <button class="btn btn-primary" onclick="App.openAddProductModal()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Product
          </button>
          <button class="btn btn-secondary" onclick="App.openStockMovementModal('STOCK IN')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 11 12 6 7 11"></polyline><line x1="12" y1="18" x2="12" y2="6"></line></svg>
            Stock In
          </button>
          <button class="btn btn-secondary" onclick="App.openStockMovementModal('STOCK OUT')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="7 13 12 18 17 13"></polyline><line x1="12" y1="6" x2="12" y2="18"></line></svg>
            Stock Out
          </button>
        </div>

        <div class="toolbar-right">
          <select class="select-filter" id="inventoryCategoryFilter">
            ${categories.map(c => `
              <option value="${escapeHtml(c)}" ${this.inventoryFilterCategory === c ? 'selected' : ''}>
                Category: ${escapeHtml(c)}
              </option>
            `).join('')}
          </select>

          <div class="search-input-wrapper">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="inventorySearchBox" class="search-input" placeholder="Search SKU, name, supplier..." value="${escapeHtml(this.inventorySearchQuery)}">
          </div>
        </div>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 50px;">ID</th>
              <th>SKU</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Supplier</th>
              <th style="text-align: right;">Qty</th>
              <th style="text-align: right;">Cost Price</th>
              <th style="text-align: right;">Sale Price</th>
              <th style="text-align: right;">Stock Value</th>
              <th style="text-align: center;">Status</th>
              <th style="text-align: center; width: 100px;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.length === 0 ? `
              <tr>
                <td colspan="11">
                  <div class="empty-state">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <h3>No products found</h3>
                    <p>Try modifying your search or filter criteria.</p>
                  </div>
                </td>
              </tr>
            ` : filtered.map(p => {
              const isOut = p.quantity === 0;
              const isLow = !isOut && p.quantity <= p.reorder_level;
              const stockValue = p.quantity * p.cost;
              let rowClass = '';
              let badge = '<span class="badge badge-success">HEALTHY</span>';
              if (isOut) {
                rowClass = 'row-out';
                badge = '<span class="badge badge-danger">OUT OF STOCK</span>';
              } else if (isLow) {
                rowClass = 'row-low';
                badge = '<span class="badge badge-warning">LOW STOCK</span>';
              }

              return `
                <tr class="${rowClass}">
                  <td class="cell-mono text-muted">${p.id}</td>
                  <td class="cell-mono font-bold">${escapeHtml(p.sku)}</td>
                  <td>
                    <strong>${escapeHtml(p.name)}</strong>
                    ${p.location ? `<div style="font-size: 11px; color: var(--text-light);">Loc: ${escapeHtml(p.location)}</div>` : ''}
                  </td>
                  <td><span class="badge badge-primary">${escapeHtml(p.category)}</span></td>
                  <td>${escapeHtml(supplierMap[p.supplier_id] || '—')}</td>
                  <td style="text-align: right; font-weight: 700;">${p.quantity} <span style="font-size: 11px; color: var(--text-muted); font-weight: normal;">${escapeHtml(p.unit)}</span></td>
                  <td style="text-align: right;" class="cell-mono">${money(p.cost)}</td>
                  <td style="text-align: right; font-weight: 600;" class="cell-mono">${money(p.price)}</td>
                  <td style="text-align: right;" class="cell-mono">${money(stockValue)}</td>
                  <td style="text-align: center;">${badge}</td>
                  <td style="text-align: center;">
                    <div class="cell-actions" style="justify-content: center;">
                      <button class="btn-icon" title="Edit Product" onclick="App.openEditProductModal(${p.id})">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                      <button class="btn-icon delete" title="Archive / Delete" onclick="App.deleteProduct(${p.id})">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  attachInventoryListeners() {
    const search = document.getElementById('inventorySearchBox');
    if (search) {
      search.addEventListener('input', (e) => {
        this.inventorySearchQuery = e.target.value;
        const body = document.getElementById('pageContentBody');
        body.innerHTML = this.renderInventory();
        this.attachInventoryListeners();
        const newSearch = document.getElementById('inventorySearchBox');
        newSearch.focus();
        newSearch.setSelectionRange(newSearch.value.length, newSearch.value.length);
      });
    }

    const filter = document.getElementById('inventoryCategoryFilter');
    if (filter) {
      filter.addEventListener('change', (e) => {
        this.inventoryFilterCategory = e.target.value;
        this.render();
      });
    }
  },

  // -------------------------------------------------------------------------
  // Page 3: Transactions
  // -------------------------------------------------------------------------
  renderTransactions() {
    const transactions = this.db.getTransactions();
    const products = this.db.getAllProducts();
    const prodMap = {};
    products.forEach(p => prodMap[p.id] = p);

    return `
      <div class="toolbar">
        <div>
          <h3 style="font-size: 15px; font-weight: 700;">Transaction Log</h3>
          <p style="font-size: 12px; color: var(--text-muted);">Real-time audit trail of every stock in, dispatch, and customer sale.</p>
        </div>
        <div>
          <button class="btn btn-secondary" onclick="App.exportTransactionsCSV()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Export CSV
          </button>
        </div>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 60px;">ID</th>
              <th>Date & Time</th>
              <th>Type</th>
              <th>SKU</th>
              <th>Product</th>
              <th style="text-align: right;">Quantity</th>
              <th style="text-align: right;">Unit Price</th>
              <th>Reference</th>
              <th>User</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            ${transactions.length === 0 ? `
              <tr><td colspan="10"><div class="empty-state"><h3>No transactions recorded</h3></div></td></tr>
            ` : transactions.map(t => {
              const product = prodMap[t.product_id] || { sku: '—', name: 'Unknown Item' };
              let typeBadge = '<span class="badge badge-primary">STOCK IN</span>';
              if (t.transaction_type === 'SALE') {
                typeBadge = '<span class="badge badge-warning">SALE</span>';
              } else if (t.transaction_type === 'STOCK OUT') {
                typeBadge = '<span class="badge badge-danger">STOCK OUT</span>';
              }

              return `
                <tr>
                  <td class="cell-mono text-muted">${t.id}</td>
                  <td class="cell-mono" style="font-size: 11px;">${escapeHtml(t.created_at)}</td>
                  <td>${typeBadge}</td>
                  <td class="cell-mono font-bold">${escapeHtml(product.sku)}</td>
                  <td><strong>${escapeHtml(product.name)}</strong></td>
                  <td style="text-align: right; font-weight: 700;">${t.quantity}</td>
                  <td style="text-align: right;" class="cell-mono">${money(t.unit_price)}</td>
                  <td class="cell-mono font-bold" style="color: var(--primary);">${escapeHtml(t.reference || '—')}</td>
                  <td><span class="user-pill-role" style="font-size: 10px;">${escapeHtml(t.user_name || 'admin')}</span></td>
                  <td style="color: var(--text-muted); font-size: 12px;">${escapeHtml(t.note || '')}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  // -------------------------------------------------------------------------
  // Page 4: Suppliers
  // -------------------------------------------------------------------------
  renderSuppliers() {
    const suppliers = this.db.getSuppliers();
    const products = this.db.getProducts();

    return `
      <div class="toolbar">
        <div>
          <button class="btn btn-primary" onclick="App.openAddSupplierModal()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Supplier
          </button>
        </div>
        <div>
          <button class="btn btn-secondary" onclick="App.exportSuppliersCSV()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Export CSV
          </button>
        </div>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 60px;">ID</th>
              <th>Supplier Name</th>
              <th>Contact Person</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Address</th>
              <th style="text-align: center;">Active Products</th>
              <th style="text-align: center; width: 80px;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${suppliers.map(s => {
              const productCount = products.filter(p => p.supplier_id === s.id).length;
              return `
                <tr>
                  <td class="cell-mono text-muted">${s.id}</td>
                  <td><strong>${escapeHtml(s.name)}</strong></td>
                  <td>${escapeHtml(s.contact_person || '—')}</td>
                  <td><a href="mailto:${escapeHtml(s.email)}" style="color: var(--primary); text-decoration: none;">${escapeHtml(s.email || '—')}</a></td>
                  <td>${escapeHtml(s.phone || '—')}</td>
                  <td><span class="badge badge-purple">${escapeHtml(s.city || '—')}</span></td>
                  <td style="color: var(--text-muted); font-size: 12px;">${escapeHtml(s.address || '—')}</td>
                  <td style="text-align: center;"><span class="badge badge-primary">${productCount} items</span></td>
                  <td style="text-align: center;">
                    <button class="btn-icon" title="Edit Supplier" onclick="App.openEditSupplierModal(${s.id})">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  // -------------------------------------------------------------------------
  // Page 5: Purchase Orders
  // -------------------------------------------------------------------------
  renderPurchaseOrders() {
    const orders = this.db.getPurchaseOrders();
    const products = this.db.getAllProducts();
    const suppliers = this.db.getSuppliers();

    const prodMap = {};
    products.forEach(p => prodMap[p.id] = p);
    const suppMap = {};
    suppliers.forEach(s => suppMap[s.id] = s);

    return `
      <div class="toolbar">
        <div>
          <button class="btn btn-primary" onclick="App.openAddPOModal()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Create Purchase Order
          </button>
        </div>
        <div style="font-size: 12px; color: var(--text-muted);">
          Pending orders can be received directly into inventory with one click.
        </div>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>PO Number</th>
              <th>Supplier</th>
              <th>Product</th>
              <th style="text-align: right;">Quantity</th>
              <th style="text-align: right;">Unit Cost</th>
              <th style="text-align: right;">Total Amount</th>
              <th style="text-align: center;">Status</th>
              <th>Created Date</th>
              <th style="text-align: center; width: 140px;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${orders.length === 0 ? `
              <tr><td colspan="9"><div class="empty-state"><h3>No purchase orders yet</h3></div></td></tr>
            ` : orders.map(po => {
              const product = prodMap[po.product_id] || { name: 'Item #' + po.product_id };
              const supplier = suppMap[po.supplier_id] || { name: '—' };
              const totalCost = (po.quantity || 0) * (po.unit_cost || 0);
              const isPending = po.status === 'Pending';

              return `
                <tr class="${isPending ? 'row-low' : ''}">
                  <td class="cell-mono font-bold" style="color: var(--primary);">${escapeHtml(po.po_number)}</td>
                  <td><strong>${escapeHtml(supplier.name)}</strong></td>
                  <td>${escapeHtml(product.name)}</td>
                  <td style="text-align: right; font-weight: 700;">${po.quantity}</td>
                  <td style="text-align: right;" class="cell-mono">${money(po.unit_cost)}</td>
                  <td style="text-align: right; font-weight: 700;" class="cell-mono">${money(totalCost)}</td>
                  <td style="text-align: center;">
                    ${isPending
                      ? '<span class="badge badge-warning">Pending</span>'
                      : '<span class="badge badge-success">Received</span>'
                    }
                  </td>
                  <td class="cell-mono" style="font-size: 11px;">${escapeHtml(po.created_at)}</td>
                  <td style="text-align: center;">
                    ${isPending ? `
                      <button class="btn btn-success btn-sm" onclick="App.receivePO(${po.id})">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Receive Stock
                      </button>
                    ` : `
                      <span style="font-size: 11px; color: var(--success); font-weight: 600;">✓ Completed</span>
                    `}
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  // -------------------------------------------------------------------------
  // Page 6: Sales Center
  // -------------------------------------------------------------------------
  renderSales() {
    const transactions = this.db.getTransactions();
    const products = this.db.getProducts();
    const prodMap = {};
    this.db.getAllProducts().forEach(p => prodMap[p.id] = p);

    const salesTx = transactions.filter(t => t.transaction_type === 'SALE');
    const totalSales = salesTx.reduce((sum, t) => sum + ((t.quantity || 0) * (t.unit_price || 0)), 0);
    const unitsSold = salesTx.reduce((sum, t) => sum + (t.quantity || 0), 0);

    // Today's sales
    const todayStr = nowText().slice(0, 10);
    const todaySales = salesTx
      .filter(t => t.created_at && t.created_at.startsWith(todayStr))
      .reduce((sum, t) => sum + ((t.quantity || 0) * (t.unit_price || 0)), 0);

    const recentSales = salesTx.slice(0, 15);

    return `
      <div class="kpi-grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));">
        <div class="kpi-card kpi-blue">
          <div class="kpi-content">
            <div class="kpi-title">Today's Sales</div>
            <div class="kpi-value">${money(todaySales)}</div>
            <div class="kpi-note">Current day revenue</div>
          </div>
          <div class="kpi-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
        </div>

        <div class="kpi-card kpi-green">
          <div class="kpi-content">
            <div class="kpi-title">Lifetime Sales</div>
            <div class="kpi-value">${money(totalSales)}</div>
            <div class="kpi-note">All recorded revenue</div>
          </div>
          <div class="kpi-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          </div>
        </div>

        <div class="kpi-card kpi-purple">
          <div class="kpi-content">
            <div class="kpi-title">Units Sold</div>
            <div class="kpi-value">${unitsSold.toLocaleString('en-IN')}</div>
            <div class="kpi-note">Customer items dispatched</div>
          </div>
          <div class="kpi-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
          </div>
        </div>
      </div>

      <!-- Quick Sale Panel -->
      <div class="quick-sale-panel">
        <div>
          <h3 style="font-size: 15px; font-weight: 700; color: var(--text-main);">Quick Sale Terminal</h3>
          <p style="font-size: 12px; color: var(--text-muted);">Record customer purchases with instant stock deduction and invoice generation.</p>
        </div>

        <form id="quickSaleForm" class="quick-sale-form" onsubmit="event.preventDefault(); App.processQuickSale();">
          <div class="form-group" style="margin-bottom: 0;">
            <label>Product</label>
            <select class="form-control" id="saleProductSelect" required>
              <option value="" disabled selected>Select a product to sell...</option>
              ${products.map(p => `
                <option value="${p.id}" data-price="${p.price}" data-stock="${p.quantity}">
                  ${escapeHtml(p.sku)} — ${escapeHtml(p.name)} (${p.quantity} in stock)
                </option>
              `).join('')}
            </select>
          </div>

          <div class="form-group" style="margin-bottom: 0;">
            <label>Quantity</label>
            <input type="number" class="form-control" id="saleQtyInput" min="1" value="1" required>
          </div>

          <div class="form-group" style="margin-bottom: 0;">
            <label>Price (₹)</label>
            <input type="number" step="0.01" class="form-control" id="salePriceInput" required>
          </div>

          <div class="form-group" style="margin-bottom: 0;">
            <label>Invoice Ref</label>
            <input type="text" class="form-control" id="saleRefInput" value="INV-${Math.floor(100000 + Math.random() * 900000)}">
          </div>

          <div>
            <button type="submit" class="btn btn-success" style="height: 42px; width: 100%;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Record Sale
            </button>
          </div>
        </form>
      </div>

      <!-- Recent Sales Table -->
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Recent Invoices & Transactions</div>
            <div class="card-subtitle">Last 15 sales recorded across the organization</div>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="App.exportSalesCSV()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Export Sales CSV
          </button>
        </div>
        <div class="table-container" style="border: none; border-radius: 0;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Invoice</th>
                <th>Product</th>
                <th style="text-align: right;">Quantity</th>
                <th style="text-align: right;">Total Amount</th>
                <th>Billed By</th>
              </tr>
            </thead>
            <tbody>
              ${recentSales.map(t => {
                const prod = prodMap[t.product_id] || { name: 'Item #' + t.product_id };
                const amount = (t.quantity || 0) * (t.unit_price || 0);
                return `
                  <tr>
                    <td class="cell-mono" style="font-size: 11px;">${escapeHtml(t.created_at)}</td>
                    <td class="cell-mono font-bold" style="color: var(--primary);">${escapeHtml(t.reference || 'SALE')}</td>
                    <td><strong>${escapeHtml(prod.name)}</strong></td>
                    <td style="text-align: right; font-weight: 700;">${t.quantity}</td>
                    <td style="text-align: right; font-weight: 700; color: var(--success);" class="cell-mono">${money(amount)}</td>
                    <td><span class="user-pill-role" style="font-size: 10px;">${escapeHtml(t.user_name || 'staff')}</span></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  attachSalesListeners() {
    const select = document.getElementById('saleProductSelect');
    const priceInput = document.getElementById('salePriceInput');
    if (select && priceInput) {
      select.addEventListener('change', () => {
        const option = select.options[select.selectedIndex];
        if (option && option.dataset.price) {
          priceInput.value = option.dataset.price;
        }
      });
    }
  },

  processQuickSale() {
    const select = document.getElementById('saleProductSelect');
    const qtyInput = document.getElementById('saleQtyInput');
    const priceInput = document.getElementById('salePriceInput');
    const refInput = document.getElementById('saleRefInput');

    const productId = Number(select.value);
    const qty = Number(qtyInput.value);
    const price = Number(priceInput.value);
    const ref = refInput.value.trim() || `INV-${Date.now().toString().slice(-6)}`;

    const product = this.db.getProductById(productId);
    if (!product) {
      this.showToast("Please select a valid product.", "error");
      return;
    }

    if (qty <= 0) {
      this.showToast("Quantity must be greater than 0.", "error");
      return;
    }

    if (qty > product.quantity) {
      this.showToast(`Insufficient stock! Only ${product.quantity} ${product.unit} available.`, "error");
      return;
    }

    // Deduct stock
    product.quantity -= qty;
    this.db.updateProduct(productId, { quantity: product.quantity });

    // Record transaction
    this.db.addTransaction({
      product_id: productId,
      transaction_type: 'SALE',
      quantity: qty,
      unit_price: price,
      reference: ref,
      user_name: this.currentUser.username,
      note: 'Customer sale'
    });

    this.showToast(`Sale recorded: ${qty} × ${product.name} = ${money(qty * price)}`, 'success');
    this.render();
  },

  // -------------------------------------------------------------------------
  // Page 7: Reports & Analytics
  // -------------------------------------------------------------------------
  renderReports() {
    const products = this.db.getProducts();
    const transactions = this.db.getTransactions();

    const salesTx = transactions.filter(t => t.transaction_type === 'SALE');
    const totalRevenue = salesTx.reduce((sum, t) => sum + ((t.quantity || 0) * (t.unit_price || 0)), 0);
    const stockInTx = transactions.filter(t => t.transaction_type === 'STOCK IN');
    const stockInValue = stockInTx.reduce((sum, t) => sum + ((t.quantity || 0) * (t.unit_price || 0)), 0);
    const unitsSold = salesTx.reduce((sum, t) => sum + (t.quantity || 0), 0);
    const lowStockCount = products.filter(p => p.quantity <= p.reorder_level).length;

    // Top Selling Products
    const prodSales = {};
    salesTx.forEach(t => {
      if (!prodSales[t.product_id]) {
        prodSales[t.product_id] = { units: 0, revenue: 0 };
      }
      prodSales[t.product_id].units += (t.quantity || 0);
      prodSales[t.product_id].revenue += ((t.quantity || 0) * (t.unit_price || 0));
    });

    const topSelling = Object.keys(prodSales).map(pid => {
      const prod = this.db.getProductById(pid) || { sku: '—', name: 'Unknown' };
      return {
        sku: prod.sku,
        name: prod.name,
        units: prodSales[pid].units,
        revenue: prodSales[pid].revenue
      };
    }).sort((a, b) => b.units - a.units).slice(0, 12);

    return `
      <div class="kpi-grid">
        <div class="kpi-card kpi-blue">
          <div class="kpi-content">
            <div class="kpi-title">Sales Revenue</div>
            <div class="kpi-value">${money(totalRevenue)}</div>
            <div class="kpi-note">Customer revenue generated</div>
          </div>
          <div class="kpi-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
          </div>
        </div>

        <div class="kpi-card kpi-green">
          <div class="kpi-content">
            <div class="kpi-title">Stock In Value</div>
            <div class="kpi-value">${money(stockInValue)}</div>
            <div class="kpi-note">Inventory procured</div>
          </div>
          <div class="kpi-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
          </div>
        </div>

        <div class="kpi-card kpi-purple">
          <div class="kpi-content">
            <div class="kpi-title">Units Sold</div>
            <div class="kpi-value">${unitsSold.toLocaleString('en-IN')}</div>
            <div class="kpi-note">Physical units</div>
          </div>
          <div class="kpi-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
          </div>
        </div>

        <div class="kpi-card kpi-red">
          <div class="kpi-content">
            <div class="kpi-title">Reorder Alerts</div>
            <div class="kpi-value">${lowStockCount} items</div>
            <div class="kpi-note">Immediate attention</div>
          </div>
          <div class="kpi-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path></svg>
          </div>
        </div>
      </div>

      <!-- Export Center -->
      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 4px;">Data Export Center</h3>
        <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 16px;">Download presentation-ready CSV spreadsheets for business intelligence and offline bookkeeping.</p>

        <div class="export-grid">
          <div class="export-card">
            <div>
              <div class="export-card-header">
                <div class="export-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg></div>
                <div class="export-title">Inventory Master</div>
              </div>
              <div class="export-desc">All products, stock levels, valuations, categories, and warehouse coordinates.</div>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="App.exportInventoryCSV()">Download Inventory CSV</button>
          </div>

          <div class="export-card">
            <div>
              <div class="export-card-header">
                <div class="export-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg></div>
                <div class="export-title">Transactions Ledger</div>
              </div>
              <div class="export-desc">Full audit trail of stock ins, dispatches, customer sales, and timestamps.</div>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="App.exportTransactionsCSV()">Download Ledger CSV</button>
          </div>

          <div class="export-card">
            <div>
              <div class="export-card-header">
                <div class="export-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg></div>
                <div class="export-title">Supplier Directory</div>
              </div>
              <div class="export-desc">Vendor database with contacts, addresses, phones, and supply portfolios.</div>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="App.exportSuppliersCSV()">Download Suppliers CSV</button>
          </div>

          <div class="export-card">
            <div>
              <div class="export-card-header">
                <div class="export-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></div>
                <div class="export-title">Sales Register</div>
              </div>
              <div class="export-desc">Detailed sales invoices, product quantities, transaction values, and agents.</div>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="App.exportSalesCSV()">Download Sales CSV</button>
          </div>
        </div>
      </div>

      <!-- Top Selling Products Leaderboard -->
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Top Selling Products Leaderboard</div>
            <div class="card-subtitle">Highest volume and revenue contributors</div>
          </div>
          <span class="badge badge-purple">Top 12 Performers</span>
        </div>
        <div class="table-container" style="border: none; border-radius: 0;">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 50px;">Rank</th>
                <th>SKU</th>
                <th>Product</th>
                <th style="text-align: right;">Units Sold</th>
                <th style="text-align: right;">Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              ${topSelling.map((p, idx) => `
                <tr>
                  <td class="cell-mono text-muted font-bold">#${idx + 1}</td>
                  <td class="cell-mono font-bold">${escapeHtml(p.sku)}</td>
                  <td><strong>${escapeHtml(p.name)}</strong></td>
                  <td style="text-align: right; font-weight: 700;">${p.units} units</td>
                  <td style="text-align: right; font-weight: 700; color: var(--success);" class="cell-mono">${money(p.revenue)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // -------------------------------------------------------------------------
  // Page 8: System Settings (Admin Only)
  // -------------------------------------------------------------------------
  renderSettings() {
    return `
      <div class="card" style="margin-bottom: 24px;">
        <div class="card-header">
          <div>
            <div class="card-title">System & Environment Information</div>
            <div class="card-subtitle">Current application deployment and runtime parameters</div>
          </div>
          <span class="badge badge-success">Online & Synced</span>
        </div>
        <div class="card-body">
          <div class="settings-list">
            <div class="settings-row">
              <span class="settings-label">Application</span>
              <span class="settings-value">StockSphere Elite Web Suite</span>
            </div>
            <div class="settings-row">
              <span class="settings-label">Version</span>
              <span class="settings-value">3.0 (HTML/CSS/JS Edition)</span>
            </div>
            <div class="settings-row">
              <span class="settings-label">Active Operator</span>
              <span class="settings-value">${escapeHtml(this.currentUser.full_name)} (${escapeHtml(this.currentUser.role)})</span>
            </div>
            <div class="settings-row">
              <span class="settings-label">Storage Backend</span>
              <span class="settings-value">Browser LocalStorage (stocksphere_elite_web_db)</span>
            </div>
            <div class="settings-row">
              <span class="settings-label">Technology Foundation</span>
              <span class="settings-value">Pure Modern HTML5, Responsive CSS3, Vanilla ES6+</span>
            </div>
            <div class="settings-row">
              <span class="settings-label">Pre-seeded Records</span>
              <span class="settings-value">18 Products • 7 Suppliers • Realistic Transactions & Orders</span>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Database & Disaster Recovery Tools</div>
            <div class="card-subtitle">Backup database state as JSON or restore factory demo dataset</div>
          </div>
        </div>
        <div class="card-body">
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 20px;">
            Export a full JSON snapshot of all inventory, suppliers, transaction history, and purchase orders. You can also reset back to the default presentation demo state at any time.
          </p>

          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <button class="btn btn-primary" onclick="App.backupDatabaseJSON()">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Backup Database (JSON)
            </button>

            <button class="btn btn-secondary" onclick="document.getElementById('dbRestoreInput').click()">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              Restore from Backup
            </button>
            <input type="file" id="dbRestoreInput" accept=".json" style="display: none;" onchange="App.restoreDatabaseJSON(this)">

            <button class="btn btn-danger" onclick="App.confirmResetDemo()">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>
              Reset to Factory Demo Data
            </button>
          </div>
        </div>
      </div>
    `;
  },

  backupDatabaseJSON() {
    const dataStr = JSON.stringify(this.db.data, null, 2);
    const dateStr = new Date().toISOString().slice(0, 10);
    downloadFile(dataStr, `stocksphere_backup_${dateStr}.json`, 'application/json');
    this.showToast("Database backup downloaded successfully.", "success");
  },

  restoreDatabaseJSON(input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed.products && parsed.suppliers) {
          this.db.data = parsed;
          this.db.save();
          this.showToast("Database restored successfully!", "success");
          this.render();
        } else {
          this.showToast("Invalid backup file structure.", "error");
        }
      } catch (err) {
        this.showToast("Failed to parse JSON file.", "error");
      }
    };
    reader.readAsText(file);
    input.value = '';
  },

  confirmResetDemo() {
    if (confirm("Reset Demo Data?\n\nThis will restore all default 18 products, 7 suppliers, and initial demo transactions. Any custom records will be overwritten.")) {
      this.db.resetDemo();
      this.showToast("Demo data restored to initial presentation state.", "info");
      this.render();
    }
  },

  // -------------------------------------------------------------------------
  // Modals (Product, Movement, Supplier, PO)
  // -------------------------------------------------------------------------
  openAddProductModal() {
    const suppliers = this.db.getSuppliers();
    const categories = ["Electronics", "Accessories", "Office", "Stationery", "Furniture", "Other"];
    const units = ["pcs", "packs", "sets", "boxes", "kg", "litres"];

    const html = `
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-title-group">
            <h2>Add New Product</h2>
            <p>Complete product master information and opening stock</p>
          </div>
          <button class="modal-close" onclick="App.closeModal()">✕</button>
        </div>
        <form onsubmit="event.preventDefault(); App.saveProduct(null);">
          <div class="modal-body">
            <div class="form-grid-2">
              <div class="form-group">
                <label>SKU *</label>
                <input type="text" class="form-control" id="m_sku" placeholder="e.g. SKU-1019" required>
              </div>
              <div class="form-group">
                <label>Barcode</label>
                <input type="text" class="form-control" id="m_barcode" placeholder="e.g. 890100000019">
              </div>
            </div>

            <div class="form-group">
              <label>Product Name *</label>
              <input type="text" class="form-control" id="m_name" placeholder="Full descriptive name" required>
            </div>

            <div class="form-grid-2">
              <div class="form-group">
                <label>Category *</label>
                <select class="form-control" id="m_category" required>
                  ${categories.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label>Supplier</label>
                <select class="form-control" id="m_supplier">
                  <option value="">No Supplier Assigned</option>
                  ${suppliers.map(s => `<option value="${s.id}">${escapeHtml(s.name)}</option>`).join('')}
                </select>
              </div>
            </div>

            <div class="form-grid-2">
              <div class="form-group">
                <label>Opening Quantity</label>
                <input type="number" class="form-control" id="m_qty" value="0" min="0" required>
              </div>
              <div class="form-group">
                <label>Reorder Level</label>
                <input type="number" class="form-control" id="m_reorder" value="5" min="0" required>
              </div>
            </div>

            <div class="form-grid-2">
              <div class="form-group">
                <label>Cost Price (₹) *</label>
                <input type="number" step="0.01" class="form-control" id="m_cost" value="0" min="0" required>
              </div>
              <div class="form-group">
                <label>Selling Price (₹) *</label>
                <input type="number" step="0.01" class="form-control" id="m_price" value="0" min="0" required>
              </div>
            </div>

            <div class="form-grid-2">
              <div class="form-group">
                <label>Unit</label>
                <select class="form-control" id="m_unit">
                  ${units.map(u => `<option value="${u}">${u}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label>Warehouse Location</label>
                <input type="text" class="form-control" id="m_location" value="Main Warehouse" placeholder="e.g. A-01">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="App.closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Product</button>
          </div>
        </form>
      </div>
    `;
    this.showModal(html);
  },

  openEditProductModal(id) {
    const product = this.db.getProductById(id);
    if (!product) return;

    const suppliers = this.db.getSuppliers();
    const categories = ["Electronics", "Accessories", "Office", "Stationery", "Furniture", "Other"];
    const units = ["pcs", "packs", "sets", "boxes", "kg", "litres"];

    const html = `
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-title-group">
            <h2>Edit Product: ${escapeHtml(product.name)}</h2>
            <p>Update specifications, pricing, and reorder levels</p>
          </div>
          <button class="modal-close" onclick="App.closeModal()">✕</button>
        </div>
        <form onsubmit="event.preventDefault(); App.saveProduct(${product.id});">
          <div class="modal-body">
            <div class="form-grid-2">
              <div class="form-group">
                <label>SKU *</label>
                <input type="text" class="form-control" id="m_sku" value="${escapeHtml(product.sku)}" required>
              </div>
              <div class="form-group">
                <label>Barcode</label>
                <input type="text" class="form-control" id="m_barcode" value="${escapeHtml(product.barcode || '')}">
              </div>
            </div>

            <div class="form-group">
              <label>Product Name *</label>
              <input type="text" class="form-control" id="m_name" value="${escapeHtml(product.name)}" required>
            </div>

            <div class="form-grid-2">
              <div class="form-group">
                <label>Category *</label>
                <select class="form-control" id="m_category" required>
                  ${categories.map(c => `<option value="${c}" ${product.category === c ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label>Supplier</label>
                <select class="form-control" id="m_supplier">
                  <option value="">No Supplier Assigned</option>
                  ${suppliers.map(s => `<option value="${s.id}" ${product.supplier_id === s.id ? 'selected' : ''}>${escapeHtml(s.name)}</option>`).join('')}
                </select>
              </div>
            </div>

            <div class="form-grid-2">
              <div class="form-group">
                <label>Current Quantity</label>
                <input type="number" class="form-control" id="m_qty" value="${product.quantity}" min="0" required>
              </div>
              <div class="form-group">
                <label>Reorder Level</label>
                <input type="number" class="form-control" id="m_reorder" value="${product.reorder_level}" min="0" required>
              </div>
            </div>

            <div class="form-grid-2">
              <div class="form-group">
                <label>Cost Price (₹) *</label>
                <input type="number" step="0.01" class="form-control" id="m_cost" value="${product.cost}" min="0" required>
              </div>
              <div class="form-group">
                <label>Selling Price (₹) *</label>
                <input type="number" step="0.01" class="form-control" id="m_price" value="${product.price}" min="0" required>
              </div>
            </div>

            <div class="form-grid-2">
              <div class="form-group">
                <label>Unit</label>
                <select class="form-control" id="m_unit">
                  ${units.map(u => `<option value="${u}" ${product.unit === u ? 'selected' : ''}>${u}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label>Warehouse Location</label>
                <input type="text" class="form-control" id="m_location" value="${escapeHtml(product.location || 'Main Warehouse')}">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="App.closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    `;
    this.showModal(html);
  },

  saveProduct(existingId) {
    const sku = document.getElementById('m_sku').value.trim();
    const barcode = document.getElementById('m_barcode').value.trim();
    const name = document.getElementById('m_name').value.trim();
    const category = document.getElementById('m_category').value;
    const supplier_id = document.getElementById('m_supplier').value ? Number(document.getElementById('m_supplier').value) : null;
    const quantity = Number(document.getElementById('m_qty').value);
    const reorder_level = Number(document.getElementById('m_reorder').value);
    const cost = Number(document.getElementById('m_cost').value);
    const price = Number(document.getElementById('m_price').value);
    const unit = document.getElementById('m_unit').value;
    const location = document.getElementById('m_location').value.trim() || 'Main Warehouse';

    if (!sku || !name || !category) {
      this.showToast("SKU, product name and category are required.", "error");
      return;
    }

    if (existingId) {
      this.db.updateProduct(existingId, {
        sku, barcode, name, category, supplier_id, quantity,
        reorder_level, cost, price, unit, location
      });
      this.showToast(`Product ${name} updated successfully.`, "success");
    } else {
      const newProd = this.db.addProduct({
        sku, barcode, name, category, supplier_id, quantity,
        reorder_level, cost, price, unit, location, created_at: nowText()
      });
      if (quantity > 0) {
        this.db.addTransaction({
          product_id: newProd.id,
          transaction_type: 'STOCK IN',
          quantity: quantity,
          unit_price: cost,
          reference: 'OPENING',
          user_name: this.currentUser.username,
          note: 'Opening stock'
        });
      }
      this.showToast(`Product ${name} added successfully.`, "success");
    }

    this.closeModal();
    this.render();
  },

  deleteProduct(id) {
    const product = this.db.getProductById(id);
    if (!product) return;
    if (confirm(`Archive ${product.name} (${product.sku})?\n\nHistorical transactions will remain available in records.`)) {
      this.db.archiveProduct(id);
      this.showToast(`Product ${product.name} archived.`, "info");
      this.render();
    }
  },

  openStockMovementModal(type) {
    const products = this.db.getProducts();
    const title = type === 'STOCK IN' ? 'Receive Stock (Stock In)' : 'Dispatch Stock (Stock Out)';
    const refPrefix = type === 'STOCK IN' ? 'GRN' : 'DISP';

    const html = `
      <div class="modal-card modal-sm">
        <div class="modal-header">
          <div class="modal-title-group">
            <h2>${title}</h2>
            <p>Update inventory level and create an audit movement record</p>
          </div>
          <button class="modal-close" onclick="App.closeModal()">✕</button>
        </div>
        <form onsubmit="event.preventDefault(); App.saveStockMovement('${type}');">
          <div class="modal-body">
            <div class="form-group">
              <label>Select Product *</label>
              <select class="form-control" id="sm_product" required>
                <option value="" disabled selected>Choose product...</option>
                ${products.map(p => `
                  <option value="${p.id}" data-cost="${p.cost}" data-price="${p.price}" data-stock="${p.quantity}">
                    ${escapeHtml(p.sku)} — ${escapeHtml(p.name)} [Stock: ${p.quantity} ${p.unit}]
                  </option>
                `).join('')}
              </select>
            </div>

            <div class="form-group">
              <label>Quantity *</label>
              <input type="number" class="form-control" id="sm_qty" min="1" value="1" required>
            </div>

            <div class="form-group">
              <label>Unit Price (₹) *</label>
              <input type="number" step="0.01" class="form-control" id="sm_price" required>
            </div>

            <div class="form-group">
              <label>Reference</label>
              <input type="text" class="form-control" id="sm_ref" value="${refPrefix}-${Date.now().toString().slice(-6)}">
            </div>

            <div class="form-group">
              <label>Note</label>
              <input type="text" class="form-control" id="sm_note" placeholder="Movement reason or supplier slip">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="App.closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary">Confirm Movement</button>
          </div>
        </form>
      </div>
    `;
    this.showModal(html);

    // Auto-fill price when product changes
    setTimeout(() => {
      const select = document.getElementById('sm_product');
      const priceInput = document.getElementById('sm_price');
      if (select && priceInput) {
        select.addEventListener('change', () => {
          const opt = select.options[select.selectedIndex];
          if (opt) {
            priceInput.value = type === 'STOCK IN' ? opt.dataset.cost : opt.dataset.price;
          }
        });
      }
    }, 50);
  },

  saveStockMovement(type) {
    const select = document.getElementById('sm_product');
    const productId = Number(select.value);
    const qty = Number(document.getElementById('sm_qty').value);
    const price = Number(document.getElementById('sm_price').value);
    const ref = document.getElementById('sm_ref').value.trim() || 'N/A';
    const note = document.getElementById('sm_note').value.trim();

    const product = this.db.getProductById(productId);
    if (!product) {
      this.showToast("Please choose a product.", "error");
      return;
    }

    if (qty <= 0) {
      this.showToast("Quantity must be greater than 0.", "error");
      return;
    }

    if (type === 'STOCK IN') {
      product.quantity += qty;
    } else {
      if (qty > product.quantity) {
        this.showToast(`Insufficient stock! Only ${product.quantity} ${product.unit} available.`, "error");
        return;
      }
      product.quantity -= qty;
    }

    this.db.updateProduct(productId, { quantity: product.quantity });
    this.db.addTransaction({
      product_id: productId,
      transaction_type: type,
      quantity: qty,
      unit_price: price,
      reference: ref,
      user_name: this.currentUser.username,
      note: note || (type === 'STOCK IN' ? 'Stock received' : 'Stock dispatched')
    });

    this.showToast(`${type} of ${qty} ${product.unit} recorded successfully.`, 'success');
    this.closeModal();
    this.render();
  },

  openAddSupplierModal() {
    const html = `
      <div class="modal-card modal-sm">
        <div class="modal-header">
          <div class="modal-title-group">
            <h2>Add Supplier</h2>
            <p>Maintain vendor profile and contact details</p>
          </div>
          <button class="modal-close" onclick="App.closeModal()">✕</button>
        </div>
        <form onsubmit="event.preventDefault(); App.saveSupplier(null);">
          <div class="modal-body">
            <div class="form-group">
              <label>Supplier Name *</label>
              <input type="text" class="form-control" id="supp_name" placeholder="Company / Vendor name" required>
            </div>
            <div class="form-group">
              <label>Contact Person</label>
              <input type="text" class="form-control" id="supp_contact" placeholder="Representative name">
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" class="form-control" id="supp_email" placeholder="sales@vendor.com">
            </div>
            <div class="form-group">
              <label>Phone</label>
              <input type="text" class="form-control" id="supp_phone" placeholder="+91 98765 00000">
            </div>
            <div class="form-group">
              <label>City</label>
              <input type="text" class="form-control" id="supp_city" placeholder="City / State">
            </div>
            <div class="form-group">
              <label>Address</label>
              <input type="text" class="form-control" id="supp_address" placeholder="Physical location / Industrial zone">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="App.closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Supplier</button>
          </div>
        </form>
      </div>
    `;
    this.showModal(html);
  },

  openEditSupplierModal(id) {
    const s = this.db.getSupplierById(id);
    if (!s) return;

    const html = `
      <div class="modal-card modal-sm">
        <div class="modal-header">
          <div class="modal-title-group">
            <h2>Edit Supplier: ${escapeHtml(s.name)}</h2>
            <p>Update contact information</p>
          </div>
          <button class="modal-close" onclick="App.closeModal()">✕</button>
        </div>
        <form onsubmit="event.preventDefault(); App.saveSupplier(${s.id});">
          <div class="modal-body">
            <div class="form-group">
              <label>Supplier Name *</label>
              <input type="text" class="form-control" id="supp_name" value="${escapeHtml(s.name)}" required>
            </div>
            <div class="form-group">
              <label>Contact Person</label>
              <input type="text" class="form-control" id="supp_contact" value="${escapeHtml(s.contact_person || '')}">
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" class="form-control" id="supp_email" value="${escapeHtml(s.email || '')}">
            </div>
            <div class="form-group">
              <label>Phone</label>
              <input type="text" class="form-control" id="supp_phone" value="${escapeHtml(s.phone || '')}">
            </div>
            <div class="form-group">
              <label>City</label>
              <input type="text" class="form-control" id="supp_city" value="${escapeHtml(s.city || '')}">
            </div>
            <div class="form-group">
              <label>Address</label>
              <input type="text" class="form-control" id="supp_address" value="${escapeHtml(s.address || '')}">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="App.closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    `;
    this.showModal(html);
  },

  saveSupplier(existingId) {
    const name = document.getElementById('supp_name').value.trim();
    const contact_person = document.getElementById('supp_contact').value.trim();
    const email = document.getElementById('supp_email').value.trim();
    const phone = document.getElementById('supp_phone').value.trim();
    const city = document.getElementById('supp_city').value.trim();
    const address = document.getElementById('supp_address').value.trim();

    if (!name) {
      this.showToast("Supplier name is required.", "error");
      return;
    }

    if (existingId) {
      this.db.updateSupplier(existingId, { name, contact_person, email, phone, city, address });
      this.showToast(`Supplier ${name} updated.`, "success");
    } else {
      this.db.addSupplier({ name, contact_person, email, phone, city, address });
      this.showToast(`Supplier ${name} created.`, "success");
    }

    this.closeModal();
    this.render();
  },

  openAddPOModal() {
    const products = this.db.getProducts();
    const suppliers = this.db.getSuppliers();

    const html = `
      <div class="modal-card modal-sm">
        <div class="modal-header">
          <div class="modal-title-group">
            <h2>New Purchase Order</h2>
            <p>Order inventory from authorized suppliers</p>
          </div>
          <button class="modal-close" onclick="App.closeModal()">✕</button>
        </div>
        <form onsubmit="event.preventDefault(); App.savePurchaseOrder();">
          <div class="modal-body">
            <div class="form-group">
              <label>Product *</label>
              <select class="form-control" id="po_prod" required>
                <option value="" disabled selected>Select product...</option>
                ${products.map(p => `
                  <option value="${p.id}" data-cost="${p.cost}" data-supp="${p.supplier_id || ''}">
                    ${escapeHtml(p.sku)} — ${escapeHtml(p.name)}
                  </option>
                `).join('')}
              </select>
            </div>

            <div class="form-group">
              <label>Supplier *</label>
              <select class="form-control" id="po_supp" required>
                <option value="" disabled selected>Select vendor...</option>
                ${suppliers.map(s => `
                  <option value="${s.id}">${escapeHtml(s.name)}</option>
                `).join('')}
              </select>
            </div>

            <div class="form-group">
              <label>Quantity *</label>
              <input type="number" class="form-control" id="po_qty" min="1" value="10" required>
            </div>

            <div class="form-group">
              <label>Unit Cost (₹) *</label>
              <input type="number" step="0.01" class="form-control" id="po_cost" required>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="App.closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary">Create Order</button>
          </div>
        </form>
      </div>
    `;
    this.showModal(html);

    setTimeout(() => {
      const prodSelect = document.getElementById('po_prod');
      const suppSelect = document.getElementById('po_supp');
      const costInput = document.getElementById('po_cost');
      if (prodSelect) {
        prodSelect.addEventListener('change', () => {
          const opt = prodSelect.options[prodSelect.selectedIndex];
          if (opt) {
            costInput.value = opt.dataset.cost || 0;
            if (opt.dataset.supp && suppSelect) {
              suppSelect.value = opt.dataset.supp;
            }
          }
        });
      }
    }, 50);
  },

  savePurchaseOrder() {
    const prodId = Number(document.getElementById('po_prod').value);
    const suppId = Number(document.getElementById('po_supp').value);
    const qty = Number(document.getElementById('po_qty').value);
    const cost = Number(document.getElementById('po_cost').value);

    if (!prodId || !suppId || qty <= 0 || cost < 0) {
      this.showToast("Please provide valid product, supplier, quantity and cost.", "error");
      return;
    }

    const nextNumber = `PO-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    this.db.addPurchaseOrder({
      po_number: nextNumber,
      supplier_id: suppId,
      product_id: prodId,
      quantity: qty,
      unit_cost: cost
    });

    this.showToast(`Purchase Order ${nextNumber} created successfully!`, "success");
    this.closeModal();
    this.render();
  },

  receivePO(id) {
    if (confirm("Receive this purchase order?\n\nUnits will be added to warehouse inventory and a Stock In transaction will be logged.")) {
      const ok = this.db.receivePurchaseOrder(id);
      if (ok) {
        this.showToast("Purchase order received and stock levels updated.", "success");
        this.render();
      } else {
        this.showToast("Failed to receive order or already received.", "error");
      }
    }
  },

  // -------------------------------------------------------------------------
  // Modal Utilities
  // -------------------------------------------------------------------------
  showModal(html) {
    const overlay = document.getElementById('globalModalOverlay');
    overlay.innerHTML = html;
    overlay.classList.add('active');
  },

  closeModal() {
    const overlay = document.getElementById('globalModalOverlay');
    overlay.classList.remove('active');
    overlay.innerHTML = '';
  },

  // -------------------------------------------------------------------------
  // CSV Exporters
  // -------------------------------------------------------------------------
  exportInventoryCSV() {
    const products = this.db.getProducts();
    const suppMap = {};
    this.db.getSuppliers().forEach(s => suppMap[s.id] = s.name);

    const headers = ["SKU", "Barcode", "Product Name", "Category", "Supplier", "Quantity", "Cost Price", "Sale Price", "Reorder Level", "Unit", "Location"];
    const rows = products.map(p => [
      p.sku,
      p.barcode || '',
      p.name,
      p.category,
      suppMap[p.supplier_id] || '—',
      p.quantity,
      p.cost,
      p.price,
      p.reorder_level,
      p.unit,
      p.location || 'Main Warehouse'
    ]);

    const csv = arrayToCSV(headers, rows);
    downloadFile(csv, `stocksphere_inventory_${nowText().slice(0, 10)}.csv`, 'text/csv;charset=utf-8;');
    this.showToast("Inventory CSV exported.", "success");
  },

  exportTransactionsCSV() {
    const transactions = this.db.getTransactions();
    const prodMap = {};
    this.db.getAllProducts().forEach(p => prodMap[p.id] = p);

    const headers = ["ID", "Date Time", "Type", "SKU", "Product", "Quantity", "Unit Price", "Total Amount", "Reference", "User", "Note"];
    const rows = transactions.map(t => {
      const prod = prodMap[t.product_id] || { sku: '—', name: 'Unknown' };
      return [
        t.id,
        t.created_at,
        t.transaction_type,
        prod.sku,
        prod.name,
        t.quantity,
        t.unit_price,
        t.quantity * t.unit_price,
        t.reference || '',
        t.user_name || '',
        t.note || ''
      ];
    });

    const csv = arrayToCSV(headers, rows);
    downloadFile(csv, `stocksphere_transactions_${nowText().slice(0, 10)}.csv`, 'text/csv;charset=utf-8;');
    this.showToast("Transactions CSV exported.", "success");
  },

  exportSuppliersCSV() {
    const suppliers = this.db.getSuppliers();
    const headers = ["Supplier Name", "Contact Person", "Email", "Phone", "City", "Address"];
    const rows = suppliers.map(s => [
      s.name,
      s.contact_person || '',
      s.email || '',
      s.phone || '',
      s.city || '',
      s.address || ''
    ]);

    const csv = arrayToCSV(headers, rows);
    downloadFile(csv, `stocksphere_suppliers_${nowText().slice(0, 10)}.csv`, 'text/csv;charset=utf-8;');
    this.showToast("Suppliers CSV exported.", "success");
  },

  exportSalesCSV() {
    const salesTx = this.db.getTransactions().filter(t => t.transaction_type === 'SALE');
    const prodMap = {};
    this.db.getAllProducts().forEach(p => prodMap[p.id] = p);

    const headers = ["Date Time", "Invoice Ref", "SKU", "Product Name", "Quantity", "Sale Price", "Total Revenue", "User"];
    const rows = salesTx.map(t => {
      const prod = prodMap[t.product_id] || { sku: '—', name: 'Unknown' };
      return [
        t.created_at,
        t.reference || 'SALE',
        prod.sku,
        prod.name,
        t.quantity,
        t.unit_price,
        t.quantity * t.unit_price,
        t.user_name || ''
      ];
    });

    const csv = arrayToCSV(headers, rows);
    downloadFile(csv, `stocksphere_sales_${nowText().slice(0, 10)}.csv`, 'text/csv;charset=utf-8;');
    this.showToast("Sales CSV exported.", "success");
  },

  // -------------------------------------------------------------------------
  // Global DOM Event Bindings
  // -------------------------------------------------------------------------
  bindEvents() {
    // Login form submit
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const u = document.getElementById('loginUsername').value.trim();
        const p = document.getElementById('loginPassword').value.trim();
        const err = document.getElementById('loginError');

        if (this.login(u, p)) {
          err.style.display = 'none';
        } else {
          err.textContent = "Invalid credentials. Please select a demo account or verify username/password.";
          err.style.display = 'block';
        }
      });
    }

    // Demo account quick login buttons
    document.querySelectorAll('.demo-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const u = btn.getAttribute('data-user');
        const p = btn.getAttribute('data-pass');
        document.getElementById('loginUsername').value = u;
        document.getElementById('loginPassword').value = p;
        this.login(u, p);
      });
    });

    // Navigation links
    document.querySelectorAll('.nav-item').forEach(el => {
      el.addEventListener('click', () => {
        const page = el.getAttribute('data-page');
        if (page) this.navigate(page);
      });
    });

    // Sign out button
    const signoutBtn = document.getElementById('sidebarSignout');
    if (signoutBtn) {
      signoutBtn.addEventListener('click', () => this.logout());
    }

    // Modal background click close
    const overlay = document.getElementById('globalModalOverlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.closeModal();
      });
    }

    // Keyboard ESC to close modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModal();
    });
  }
};

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
