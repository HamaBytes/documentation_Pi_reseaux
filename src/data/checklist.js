// Validation Checklist - 60 items

export const checklistItems = [
  // Documentation Schéma (6 items)
  {
    id: 1,
    category: "Documentation Schéma",
    item: "Schéma d'architecture globale",
    description: "Doit montrer Backbone OSPF maillé + 4 départements",
    command: null
  },
  {
    id: 2,
    category: "Documentation Schéma",
    item: "Topologie Backbone OSPF",
    description: "Structure maillée avec 5 routeurs (R1, R2, R3, R4, R-Int)",
    command: null
  },
  {
    id: 3,
    category: "Documentation Schéma",
    item: "Topologie par département",
    description: "RZ + Switch + 3 PCs + 1 Serveur par département",
    command: null
  },
  {
    id: 4,
    category: "Documentation Schéma",
    item: "Plan d'adressage VLSM complet",
    description: "Calcul VLSM pour 4 départements justifié",
    command: null
  },
  {
    id: 5,
    category: "Documentation Schéma",
    item: "Table d'adressage détaillée",
    description: "Toutes les IPs documentées (Backbone + Départements)",
    command: null
  },
  {
    id: 6,
    category: "Documentation Schéma",
    item: "Légende et conventions",
    description: "Types de liaisons, protocoles, équipements",
    command: null
  },

  // Configuration Backbone OSPF (6 items)
  {
    id: 7,
    category: "Configuration OSPF",
    item: "Router-ID configuré",
    description: "R1, R2, R3, R4, R-Int",
    command: "show ip ospf"
  },
  {
    id: 8,
    category: "Configuration OSPF",
    item: "Interfaces OSPF Area 0",
    description: "Tous Serial",
    command: "show ip ospf interface"
  },
  {
    id: 9,
    category: "Configuration OSPF",
    item: "Passive-interface configuré",
    description: "Tous Fa0/0",
    command: "show ip protocols"
  },
  {
    id: 10,
    category: "Configuration OSPF",
    item: "Voisinages OSPF établis",
    description: "4 voisins par routeur",
    command: "show ip ospf neighbor"
  },
  {
    id: 11,
    category: "Configuration OSPF",
    item: "Routes OSPF convergées",
    description: "Toutes les routes",
    command: "show ip route ospf"
  },
  {
    id: 12,
    category: "Configuration OSPF",
    item: "Default route propagée",
    description: "Via R-Internet",
    command: "show ip route"
  },

  // Configuration Routeurs Départementaux (24 items - 6 per router)
  {
    id: 13,
    category: "Routeurs Départementaux",
    item: "RZ1 - Interface publique UP",
    description: "FastEthernet0/0",
    command: "show ip interface brief",
    router: "RZ-1"
  },
  {
    id: 14,
    category: "Routeurs Départementaux",
    item: "RZ1 - Interface LAN UP",
    description: "FastEthernet0/1",
    command: "show ip interface brief",
    router: "RZ-1"
  },
  {
    id: 15,
    category: "Routeurs Départementaux",
    item: "RZ1 - Route par défaut configurée",
    description: "Vers Backbone",
    command: "show ip route",
    router: "RZ-1"
  },
  {
    id: 16,
    category: "Routeurs Départementaux",
    item: "RZ1 - Pool DHCP configuré",
    description: "WEB-MARKETING",
    command: "show ip dhcp pool",
    router: "RZ-1"
  },
  {
    id: 17,
    category: "Routeurs Départementaux",
    item: "RZ1 - IPs exclues définies",
    description: "Réservations",
    command: "show run | include excluded",
    router: "RZ-1"
  },
  {
    id: 18,
    category: "Routeurs Départementaux",
    item: "RZ1 - DNS configuré (8.8.8.8)",
    description: "Dans pool DHCP",
    command: "show ip dhcp pool",
    router: "RZ-1"
  },
  {
    id: 19,
    category: "Routeurs Départementaux",
    item: "RZ2 - Interface publique UP",
    description: "FastEthernet0/0",
    command: "show ip interface brief",
    router: "RZ-2"
  },
  {
    id: 20,
    category: "Routeurs Départementaux",
    item: "RZ2 - Interface LAN UP",
    description: "FastEthernet0/1",
    command: "show ip interface brief",
    router: "RZ-2"
  },
  {
    id: 21,
    category: "Routeurs Départementaux",
    item: "RZ2 - Route par défaut configurée",
    description: "Vers Backbone",
    command: "show ip route",
    router: "RZ-2"
  },
  {
    id: 22,
    category: "Routeurs Départementaux",
    item: "RZ2 - Pool DHCP configuré",
    description: "SUPERVISION-IT",
    command: "show ip dhcp pool",
    router: "RZ-2"
  },
  {
    id: 23,
    category: "Routeurs Départementaux",
    item: "RZ2 - IPs exclues définies",
    description: "Réservations",
    command: "show run | include excluded",
    router: "RZ-2"
  },
  {
    id: 24,
    category: "Routeurs Départementaux",
    item: "RZ2 - DNS configuré (8.8.8.8)",
    description: "Dans pool DHCP",
    command: "show ip dhcp pool",
    router: "RZ-2"
  },
  {
    id: 25,
    category: "Routeurs Départementaux",
    item: "RZ3 - Interface publique UP",
    description: "FastEthernet0/0",
    command: "show ip interface brief",
    router: "RZ-3"
  },
  {
    id: 26,
    category: "Routeurs Départementaux",
    item: "RZ3 - Interface LAN UP",
    description: "FastEthernet0/1",
    command: "show ip interface brief",
    router: "RZ-3"
  },
  {
    id: 27,
    category: "Routeurs Départementaux",
    item: "RZ3 - Route par défaut configurée",
    description: "Vers Backbone",
    command: "show ip route",
    router: "RZ-3"
  },
  {
    id: 28,
    category: "Routeurs Départementaux",
    item: "RZ3 - Pool DHCP configuré",
    description: "BASE-DONNEES",
    command: "show ip dhcp pool",
    router: "RZ-3"
  },
  {
    id: 29,
    category: "Routeurs Départementaux",
    item: "RZ3 - IPs exclues définies",
    description: "Réservations",
    command: "show run | include excluded",
    router: "RZ-3"
  },
  {
    id: 30,
    category: "Routeurs Départementaux",
    item: "RZ3 - DNS configuré (8.8.8.8)",
    description: "Dans pool DHCP",
    command: "show ip dhcp pool",
    router: "RZ-3"
  },
  {
    id: 31,
    category: "Routeurs Départementaux",
    item: "RZ4 - Interface publique UP",
    description: "FastEthernet0/0",
    command: "show ip interface brief",
    router: "RZ-4"
  },
  {
    id: 32,
    category: "Routeurs Départementaux",
    item: "RZ4 - Interface LAN UP",
    description: "FastEthernet0/1",
    command: "show ip interface brief",
    router: "RZ-4"
  },
  {
    id: 33,
    category: "Routeurs Départementaux",
    item: "RZ4 - Route par défaut configurée",
    description: "Vers Backbone",
    command: "show ip route",
    router: "RZ-4"
  },
  {
    id: 34,
    category: "Routeurs Départementaux",
    item: "RZ4 - Pool DHCP configuré",
    description: "PARTAGE-COLLAB",
    command: "show ip dhcp pool",
    router: "RZ-4"
  },
  {
    id: 35,
    category: "Routeurs Départementaux",
    item: "RZ4 - IPs exclues définies",
    description: "Réservations",
    command: "show run | include excluded",
    router: "RZ-4"
  },
  {
    id: 36,
    category: "Routeurs Départementaux",
    item: "RZ4 - DNS configuré (8.8.8.8)",
    description: "Dans pool DHCP",
    command: "show ip dhcp pool",
    router: "RZ-4"
  },

  // Configuration NAT (24 items - 6 per router)
  {
    id: 37,
    category: "Configuration NAT",
    item: "R1 - Interface inside configurée",
    description: "FastEthernet0/0",
    command: "show ip nat statistics",
    router: "R1-Backbone"
  },
  {
    id: 38,
    category: "Configuration NAT",
    item: "R1 - Interface outside configurée",
    description: "Serial1/3",
    command: "show ip nat statistics",
    router: "R1-Backbone"
  },
  {
    id: 39,
    category: "Configuration NAT",
    item: "R1 - ACL NAT définie",
    description: "Access-list 10",
    command: "show access-lists",
    router: "R1-Backbone"
  },
  {
    id: 40,
    category: "Configuration NAT",
    item: "R1 - NAT Overload configuré",
    description: "PAT sur Serial1/3",
    command: "show ip nat statistics",
    router: "R1-Backbone"
  },
  {
    id: 41,
    category: "Configuration NAT",
    item: "R2 - Interface inside configurée",
    description: "FastEthernet0/0",
    command: "show ip nat statistics",
    router: "R2-Backbone"
  },
  {
    id: 42,
    category: "Configuration NAT",
    item: "R2 - Interface outside configurée",
    description: "Serial1/3",
    command: "show ip nat statistics",
    router: "R2-Backbone"
  },
  {
    id: 43,
    category: "Configuration NAT",
    item: "R2 - ACL NAT définie",
    description: "Access-list 20",
    command: "show access-lists",
    router: "R2-Backbone"
  },
  {
    id: 44,
    category: "Configuration NAT",
    item: "R2 - NAT Overload configuré",
    description: "PAT sur Serial1/3",
    command: "show ip nat statistics",
    router: "R2-Backbone"
  },
  {
    id: 45,
    category: "Configuration NAT",
    item: "R3 - Interface inside configurée",
    description: "FastEthernet0/0",
    command: "show ip nat statistics",
    router: "R3-Backbone"
  },
  {
    id: 46,
    category: "Configuration NAT",
    item: "R3 - Interface outside configurée",
    description: "Serial1/3",
    command: "show ip nat statistics",
    router: "R3-Backbone"
  },
  {
    id: 47,
    category: "Configuration NAT",
    item: "R3 - ACL NAT définie",
    description: "Access-list 30",
    command: "show access-lists",
    router: "R3-Backbone"
  },
  {
    id: 48,
    category: "Configuration NAT",
    item: "R3 - NAT Overload configuré",
    description: "PAT sur Serial1/3",
    command: "show ip nat statistics",
    router: "R3-Backbone"
  },
  {
    id: 49,
    category: "Configuration NAT",
    item: "R4 - Interface inside configurée",
    description: "FastEthernet0/0",
    command: "show ip nat statistics",
    router: "R4-Backbone"
  },
  {
    id: 50,
    category: "Configuration NAT",
    item: "R4 - Interface outside configurée",
    description: "Serial1/3",
    command: "show ip nat statistics",
    router: "R4-Backbone"
  },
  {
    id: 51,
    category: "Configuration NAT",
    item: "R4 - ACL NAT définie",
    description: "Access-list 40",
    command: "show access-lists",
    router: "R4-Backbone"
  },
  {
    id: 52,
    category: "Configuration NAT",
    item: "R4 - NAT Overload configuré",
    description: "PAT sur Serial1/3",
    command: "show ip nat statistics",
    router: "R4-Backbone"
  },
  {
    id: 53,
    category: "Configuration NAT",
    item: "R-Internet - NAT dynamique configuré",
    description: "Access-list 1",
    command: "show ip nat statistics",
    router: "R-Internet"
  },
  {
    id: 54,
    category: "Configuration NAT",
    item: "R-Internet - NAT statique serveurs",
    description: "Redirections ports",
    command: "show ip nat translations",
    router: "R-Internet"
  },

  // Tests de Connectivité (6 items)
  {
    id: 55,
    category: "Tests de Connectivité",
    item: "Ping entre routeurs Backbone",
    description: "R1 vers R2, R3, R4",
    command: "ping 41.16.1.2"
  },
  {
    id: 56,
    category: "Tests de Connectivité",
    item: "Ping R-Internet depuis Backbone",
    description: "R1-R4 vers 41.16.1.25",
    command: "ping 41.16.1.25"
  },
  {
    id: 57,
    category: "Tests de Connectivité",
    item: "Ping RZ depuis Backbone",
    description: "R1 vers 41.16.2.2",
    command: "ping 41.16.2.2"
  },
  {
    id: 58,
    category: "Tests de Connectivité",
    item: "Ping gateway depuis RZ",
    description: "RZ1 vers 41.16.2.1",
    command: "ping 41.16.2.1"
  },
  {
    id: 59,
    category: "Tests de Connectivité",
    item: "Ping Internet depuis RZ",
    description: "RZ1-RZ4 vers 8.8.8.8",
    command: "ping 8.8.8.8"
  },
  {
    id: 60,
    category: "Tests de Connectivité",
    item: "Traceroute Internet depuis RZ",
    description: "RZ1 vers 8.8.8.8 - 3-4 hops",
    command: "traceroute 8.8.8.8"
  }
];

