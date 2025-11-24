// Configurations PCs et Serveurs par Département

export const departmentsPCs = [
  {
    id: 1,
    name: "Web/Marketing",
    router: "RZ-1",
    network: "192.168.0.0/19",
    gateway: "192.168.0.1",
    dhcpPool: "192.168.0.51 - 192.168.31.249",
    dns: "8.8.8.8, 8.8.4.4",
    server: {
      name: "Serveur Web",
      ip: "192.168.0.20",
      mask: "255.255.224.0",
      gateway: "192.168.0.1",
      dns: "8.8.8.8"
    },
    pcs: [
      {
        name: "PC-Web-1",
        type: "DHCP",
        expectedIP: "192.168.0.51/19",
        gateway: "192.168.0.1",
        dns: "8.8.8.8"
      },
      {
        name: "PC-Web-2",
        type: "DHCP",
        expectedIP: "192.168.0.52/19",
        gateway: "192.168.0.1",
        dns: "8.8.8.8"
      },
      {
        name: "PC-Web-3",
        type: "DHCP",
        expectedIP: "192.168.0.53/19",
        gateway: "192.168.0.1",
        dns: "8.8.8.8"
      }
    ],
    routerIP: "41.16.2.2",
    backboneIP: "41.16.2.1"
  },
  {
    id: 2,
    name: "Supervision/IT",
    router: "RZ-2",
    network: "192.168.40.0/22",
    gateway: "192.168.40.1",
    dhcpPool: "192.168.40.51 - 192.168.43.249",
    dns: "8.8.8.8, 8.8.4.4",
    server: {
      name: "Serveur Monitoring",
      ip: "192.168.40.20",
      mask: "255.255.252.0",
      gateway: "192.168.40.1",
      dns: "8.8.8.8"
    },
    pcs: [
      {
        name: "PC-IT-1",
        type: "DHCP",
        expectedIP: "192.168.40.51/22",
        gateway: "192.168.40.1",
        dns: "8.8.8.8"
      },
      {
        name: "PC-IT-2",
        type: "DHCP",
        expectedIP: "192.168.40.52/22",
        gateway: "192.168.40.1",
        dns: "8.8.8.8"
      },
      {
        name: "PC-IT-3",
        type: "DHCP",
        expectedIP: "192.168.40.53/22",
        gateway: "192.168.40.1",
        dns: "8.8.8.8"
      }
    ],
    routerIP: "41.16.2.6",
    backboneIP: "41.16.2.5"
  },
  {
    id: 3,
    name: "Base de données",
    router: "RZ-3",
    network: "192.168.32.0/21",
    gateway: "192.168.32.1",
    dhcpPool: "192.168.32.51 - 192.168.39.249",
    dns: "8.8.8.8, 8.8.4.4",
    server: {
      name: "Serveur Database",
      ip: "192.168.32.20",
      mask: "255.255.248.0",
      gateway: "192.168.32.1",
      dns: "8.8.8.8"
    },
    pcs: [
      {
        name: "PC-DB-1",
        type: "DHCP",
        expectedIP: "192.168.32.51/21",
        gateway: "192.168.32.1",
        dns: "8.8.8.8"
      },
      {
        name: "PC-DB-2",
        type: "DHCP",
        expectedIP: "192.168.32.52/21",
        gateway: "192.168.32.1",
        dns: "8.8.8.8"
      },
      {
        name: "PC-DB-3",
        type: "DHCP",
        expectedIP: "192.168.32.53/21",
        gateway: "192.168.32.1",
        dns: "8.8.8.8"
      }
    ],
    routerIP: "41.16.2.10",
    backboneIP: "41.16.2.9"
  },
  {
    id: 4,
    name: "Partage/Collaboration",
    router: "RZ-4",
    network: "192.168.46.0/25",
    gateway: "192.168.46.1",
    dhcpPool: "192.168.46.31 - 192.168.46.119",
    dns: "8.8.8.8, 8.8.4.4",
    server: {
      name: "Serveur NFS",
      ip: "192.168.46.20",
      mask: "255.255.255.128",
      gateway: "192.168.46.1",
      dns: "8.8.8.8"
    },
    pcs: [
      {
        name: "PC-Collab-1",
        type: "DHCP",
        expectedIP: "192.168.46.31/25",
        gateway: "192.168.46.1",
        dns: "8.8.8.8"
      },
      {
        name: "PC-Collab-2",
        type: "DHCP",
        expectedIP: "192.168.46.32/25",
        gateway: "192.168.46.1",
        dns: "8.8.8.8"
      },
      {
        name: "PC-Collab-3",
        type: "DHCP",
        expectedIP: "192.168.46.33/25",
        gateway: "192.168.46.1",
        dns: "8.8.8.8"
      }
    ],
    routerIP: "41.16.2.14",
    backboneIP: "41.16.2.13"
  }
];

export const serverCommands = {
  "Web/Marketing": {
    config: `# Configuration IP statique
ip 192.168.0.20 255.255.224.0 192.168.0.1
save`,
    tests: `# Vérification
show ip

# Tests de connectivité
ping 192.168.0.1        # Gateway RZ1
ping 41.16.2.2          # RZ1 interface publique
ping 41.16.2.1          # R1-Backbone
ping 41.16.1.26         # R1-Backbone vers R-Internet
ping 41.16.1.25         # R-Internet
ping 203.0.113.1        # R-Internet WAN
ping 8.8.8.8            # Internet (Google DNS)
ping 1.1.1.1            # Internet (Cloudflare DNS)

# Traceroute vers Internet
traceroute 8.8.8.8`
  },
  "Supervision/IT": {
    config: `# Configuration IP statique
ip 192.168.40.20 255.255.252.0 192.168.40.1
save`,
    tests: `# Vérification
show ip

# Tests de connectivité
ping 192.168.40.1       # Gateway RZ2
ping 41.16.2.6          # RZ2 interface publique
ping 41.16.2.5          # R2-Backbone
ping 41.16.1.30         # R2-Backbone vers R-Internet
ping 41.16.1.29         # R-Internet
ping 8.8.8.8            # Internet`
  },
  "Base de données": {
    config: `# Configuration IP statique
ip 192.168.32.20 255.255.248.0 192.168.32.1
save`,
    tests: `# Vérification
show ip

# Tests de connectivité
ping 192.168.32.1       # Gateway RZ3
ping 41.16.2.10         # RZ3 interface publique
ping 41.16.2.9          # R3-Backbone
ping 41.16.1.34         # R3-Backbone vers R-Internet
ping 41.16.1.33         # R-Internet
ping 8.8.8.8            # Internet`
  },
  "Partage/Collaboration": {
    config: `# Configuration IP statique
ip 192.168.46.20 255.255.255.128 192.168.46.1
save`,
    tests: `# Vérification
show ip

# Tests de connectivité
ping 192.168.46.1       # Gateway RZ4
ping 41.16.2.14         # RZ4 interface publique
ping 41.16.2.13         # R4-Backbone
ping 41.16.1.38         # R4-Backbone vers R-Internet
ping 41.16.1.37         # R-Internet
ping 8.8.8.8            # Internet`
  }
};

export const pcCommands = {
  basic: `# Obtenir IP automatiquement
dhcp

# Vérification de l'IP reçue
show ip

# Tests de connectivité de base
ping 192.168.X.1        # Gateway
ping 192.168.X.20       # Serveur local
ping 8.8.8.8            # Internet

# Sauvegarder
save`,
  interDepartment: `# Tests inter-départements
ping 192.168.0.1        # Gateway Web/Marketing
ping 192.168.40.1       # Gateway IT
ping 192.168.32.1       # Gateway Base de données
ping 192.168.46.1       # Gateway Collaboration

# Tests vers serveurs autres départements
ping 192.168.0.20       # Serveur Web
ping 192.168.40.20      # Serveur Monitoring
ping 192.168.32.20      # Serveur Database
ping 192.168.46.20      # Serveur NFS

# Traceroute vers autre département
traceroute 192.168.40.20

# Traceroute vers Internet
traceroute 8.8.8.8`
};

export const routerVerificationCommands = {
  "RZ-1": `enable

!========================================
! 1. Vérifier les interfaces
!========================================
show ip interface brief

! Résultat attendu:
! Interface          IP-Address      OK? Method Status                Protocol
! FastEthernet0/0    41.16.2.2       YES manual up                    up
! FastEthernet0/1    192.168.0.1     YES manual up                    up

!========================================
! 2. Vérifier la table de routage
!========================================
show ip route

!========================================
! 3. Vérifier le pool DHCP
!========================================
show ip dhcp pool
show ip dhcp pool WEB-MARKETING

!========================================
! 4. Vérifier les IPs attribuées
!========================================
show ip dhcp binding

!========================================
! 5. Statistiques DHCP
!========================================
show ip dhcp server statistics

!========================================
! 6. Tests de connectivité
!========================================
ping 41.16.2.1              ! R1-Backbone
ping 8.8.8.8                ! Internet

!========================================
! 7. Traceroute vers Internet
!========================================
traceroute 8.8.8.8`,
  "RZ-2": `enable

!========================================
! 1. Vérifier les interfaces
!========================================
show ip interface brief

! Résultat attendu:
! Interface          IP-Address      OK? Method Status                Protocol
! FastEthernet0/0    41.16.2.6       YES manual up                    up
! FastEthernet0/1    192.168.40.1    YES manual up                    up

!========================================
! 2. Vérifier la table de routage
!========================================
show ip route

!========================================
! 3. Vérifier le pool DHCP
!========================================
show ip dhcp pool
show ip dhcp pool SUPERVISION-IT

!========================================
! 4. Vérifier les IPs attribuées
!========================================
show ip dhcp binding

!========================================
! 5. Tests de connectivité
!========================================
ping 41.16.2.5              ! R2-Backbone
ping 8.8.8.8                ! Internet`,
  "RZ-3": `enable

!========================================
! 1. Vérifier les interfaces
!========================================
show ip interface brief

! Résultat attendu:
! Interface          IP-Address      OK? Method Status                Protocol
! FastEthernet0/0    41.16.2.10      YES manual up                    up
! FastEthernet0/1    192.168.32.1    YES manual up                    up

!========================================
! 2. Vérifier la table de routage
!========================================
show ip route

!========================================
! 3. Vérifier le pool DHCP
!========================================
show ip dhcp pool
show ip dhcp pool BASE-DONNEES

!========================================
! 4. Tests de connectivité
!========================================
ping 41.16.2.9              ! R3-Backbone
ping 8.8.8.8                ! Internet`,
  "RZ-4": `enable

!========================================
! 1. Vérifier les interfaces
!========================================
show ip interface brief

! Résultat attendu:
! Interface          IP-Address      OK? Method Status                Protocol
! FastEthernet0/0    41.16.2.14      YES manual up                    up
! FastEthernet0/1    192.168.46.1    YES manual up                    up

!========================================
! 2. Vérifier la table de routage
!========================================
show ip route

!========================================
! 3. Vérifier le pool DHCP
!========================================
show ip dhcp pool
show ip dhcp pool PARTAGE-COLLAB

!========================================
! 4. Tests de connectivité
!========================================
ping 41.16.2.13             ! R4-Backbone
ping 8.8.8.8                ! Internet`
};

