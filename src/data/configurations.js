// Router Configurations - TechSolutions SARL

export const routerConfigs = {
  "R1-Backbone": `enable
configure terminal
hostname R1-Backbone

!========================================
! Interfaces Serial Backbone (PUBLIC)
!========================================

! Liaison vers R2-Backbone
interface Serial1/0
 description Liaison vers R2-Backbone
 ip address 41.16.1.1 255.255.255.252
 encapsulation ppp
 ip nat outside
 no shutdown
 exit

! Liaison vers R3-Backbone
interface Serial1/1
 description Liaison vers R3-Backbone
 ip address 41.16.1.5 255.255.255.252
 encapsulation ppp
 ip nat outside
 no shutdown
 exit

! Liaison vers R4-Backbone
interface Serial1/2
 description Liaison vers R4-Backbone
 ip address 41.16.1.9 255.255.255.252
 encapsulation ppp
 ip nat outside
 no shutdown
 exit

! Liaison vers R-Internet
interface Serial1/3
 description Liaison vers R-Internet
 ip address 41.16.1.26 255.255.255.252
 encapsulation ppp
 ip nat outside
 no shutdown
 exit

!========================================
! Interface vers RZ1 (PUBLIC)
!========================================
interface FastEthernet0/0
 description Liaison publique vers RZ1
 ip address 41.16.2.1 255.255.255.252
 ip nat inside
 no shutdown
 exit

!========================================
! Configuration OSPF
!========================================
router ospf 1
 router-id 1.1.1.1
 log-adjacency-changes
 passive-interface FastEthernet0/0
 network 41.16.1.0 0.0.0.3 area 0
 network 41.16.1.4 0.0.0.3 area 0
 network 41.16.1.8 0.0.0.3 area 0
 network 41.16.1.24 0.0.0.3 area 0
 network 41.16.2.0 0.0.0.3 area 0
 default-information originate
 exit

!========================================
! Configuration NAT
!========================================
access-list 10 permit 192.168.0.0 0.0.31.255
ip nat inside source list 10 interface Serial1/3 overload

!========================================
! Routes Statiques
!========================================
ip route 0.0.0.0 0.0.0.0 41.16.1.25
ip route 192.168.0.0 255.255.224.0 41.16.2.2

end
write memory`,

  "R2-Backbone": `enable
configure terminal
hostname R2-Backbone

!========================================
! Interfaces Serial Backbone (PUBLIC)
!========================================

! Liaison vers R1-Backbone
interface Serial1/0
 description Liaison vers R1-Backbone
 ip address 41.16.1.2 255.255.255.252
 encapsulation ppp
 ip nat outside
 no shutdown
 exit

! Liaison vers R3-Backbone
interface Serial1/1
 description Liaison vers R3-Backbone
 ip address 41.16.1.13 255.255.255.252
 encapsulation ppp
 ip nat outside
 no shutdown
 exit

! Liaison vers R4-Backbone
interface Serial1/2
 description Liaison vers R4-Backbone
 ip address 41.16.1.17 255.255.255.252
 encapsulation ppp
 ip nat outside
 no shutdown
 exit

! Liaison vers R-Internet
interface Serial1/3
 description Liaison vers R-Internet
 ip address 41.16.1.30 255.255.255.252
 encapsulation ppp
 ip nat outside
 no shutdown
 exit

!========================================
! Interface vers RZ2 (PUBLIC)
!========================================
interface FastEthernet0/0
 description Liaison publique vers RZ2
 ip address 41.16.2.5 255.255.255.252
 ip nat inside
 no shutdown
 exit

!========================================
! Configuration OSPF
!========================================
router ospf 1
 router-id 2.2.2.2
 log-adjacency-changes
 passive-interface FastEthernet0/0
 network 41.16.1.0 0.0.0.3 area 0
 network 41.16.1.12 0.0.0.3 area 0
 network 41.16.1.16 0.0.0.3 area 0
 network 41.16.1.28 0.0.0.3 area 0
 network 41.16.2.4 0.0.0.3 area 0
 default-information originate
 exit

!========================================
! Configuration NAT
!========================================
access-list 20 permit 192.168.40.0 0.0.3.255
ip nat inside source list 20 interface Serial1/3 overload

!========================================
! Routes Statiques
!========================================
ip route 0.0.0.0 0.0.0.0 41.16.1.29
ip route 192.168.40.0 255.255.252.0 41.16.2.6

end
write memory`,

  "R3-Backbone": `enable
configure terminal
hostname R3-Backbone

!========================================
! Interfaces Serial Backbone (PUBLIC)
!========================================

! Liaison vers R1-Backbone
interface Serial1/0
 description Liaison vers R1-Backbone
 ip address 41.16.1.6 255.255.255.252
 encapsulation ppp
 ip nat outside
 no shutdown
 exit

! Liaison vers R2-Backbone
interface Serial1/1
 description Liaison vers R2-Backbone
 ip address 41.16.1.14 255.255.255.252
 encapsulation ppp
 ip nat outside
 no shutdown
 exit

! Liaison vers R4-Backbone
interface Serial1/2
 description Liaison vers R4-Backbone
 ip address 41.16.1.21 255.255.255.252
 encapsulation ppp
 ip nat outside
 no shutdown
 exit

! Liaison vers R-Internet
interface Serial1/3
 description Liaison vers R-Internet
 ip address 41.16.1.34 255.255.255.252
 encapsulation ppp
 ip nat outside
 no shutdown
 exit

!========================================
! Interface vers RZ3 (PUBLIC)
!========================================
interface FastEthernet0/0
 description Liaison publique vers RZ3
 ip address 41.16.2.9 255.255.255.252
 ip nat inside
 no shutdown
 exit

!========================================
! Configuration OSPF
!========================================
router ospf 1
 router-id 3.3.3.3
 log-adjacency-changes
 passive-interface FastEthernet0/0
 network 41.16.1.4 0.0.0.3 area 0
 network 41.16.1.12 0.0.0.3 area 0
 network 41.16.1.20 0.0.0.3 area 0
 network 41.16.1.32 0.0.0.3 area 0
 network 41.16.2.8 0.0.0.3 area 0
 default-information originate
 exit

!========================================
! Configuration NAT
!========================================
access-list 30 permit 192.168.32.0 0.0.7.255
ip nat inside source list 30 interface Serial1/3 overload

!========================================
! Routes Statiques
!========================================
ip route 0.0.0.0 0.0.0.0 41.16.1.33
ip route 192.168.32.0 255.255.248.0 41.16.2.10

end
write memory`,

  "R4-Backbone": `enable
configure terminal
hostname R4-Backbone

!========================================
! Interfaces Serial Backbone (PUBLIC)
!========================================

! Liaison vers R1-Backbone
interface Serial1/0
 description Liaison vers R1-Backbone
 ip address 41.16.1.10 255.255.255.252
 encapsulation ppp
 ip nat outside
 no shutdown
 exit

! Liaison vers R2-Backbone
interface Serial1/1
 description Liaison vers R2-Backbone
 ip address 41.16.1.18 255.255.255.252
 encapsulation ppp
 ip nat outside
 no shutdown
 exit

! Liaison vers R3-Backbone
interface Serial1/2
 description Liaison vers R3-Backbone
 ip address 41.16.1.22 255.255.255.252
 encapsulation ppp
 ip nat outside
 no shutdown
 exit

! Liaison vers R-Internet
interface Serial1/3
 description Liaison vers R-Internet
 ip address 41.16.1.38 255.255.255.252
 encapsulation ppp
 ip nat outside
 no shutdown
 exit

!========================================
! Interface vers RZ4 (PUBLIC)
!========================================
interface FastEthernet0/0
 description Liaison publique vers RZ4
 ip address 41.16.2.13 255.255.255.252
 ip nat inside
 no shutdown
 exit

!========================================
! Configuration OSPF
!========================================
router ospf 1
 router-id 4.4.4.4
 log-adjacency-changes
 passive-interface FastEthernet0/0
 network 41.16.1.8 0.0.0.3 area 0
 network 41.16.1.16 0.0.0.3 area 0
 network 41.16.1.20 0.0.0.3 area 0
 network 41.16.1.36 0.0.0.3 area 0
 network 41.16.2.12 0.0.0.3 area 0
 default-information originate
 exit

!========================================
! Configuration NAT
!========================================
access-list 40 permit 192.168.46.0 0.0.0.127
ip nat inside source list 40 interface Serial1/3 overload

!========================================
! Routes Statiques
!========================================
ip route 0.0.0.0 0.0.0.0 41.16.1.37
ip route 192.168.46.0 255.255.255.128 41.16.2.14

end
write memory`,

  "R-Internet": `enable
configure terminal
hostname R-Internet

!========================================
! Interface WAN (Outside) - Internet Simulé
!========================================
interface FastEthernet0/0
 description WAN Internet - NAT Outside Principal
 ip address 203.0.113.1 255.255.255.0
 ip nat outside
 no shutdown
 exit

!========================================
! Interfaces Serial vers Backbone (INSIDE)
!========================================

! Liaison vers R1-Backbone
interface Serial1/0
 description Liaison vers R1-Backbone
 ip address 41.16.1.25 255.255.255.252
 encapsulation ppp
 ip nat inside
 no shutdown
 exit

! Liaison vers R2-Backbone
interface Serial1/1
 description Liaison vers R2-Backbone
 ip address 41.16.1.29 255.255.255.252
 encapsulation ppp
 ip nat inside
 no shutdown
 exit

! Liaison vers R3-Backbone
interface Serial1/2
 description Liaison vers R3-Backbone
 ip address 41.16.1.33 255.255.255.252
 encapsulation ppp
 ip nat inside
 no shutdown
 exit

! Liaison vers R4-Backbone
interface Serial1/3
 description Liaison vers R4-Backbone
 ip address 41.16.1.37 255.255.255.252
 encapsulation ppp
 ip nat inside
 no shutdown
 exit

!========================================
! Configuration OSPF
!========================================
router ospf 1
 router-id 5.5.5.5
 log-adjacency-changes
 passive-interface FastEthernet0/0
 network 41.16.1.24 0.0.0.3 area 0
 network 41.16.1.28 0.0.0.3 area 0
 network 41.16.1.32 0.0.0.3 area 0
 network 41.16.1.36 0.0.0.3 area 0
 default-information originate always
 exit

!========================================
! Configuration NAT
!========================================

! NAT dynamique pour tout le trafic Backbone
access-list 1 permit 41.16.0.0 0.0.255.255
access-list 1 permit 192.168.0.0 0.0.127.255
ip nat inside source list 1 interface FastEthernet0/0 overload

! NAT Statique pour les serveurs (redirection de ports)
ip nat inside source static tcp 192.168.0.20 80 203.0.113.20 80
ip nat inside source static tcp 192.168.0.20 443 203.0.113.20 443
ip nat inside source static 192.168.40.20 203.0.113.40
ip nat inside source static tcp 192.168.32.20 3306 203.0.113.32 3306
ip nat inside source static 192.168.46.20 203.0.113.46

!========================================
! Routes Statiques
!========================================
ip route 0.0.0.0 0.0.0.0 203.0.113.254
ip route 192.168.0.0 255.255.224.0 41.16.1.26
ip route 192.168.32.0 255.255.248.0 41.16.1.34
ip route 192.168.40.0 255.255.252.0 41.16.1.30
ip route 192.168.46.0 255.255.255.128 41.16.1.38

end
write memory`,

  "RZ-1": `enable
configure terminal
hostname RZ-1

!========================================
! Interface vers R1-Backbone (PUBLIC)
!========================================
interface FastEthernet0/0
 description Liaison publique vers R1-Backbone
 ip address 41.16.2.2 255.255.255.252
 no shutdown
 exit

!========================================
! Interface LAN Département (PRIVÉ)
!========================================
interface FastEthernet0/1
 description LAN Web/Marketing - DHCP actif
 ip address 192.168.0.1 255.255.224.0
 no shutdown
 exit

!========================================
! Configuration DHCP
!========================================
ip dhcp excluded-address 192.168.0.1 192.168.0.50
ip dhcp excluded-address 192.168.31.250 192.168.31.255

ip dhcp pool WEB-MARKETING
 network 192.168.0.0 255.255.224.0
 default-router 192.168.0.1
 dns-server 8.8.8.8 8.8.4.4
 domain-name web.techsolutions.local
 lease 7
 exit

!========================================
! Routes Statiques
!========================================
ip route 0.0.0.0 0.0.0.0 41.16.2.1

end
write memory`,

  "RZ-2": `enable
configure terminal
hostname RZ-2

!========================================
! Interface vers R2-Backbone (PUBLIC)
!========================================
interface FastEthernet0/0
 description Liaison publique vers R2-Backbone
 ip address 41.16.2.6 255.255.255.252
 no shutdown
 exit

!========================================
! Interface LAN Département (PRIVÉ)
!========================================
interface FastEthernet0/1
 description LAN Supervision/IT - DHCP actif
 ip address 192.168.40.1 255.255.252.0
 no shutdown
 exit

!========================================
! Configuration DHCP
!========================================
ip dhcp excluded-address 192.168.40.1 192.168.40.50
ip dhcp excluded-address 192.168.43.250 192.168.43.255

ip dhcp pool SUPERVISION-IT
 network 192.168.40.0 255.255.252.0
 default-router 192.168.40.1
 dns-server 8.8.8.8 8.8.4.4
 domain-name it.techsolutions.local
 lease 7
 exit

!========================================
! Routes Statiques
!========================================
ip route 0.0.0.0 0.0.0.0 41.16.2.5

end
write memory`,

  "RZ-3": `enable
configure terminal
hostname RZ-3

!========================================
! Interface vers R3-Backbone (PUBLIC)
!========================================
interface FastEthernet0/0
 description Liaison publique vers R3-Backbone
 ip address 41.16.2.10 255.255.255.252
 no shutdown
 exit

!========================================
! Interface LAN Département (PRIVÉ)
!========================================
interface FastEthernet0/1
 description LAN Base de donnees - DHCP actif
 ip address 192.168.32.1 255.255.248.0
 no shutdown
 exit

!========================================
! Configuration DHCP
!========================================
ip dhcp excluded-address 192.168.32.1 192.168.32.50
ip dhcp excluded-address 192.168.39.250 192.168.39.255

ip dhcp pool BASE-DONNEES
 network 192.168.32.0 255.255.248.0
 default-router 192.168.32.1
 dns-server 8.8.8.8 8.8.4.4
 domain-name db.techsolutions.local
 lease 7
 exit

!========================================
! Routes Statiques
!========================================
ip route 0.0.0.0 0.0.0.0 41.16.2.9

end
write memory`,

  "RZ-4": `enable
configure terminal
hostname RZ-4

!========================================
! Interface vers R4-Backbone (PUBLIC)
!========================================
interface FastEthernet0/0
 description Liaison publique vers R4-Backbone
 ip address 41.16.2.14 255.255.255.252
 no shutdown
 exit

!========================================
! Interface LAN Département (PRIVÉ)
!========================================
interface FastEthernet0/1
 description LAN Partage/Collaboration - DHCP actif
 ip address 192.168.46.1 255.255.255.128
 no shutdown
 exit

!========================================
! Configuration DHCP
!========================================
ip dhcp excluded-address 192.168.46.1 192.168.46.30
ip dhcp excluded-address 192.168.46.120 192.168.46.127

ip dhcp pool PARTAGE-COLLAB
 network 192.168.46.0 255.255.255.128
 default-router 192.168.46.1
 dns-server 8.8.8.8 8.8.4.4
 domain-name collab.techsolutions.local
 lease 7
 exit

!========================================
! Routes Statiques
!========================================
ip route 0.0.0.0 0.0.0.0 41.16.2.13

end
write memory`
};

export const ciscoCommands = [
  { command: "show ip interface brief", description: "Affiche l'état des interfaces", category: "Interface" },
  { command: "show ip ospf neighbor", description: "Affiche les voisins OSPF", category: "OSPF" },
  { command: "show ip route", description: "Affiche la table de routage", category: "Routage" },
  { command: "show ip route ospf", description: "Affiche uniquement les routes OSPF", category: "OSPF" },
  { command: "show ip dhcp pool", description: "Affiche les pools DHCP configurés", category: "DHCP" },
  { command: "show ip dhcp binding", description: "Affiche les baux DHCP actifs", category: "DHCP" },
  { command: "show ip nat translations", description: "Affiche les traductions NAT actives", category: "NAT" },
  { command: "show ip nat statistics", description: "Affiche les statistiques NAT", category: "NAT" },
  { command: "show running-config", description: "Affiche la configuration active", category: "Configuration" },
  { command: "show ip ospf interface", description: "Affiche les interfaces OSPF", category: "OSPF" },
  { command: "show ip ospf database", description: "Affiche la base de données OSPF", category: "OSPF" },
  { command: "ping", description: "Test de connectivité", category: "Test" },
  { command: "traceroute", description: "Trace le chemin réseau", category: "Test" },
  { command: "configure terminal", description: "Entre en mode configuration", category: "Configuration" },
  { command: "write memory", description: "Sauvegarde la configuration", category: "Configuration" }
];

