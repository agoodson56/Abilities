# Distributed Antenna Systems (DAS) Assessment Questions
## TotalMaster ELV Academy - Entry Level to Advanced Journeyman

---

## SECTION 1: CODES & STANDARDS (10 Questions)

### Entry Level

**Q1.** What does the acronym "DAS" stand for in the telecommunications industry?
- A) Digital Audio System
- B) Distributed Antenna System
- C) Direct Access Signal
- D) Data Amplification Service

**Answer:** B) Distributed Antenna System
> *Reference: A DAS distributes RF signals from a central source to multiple antennas throughout a building or area*

---

**Q2.** Which FCC Part governs public safety radio frequencies (700/800 MHz) used in in-building DAS deployments?
- A) FCC Part 15
- B) FCC Part 25
- C) FCC Part 90
- D) FCC Part 97

**Answer:** C) FCC Part 90
> *Reference: FCC Part 90 regulates Private Land Mobile Radio Services including public safety frequencies*

---

**Q3.** What does the International Building Code (IBC) Section 510/911 require for high-rise and large buildings regarding in-building radio coverage?
- A) Wi-Fi access for all tenants
- B) Emergency responder radio coverage (ERRC) throughout the building
- C) Cellular signal for commercial carriers only
- D) Cable TV distribution

**Answer:** B) Emergency responder radio coverage (ERRC) throughout the building
> *Reference: IBC 510/911 mandates minimum signal strength for emergency responder communications in buildings*

---

### Intermediate Level

**Q4.** According to NFPA 72, what is the minimum required signal strength for in-building emergency communication systems in general building areas?
- A) -85 dBm
- B) -95 dBm
- C) -100 dBm
- D) -75 dBm

**Answer:** B) -95 dBm
> *Reference: NFPA 72 and IFC 510 require -95 dBm (DAQ 3.0) for general building areas and -100 dBm for critical areas per local AHJ*

---

**Q5.** What OSHA standard applies to technicians working on elevated DAS antenna installations, including rooftop and tower work?
- A) OSHA 1910.147
- B) OSHA 1926.501
- C) OSHA 1910.269
- D) OSHA 1926.1153

**Answer:** B) OSHA 1926.501
> *Reference: OSHA 1926.501 covers fall protection requirements for construction, including work at heights above 6 feet*

---

**Q6.** When installing a Bi-Directional Amplifier (BDA) for public safety, which local authority must approve the system before final acceptance?
- A) Building Owner
- B) Telecommunications Carrier
- C) Authority Having Jurisdiction (AHJ) / Fire Marshal
- D) General Contractor

**Answer:** C) Authority Having Jurisdiction (AHJ) / Fire Marshal
> *Reference: AHJ (typically the Fire Marshal) must approve ERRC/BDA systems per IFC 510 and local codes*

---

### Advanced Level

**Q7.** According to IFC 510.1, what is the minimum percentage of floor area that must meet the required signal strength for emergency responder radio coverage?
- A) 80%
- B) 85%
- C) 90%
- D) 95%

**Answer:** C) 90%
> *Reference: IFC 510.1 requires 90% coverage on each floor with -95 dBm minimum for DAQ 3.0*

---

**Q8.** What FCC rule limits the maximum EIRP (Effective Isotropic Radiated Power) output from a BDA system to prevent interference with public safety networks?
- A) FCC Part 90.219
- B) FCC Part 15.247
- C) FCC Part 22.913
- D) FCC Part 97.313

**Answer:** A) FCC Part 90.219
> *Reference: FCC Part 90.219 regulates signal boosters for public safety, including registration and power limits*

---

**Q9.** Under NFPA 1221, what is the maximum allowable downtime for a public safety DAS/BDA system before battery backup must sustain operations?
- A) 4 hours
- B) 8 hours
- C) 12 hours
- D) 24 hours

**Answer:** C) 12 hours
> *Reference: NFPA 1221 requires 12 hours of standby battery backup for public safety communication enhancement systems*

---

**Q10.** What standard defines the testing methodology for Passive Intermodulation (PIM) in DAS components, and what is the typical acceptable PIM level?
- A) IEC 62037; -120 dBc
- B) IEC 62037; -153 dBc
- C) IEEE 802.11; -80 dBm
- D) TIA-568; -100 dB

**Answer:** B) IEC 62037; -153 dBc
> *Reference: IEC 62037 defines PIM testing; -153 dBc (3rd order) is the industry standard threshold for quality components*

---

## SECTION 2: INSTALLATION (10 Questions)

### Entry Level

**Q1.** When installing radiating (leaky) coaxial cable in a building, what is the PRIMARY advantage over discrete antenna placement?
- A) Lower cost per foot
- B) Uniform signal distribution along the entire cable length
- C) Higher maximum output power
- D) Easier to troubleshoot

**Answer:** B) Uniform signal distribution along the entire cable length
> *Reference: Radiating coax provides continuous, linear coverage ideal for tunnels, corridors, and parking garages*

---

**Q2.** What is the correct tool used to properly torque an N-type or 7-16 DIN connector on a DAS coaxial cable?
- A) Adjustable wrench
- B) Calibrated torque wrench specific to connector type
- C) Channel-lock pliers
- D) Standard socket wrench

**Answer:** B) Calibrated torque wrench specific to connector type
> *Reference: Proper torque prevents PIM; 7-16 DIN requires 25 Nm, N-type requires 1.5 Nm using calibrated tools*

---

**Q3.** Before pulling coaxial cable for a DAS installation, what is the FIRST step a technician must verify?
- A) Confirm the cable has been tested at the factory
- B) Verify maximum pull tension rating and minimum bend radius for the specific cable type
- C) Check that the cable is the correct color
- D) Ensure all antennas are already mounted

**Answer:** B) Verify maximum pull tension rating and minimum bend radius for the specific cable type
> *Reference: Exceeding pull tension or violating bend radius damages cable and creates PIM sources*

---

### Intermediate Level

**Q4.** When mounting a DAS ceiling-mount omnidirectional antenna, what is the recommended minimum clearance from the ceiling grid to ensure proper radiation pattern?
- A) Flush mount only
- B) 1 inch below ceiling tile
- C) 6-12 inches below ceiling tile for optimal coverage
- D) 24 inches below ceiling tile

**Answer:** C) 6-12 inches below ceiling tile for optimal coverage
> *Reference: Mounting too close to reflective surfaces distorts the antenna pattern; 6-12" provides clean radiation*

---

**Q5.** What type of grounding is REQUIRED at the base of a DAS riser cable per NEC Article 820?
- A) No grounding required for coaxial systems
- B) Single ground rod only
- C) Bonding to building telecommunications grounding busbar (TGB)
- D) Grounding to nearest water pipe

**Answer:** C) Bonding to building telecommunications grounding busbar (TGB)
> *Reference: NEC 820.100 requires coaxial cable shield to be bonded to the building grounding electrode system*

---

**Q6.** When installing fiber optic cable between the DAS headend and remote units, what is the maximum allowable attenuation budget for a typical single-mode link at 1310nm over 500 meters?
- A) 0.5 dB
- B) 1.0 dB
- C) 2.0 dB
- D) 5.0 dB

**Answer:** C) 2.0 dB
> *Reference: SM fiber at 1310nm = 0.35 dB/km × 0.5 km = 0.175 dB + connector losses (~0.5 dB each) ≈ 1.2-2.0 dB total*

---

### Advanced Level

**Q7.** A DAS installation requires 1-5/8" coaxial cable to be routed through a 90-degree turn in a mechanical chase. What is the minimum bend radius for this cable?
- A) 5 inches
- B) 10 inches
- C) 15 inches
- D) 20 inches

**Answer:** C) 15 inches
> *Reference: 1-5/8" coax minimum bend radius is typically 10× outer diameter; ~1.63" OD × 10 = ~16.3", 15" is common spec*

---

**Q8.** When performing a fiber splice for a DAS backbone, what is the maximum acceptable insertion loss for a fusion splice in a public safety system?
- A) 0.5 dB
- B) 0.3 dB
- C) 0.1 dB
- D) 0.05 dB

**Answer:** C) 0.1 dB
> *Reference: Public safety systems require high reliability; 0.1 dB maximum per fusion splice is standard*

---

**Q9.** During DAS antenna installation in a hospital, what specific concern requires RF coordination with biomedical engineering BEFORE activation?
- A) Aesthetic appearance of antennas
- B) Potential EMI interference with sensitive medical equipment
- C) Antenna color matching
- D) Cable pathway routing only

**Answer:** B) Potential EMI interference with sensitive medical equipment
> *Reference: RF emissions near MRI, infusion pumps, and telemetry require EMI compatibility assessment per IEC 60601*

---

**Q10.** When installing a DAS in a high-rise building, at what floor interval should signal measurements be taken during the walk test to ensure comprehensive coverage verification?
- A) Only the top and bottom floors
- B) Every floor
- C) Every 5th floor
- D) Only floors with antennas

**Answer:** B) Every floor
> *Reference: IFC 510 requires coverage verification on EVERY floor; each floor must independently meet 90% at -95 dBm*

---

## SECTION 3: COMPONENTS & FUNCTIONS (10 Questions)

### Entry Level

**Q1.** What is the function of the DAS "headend" equipment in a distributed antenna system?
- A) It connects directly to individual mobile phones
- B) It receives, conditions, and distributes RF signals to remote antennas
- C) It stores recorded radio transmissions
- D) It provides internet access to the building

**Answer:** B) It receives, conditions, and distributes RF signals to remote antennas
> *Reference: The headend is the central hub containing signal sources, combiners, and distribution electronics*

---

**Q2.** What is a Bi-Directional Amplifier (BDA) and what role does it play in a public safety DAS?
- A) A device that only amplifies outgoing signals
- B) A device that amplifies both uplink (portable radio to tower) and downlink (tower to portable) signals
- C) A device that converts analog signals to digital
- D) A battery backup system

**Answer:** B) A device that amplifies both uplink (portable radio to tower) and downlink (tower to portable) signals
> *Reference: BDAs amplify in both directions to ensure two-way communication for first responders inside buildings*

---

**Q3.** In a DAS system, what is the function of a "splitter" or "power divider"?
- A) Increases signal power
- B) Divides RF signal into multiple paths with calibrated loss
- C) Converts frequencies
- D) Filters out unwanted noise

**Answer:** B) Divides RF signal into multiple paths with calibrated loss
> *Reference: Splitters divide signal power equally (e.g., 2-way = -3.5 dB per port, 3-way = -6 dB) for distribution*

---

### Intermediate Level

**Q4.** What is the difference between a "passive DAS" and an "active DAS" architecture?
- A) Passive uses batteries; active uses AC power
- B) Passive distributes via coax/splitters (no active electronics); active uses fiber-fed remote units with amplification
- C) Passive is for outdoors; active is for indoors
- D) Passive supports one carrier; active supports multiple

**Answer:** B) Passive distributes via coax/splitters (no active electronics); active uses fiber-fed remote units with amplification
> *Reference: Passive DAS uses coax + splitters for small venues; active DAS uses fiber + remote radio units for large/multi-floor*

---

**Q5.** In a CommScope ION-E system, what is the role of the "Optical Point of Interface" (OPI)?
- A) Provides power to remote units
- B) Converts optical signals to RF and distributes to remote antenna units
- C) Connects to the building fire alarm panel
- D) Stores system configuration files

**Answer:** B) Converts optical signals to RF and distributes to remote antenna units
> *Reference: The OPI is the floor-level distribution point that converts fiber signals to Cat6A for ION-E remote units*

---

**Q6.** What is the function of a "directional coupler" in a DAS coaxial distribution system, and how does it differ from a splitter?
- A) It amplifies signals; a splitter reduces them
- B) It taps a small portion of signal (e.g., -10 dB) while passing the majority through; a splitter divides equally
- C) It filters frequencies; a splitter combines them
- D) It converts impedance; a splitter maintains impedance

**Answer:** B) It taps a small portion of signal (e.g., -10 dB) while passing the majority through; a splitter divides equally
> *Reference: Directional couplers allow asymmetric signal distribution for balanced coverage in unequal path lengths*

---

### Advanced Level

**Q7.** In a JMA Teko active DAS system, what is the function of the "MIMO Remote Unit" and how does it improve coverage compared to a SISO unit?
- A) It provides backup power; SISO does not
- B) It transmits/receives on multiple spatial streams simultaneously, increasing throughput and reliability in multipath environments
- C) It supports more frequency bands; SISO supports one band
- D) It reduces installation cost; SISO is more expensive

**Answer:** B) It transmits/receives on multiple spatial streams simultaneously, increasing throughput and reliability in multipath environments
> *Reference: MIMO (Multiple-In, Multiple-Out) uses multiple antenna elements for spatial multiplexing, critical for LTE/5G capacity*

---

**Q8.** What is the purpose of the "noise figure" specification on a DAS remote unit, and what value indicates professional-grade performance?
- A) Audio quality rating; lower than 20 dB is good
- B) Added noise by the amplifier; ≤5 dB is professional grade
- C) Output power rating; higher is better
- D) Frequency range; wider is better

**Answer:** B) Added noise by the amplifier; ≤5 dB is professional grade
> *Reference: Noise figure measures signal degradation through amplification; ≤5 dB maintains acceptable uplink sensitivity*

---

**Q9.** In a Corning ONE (Optical Network Evolution) platform, what unique advantage does the "SpiderCloud" small cell integration provide over traditional macro-signal BDA-fed DAS?
- A) Lower equipment cost only
- B) Dedicated baseband processing providing carrier-grade capacity independent of macro network signal quality
- C) Simpler installation with no fiber required
- D) Supports only public safety frequencies

**Answer:** B) Dedicated baseband processing providing carrier-grade capacity independent of macro network signal quality
> *Reference: Small cells generate their own signal via backhaul, eliminating dependency on donor signal strength from the macro network*

---

**Q10.** In a SOLiD ALLIANCE DAS platform, what is the function of the "band pass filter" in the headend, and why is it critical for multi-carrier deployments?
- A) It increases signal power for all carriers
- B) It isolates specific frequency bands to prevent inter-carrier interference and ensures clean signal injection
- C) It converts analog signals to digital for processing
- D) It provides battery backup for specific frequency bands

**Answer:** B) It isolates specific frequency bands to prevent inter-carrier interference and ensures clean signal injection
> *Reference: Band pass filters prevent carriers from interfering with each other when combined in a shared DAS, critical for PIM avoidance*

---

## SECTION 4: PROGRAMMING & CONFIGURATION (10 Questions)

### Entry Level

**Q1.** When commissioning a public safety BDA system, what is the FIRST network parameter that must be verified before adjusting gain settings?
- A) Internet speed
- B) Donor signal strength from the macro site (downlink reference signal)
- C) Number of connected mobile devices
- D) Building occupancy count

**Answer:** B) Donor signal strength from the macro site (downlink reference signal)
> *Reference: Donor signal quality determines maximum achievable indoor coverage; insufficient donor requires antenna repositioning or signal source change*

---

**Q2.** What measurement unit is used to express RF signal strength when performing DAS coverage walk tests?
- A) Volts (V)
- B) Watts (W)
- C) dBm (decibels relative to one milliwatt)
- D) Hertz (Hz)

**Answer:** C) dBm (decibels relative to one milliwatt)
> *Reference: dBm is the standard unit for measuring received RF power in wireless systems and DAS walk tests*

---

**Q3.** When programming a BDA/signal booster, what does "gain" refer to, and what happens if gain is set too high?
- A) The volume of the signal; too high causes distortion only
- B) The amount of signal amplification in dB; too high causes oscillation (feedback loop) between donor and server antennas
- C) The frequency range; too high shifts the signal
- D) The number of connected devices; too high causes network congestion

**Answer:** B) The amount of signal amplification in dB; too high causes oscillation (feedback loop) between donor and server antennas
> *Reference: Excessive gain without adequate isolation between donor and server antennas creates oscillation, shutting down the BDA*

---

### Intermediate Level

**Q4.** When performing a link budget calculation for a DAS system, which of the following losses must be included?
- A) Cable loss, splitter loss, connector loss, and antenna gain
- B) Only cable loss and antenna gain
- C) Only splitter loss and connector loss
- D) Cable loss only

**Answer:** A) Cable loss, splitter loss, connector loss, and antenna gain
> *Reference: Complete link budget: Source Power - Cable Loss - Splitter/Coupler Loss - Connector Loss + Antenna Gain = Signal at Coverage Point*

---

**Q5.** What is "isolation" in the context of a BDA system, and what is the minimum recommended isolation between donor and server antennas?
- A) Physical distance only; minimum 10 feet
- B) The signal attenuation between donor and server antennas; must exceed system gain by at least 15 dB
- C) Electrical separation; any amount is acceptable
- D) Frequency separation between uplink and downlink; 25 MHz minimum

**Answer:** B) The signal attenuation between donor and server antennas; must exceed system gain by at least 15 dB
> *Reference: Insufficient isolation causes oscillation; the 15 dB margin ensures stable amplifier operation*

---

**Q6.** When configuring a multi-band DAS headend to support both public safety (700/800 MHz) and commercial carrier (AWS/PCS) frequencies, what is the purpose of the "composite signal" approach?
- A) To reduce the number of headend racks
- B) To combine all frequency bands onto a single distribution path for shared infrastructure
- C) To eliminate the need for band-specific antennas
- D) To increase the output power of each band

**Answer:** B) To combine all frequency bands onto a single distribution path for shared infrastructure
> *Reference: Composite distribution reduces cabling by combining bands, but requires careful PIM management and filter design*

---

### Advanced Level

**Q7.** A public safety DAS walk test reveals that three areas in the parking garage fail the -95 dBm threshold. The system uses radiating coax with -4.5 dB/100ft coupling loss and 2.5 dB/100ft transmission loss. What is the MOST LIKELY corrective action?
- A) Replace all radiating coax with standard coax
- B) Reduce the spacing between radiating coax runs or add supplemental discrete antennas in dead spots
- C) Increase headend output power beyond FCC limits
- D) Remove splitters from the distribution path

**Answer:** B) Reduce the spacing between radiating coax runs or add supplemental discrete antennas in dead spots
> *Reference: Coverage gaps in garages often result from excessive spacing; supplemental antennas or tighter radiax runs fill dead spots*

---

**Q8.** When performing PIM testing on a completed DAS installation, the sweep reveals a -110 dBc 3rd-order PIM product at 851 MHz. The specification requires -153 dBc. What is the MOST LIKELY source and corrective action?
- A) The headend amplifier is faulty; replace the amplifier
- B) A loose or improperly torqued connector; re-torque all connectors and retest systematically
- C) The antenna model is incorrect; replace with different antennas
- D) The cable type is wrong; replace all cable

**Answer:** B) A loose or improperly torqued connector; re-torque all connectors and retest systematically
> *Reference: PIM is most commonly caused by loose/dirty connections, dissimilar metals, or crushed cables at connectors*

---

**Q9.** A 30-story building requires a commercial + public safety DAS. The RF design calls for -75 dBm RSRP at the cell edge for LTE. The headend composite output is +27 dBm. Total path loss to the furthest antenna is 82 dB (including cable, splitters, and connectors). What is the antenna gain required to meet the design target?
- A) 0 dBi (omnidirectional)
- B) 3 dBi
- C) 6 dBi
- D) No antenna gain can solve this; more headend power is needed

**Answer:** A) 0 dBi (omnidirectional)
> *Calculation: +27 dBm - 82 dB path loss + 0 dBi = -55 dBm at antenna. With 20 dB propagation loss to cell edge = -75 dBm. 0 dBi omni is sufficient.*

---

**Q10.** After commissioning a multi-carrier active DAS, Carrier A reports that their uplink noise floor has risen by 6 dB since the DAS was activated. What is the MOST LIKELY cause and how should it be investigated?
- A) Carrier A's macro site is malfunctioning; contact the carrier
- B) The DAS uplink gain is too high, amplifying noise from all remote units; reduce UL gain and optimize noise figure
- C) The DAS antennas are pointed in the wrong direction
- D) The fiber between headend and remotes is damaged

**Answer:** B) The DAS uplink gain is too high, amplifying noise from all remote units; reduce UL gain and optimize noise figure
> *Reference: Each remote unit contributes thermal noise; excessive UL gain aggregates noise floor rise (noise rise = 10log(N) where N = remote units)*

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
