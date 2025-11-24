// Network Infrastructure Data - TechSolutions SARL

export const departments = [
  {
    id: 1,
    name: "Web / Marketing",
    router: "RZ-1",
    server: "Serveur Web",
    employees: 7170,
    network: "192.168.0.0/19",
    mask: "255.255.224.0",
    gateway: "192.168.0.1",
    broadcast: "192.168.31.255",
    firstIP: "192.168.0.1",
    lastIP: "192.168.31.254",
    hosts: 8190,
    dhcpPool: "WEB-MARKETING",
    domain: "web.techsolutions.local",
    vlan: 10,
    backboneIP: "41.16.2.1",
    routerIP: "41.16.2.2"
  },
  {
    id: 2,
    name: "Supervision / IT",
    router: "RZ-2",
    server: "Serveur Monitoring",
    employees: 597,
    network: "192.168.40.0/22",
    mask: "255.255.252.0",
    gateway: "192.168.40.1",
    broadcast: "192.168.43.255",
    firstIP: "192.168.40.1",
    lastIP: "192.168.43.254",
    hosts: 1022,
    dhcpPool: "SUPERVISION-IT",
    domain: "it.techsolutions.local",
    vlan: 20,
    backboneIP: "41.16.2.5",
    routerIP: "41.16.2.6"
  },
  {
    id: 3,
    name: "Base de données / Gestion",
    router: "RZ-3",
    server: "Serveur DB",
    employees: 1790,
    network: "192.168.32.0/21",
    mask: "255.255.248.0",
    gateway: "192.168.32.1",
    broadcast: "192.168.39.255",
    firstIP: "192.168.32.1",
    lastIP: "192.168.39.254",
    hosts: 2046,
    dhcpPool: "BASE-DONNEES",
    domain: "db.techsolutions.local",
    vlan: 30,
    backboneIP: "41.16.2.9",
    routerIP: "41.16.2.10"
  },
  {
    id: 4,
    name: "Partage / Collaboration",
    router: "RZ-4",
    server: "Serveur NFS",
    employees: 112,
    network: "192.168.46.0/25",
    mask: "255.255.255.128",
    gateway: "192.168.46.1",
    broadcast: "192.168.46.127",
    firstIP: "192.168.46.1",
    lastIP: "192.168.46.126",
    hosts: 126,
    dhcpPool: "PARTAGE-COLLAB",
    domain: "collab.techsolutions.local",
    vlan: 40,
    backboneIP: "41.16.2.13",
    routerIP: "41.16.2.14"
  }
];

export const totalEmployees = departments.reduce((sum, dept) => sum + dept.employees, 0);

export const backboneLinks = [
  { from: "R1", to: "R2", network: "41.16.1.0/30", ip1: "41.16.1.1", ip2: "41.16.1.2", broadcast: "41.16.1.3" },
  { from: "R1", to: "R3", network: "41.16.1.4/30", ip1: "41.16.1.5", ip2: "41.16.1.6", broadcast: "41.16.1.7" },
  { from: "R1", to: "R4", network: "41.16.1.8/30", ip1: "41.16.1.9", ip2: "41.16.1.10", broadcast: "41.16.1.11" },
  { from: "R2", to: "R3", network: "41.16.1.12/30", ip1: "41.16.1.13", ip2: "41.16.1.14", broadcast: "41.16.1.15" },
  { from: "R2", to: "R4", network: "41.16.1.16/30", ip1: "41.16.1.17", ip2: "41.16.1.18", broadcast: "41.16.1.19" },
  { from: "R3", to: "R4", network: "41.16.1.20/30", ip1: "41.16.1.21", ip2: "41.16.1.22", broadcast: "41.16.1.23" },
  { from: "R-Internet", to: "R1", network: "41.16.1.24/30", ip1: "41.16.1.25", ip2: "41.16.1.26", broadcast: "41.16.1.27" },
  { from: "R-Internet", to: "R2", network: "41.16.1.28/30", ip1: "41.16.1.29", ip2: "41.16.1.30", broadcast: "41.16.1.31" },
  { from: "R-Internet", to: "R3", network: "41.16.1.32/30", ip1: "41.16.1.33", ip2: "41.16.1.34", broadcast: "41.16.1.35" },
  { from: "R-Internet", to: "R4", network: "41.16.1.36/30", ip1: "41.16.1.37", ip2: "41.16.1.38", broadcast: "41.16.1.39" }
];

export const departmentLinks = [
  { backbone: "R1", router: "RZ-1", network: "41.16.2.0/30", backboneIP: "41.16.2.1", routerIP: "41.16.2.2", broadcast: "41.16.2.3", department: "Web/Marketing" },
  { backbone: "R2", router: "RZ-2", network: "41.16.2.4/30", backboneIP: "41.16.2.5", routerIP: "41.16.2.6", broadcast: "41.16.2.7", department: "IT" },
  { backbone: "R3", router: "RZ-3", network: "41.16.2.8/30", backboneIP: "41.16.2.9", routerIP: "41.16.2.10", broadcast: "41.16.2.11", department: "Base de données" },
  { backbone: "R4", router: "RZ-4", network: "41.16.2.12/30", backboneIP: "41.16.2.13", routerIP: "41.16.2.14", broadcast: "41.16.2.15", department: "Collaboration" }
];

export const wanNetwork = {
  network: "203.0.113.0/24",
  mask: "255.255.255.0",
  gateway: "203.0.113.254",
  routerIP: "203.0.113.1",
  usableRange: "203.0.113.1 - 203.0.113.253"
};

export const vlsmAllocation = [
  {
    order: 1,
    department: "Web/Marketing",
    employees: 7170,
    cidr: "/19",
    mask: "255.255.224.0",
    network: "192.168.0.0",
    firstIP: "192.168.0.1",
    lastIP: "192.168.31.254",
    broadcast: "192.168.31.255",
    gateway: "192.168.0.1",
    hosts: 8190
  },
  {
    order: 2,
    department: "Base de données",
    employees: 1790,
    cidr: "/21",
    mask: "255.255.248.0",
    network: "192.168.32.0",
    firstIP: "192.168.32.1",
    lastIP: "192.168.39.254",
    broadcast: "192.168.39.255",
    gateway: "192.168.32.1",
    hosts: 2046
  },
  {
    order: 3,
    department: "Supervision/IT",
    employees: 597,
    cidr: "/22",
    mask: "255.255.252.0",
    network: "192.168.40.0",
    firstIP: "192.168.40.1",
    lastIP: "192.168.43.254",
    broadcast: "192.168.43.255",
    gateway: "192.168.40.1",
    hosts: 1022
  },
  {
    order: 4,
    department: "Partage/Collab",
    employees: 112,
    cidr: "/25",
    mask: "255.255.255.128",
    network: "192.168.46.0",
    firstIP: "192.168.46.1",
    lastIP: "192.168.46.126",
    broadcast: "192.168.46.127",
    gateway: "192.168.46.1",
    hosts: 126
  }
];

export const addressBlocks = {
  private: "192.168.0.0/17",
  publicBackbone: "41.16.0.0/16",
  wan: "203.0.113.0/24"
};



