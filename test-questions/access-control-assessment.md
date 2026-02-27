# Access Control Systems Assessment Questions
## TotalMaster ELV Academy - Entry Level to Advanced Journeyman

---

## SECTION 1: CODES & STANDARDS (10 Questions)

### Entry Level

**Q1.** What is the primary UL standard that covers access control system equipment and hardware?
- A) UL 681
- B) UL 294
- C) UL 1076
- D) UL 2050

**Answer:** B) UL 294
> *Reference: UL 294 - Standard for Access Control System Units covers electronic access control*

---

**Q2.** According to NFPA 101 (Life Safety Code), what must happen to magnetically-locked doors during a fire alarm?
- A) Remain locked for security
- B) Automatically release to allow egress
- C) Sound a local alarm
- D) Switch to card-only access

**Answer:** B) Automatically release to allow egress
> *Reference: NFPA 101 requires fail-safe release of magnetic locks for emergency egress*

---

**Q3.** What does ADA (Americans with Disabilities Act) require regarding the mounting height of card readers?
- A) Maximum 36 inches AFF
- B) Maximum 48 inches AFF for forward approach
- C) Minimum 60 inches AFF
- D) No specific requirement

**Answer:** B) Maximum 48 inches AFF for forward approach
> *Reference: ADA/ABA Guidelines Section 309.3 - Reach ranges for operable parts*

---

### Intermediate Level

**Q4.** According to UL 294, what are the three levels of access control system certification, and which requires the highest degree of attack resistance?
- A) Levels I, II, III; Level III highest
- B) Levels A, B, C; Level A highest
- C) Basic, Standard, Premium; Premium highest
- D) Grades 1, 2, 3; Grade 1 highest

**Answer:** A) Levels I, II, III; Level III highest
> *Reference: UL 294 Level III requires highest destructive attack resistance and line security*

---

**Q5.** What OSDP (Open Supervised Device Protocol) version introduced secure channel encrypted communication between readers and controllers?
- A) OSDP v1.0
- B) OSDP v2.0
- C) OSDP v2.1
- D) OSDP v3.0

**Answer:** B) OSDP v2.0
> *Reference: SIA OSDP v2 introduced AES-128 encrypted secure channel; v2.2 is current standard*

---

**Q6.** According to NFPA 80 (Standard for Fire Doors), what is the maximum force allowed to open a fire door equipped with an access control release device?
- A) 5 lbf
- B) 15 lbf
- C) 30 lbf
- D) No force limit

**Answer:** B) 15 lbf
> *Reference: NFPA 80 and NFPA 101 limit opening force to 15 lbf for fire and egress doors*

---

### Advanced Level

**Q7.** Under FICAM (Federal Identity, Credential, and Access Management), what PIV (Personal Identity Verification) authentication level requires both card-present AND PIN entry?
- A) Visual Authentication
- B) Attended Authentication
- C) Unattended Authentication (PIV-AUTH)
- D) High-Assurance Authentication (PKI-CAK)

**Answer:** C) Unattended Authentication (PIV-AUTH)
> *Reference: FICAM requires card + PIN for unattended high-security access points*

---

**Q8.** What ISO/IEC standard defines the communication protocol for contactless smart cards operating at 13.56 MHz?
- A) ISO/IEC 14443
- B) ISO/IEC 15693
- C) ISO/IEC 18000
- D) ISO/IEC 7816

**Answer:** A) ISO/IEC 14443
> *Reference: ISO 14443 Types A & B define proximity cards used in access control (MIFARE, DESFire)*

---

**Q9.** According to NFPA 72, when access control systems interface with fire alarm systems, what classification of circuit must the fire alarm input to the access controller be?
- A) Class A initiating device circuit
- B) Signaling line circuit (SLC)
- C) Notification appliance circuit (NAC)
- D) Any supervised circuit with end-of-line supervision

**Answer:** D) Any supervised circuit with end-of-line supervision
> *Reference: Fire relay output to access control must be supervised; specific class depends on system design*

---

**Q10.** What SIA (Security Industry Association) standard provides a framework for interoperability between access control systems and physical security information management (PSIM) platforms?
- A) SIA CP-01
- B) OSDP
- C) SIA OSIPS (Open Systems Integration Publication Suite)
- D) ONVIF Profile A

**Answer:** C) SIA OSIPS
> *Reference: OSIPS provides standardized data exchange formats for access control integration*

---

## SECTION 2: INSTALLATION (10 Questions)

### Entry Level

**Q1.** When installing a magnetic lock (maglock), what is the CRITICAL first step before mounting?
- A) Test the lock with power
- B) Verify door swing direction and frame material
- C) Install the armature plate
- D) Connect the wiring

**Answer:** B) Verify door swing direction and frame material
> *Reference: Maglocks require inswing doors; frame material determines mounting hardware*

---

**Q2.** What is the standard wire gauge typically used for powering a 600lb magnetic lock with a 50-foot cable run?
- A) 22 AWG
- B) 18 AWG
- C) 16 AWG
- D) 14 AWG

**Answer:** B) 18 AWG
> *Reference: 18 AWG supports 600lb maglock (250-500mA) at 50ft with acceptable voltage drop*

---

**Q3.** When installing a door contact (position sensor), where should the magnet be mounted?
- A) On the door frame (fixed)
- B) On the door itself (moving)
- C) Inside the access controller
- D) Above the door frame

**Answer:** B) On the door itself (moving)
> *Reference: Magnet mounts on moving door; reed switch mounts on fixed frame*

---

### Intermediate Level

**Q4.** When wiring an OSDP reader to a controller, what is the maximum recommended cable distance using standard twisted pair?
- A) 100 feet
- B) 500 feet
- C) 1,000 feet
- D) 4,000 feet

**Answer:** D) 4,000 feet
> *Reference: OSDP uses RS-485 which supports up to 4,000 feet at reduced baud rates*

---

**Q5.** What wiring configuration is required for an electric strike that must be fail-secure (locked on power loss)?
- A) Normally open (NO) configuration
- B) Normally closed (NC) configuration
- C) Strike receives power to remain locked
- D) Strike receives power to unlock

**Answer:** D) Strike receives power to unlock
> *Reference: Fail-secure strikes are de-energized locked; power applied = unlocked (reverse of fail-safe)*

---

**Q6.** When installing a request-to-exit (REX) motion sensor, what is the optimal mounting height and position?
- A) 6 feet AFF, centered above door
- B) 48 inches AFF, on the secure side of the door
- C) 84 inches AFF, on the egress side looking down
- D) 36 inches AFF, adjacent to the pushbar

**Answer:** C) 84 inches AFF, on the egress side looking down
> *Reference: REX PIR mounts high on egress side to detect approaching movement*

---

### Advanced Level

**Q7.** When installing an interlock (mantrap) system, what wiring configuration ensures Door B cannot unlock while Door A is open?
- A) Series wiring of lock power
- B) Parallel wiring of door contacts
- C) Door A contact in series with Door B lock circuit
- D) Both contacts connected to same input

**Answer:** C) Door A contact in series with Door B lock circuit
> *Reference: Interlock requires Door A closed (contact made) before Door B lock receives power*

---

**Q8.** A client requires an access-controlled fire exit with panic hardware. What specific hardware combination meets both life safety and security requirements?
- A) Maglock with delayed egress (15-30 sec delay)
- B) Standard electric strike with REX
- C) Electrified panic hardware with latch retraction
- D) Maglock with REX pushbutton only

**Answer:** A) Maglock with delayed egress (15-30 sec delay)
> *Reference: UL-listed delayed egress devices (per NFPA 101 7.2.1.6.1) allow controlled egress*

---

**Q9.** When installing access control on a fire-rated door with an electric mortise lock, what additional component is typically required to maintain fire rating?
- A) Surface-mounted conduit
- B) Fire-rated wire/cable and proper door reinforcement
- C) Auxiliary REX button
- D) Backup battery system

**Answer:** B) Fire-rated wire/cable and proper door reinforcement
> *Reference: Fire-rated door modifications require listed components and manufacturer approval*

---

**Q10.** During installation, you discover the door gap between maglock and armature plate is 3/8" due to weatherstripping. What is the impact and solution?
- A) No impact; install as-is
- B) Significant holding force reduction; use extended armature plate or spacer
- C) Lock will not engage; remove weatherstripping
- D) Increase lock power supply voltage

**Answer:** B) Significant holding force reduction; use extended armature plate or spacer
> *Reference: Maglock holding force drops dramatically beyond 1/8" gap; spacers maintain contact*

---

## SECTION 3: COMPONENTS & FUNCTIONS (10 Questions)

### Entry Level

**Q1.** What is the primary function of an access control "controller" or "panel"?
- A) Display access events on screen
- B) Make access decisions and control door hardware
- C) Store employee photographs
- D) Connect to the internet

**Answer:** B) Make access decisions and control door hardware
> *Reference: Controllers process credential data, make grant/deny decisions, and control locks*

---

**Q2.** What does a "Request to Exit" (REX) device do in an access control system?
- A) Requests permission from security to exit
- B) Signals the controller that someone is exiting to prevent false alarms
- C) Unlocks the door remotely
- D) Logs exit events for payroll

**Answer:** B) Signals the controller that someone is exiting to prevent false alarms
> *Reference: REX shunts the door contact to prevent "door forced open" alarms during legitimate exit*

---

**Q3.** What is the fundamental difference between a "fail-safe" and "fail-secure" electric lock?
- A) Fail-safe is more secure
- B) Fail-safe unlocks on power loss; fail-secure locks on power loss
- C) Fail-secure requires battery backup
- D) No difference; terms are interchangeable

**Answer:** B) Fail-safe unlocks on power loss; fail-secure locks on power loss
> *Reference: Fail-safe (fire exits) = safety on failure; Fail-secure (server rooms) = security on failure*

---

### Intermediate Level

**Q4.** In Wiegand protocol, what do the "D0" and "D1" wires represent?
- A) Power and ground
- B) Data 0 (zero bit) and Data 1 (one bit) signal lines
- C) Door contact and REX input
- D) Reader tamper and LED control

**Answer:** B) Data 0 (zero bit) and Data 1 (one bit) signal lines
> *Reference: Wiegand uses separate wires for 0s and 1s; pulse on D0 = 0, pulse on D1 = 1*

---

**Q5.** What is the function of an "End of Line" (EOL) resistor in a door contact circuit?
- A) Limit current to the contact
- B) Provide supervision to detect cut or shorted wires
- C) Filter electrical noise
- D) Enable wireless communication

**Answer:** B) Provide supervision to detect cut or shorted wires
> *Reference: EOL creates specific resistance value; deviation indicates tamper, cut, or short*

---

**Q6.** What is the purpose of a "shunt timer" function in an access controller?
- A) Delay lock activation
- B) Allow door to remain open without alarm for a set period
- C) Schedule automatic unlocking
- D) Control reader LED patterns

**Answer:** B) Allow door to remain open without alarm for a set period
> *Reference: Shunt timer masks door contact for held-open period after valid access*

---

### Advanced Level

**Q7.** What is "anti-passback" in access control, and what are the two main types?
- A) Preventing tailgating; physical and virtual types
- B) Preventing credential sharing; hard and soft passback
- C) Preventing card cloning; hardware and software encryption
- D) Preventing unauthorized exit; local and global passback

**Answer:** B) Preventing credential sharing; hard and soft passback
> *Reference: Hard passback denies access; soft passback logs violation but grants access*

---

**Q8.** In a modern OSDP reader, what is the function of the "secure channel" handshake, and what encryption standard does it use?
- A) Encrypts card data; uses DES
- B) Establishes encrypted communication between reader and controller; uses AES-128
- C) Verifies card authenticity; uses RSA
- D) Protects stored credentials; uses SHA-256

**Answer:** B) Establishes encrypted communication between reader and controller; uses AES-128
> *Reference: OSDP Secure Channel Protocol (SCP) uses AES-128 to encrypt reader-to-controller comms*

---

**Q9.** What is the function of a "dual-technology" credential reader, and why is it used in migration scenarios?
- A) Reads cards and biometrics simultaneously
- B) Supports multiple card technologies (e.g., proximity and smart card) during system upgrades
- C) Connects via Wiegand and OSDP simultaneously
- D) Provides primary and backup reading capability

**Answer:** B) Supports multiple card technologies during system upgrades
> *Reference: Multi-tech readers allow gradual migration from legacy (125kHz) to modern (13.56MHz) cards*

---

**Q10.** In high-security access control, what does "two-person rule" or "dual custody" enforcement require, and how is it implemented?
- A) Two credentials required; sequential card reads within time window
- B) Guard and badge required; integrated video verification
- C) Two-factor authentication; card plus PIN
- D) Manager override; remote unlock capability

**Answer:** A) Two credentials required; sequential card reads within time window
> *Reference: Dual custody requires two different authorized credentials presented within programmed window*

---

## SECTION 4: PROGRAMMING & CONFIGURATION (10 Questions)

### Entry Level

**Q1.** What are "access levels" in access control programming?
- A) Physical floors in a building
- B) Groups of doors and time schedules assigned to cardholders
- C) Security clearance classifications
- D) Reader mounting heights

**Answer:** B) Groups of doors and time schedules assigned to cardholders
> *Reference: Access levels define which doors a cardholder can access and during what time periods*

---

**Q2.** What is a "time schedule" or "timezone" in access control programming?
- A) The system's clock setting
- B) Defined time periods during which access rules apply
- C) Automatic daylight saving adjustment
- D) Event log timestamps

**Answer:** B) Defined time periods during which access rules apply
> *Reference: Time schedules define when access levels are valid (e.g., M-F 8AM-6PM)*

---

**Q3.** When programming a new cardholder, what minimum information is typically required?
- A) Just the card number
- B) Name, card number, and at least one access level
- C) Photo, fingerprint, and badge design
- D) Department, salary, and emergency contact

**Answer:** B) Name, card number, and at least one access level
> *Reference: Basic cardholder requires identification, credential, and permissions to access doors*

---

### Intermediate Level

**Q4.** What is "global anti-passback" and how does it differ from "local anti-passback"?
- A) Global works across all doors in system; local works per door or area
- B) Global uses GPS; local uses card reader
- C) Global requires internet; local works offline
- D) Global is optional; local is mandatory

**Answer:** A) Global works across all doors in system; local works per door or area
> *Reference: Global anti-passback tracks user location across multiple doors; local requires IN before OUT*

---

**Q5.** When programming door timing parameters, what is the difference between "unlock time" and "held open time"?
- A) No difference; same parameter
- B) Unlock time = lock releases; held open time = maximum allowed before alarm
- C) Unlock time = schedule; held open time = manual override
- D) Unlock time = entry; held open time = exit

**Answer:** B) Unlock time = lock releases; held open time = maximum allowed before alarm
> *Reference: Unlock (strike/shunt) time is brief; held open threshold triggers "door held open" alarm*

---

**Q6.** How do you program an elevator floor access control system to restrict certain floors to specific cardholders?
- A) Assign elevator cab reader to floor-specific access levels
- B) Program floor buttons as individual "doors" with appropriate access levels
- C) Use time schedules only
- D) Install separate readers on each floor

**Answer:** B) Program floor buttons as individual "doors" with appropriate access levels
> *Reference: Each floor output is treated as a "door" with reader input controlling which floors relay*

---

### Advanced Level

**Q7.** When integrating access control with video surveillance, what programming creates a "video pop-up" when an access event occurs?
- A) Motion detection zone at door
- B) Event-triggered action linking door access to camera preset/recording
- C) Continuous recording on door camera
- D) Manual operator override

**Answer:** B) Event-triggered action linking door access to camera preset/recording
> *Reference: Integration requires event mapping: access event triggers VMS action (pop-up, bookmark, PTZ)*

---

**Q8.** What is "first person in" or "first card unlock" programming, and when is it used?
- A) The first cardholder of the day gets special access
- B) Door requires valid card read before schedule-based auto-unlock activates
- C) Priority access for executives
- D) Visitor management feature

**Answer:** B) Door requires valid card read before schedule-based auto-unlock activates
> *Reference: Security feature ensures at least one authorized person is present before auto-unlock*

---

**Q9.** When programming threat level lockdown procedures, how should access controllers be configured for immediate lockdown on command?
- A) Disable all schedules permanently
- B) Use pre-programmed "threat level" that overrides normal access rights
- C) Individually lock each door manually
- D) Power off all controllers

**Answer:** B) Use pre-programmed "threat level" that overrides normal access rights
> *Reference: Threat levels are pre-configured access policy overrides activated by command or input*

---

**Q10.** A system requires that a specific door only unlock when BOTH a card credential AND a PIN are entered within 10 seconds. What programming configuration achieves this?
- A) Standard card reader with keypad
- B) "Card + PIN" authentication mode with defined timeout
- C) Two-person rule with same card
- D) Biometric with card backup

**Answer:** B) "Card + PIN" authentication mode with defined timeout
> *Reference: Card+PIN mode requires both factors; timeout defines maximum interval between entries*

---

## SCORING GUIDE

| Score Range | Proficiency Level |
|-------------|-------------------|
| 36-40 | Advanced Journeyman |
| 28-35 | Journeyman |
| 20-27 | Intermediate |
| 12-19 | Entry Level |
| 0-11 | Requires Additional Training |

---

*TotalMaster ELV Academy © 2026 - Field-Ready Technician Certification*
