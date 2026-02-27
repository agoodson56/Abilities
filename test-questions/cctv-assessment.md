# CCTV (Video Surveillance) Assessment Questions
## TotalMaster ELV Academy - Entry Level to Advanced Journeyman

---

## SECTION 1: CODES & STANDARDS (10 Questions)

### Entry Level

**Q1.** What does the acronym "DORI" stand for in video surveillance standards?
- A) Digital Optical Resolution Index
- B) Detection, Observation, Recognition, Identification
- C) Device Output Rating Indicator
- D) Data Optimized Recording Interface

**Answer:** B) Detection, Observation, Recognition, Identification
> *Reference: IEC 62676-4 - Video Surveillance Systems*

---

**Q2.** Which international standard specifically defines DORI performance criteria for video surveillance systems?
- A) NFPA 72
- B) TIA-568
- C) IEC 62676-4
- D) UL 294

**Answer:** C) IEC 62676-4
> *Reference: IEC 62676-4 establishes minimum PPM requirements for each DORI level*

---

**Q3.** According to DORI standards, what is the minimum Pixels Per Meter (PPM) required for IDENTIFICATION of a human subject?
- A) 25 PPM
- B) 62 PPM
- C) 125 PPM
- D) 250 PPM

**Answer:** D) 250 PPM
> *Reference: IEC 62676-4 - Identification requires 250 PPM to positively identify an individual beyond reasonable doubt*

---

### Intermediate Level

**Q4.** Under NDAA (National Defense Authorization Act) Section 889, which of the following camera manufacturers is PROHIBITED from federal installations?
- A) Axis Communications
- B) Hikvision
- C) Hanwha Techwin
- D) Bosch Security

**Answer:** B) Hikvision
> *Reference: NDAA Section 889 prohibits federal use of equipment from Huawei, ZTE, Hytera, Hikvision, and Dahua*

---

**Q5.** What NEC article governs the installation of low-voltage camera cabling, including pathway requirements and fire-stopping?
- A) NEC Article 725
- B) NEC Article 800
- C) NEC Article 770
- D) NEC Article 820

**Answer:** A) NEC Article 725
> *Reference: NEC Article 725 covers Class 2 and Class 3 remote-control, signaling, and power-limited circuits*

---

**Q6.** According to TIA-568 standards, what is the maximum horizontal cable run length for a camera installation using Cat6A?
- A) 100 meters
- B) 90 meters
- C) 328 feet
- D) Both B and C

**Answer:** D) Both B and C
> *Reference: TIA-568 specifies 90m (295ft) permanent link + 10m for patch cords = 100m channel*

---

### Advanced Level

**Q7.** ONVIF Profile S is specifically designed for which video surveillance function?
- A) Access control integration
- B) IP-based video streaming
- C) Analytics and metadata
- D) Edge storage management

**Answer:** B) IP-based video streaming
> *Reference: ONVIF Profile S standardizes IP video streaming, PTZ control, and audio streaming*

---

**Q8.** According to IEC 62676-4, what is the minimum PPM requirement for DETECTION of a human subject, and at what horizontal field of view is this typically calculated?
- A) 12.5 PPM at 60° FOV
- B) 25 PPM at any FOV
- C) 25 PPM calculated at sensor's horizontal resolution
- D) 12.5 PPM calculated across total horizontal coverage

**Answer:** B) 25 PPM at any FOV
> *Reference: Detection (25 PPM) is scene-dependent and calculated based on target distance and lens selection*

---

**Q9.** What UL standard applies to the listing of network video recorders (NVRs) and digital video recorders (DVRs) for commercial security applications?
- A) UL 294
- B) UL 2900-1
- C) UL 60950-1 / UL 62368-1
- D) UL 681

**Answer:** C) UL 60950-1 / UL 62368-1
> *Reference: UL 62368-1 (replacing 60950-1) covers audio/video and IT equipment safety*

---

**Q10.** Under GDPR and privacy regulations, what technical specification helps ensure surveillance compliance in public spaces where facial recognition may inadvertently occur?
- A) Maximum 150 PPM in public areas
- B) Privacy masking/redaction zones
- C) 30-day maximum retention
- D) Encrypted storage only

**Answer:** B) Privacy masking/redaction zones
> *Reference: GDPR Article 5 requires purpose limitation; masking prevents incidental biometric capture*

---

## SECTION 2: INSTALLATION (10 Questions)

### Entry Level

**Q1.** When mounting an outdoor dome camera, what is the PRIMARY purpose of applying silicone sealant around the junction box entry points?
- A) Improve aesthetics
- B) Prevent moisture ingress
- C) Increase cable tension
- D) Reduce EMI interference

**Answer:** B) Prevent moisture ingress
> *Reference: IP66/IP67 weatherproofing requires sealing all cable entry points*

---

**Q2.** What is the correct order for preparing a Cat6 cable for RJ45 termination to connect an IP camera?
- A) Strip, untwist, arrange, crimp, test
- B) Strip, arrange, untwist, insert, crimp
- C) Untwist, strip, arrange, insert, test
- D) Strip, untwist, arrange, insert, crimp

**Answer:** D) Strip, untwist, arrange, insert, crimp
> *Reference: Standard RJ45 termination procedure per TIA-568*

---

**Q3.** According to TIA-568 standards, what is the minimum bend radius for Cat6 cable during installation?
- A) 2× cable diameter
- B) 4× cable diameter
- C) 6× cable diameter
- D) 8× cable diameter

**Answer:** B) 4× cable diameter
> *Reference: TIA-568 specifies minimum 4× OD for unshielded cables under no-load conditions*

---

### Intermediate Level

**Q4.** When installing a PTZ camera on a pole mount at 25 feet, what critical structural consideration must be verified BEFORE installation?
- A) Camera resolution capability
- B) Wind load rating and pole structural capacity
- C) Network switch port availability
- D) Recording schedule requirements

**Answer:** B) Wind load rating and pole structural capacity
> *Reference: PTZ cameras have higher wind load; pole must be rated for camera weight + wind exposure*

---

**Q5.** What is the maximum recommended cable pull tension for Cat6 cable during horizontal installation?
- A) 10 lbs
- B) 25 lbs
- C) 50 lbs
- D) 100 lbs

**Answer:** B) 25 lbs
> *Reference: TIA-568 specifies maximum 25 lbf (110N) pulling tension for 4-pair UTP cables*

---

**Q6.** When installing cameras in a plenum-rated ceiling space, which cable jacket type is REQUIRED by NEC?
- A) CM (Communications Multipurpose)
- B) CMR (Communications Riser)
- C) CMP (Communications Plenum)
- D) CMX (Communications Limited Use)

**Answer:** C) CMP (Communications Plenum)
> *Reference: NEC Article 800 requires plenum-rated cables in air-handling spaces*

---

### Advanced Level

**Q7.** A bullet camera with integral heater draws 18W at startup in cold conditions. The cable run is 85 meters using Cat6. Using IEEE 802.3at (PoE+), what is the approximate voltage available at the camera, assuming 12.5Ω/100m loop resistance?
- A) 44V
- B) 48V
- C) 50V
- D) 37V

**Answer:** A) 44V (approximately)
> *Calculation: At 18W/48V = 375mA. Resistance = 12.5Ω × 0.85 = 10.6Ω. Drop = 0.375A × 10.6Ω × 2 = ~8V. Result ≈ 40-44V*

---

**Q8.** When installing a camera system requiring fiber backhaul, what is the MINIMUM splice loss budget typically allocated per fusion splice in a single-mode fiber path?
- A) 0.3 dB
- B) 0.1 dB
- C) 0.5 dB
- D) 0.05 dB

**Answer:** B) 0.1 dB
> *Reference: Quality fusion splices average 0.02-0.05 dB; 0.1 dB is conservative budget*

---

**Q9.** During camera installation, you discover the building uses an unshielded aluminum conduit system with shared pathways for power conductors. What separation distance from power cables is required per NEC for Class 2 camera cabling?
- A) No separation required
- B) 2 inches minimum
- C) 6 inches minimum or barrier
- D) 12 inches minimum

**Answer:** C) 6 inches minimum or barrier
> *Reference: NEC 725.136(I) requires separation from power conductors; 2" for <2kVA, 6" otherwise*

---

**Q10.** When installing an outdoor camera system in a coastal environment, what NEMA rating should the junction boxes have to resist salt fog corrosion?
- A) NEMA 1
- B) NEMA 3R
- C) NEMA 4X
- D) NEMA 12

**Answer:** C) NEMA 4X
> *Reference: NEMA 4X provides corrosion resistance for salt fog and chemical environments*

---

## SECTION 3: COMPONENTS & FUNCTIONS (10 Questions)

### Entry Level

**Q1.** What is the primary function of a video balun in a CCTV system?
- A) Amplify video signals
- B) Convert impedance between coaxial and twisted pair
- C) Encode video for IP transmission
- D) Store recorded footage

**Answer:** B) Convert impedance between coaxial and twisted pair
> *Reference: Baluns match 75Ω coax impedance to 100Ω UTP for analog HD transmission*

---

**Q2.** In an IP camera system, what does "PoE" provide to the camera?
- A) Video compression
- B) Power and data over a single Ethernet cable
- C) Pan-Tilt-Zoom control
- D) Cloud storage access

**Answer:** B) Power and data over a single Ethernet cable
> *Reference: IEEE 802.3af/at/bt defines Power over Ethernet standards*

---

**Q3.** What is the purpose of an IR cut filter in a day/night camera?
- A) Increase image sharpness
- B) Block infrared light during daytime for accurate color
- C) Provide night vision illumination
- D) Reduce glare from sunlight

**Answer:** B) Block infrared light during daytime for accurate color
> *Reference: Mechanical IR cut filter prevents IR wavelengths from distorting visible spectrum colors*

---

### Intermediate Level

**Q4.** What is the function of the "Back Focus" adjustment on a box camera with a CS-mount lens?
- A) Controls zoom level
- B) Adjusts the distance between sensor and lens flange for sharp focus
- C) Sets the aperture opening
- D) Calibrates the auto-iris function

**Answer:** B) Adjusts the distance between sensor and lens flange for sharp focus
> *Reference: Back focus compensates for manufacturing tolerances between sensor and lens mount*

---

**Q5.** In a multi-sensor panoramic camera, what is the purpose of "dewarping" technology?
- A) Reduce camera cost
- B) Correct fisheye distortion for usable rectangular views
- C) Increase storage capacity
- D) Enable remote access

**Answer:** B) Correct fisheye distortion for usable rectangular views
> *Reference: Dewarping mathematically corrects hemispherical distortion into PTZ-style views*

---

**Q6.** What differentiates a PTZ camera's continuous rotation capability from standard PTZ?
- A) Higher resolution sensors
- B) Slip-ring technology enabling 360° endless rotation
- C) Faster zoom speeds
- D) Built-in analytics

**Answer:** B) Slip-ring technology enabling 360° endless rotation
> *Reference: Slip rings transfer power/data through rotating mechanism for unlimited pan*

---

### Advanced Level

**Q7.** In a thermal imaging camera, what does "NETD" (Noise Equivalent Temperature Difference) measure, and what value indicates superior performance?
- A) Maximum detection range; higher is better
- B) Thermal sensitivity; lower is better (typically <50mK)
- C) Frame rate capability; higher is better
- D) Lens focal length; depends on application

**Answer:** B) Thermal sensitivity; lower is better (typically <50mK)
> *Reference: NETD measures minimum temperature difference detectable; <50mK is high-performance*

---

**Q8.** What is the function of a camera's "WDR" (Wide Dynamic Range) rating, and what dB value indicates excellent performance?
- A) Audio sensitivity; 60dB is standard
- B) Ability to capture detail in high-contrast scenes; 120dB+ is excellent
- C) Network bandwidth requirement; lower is better
- D) Storage compression ratio; higher saves space

**Answer:** B) Ability to capture detail in high-contrast scenes; 120dB+ is excellent
> *Reference: True WDR uses multiple exposures; 120dB+ handles extreme lighting variations*

---

**Q9.** In a enterprise VMS, what is the function of a "failover recording server" and when does it activate?
- A) Provides remote viewing; activates on user request
- B) Assumes recording duties when primary server fails; monitors heartbeat
- C) Compresses archived footage; runs during off-hours
- D) Manages user authentication; always active

**Answer:** B) Assumes recording duties when primary server fails; monitors heartbeat
> *Reference: Failover servers monitor primary via heartbeat and assume camera connections on failure*

---

**Q10.** What is the purpose of an "Edge Storage" SD card slot in an IP camera, and how does typical enterprise configuration utilize this feature?
- A) Primary recording location for all footage
- B) Buffer storage during network outages with automatic VMS sync on reconnection
- C) Local preview display output
- D) Firmware storage only

**Answer:** B) Buffer storage during network outages with automatic VMS sync on reconnection
> *Reference: Edge storage provides recording redundancy; modern VMS auto-retrieves buffered footage*

---

## SECTION 4: PROGRAMMING & CONFIGURATION (10 Questions)

### Entry Level

**Q1.** When adding an IP camera to an NVR using ONVIF discovery, what network protocol is typically used to automatically detect cameras?
- A) HTTP
- B) RTSP
- C) WS-Discovery (UDP multicast)
- D) FTP

**Answer:** C) WS-Discovery (UDP multicast)
> *Reference: ONVIF uses WS-Discovery protocol for automatic device detection on local network*

---

**Q2.** What is the standard port number for RTSP (Real Time Streaming Protocol) used by most IP cameras?
- A) Port 80
- B) Port 443
- C) Port 554
- D) Port 8080

**Answer:** C) Port 554
> *Reference: IANA assigned port 554 for RTSP; cameras use rtsp://[IP]:554/stream*

---

**Q3.** When configuring recording schedules, what does "motion-based recording" require to be enabled on the camera or VMS?
- A) Higher resolution settings
- B) Video analytics or motion detection zones
- C) Continuous recording license
- D) Cloud storage subscription

**Answer:** B) Video analytics or motion detection zones
> *Reference: Motion recording requires defined detection areas with sensitivity thresholds*

---

### Intermediate Level

**Q4.** When calculating NVR storage requirements, a customer has 16 cameras recording at 4MP, 15fps, H.264, medium quality (~4Mbps each). How much storage is needed for 30 days of continuous recording?
- A) Approximately 10TB
- B) Approximately 20TB
- C) Approximately 40TB
- D) Approximately 60TB

**Answer:** B) Approximately 20TB
> *Calculation: 16 cameras × 4Mbps × 3600 sec × 24 hr × 30 days ÷ 8 bits ÷ 1,000,000 = ~20.7TB*

---

**Q5.** What is the purpose of configuring "I-frame interval" (GOP length) in camera compression settings?
- A) Adjust image brightness
- B) Balance between storage efficiency and video scrubbing performance
- C) Set motion detection sensitivity
- D) Configure network bandwidth limits

**Answer:** B) Balance between storage efficiency and video scrubbing performance
> *Reference: Shorter GOP = more I-frames = easier seeking but larger files; longer = efficient but slower scrub*

---

**Q6.** When configuring RAID on an NVR, which RAID level provides the best balance of redundancy and storage efficiency for video surveillance?
- A) RAID 0
- B) RAID 1
- C) RAID 5
- D) RAID 10

**Answer:** C) RAID 5
> *Reference: RAID 5 offers single-drive fault tolerance with only one drive worth of capacity loss*

---

### Advanced Level

**Q7.** When integrating cameras with an access control system for "video verification," what programming element links a specific camera to a door event?
- A) Motion detection zone
- B) I/O trigger mapping or event correlation rule
- C) PTZ preset position
- D) Recording schedule

**Answer:** B) I/O trigger mapping or event correlation rule
> *Reference: Integration requires mapping access events to camera triggers via I/O or software correlation*

---

**Q8.** A camera is configured for H.265/HEVC encoding but clients report playback issues. What is the MOST LIKELY cause and solution?
- A) Camera firmware outdated; update camera
- B) VMS/client lacks H.265 codec; install codec or use H.264
- C) Network bandwidth insufficient; reduce resolution
- D) Storage drive failing; replace drive

**Answer:** B) VMS/client lacks H.265 codec; install codec or use H.264
> *Reference: H.265 requires compatible decoder; older clients may lack HEVC support*

---

**Q9.** When configuring multi-streaming on an IP camera, what is the typical use case for the "third stream" in a professional deployment?
- A) High-resolution recording
- B) Mobile app viewing or analytics engine feed
- C) Local monitor output
- D) Backup recording

**Answer:** B) Mobile app viewing or analytics engine feed
> *Reference: Stream 1 = high-res recording, Stream 2 = live viewing, Stream 3 = mobile/analytics (low bandwidth)*

---

**Q10.** A 32-camera system requires integration with an access control system for automatic PTZ tracking. The cameras support ONVIF Profile S and G. What additional ONVIF profile is required for reliable PTZ preset integration with external triggers?
- A) Profile A
- B) Profile C
- C) Profile T
- D) Profile M

**Answer:** C) Profile T
> *Reference: ONVIF Profile T adds advanced streaming features including PTZ configurations and analytics*

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
