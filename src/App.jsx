import React, { useState, useEffect } from 'react';
import {
  BookOpen, Code, Layers, Cpu, Sparkles, CheckCircle2, Clock,
  Plus, Trash2, Copy, Check, ChevronRight, ChevronLeft, RotateCcw,
  Smartphone, Maximize2, Flame, Search, X, Zap, Award, FileText,
  HelpCircle, Play, Pause, RefreshCw, ExternalLink, Printer, Upload
} from 'lucide-react';

// ============================================================================
// 1. MAVEN SILICON CHAPTER-BY-CHAPTER BEGINNER CLASSROOM (ENGLISH + TELUGU)
// ============================================================================
const CLASSROOM_MODULES = [
  {
    id: 'ch1',
    chapter: 'Chapter 1',
    title: 'ASIC Design Flow (Idea to Silicon Chip)',
    simulator: 'asic',
    analogy: 'Building a Silicon Chip is just like constructing a multi-storey apartment: Architecture Plan (Spec) -> Room Blueprints in Code (RTL) -> Checking Blueprints for Mistakes (Verification) -> Converting Blueprints into Bricks/Gates (Synthesis) -> Arranging Rooms, Wiring & Checking Speed (Physical Design & STA).',
    telugu: 'తెలుగు వివరణ: ఒక చిప్ (ASIC) తయారు చేయడం అంటే ఇల్లు కట్టడం లాంటిదే! 1) ముందుగా చిప్ ఏం చేయాలో ప్లాన్ చేస్తాం (Specification). 2) దాన్ని Verilog కోడ్ రూపంలో రాస్తాం (RTL Design). 3) ఆ కోడ్ సరిగ్గా పనిచేస్తుందో లేదో SystemVerilog/UVM తో టెస్ట్ చేస్తాం (Functional Verification — ఇక్కడే 70% ఉద్యోగాలు ఉంటాయి!). 4) కోడ్‌ని లాజిక్ గేట్లుగా మారుస్తాం (Synthesis). 5) చివరిగా ఆ గేట్లను సిలికాన్ చిప్ మీద అమర్చి వైరింగ్ చేస్తాం (Physical Design -> GDSII Tapeout).',
    example: 'Suppose Apple or Qualcomm wants a "Fast Battery Charging Controller Chip":\n• Input Spec: Max 45W, temperature cut-off at 45°C, clock = 100 MHz.\n• RTL Engineer writes Verilog FSM (`IDLE -> SENSE_TEMP -> FAST_CHARGE -> STOP`).\n• Verification Engineer sends 10,000 random voltage/heat test cases in UVM.\n• Synthesis Tool (Synopsys Design Compiler) converts Verilog into NAND/NOR/Flip-Flop netlist.\n• Physical Design outputs `charger_chip.gds` sent to TSMC foundry.',
    industrial: 'In the semiconductor industry (Qualcomm, Intel, AMD, Synopsys, Texas Instruments), Front-End Engineers work on RTL (Verilog) + Verification (SystemVerilog/UVM), while Back-End Engineers work on Synthesis, STA (PrimeTime), and Physical Design (Innovus / ICC2).',
    interviews: [
      {
        q: 'What is the difference between Front-End and Back-End in ASIC Design Flow?',
        a: 'Front-End covers Specification, RTL Coding (Verilog/VHDL), and Functional Verification (SystemVerilog/UVM) up to a verified RTL/Gate-level Netlist. Back-End (Physical Design) takes the synthesized netlist + SDC constraints and performs Floorplanning, Placement, Clock Tree Synthesis (CTS), Routing, and STA signoff to produce the GDSII file.'
      },
      {
        q: 'What are the inputs and outputs of Logic Synthesis?',
        a: 'Inputs: 1) Synthesizable RTL Code (.v), 2) Standard Cell Timing Library (.lib), 3) Timing & Area Constraints (.sdc). Outputs: Gate-Level Netlist (.v) + Timing/Area/Power reports.'
      }
    ]
  },
  {
    id: 'ch2',
    chapter: 'Chapter 2',
    title: 'Number Systems, 2s Complement & Signed Overflow',
    simulator: 'twos',
    analogy: 'Think of a car odometer with only 4 digits: if you roll backwards 1 step from 0000, it wraps around to 9999. In 4-bit binary, rolling back 1 step from 0000 wraps to 1111 (-1)! That is why 2s complement lets a simple Adder circuit do subtraction without building a separate Subtractor!',
    telugu: 'తెలుగు వివరణ: చిప్ లోపల సబ్‌ట్రాక్షన్ (తీసివేత) చేయడానికి విడిగా సర్క్యూట్ పెట్టరు—ఖర్చు మరియు స్థలం ఆదా చేయడానికి 2s Complement వాడి కూడిక (Adder) సర్క్యూట్‌తోనే తీసివేత చేస్తారు! \n• పాజిటివ్ నంబర్‌కు MSB (మొదటి బిట్) = 0 ఉంటుంది.\n• నెగటివ్ నంబర్‌కు MSB = 1 ఉంటుంది.\n• Signed Overflow అంటే ఏమిటి? ఇద్దరు పాజిటివ్ నంబర్లను కూడినప్పుడు ఆన్సర్ 4-బిట్ పరిధి (+7) దాటిపోయి నెగటివ్ (MSB=1) గా మారిపోతే దాన్ని "Signed Overflow" అంటారు!',
    example: '4-Bit Signed 2s Complement Range = -8 (1000) to +7 (0111).\n• Good Addition: (+3) + (-2) = 0011 + 1110 = (1)0001 -> Ignore carry -> 0001 (+1). Correct!\n• Signed Overflow Case: (+5) + (+4) = +9 (Too big for max +7!).\n  0101 (+5) + 0100 (+4) = 1001 (-7 in 2s complement!).\n  Notice two positive numbers (MSB=0, 0) gave a negative result (MSB=1)! Hardware detects this with a single XOR gate: Overflow = Carry_into_MSB ^ Carry_out_of_MSB.',
    industrial: 'Every ALU (Arithmetic Logic Unit) in ARM processors, DSP filters, and AI/ML accelerators has a dedicated `V` (Overflow) status flag wired to `C[n-1] ^ C[n]`, plus Gray Code converters (`G = B ^ (B >> 1)`) for error-free Asynchronous FIFO pointers.',
    interviews: [
      {
        q: 'How does hardware detect Signed Overflow in 2s complement addition?',
        a: 'Method 1 (Carry XOR): Overflow = C_in(MSB) XOR C_out(MSB). Method 2 (Sign bits): If two inputs have the same sign (A_msb == B_msb) and the Sum has the opposite sign (Sum_msb != A_msb), Signed Overflow has occurred.'
      },
      {
        q: 'Why is Gray Code used in Asynchronous FIFOs and Rotary Encoders instead of Binary?',
        a: 'In Gray Code, only ONE bit changes between any two consecutive numbers (e.g., 3 = 0010 to 4 = 0110). When crossing clock domains, even if a bit goes metastable, the pointer can vary by at most 1 count instead of jumping wildly like 0111 (7) -> 1000 (8).'
      }
    ]
  },
  {
    id: 'ch3_4',
    chapter: 'Chapters 3 & 4',
    title: 'Logic Gates, Boolean Algebra, Adders & Delays',
    simulator: 'mux_gates',
    analogy: 'AND Gate is like two switches in SERIES (both must be ON for the bulb to glow). OR Gate is like two switches in PARALLEL (either switch turns the bulb ON). NAND and NOR are "Universal LEGO Bricks"—you can build an entire iPhone processor using ONLY NAND gates!',
    telugu: 'తెలుగు వివరణ: \n• AND గేట్: రెండు స్విచ్‌లు ON (1) లో ఉంటేనే అవుట్‌పుట్ 1 వస్తుంది.\n• OR గేట్: ఏ ఒక్క స్విచ్ ON (1) లో ఉన్నా అవుట్‌పుట్ 1 వస్తుంది.\n• XOR గేట్: రెండు ఇన్‌పుట్లు వేర్వేరుగా (0,1 లేదా 1,0) ఉంటే 1 వస్తుంది (సమానంగా ఉంటే 0).\n• NAND మరియు NOR గేట్లను "Universal Gates" అంటారు, ఎందుకంటే CMOS చిప్స్‌లో NAND గేట్ తక్కువ ట్రాన్సిస్టర్లతో వేగంగా పనిచేస్తుంది!',
    example: 'Half Adder (adds 2 bits A, B):\n• Sum = A ^ B  |  Carry = A & B\nFull Adder (adds 3 bits A, B, Cin):\n• Sum = A ^ B ^ Cin\n• Carry = (A & B) | (Cin & (A ^ B))\nWhy Carry Look-Ahead Adder (CLA)? In a 32-bit Ripple Carry Adder, bit 31 waits for carries from bits 0..30 (slow propagation delay!). CLA pre-calculates Carry Generate (G = A·B) and Propagate (P = A⊕B) in parallel for high speed.',
    industrial: 'Standard cell libraries in 5nm/7nm chips prefer NAND/NOR/AOI (AND-OR-Invert) cells because a CMOS NAND2 gate uses only 4 transistors with no inverter delay, whereas an AND2 gate is literally a NAND2 + NOT (6 transistors, slower!).',
    interviews: [
      {
        q: 'Why is NAND preferred over NOR in CMOS VLSI chip design?',
        a: 'In NAND, NMOS transistors are in series and PMOS are in parallel. In NOR, PMOS transistors are stacked in series. Since hole mobility in PMOS is ~2.5x slower than electron mobility in NMOS, stacked PMOS transistors in NOR require much wider sizing (more area & capacitance) to match NAND speed.'
      },
      {
        q: 'What is Propagation Delay (t_pd) vs Contamination Delay (t_cd)?',
        a: 'Propagation Delay (t_pd) is the MAXIMUM time from an input change to a valid, stable output (used for Setup checks). Contamination Delay (t_cd) is the MINIMUM time before the output starts changing after an input transition (used for Hold checks!).'
      }
    ]
  },
  {
    id: 'ch5',
    chapter: 'Chapter 5',
    title: 'Encoders, Decoders, 2:1 MUX & Tristate Buffers',
    simulator: 'mux_gates',
    analogy: 'A Multiplexer (MUX) is a Railway Track Switch: multiple train tracks come in (I0, I1), a Station Master pulls the Select lever (S), and only ONE chosen train goes onto the single output track (Y)!',
    telugu: 'తెలుగు వివరణ: \n• Multiplexer (MUX): "Many-to-One" స్విచ్! `S = 0` అయితే `I0` బయటకు వస్తుంది, `S = 1` అయితే `I1` బయటకు వస్తుంది (`Y = S\'·I0 + S·I1`). ప్రతి VLSI రాత పరీక్షలో "2:1 MUX తో అన్ని లాజిక్ గేట్లు డిజైన్ చేయండి" అనే ప్రశ్న కచ్చితంగా వస్తుంది!\n• Priority Encoder: ఒకేసారి రెండు ఇన్‌పుట్లు హై (1) అయితే, ఎక్కువ ప్రయారిటీ ఉన్న ఇన్‌పుట్‌ను ఎంచుకుంటుంది (ఉదాహరణకు CPU Interrupts).\n• Tristate Buffer: `Enable = 0` ఉన్నప్పుడు వైర్‌ను పూర్తిగా డిస్‌కనెక్ట్ (`High-Z`) చేస్తుంది—దీనివల్ల ఒకే బస్సును (Shared Bus) అనేక బ్లాకులు వాడుకోవచ్చు.',
    example: 'Build Any Gate Using ONLY One 2:1 MUX (Equation: Y = S\'·I0 + S·I1):\n1. NOT(A): Set S = A, I0 = 1, I1 = 0  --> Y = A\'·1 + A·0 = A\'\n2. AND(A,B): Set S = A, I0 = 0, I1 = B --> Y = A\'·0 + A·B = A·B\n3. OR(A,B): Set S = A, I0 = B, I1 = 1  --> Y = A\'·B + A·1 = A + B\n4. D-Latch: Set S = Enable, I0 = Q (feedback), I1 = D!',
    industrial: 'In Verilog RTL, every `assign y = sel ? b : a;` or `case` statement synthesizes directly into Multiplexers. Tristate buffers (`assign bus = en ? data : 1\'bz;`) are used exclusively at chip I/O pads (like I2C SDA bidirectional pins).',
    interviews: [
      {
        q: 'Difference between a normal Encoder and a Priority Encoder?',
        a: 'In a normal 4:2 Encoder, if more than one input bit is 1 simultaneously, the output becomes invalid/corrupted. A Priority Encoder resolves multiple active inputs by outputting the binary code of the highest-priority active input (e.g., I3 > I2 > I1 > I0) along with a Valid flag.'
      },
      {
        q: 'How many 2:1 MUXes are required to build a 16:1 MUX?',
        a: 'Formula: N - 1. For a 16:1 MUX, you need 16 - 1 = 15 two-to-one MUXes (8 + 4 + 2 + 1 = 15).'
      }
    ]
  },
  {
    id: 'ch6_7',
    chapter: 'Chapters 6 & 7',
    title: 'Latches, Flip-Flops, Setup/Hold Time & Counters',
    simulator: 'fifo',
    analogy: 'A Latch is an AUTOMATIC GLASS DOOR that stays open the entire time Enable=1 (anyone can sneak through -> glitches!). A Flip-Flop is a CAMERA SHUTTER that clicks a photo ONLY at the exact split-second of the rising clock edge (`posedge clk`). Setup Time = Stand still BEFORE the camera clicks; Hold Time = Stay still right AFTER the click so the photo does not blur!',
    telugu: 'తెలుగు వివరణ: \n• Combinational సర్క్యూట్‌కు మెమరీ ఉండదు, కానీ Sequential సర్క్యూట్ (Flip-Flop) పాత డేటాను గుర్తుపెట్టుకుంటుంది.\n• Latch అంటే Level-Sensitive (క్లాక్ 1 గా ఉన్నంత సేపు డేటా మారుతూనే ఉంటుంది).\n• Flip-Flop అంటే Edge-Triggered (క్లాక్ 0 నుండి 1 కి మారే ఆ ఒక్క క్షణంలోనే డేటాను తీసుకుంటుంది).\n• Setup Time: క్లాక్ ఎడ్జ్ రాకముందు డేటా స్థిరంగా ఉండాల్సిన సమయం.\n• Hold Time: క్లాక్ ఎడ్జ్ వచ్చిన తర్వాత డేటా మారకుండా స్థిరంగా ఉండాల్సిన సమయం. ఇవి తప్పితే అవుట్‌పుట్ 0 కి, 1 కి మధ్య ఊగిసలాడుతుంది—దాన్నే "Metastability" అంటారు!',
    example: '4-Bit Shift Register Counters (N = 4 Flip-Flops):\n• Ring Counter: Last FF output Q3 feeds back to D0 -> Total States = N = 4 states (`1000 -> 0100 -> 0010 -> 0001`).\n• Johnson (Twisted Ring) Counter: Inverted Q3\' feeds back to D0 -> Total States = 2N = 8 states (`0000 -> 1000 -> 1100 -> 1110 -> 1111 -> 0111 -> 0011 -> 0001`).',
    industrial: '99% of synchronous ASIC RTL designs use positive-edge D Flip-Flops (`always @(posedge clk)`). Accidental Latches occur when an RTL designer writes an incomplete `if` without `else` in combinational logic—lint tools (SpyGlass) flag this immediately as a critical bug!',
    interviews: [
      {
        q: 'Why does Hold Violation NOT depend on Clock Frequency?',
        a: 'Hold check verifies that data launched at a clock edge does not race through a super-fast combinational path and corrupt the capture flip-flop on the SAME clock edge: `T_cq + T_comb >= T_hold + T_skew`. Notice `T_clk` (clock period) is not in the Hold equation at all! You cannot fix a Hold violation by slowing the clock—you must insert delay buffers in the data path.'
      },
      {
        q: 'How do you convert a D Flip-Flop into a T (Toggle) Flip-Flop?',
        a: 'Connect an XOR gate to the D input: `D = T ^ Q`. When T = 0, D = Q (holds state); when T = 1, D = ~Q (toggles state on every clock edge).'
      }
    ]
  },
  {
    id: 'ch8_9_10',
    chapter: 'Chapters 8, 9 & 10',
    title: 'Finite State Machines (FSM), Glitches & FIFO Memories',
    simulator: 'fifo',
    analogy: 'An FSM is a Vending Machine brain (`IDLE -> HAS_10_RS -> DISPENSE`). A FIFO (First-In, First-Out) is a Cinema Ticket Queue: the first person who enters the back of the line (`wr_ptr`) is the first person served at the ticket counter (`rd_ptr`), cushioning speed mismatches when people arrive faster than the cashier!',
    telugu: 'తెలుగు వివరణ: \n• FSM (Mealy vs Moore): Moore మిషన్‌లో అవుట్‌పుట్ కేవలం ప్రస్తుత State పైనే ఆధారపడుతుంది (సేఫ్, గ్లిచ్‌లు రావు). Mealy మిషన్‌లో అవుట్‌పుట్ ప్రస్తుత State మరియు Input రెండింటిపై ఆధారపడుతుంది (తక్కువ States సరిపోతాయి, ఒక క్లాక్ సైకిల్ ముందే అవుట్‌పుట్ ఇస్తుంది).\n• Glitches & Hazards: గేట్ల ఆలస్యం (delay) వల్ల అవుట్‌పుట్ కొద్దిసేపు అనుకోకుండా 1->0->1 గా మారితే దాన్ని Glitch (Static-1 Hazard) అంటారు. K-Map లో ఒక ఎక్స్‌ట్రా గ్రూప్ (Redundant Term) కలిపి దీన్ని ఆపవచ్చు.\n• FIFO Memory: రెండు వేర్వేరు వేగాలతో పనిచేసే బ్లాకుల మధ్య డేటా పోకుండా దాచిపెట్టే క్యూ (Queue) మెమరీ!',
    example: 'Synchronous vs Asynchronous FIFO:\n• Sync FIFO: Same clock (`clk`) for Write and Read. Uses a counter or extra MSB pointer bit to detect FULL and EMPTY.\n• Async FIFO: Separate `wr_clk` (e.g., 100 MHz sensor) and `rd_clk` (e.g., 80 MHz processor). Converts binary pointers to Gray Code and passes them through 2-Flip-Flop Synchronizers to prevent metastability!',
    industrial: 'Your Maven Silicon Router 1x3 project uses BOTH an FSM Controller (to decode Header, Payload, Parity states) AND three 16x9 FIFOs to buffer packets before forwarding them to output ports!',
    interviews: [
      {
        q: 'What is the difference between SRAM and DRAM in VLSI Memories?',
        a: 'SRAM uses 6 CMOS transistors (cross-coupled inverters) per bit—it is ultra-fast and needs no refreshing (used for CPU L1/L2 caches and on-chip FIFOs). DRAM uses 1 Transistor + 1 Capacitor (1T1C) per bit—it is dense and cheap, but the capacitor leaks charge and requires periodic refresh (used for external DDR4/DDR5 RAM).'
      },
      {
        q: 'How do you eliminate a Static-1 Hazard (Glitch) in a combinational circuit?',
        a: 'Plot the Boolean expression on a Karnaugh Map (K-Map) and add a consensus (redundant) prime implicant loop bridging any two adjacent 1-groups that touch each other without overlapping.'
      }
    ]
  }
];

// ============================================================================
// 2. 90-DAY ROADMAP, FORMULAS, QUIZ, CODE & FLASHCARDS
// ============================================================================
const INITIAL_ROADMAP = [
  {
    month: 'Month 1: Maven Silicon Digital Electronics & Verilog (Days 1–30)',
    weeks: [
      {
        week: 'Week 1: Ch 1–5 (ASIC Flow, Number Systems, Gates & MUX)',
        topics: [
          { id: 'w1_1', title: 'Ch 1: Complete ASIC Design Flow (Spec to GDSII)', status: 'todo', tag: 'ASIC Flow' },
          { id: 'w1_2', title: 'Ch 2: Number Systems, 1s/2s Complement, Signed Overflow & Gray/BCD Codes', status: 'todo', tag: 'Digital' },
          { id: 'w1_3', title: 'Ch 3 & 4: Logic Gates, Boolean/K-Maps, Adders & Combo Delays', status: 'todo', tag: 'Digital' },
          { id: 'w1_4', title: 'Ch 5: Encoders, Decoders, Universal 2:1 MUX & Tristate Buffers', status: 'todo', tag: 'Must-Ask' }
        ]
      },
      {
        week: 'Week 2: Ch 6–10 (Sequential Logic, STA, FSM, Hazards & FIFO)',
        topics: [
          { id: 'w2_1', title: 'Ch 6: Latches vs Flip-Flops, Setup & Hold Time Equations', status: 'todo', tag: 'STA' },
          { id: 'w2_2', title: 'Ch 7: Shift Registers, Ring/Johnson Counters & Sync Counter Design', status: 'todo', tag: 'Sequential' },
          { id: 'w2_3', title: 'Ch 8 & 9: Mealy vs Moore FSMs (1011 Detector) & Static Glitches/Hazards', status: 'todo', tag: 'FSM' },
          { id: 'w2_4', title: 'Ch 10 & 11: SRAM/DRAM, Sync & Async FIFO Depth + All 7 Assignments', status: 'todo', tag: 'Memory' }
        ]
      },
      {
        week: 'Week 3–4: Verilog HDL Coding Mastery',
        topics: [
          { id: 'w3_1', title: 'wire vs reg, Blocking (=) vs Non-Blocking (<=) Assignments', status: 'todo', tag: 'Verilog' },
          { id: 'w3_2', title: 'Stratified Event Queue & Race Conditions in Verilog', status: 'todo', tag: 'Verilog' },
          { id: 'w3_3', title: 'if-else vs case/casex/casez & Avoiding Unwanted Latches', status: 'todo', tag: 'Verilog' },
          { id: 'w3_4', title: 'RTL Coding: Sync FIFO, Dual-Port RAM, Clock Divider (/2, /3)', status: 'todo', tag: 'RTL' }
        ]
      }
    ]
  },
  {
    month: 'Month 2: SystemVerilog for Verification (Days 31–60)',
    weeks: [
      {
        week: 'Week 5: SV Data Types, Arrays & Subroutines',
        topics: [
          { id: 'w5_1', title: '2-State (bit, int) vs 4-State (logic, reg, integer) Types', status: 'todo', tag: 'SV' },
          { id: 'w5_2', title: 'Fixed, Dynamic Arrays (new[]), Queues ($) & Associative Arrays', status: 'todo', tag: 'SV' },
          { id: 'w5_3', title: 'Tasks vs Functions, pass by value vs ref, automatic keyword', status: 'todo', tag: 'SV' }
        ]
      },
      {
        week: 'Week 6: SV OOPs, Threads & IPC',
        topics: [
          { id: 'w6_1', title: 'Classes, Inheritance (extends, super), Shallow vs Deep Copy', status: 'todo', tag: 'SV-OOP' },
          { id: 'w6_2', title: 'Polymorphism, virtual Methods & virtual Interface', status: 'todo', tag: 'Must-Ask' },
          { id: 'w6_3', title: 'fork-join, join_any, join_none, wait fork & disable fork', status: 'todo', tag: 'SV' },
          { id: 'w6_4', title: 'Mailbox (bounded/unbounded), Semaphore & SV Events', status: 'todo', tag: 'SV' }
        ]
      },
      {
        week: 'Week 7–8: Constrained Randomization, Coverage & SVA',
        topics: [
          { id: 'w7_1', title: 'rand vs randc, inside, dist (:= vs :/), solve...before, soft', status: 'todo', tag: 'CRV' },
          { id: 'w7_2', title: 'Pre/Post Randomize & Array Constraint Coding Patterns', status: 'todo', tag: 'CRV' },
          { id: 'w7_3', title: 'Functional vs Code Coverage, Covergroups, Bins & Cross', status: 'todo', tag: 'Coverage' },
          { id: 'w7_4', title: 'SVA: Immediate vs Concurrent, |-> vs |=>, $rose, $fell, $past', status: 'todo', tag: 'SVA' }
        ]
      }
    ]
  },
  {
    month: 'Month 3: UVM, AMBA Protocols & Projects (Days 61–90)',
    weeks: [
      {
        week: 'Week 9: UVM Architecture & Phasing',
        topics: [
          { id: 'w9_1', title: 'uvm_object vs uvm_component Class Hierarchy', status: 'todo', tag: 'UVM' },
          { id: 'w9_2', title: 'UVM Phases: Why Build is Top-Down & Connect is Bottom-Up', status: 'todo', tag: 'UVM' },
          { id: 'w9_3', title: 'UVM Factory (create vs new), Type vs Instance Overrides', status: 'todo', tag: 'UVM' },
          { id: 'w9_4', title: 'uvm_config_db#(T)::set/get & Sequence-Driver Handshake', status: 'todo', tag: 'UVM' }
        ]
      },
      {
        week: 'Week 10–12: AMBA Protocols & Maven Silicon Projects',
        topics: [
          { id: 'w10_1', title: 'AMBA APB (Setup/Access States) & AHB Pipeline/Burst Transfers', status: 'todo', tag: 'AMBA' },
          { id: 'w10_2', title: 'AMBA AXI4: 5 Channels, VALID/READY Handshake, Out-of-Order', status: 'todo', tag: 'AMBA' },
          { id: 'w10_3', title: 'Maven Silicon Project 1: Router 1x3 UVM Verification', status: 'todo', tag: 'Project' },
          { id: 'w10_4', title: 'Maven Silicon Project 2: AHB-to-APB Bridge Verification', status: 'todo', tag: 'Project' }
        ]
      }
    ]
  }
];

const INITIAL_VLSI_FORMULAS = [
  { id: 'vf0', subject: '2s Complement Range & Signed Overflow', tag: 'Ch 2', done: false, formula: 'Range = -(2^(n-1)) to +(2^(n-1) - 1) | Overflow = C_in(MSB) ^ C_out(MSB)' },
  { id: 'vf1', subject: 'Static Timing Analysis (Setup & Hold)', tag: 'Ch 6 / STA', done: false, formula: 'Setup: T_clk + T_skew >= T_cq + T_comb + T_su | Hold: T_cq + T_comb >= T_hold + T_skew' },
  { id: 'vf2', subject: 'CMOS Power Dissipation (Dynamic & Static)', tag: 'CMOS', done: false, formula: 'P_total = α·C_L·V_DD²·f_clk + V_DD·I_sc + V_DD·I_leakage' },
  { id: 'vf3', subject: 'Asynchronous FIFO Depth & Gray Code', tag: 'Ch 10 / FIFO', done: false, formula: 'Depth = Burst × (1 - F_rd / F_wr) | Binary-to-Gray: G = B ^ (B >> 1)' },
  { id: 'vf4', subject: '2:1 MUX Universal Gate Count & Counters', tag: 'Ch 5 & 7', done: false, formula: 'NOT/AND/OR/Latch = 1 MUX | XOR/XNOR/NAND/NOR = 2 MUX | Ring = N, Johnson = 2N' }
];

const INITIAL_QUIZ = [
  {
    id: 'q0',
    topic: 'Ch 2: Signed Overflow',
    question: 'In 4-bit 2s complement arithmetic (range -8 to +7), we add A = 0101 (+5) and B = 0100 (+4). What is the 4-bit binary sum and does Signed Overflow occur?',
    options: [
      'Sum = 1001, Signed Overflow = YES (two positives produced MSB = 1)',
      'Sum = 1001, Signed Overflow = NO',
      'Sum = 0001, Signed Overflow = YES',
      'Sum = 1111, Signed Overflow = NO'
    ],
    correct: 0,
    explanation: '0101 (+5) + 0100 (+4) = 1001. Because +9 exceeds the 4-bit maximum (+7), the sign bit flips to 1 (-7 in 2s complement). Carry into MSB = 1, Carry out of MSB = 0 -> 1 XOR 0 = 1 (Overflow!).'
  },
  {
    id: 'q1',
    topic: 'Ch 5: Universal 2:1 MUX',
    question: 'What is the minimum number of 2:1 Multiplexers required to implement a 2-input XOR gate and a 1-bit Full Adder (without complemented inputs)?',
    options: [
      'XOR = 2 MUXes, Full Adder = 7 MUXes',
      'XOR = 1 MUX, Full Adder = 5 MUXes',
      'XOR = 3 MUXes, Full Adder = 6 MUXes',
      'XOR = 2 MUXes, Full Adder = 4 MUXes'
    ],
    correct: 0,
    explanation: 'Without inverted inputs, an inverter takes 1 MUX and XOR takes 2 MUXes. A Full Adder (Sum = A⊕B⊕Cin, Cout = AB + Cin(A⊕B)) requires 7 2:1 MUXes.'
  },
  {
    id: 'q2',
    topic: 'Ch 6: Static Timing Analysis (STA)',
    question: 'In a synchronous sequential circuit, T_cq = 1.5 ns, T_comb = 4.5 ns, T_setup = 1.0 ns, T_hold = 0.8 ns, and Clock Skew = +0.5 ns. What is the maximum clock frequency?',
    options: [
      '142.8 MHz',
      '153.8 MHz',
      '133.3 MHz',
      '200.0 MHz'
    ],
    correct: 1,
    explanation: 'T_clk(min) = T_cq + T_comb + T_setup - T_skew = 1.5 + 4.5 + 1.0 - 0.5 = 6.5 ns. Therefore, F_max = 1000 / 6.5 = 153.84 MHz.'
  },
  {
    id: 'q3',
    topic: 'Ch 10: FIFO Design',
    question: 'An Asynchronous FIFO has Write Clock = 100 MHz and Read Clock = 80 MHz. Up to 100 data words are written in a continuous burst without idle cycles. Minimum FIFO depth?',
    options: [
      '16 words',
      '20 words',
      '25 words',
      '32 words'
    ],
    correct: 1,
    explanation: 'Time for 100 writes = 100 × 10 ns = 1000 ns. Words read in 1000 ns = 1000 ns / 12.5 ns = 80 words. Remaining words to buffer = 100 - 80 = 20 words.'
  },
  {
    id: 'q4',
    topic: 'Verilog HDL Synthesis',
    question: 'Inside a clocked always @(posedge clk) block, if you write: a = b; c = a; what hardware is synthesized?',
    options: [
      'Two series flip-flops (2-stage shift register)',
      'Parallel flip-flops where both a and c get the value of b on the same clock edge',
      'A combinational latch with race condition',
      'Compilation syntax error'
    ],
    correct: 1,
    explanation: 'Because Blocking assignment (=) updates `a` immediately inside the procedural block, `c = a` receives the new value of `b` on the exact same posedge clk, collapsing into parallel flip-flops.'
  },
  {
    id: 'q5',
    topic: 'SystemVerilog & UVM',
    question: 'Which UVM phase is a simulation time-consuming task (rather than a function) and executes in parallel across all components?',
    options: [
      'build_phase()',
      'connect_phase()',
      'run_phase()',
      'report_phase()'
    ],
    correct: 2,
    explanation: 'Only run_phase() (and its 12 runtime sub-phases) is a task that consumes simulation time (#delays, @posedge). All other phases are zero-time functions.'
  }
];

const INITIAL_PDF_VAULT = [
  {
    id: 'p1',
    title: 'Module 1: Complete ASIC Design Flow (Telugu + English)',
    category: 'Ch 1 • ASIC Flow',
    summary: 'Spec -> RTL -> Verification -> Synthesis -> Physical Design -> STA -> GDSII with EDA tools & interview Q&A.',
    url: ''
  },
  {
    id: 'p2',
    title: 'Module 2: 1s & 2s Complement + Number System Conversions',
    category: 'Ch 2 • Digital',
    summary: 'Corrected notebook notes covering all 10 radix conversions, 3 ways of 2s complement, and Signed Overflow.',
    url: ''
  },
  {
    id: 'p3',
    title: 'Module 3: Universal 2:1 MUX, Flip-Flops, STA & FIFO Master Sheet',
    category: 'Ch 5–10 • Core',
    summary: 'MUX gate implementations, Setup/Hold timing equations, Mealy/Moore FSMs, Hazards, and FIFO pointer logic.',
    url: ''
  },
  {
    id: 'p4',
    title: 'Module 4: SystemVerilog, UVM & AMBA Protocol Handbook',
    category: 'Verification',
    summary: 'OOPs, Constraints, Coverage, UVM Factory/Phasing, and AMBA APB/AHB/AXI4 deadlock rules.',
    url: ''
  }
];

const INITIAL_SNIPPETS = [
  {
    id: 's1',
    title: 'Synchronous FIFO (16x8) - Synthesizable Verilog',
    lang: 'Verilog',
    note: 'Uses an extra MSB bit in wr_ptr and rd_ptr to distinguish Full vs Empty condition.',
    code: `module sync_fifo #(parameter DEPTH=16, WIDTH=8) (
  input clk, rst_n, wr_en, rd_en,
  input [WIDTH-1:0] din,
  output reg [WIDTH-1:0] dout,
  output full, empty
);
  reg [WIDTH-1:0] mem [0:DEPTH-1];
  reg [$clog2(DEPTH):0] wr_ptr, rd_ptr;

  assign empty = (wr_ptr == rd_ptr);
  assign full  = (wr_ptr[$clog2(DEPTH)] != rd_ptr[$clog2(DEPTH)]) &&
                 (wr_ptr[$clog2(DEPTH)-1:0] == rd_ptr[$clog2(DEPTH)-1:0]);

  always @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
      wr_ptr <= 0; rd_ptr <= 0; dout <= 0;
    end else begin
      if (wr_en && !full) begin
        mem[wr_ptr[$clog2(DEPTH)-1:0]] <= din;
        wr_ptr <= wr_ptr + 1'b1;
      end
      if (rd_en && !empty) begin
        dout <= mem[rd_ptr[$clog2(DEPTH)-1:0]];
        rd_ptr <= rd_ptr + 1'b1;
      end
    end
  end
endmodule`
  },
  {
    id: 's2',
    title: 'Sequence Detector "1011" (Overlapping Mealy FSM)',
    lang: 'Verilog',
    note: 'Standard 2-block FSM template asked in 90% of VLSI written tests.',
    code: `module seq_1011_mealy (
  input clk, rst_n, din,
  output reg dout
);
  parameter S0=2'b00, S1=2'b01, S2=2'b10, S3=2'b11;
  reg [1:0] state, next_state;

  always @(posedge clk or negedge rst_n)
    if (!rst_n) state <= S0;
    else        state <= next_state;

  always @(*) begin
    next_state = state; dout = 1'b0;
    case (state)
      S0: next_state = din ? S1 : S0;
      S1: next_state = din ? S1 : S2;
      S2: next_state = din ? S3 : S0;
      S3: begin
        dout = din ? 1'b1 : 1'b0;
        next_state = din ? S1 : S2; // Overlapping
      end
    endcase
  end
endmodule`
  },
  {
    id: 's3',
    title: 'Divide-by-3 Clock Divider with 50% Duty Cycle',
    lang: 'Verilog',
    note: 'ORs positive-edge and negative-edge shifted signals to achieve exact 50% duty cycle.',
    code: `module clk_div3_50duty (input clk, rst_n, output clk_out);
  reg [1:0] cnt;
  reg q_neg;

  always @(posedge clk or negedge rst_n) begin
    if (!rst_n) cnt <= 2'b00;
    else cnt <= (cnt == 2'd2) ? 2'b00 : cnt + 1'b1;
  end

  always @(negedge clk or negedge rst_n) begin
    if (!rst_n) q_neg <= 1'b0;
    else q_neg <= (cnt == 2'd1);
  end

  assign clk_out = (cnt == 2'd1) | q_neg;
endmodule`
  },
  {
    id: 's4',
    title: 'Top SystemVerilog Constraints Asked in Interviews',
    lang: 'SystemVerilog',
    note: 'Covers odd/even, unique array elements, weighted distribution, and 010101 pattern.',
    code: `class interview_packet;
  rand bit [7:0] addr;
  rand int       arr[];
  rand bit       pattern[10];

  constraint c_addr {
    addr inside {[0:15], [100:120]};
    addr dist { [0:3] := 40, [4:7] :/ 60 };
  }

  constraint c_arr {
    arr.size() inside {[5:8]};
    unique {arr};
    foreach (arr[i]) {
      arr[i] inside {[1:50]};
      arr[i] % 2 == 1;
      if (i > 0) arr[i] > arr[i-1];
    }
  }

  constraint c_pat {
    foreach (pattern[i]) pattern[i] == (i % 2);
  }
endclass`
  }
];

const INITIAL_FLASHCARDS = [
  {
    id: 'f1',
    category: 'Digital',
    q: 'How many 2:1 MUXes are required to implement AND, OR, NOT, XOR, and Latch?',
    a: 'NOT = 1 MUX | AND = 1 MUX | OR = 1 MUX | XOR = 2 MUXes | XNOR = 2 MUXes | D-Latch = 1 MUX (connect output Q back to I0, D to I1, and Enable to Select line).',
    te: 'తెలుగు: 2:1 MUX తో NOT, AND, OR గేట్లకు 1 MUX సరిపోతుంది. XOR మరియు XNOR గేట్లకు 2 MUX లు కావాలి.'
  },
  {
    id: 'f2',
    category: 'STA',
    q: 'What is Setup Time & Hold Time? How do you fix violations of each?',
    a: 'Setup: Min time data must be stable BEFORE clock edge. Fix: Reduce combo delay, pipeline, upsize cells, or slow down clock.\nHold: Min time data must be stable AFTER clock edge. Fix: Add delay buffers in data path (Hold is independent of clock frequency!).',
    te: 'తెలుగు: క్లాక్ ఎడ్జ్ కంటే ముందు డేటా స్థిరంగా ఉండాల్సిన సమయం Setup Time. క్లాక్ ఫ్రీక్వెన్సీ తగ్గించి Setup violation సరిచేయవచ్చు, కానీ Hold violation క్లాక్ ఫ్రీక్వెన్సీపై ఆధారపడదు (డేటా పాత్‌లో బఫర్లు యాడ్ చేయాలి).'
  },
  {
    id: 'f3',
    category: 'Verilog',
    q: 'Difference between Blocking (=) and Non-Blocking (<=) assignments?',
    a: 'Blocking (=) executes sequentially inside begin-end (used for combinational logic). Non-Blocking (<=) evaluates RHS immediately and updates LHS in the NBA region at the end of the time step (used for sequential flip-flops to prevent race conditions).',
    te: 'తెలుగు: Blocking (=) ఒకదాని తర్వాత ఒకటి జరుగుతుంది (Combinational circuits కి వాడతారు). Non-Blocking (<=) లో క్లాక్ ఎడ్జ్ చివరిలో LHS అప్‌డేట్ అవుతుంది (Sequential Flip-Flops కి వాడతారు).'
  },
  {
    id: 'f4',
    category: 'SystemVerilog',
    q: 'Difference between Shallow Copy and Deep Copy in SystemVerilog?',
    a: 'Shallow Copy (`pkt2 = new pkt1`) copies top-level variables and ONLY the object handle of nested sub-objects. Deep Copy uses a custom `copy()` method calling `new()` on every nested sub-object so both objects are completely independent.',
    te: 'తెలుగు: Shallow copy కేవలం పైన ఉన్న వేరియబుల్స్ మాత్రమే కాపీ చేస్తుంది, లోపల ఉన్న ఆబ్జెక్ట్ హ్యాండిల్స్ రెండింటికీ ఒకటే ఉంటాయి. Deep copy లో ప్రతి లోపలి ఆబ్జెక్ట్‌కు విడిగా మెమరీ క్రియేట్ చేస్తాము.'
  },
  {
    id: 'f5',
    category: 'UVM',
    q: 'Why is UVM build_phase() top-down while connect_phase() is bottom-up?',
    a: 'build_phase() is top-down because parent components (uvm_test -> uvm_env -> uvm_agent) must exist and set config parameters in uvm_config_db before child components are created. connect_phase() is bottom-up so child TLM ports exist before parents bind them.',
    te: 'తెలుగు: పేరెంట్ కంపోనెంట్ (Test/Env) ముందు క్రియేట్ అయ్యి config_db ద్వారా సెట్టింగ్స్ పాస్ చేయాలి కాబట్టి build_phase Top-Down గా నడుస్తుంది.'
  }
];

const ASIC_STAGES = [
  { step: 1, name: 'Specification', role: 'Architect', tool: 'Word / SystemC', desc: 'Defines speed, power, area & protocol rules (e.g., 100 MHz USB/Router chip).', te: 'చిప్ ఏం చేయాలో, ఎంత వేగంతో పనిచేయాలో నిర్ణయించే మొదటి దశ.' },
  { step: 2, name: 'RTL Design', role: 'Design Eng.', tool: 'Verilog / SV', desc: 'Translates spec into synthesizable hardware code (FSMs, FIFOs, MUXes).', te: 'స్పెసిఫికేషన్‌ను Verilog కోడ్‌గా (FSM, రిజిస్టర్లు) రాసే దశ.' },
  { step: 3, name: 'Verification', role: 'DV Engineer', tool: 'VCS / Questa / UVM', desc: 'Simulates RTL with constrained-random tests & assertions to catch bugs BEFORE silicon!', te: 'కోడ్‌లో తప్పులు (Bugs) ఉన్నాయేమో UVM టెస్ట్‌బెంచ్‌తో తనిఖీ చేసే దశ.' },
  { step: 4, name: 'Logic Synthesis', role: 'Synthesis Eng.', tool: 'Design Compiler / Genus', desc: 'Converts Verilog RTL + .sdc + .lib into an optimized Gate-Level Netlist.', te: 'Verilog కోడ్‌ని అసలైన లాజిక్ గేట్లుగా (NAND, NOR, DFF) మార్చే దశ.' },
  { step: 5, name: 'Floorplan & Place', role: 'PD Engineer', tool: 'Innovus / ICC2', desc: 'Places macros (SRAMs), power grid, I/O pads, and standard cells on silicon die.', te: 'చిప్ వైశాల్యంలో మెమరీ బ్లాకులు మరియు గేట్లను సరైన చోట అమర్చే దశ.' },
  { step: 6, name: 'Clock Tree (CTS)', role: 'PD Engineer', tool: 'Innovus / ICC2', desc: 'Builds balanced clock buffer trees so clock reaches all flip-flops with minimal skew.', te: 'క్లాక్ సిగ్నల్ అన్ని ఫ్లిప్-ఫ్లాప్‌లకు ఒకే సమయానికి చేరేలా బఫర్లు పెట్టే దశ.' },
  { step: 7, name: 'Routing & STA', role: 'STA / PD Eng.', tool: 'PrimeTime / StarRC', desc: 'Connects metal wires & verifies zero Setup/Hold timing violations across corners.', te: 'మెటల్ వైర్లతో గేట్లను కలిపి, Setup/Hold టైమింగ్ చెక్ చేసే దశ.' },
  { step: 8, name: 'GDSII Tapeout', role: 'Signoff Team', tool: 'Calibre (DRC/LVS)', desc: 'Final physical mask file (.gds) shipped to TSMC / Samsung foundry for wafer fabrication!', te: 'అన్ని చెక్స్ పూర్తయ్యాక చిప్ తయారీ కోసం ఫ్యాక్టరీకి (TSMC) పంపే తుది ఫైల్!' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('learn');
  const [mobilePreview, setMobilePreview] = useState(false);

  // Classroom interactive states
  const [selectedChapterIdx, setSelectedChapterIdx] = useState(0);
  const [openQaKey, setOpenQaKey] = useState(null);

  // Simulator 1: ASIC Flow Stepper
  const [asicStep, setAsicStep] = useState(0);
  const [asicAutoPlay, setAsicAutoPlay] = useState(false);

  // Simulator 2: 4-Bit 2s Complement & Signed Overflow
  const [bitsA, setBitsA] = useState([0, 1, 0, 1]); // +5
  const [bitsB, setBitsB] = useState([0, 1, 0, 0]); // +4

  // Simulator 3: Logic Gate & 2:1 MUX Switchboard
  const [inA, setInA] = useState(1);
  const [inB, setInB] = useState(0);
  const [muxSel, setMuxSel] = useState(0);
  const [selectedGate, setSelectedGate] = useState('MUX21');

  // Simulator 4: Interactive 8-Slot FIFO
  const [fifoQueue, setFifoQueue] = useState(['0xA1', '0xB2']);
  const [fifoNextVal, setFifoNextVal] = useState(3);
  const [lastReadVal, setLastReadVal] = useState('-');

  // Persistent States
  const [roadmap, setRoadmap] = useState(() => {
    const saved = localStorage.getItem('vlsi_roadmap_v3');
    return saved ? JSON.parse(saved) : INITIAL_ROADMAP;
  });

  const [dailyTasks, setDailyTasks] = useState(() => {
    const saved = localStorage.getItem('vlsi_daily_v3');
    return saved ? JSON.parse(saved) : {
      streak: 1,
      concept2h: false,
      coding2h: false,
      mock2h: false
    };
  });

  const [snippets, setSnippets] = useState(() => {
    const saved = localStorage.getItem('vlsi_snippets_v3');
    return saved ? JSON.parse(saved) : INITIAL_SNIPPETS;
  });

  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem('vlsi_cards_v3');
    return saved ? JSON.parse(saved) : INITIAL_FLASHCARDS;
  });

  const [vlsiFormulas, setVlsiFormulas] = useState(() => {
    const saved = localStorage.getItem('vlsi_formulas_v3');
    return saved ? JSON.parse(saved) : INITIAL_VLSI_FORMULAS;
  });

  const [quizList] = useState(INITIAL_QUIZ);

  const [pdfVault, setPdfVault] = useState(() => {
    const saved = localStorage.getItem('vlsi_pdf_v3');
    return saved ? JSON.parse(saved) : INITIAL_PDF_VAULT;
  });

  // Focus Timer
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [linkedTopic, setLinkedTopic] = useState('Ch 1: Complete ASIC Design Flow (Spec to GDSII)');

  // Quiz & Vault UI states
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [localPdfUrl, setLocalPdfUrl] = useState(null);
  const [localPdfName, setLocalPdfName] = useState('');
  const [vaultSubTab, setVaultSubTab] = useState('code');
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [cardFilter, setCardFilter] = useState('All');
  const [copiedId, setCopiedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemType, setNewItemType] = useState('snippet');
  const [newTitle, setNewTitle] = useState('');
  const [newLang, setNewLang] = useState('Digital');
  const [newBody, setNewBody] = useState('');
  const [newTelugu, setNewTelugu] = useState('');

  // STA & FIFO Calculator Lab
  const [tClk, setTClk] = useState(10);
  const [tCq, setTCq] = useState(1.2);
  const [tComb, setTComb] = useState(6.5);
  const [tSetup, setTSetup] = useState(0.8);
  const [tHold, setTHold] = useState(0.5);
  const [tSkew, setTSkew] = useState(0.2);
  const [fWr, setFWr] = useState(100);
  const [fRd, setFRd] = useState(80);
  const [burstSize, setBurstSize] = useState(120);

  useEffect(() => { localStorage.setItem('vlsi_roadmap_v3', JSON.stringify(roadmap)); }, [roadmap]);
  useEffect(() => { localStorage.setItem('vlsi_daily_v3', JSON.stringify(dailyTasks)); }, [dailyTasks]);
  useEffect(() => { localStorage.setItem('vlsi_snippets_v3', JSON.stringify(snippets)); }, [snippets]);
  useEffect(() => { localStorage.setItem('vlsi_cards_v3', JSON.stringify(cards)); }, [cards]);
  useEffect(() => { localStorage.setItem('vlsi_formulas_v3', JSON.stringify(vlsiFormulas)); }, [vlsiFormulas]);
  useEffect(() => { localStorage.setItem('vlsi_pdf_v3', JSON.stringify(pdfVault)); }, [pdfVault]);

  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => {
      setTimerSeconds(prev => {
        if (prev <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  useEffect(() => {
    if (!asicAutoPlay) return;
    const id = setInterval(() => {
      setAsicStep(prev => (prev + 1) % ASIC_STAGES.length);
    }, 2200);
    return () => clearInterval(id);
  }, [asicAutoPlay]);

  // 4-Bit 2s Complement Math Helper
  const bitsToSigned = (b) => (-8 * b[0]) + (4 * b[1]) + (2 * b[2]) + (1 * b[3]);
  const compute4BitAdd = (a, b) => {
    let carry = 0;
    const sum = [0, 0, 0, 0];
    const carries = [0, 0, 0, 0, 0];
    carries[4] = 0;
    for (let i = 3; i >= 0; i--) {
      const total = a[i] + b[i] + carry;
      sum[i] = total % 2;
      carry = Math.floor(total / 2);
      carries[i] = carry;
    }
    const cInMsb = carries[1];
    const cOutMsb = carries[0];
    const overflow = cInMsb !== cOutMsb;
    return { sum, cInMsb, cOutMsb, overflow };
  };

  const addResult = compute4BitAdd(bitsA, bitsB);
  const valA = bitsToSigned(bitsA);
  const valB = bitsToSigned(bitsB);
  const valSum = bitsToSigned(addResult.sum);
  const onesCompA = bitsA.map(bit => (bit === 0 ? 1 : 0));
  const twosCompA = compute4BitAdd(onesCompA, [0, 0, 0, 1]).sum;

  // Gate & MUX Evaluator
  const evalGateOutput = () => {
    if (selectedGate === 'AND') return inA & inB;
    if (selectedGate === 'OR') return inA | inB;
    if (selectedGate === 'NAND') return (inA & inB) ? 0 : 1;
    if (selectedGate === 'NOR') return (inA | inB) ? 0 : 1;
    if (selectedGate === 'XOR') return inA ^ inB;
    return muxSel === 0 ? inA : inB; // 2:1 MUX
  };
  const gateOut = evalGateOutput();

  // FIFO Controls
  const handleFifoWrite = () => {
    if (fifoQueue.length >= 8) return;
    const hex = '0xC' + fifoNextVal.toString(16).toUpperCase();
    setFifoQueue([...fifoQueue, hex]);
    setFifoNextVal(fifoNextVal + 1);
  };
  const handleFifoRead = () => {
    if (fifoQueue.length === 0) return;
    setLastReadVal(fifoQueue[0]);
    setFifoQueue(fifoQueue.slice(1));
  };

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const toggleTopicStatus = (mIdx, wIdx, tIdx) => {
    const updated = [...roadmap];
    const current = updated[mIdx].weeks[wIdx].topics[tIdx].status;
    updated[mIdx].weeks[wIdx].topics[tIdx].status =
      current === 'todo' ? 'doing' : current === 'doing' ? 'done' : 'todo';
    setRoadmap(updated);
  };

  const allTopics = roadmap.flatMap(m => m.weeks.flatMap(w => w.topics));
  const doneCount = allTopics.filter(t => t.status === 'done').length;
  const doingCount = allTopics.filter(t => t.status === 'doing').length;
  const progressPct = Math.round((doneCount / allTopics.length) * 100);

  const filteredCards = cardFilter === 'All' ? cards : cards.filter(c => c.category === cardFilter);
  const currentCard = filteredCards[cardIdx % Math.max(1, filteredCards.length)];

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handlePrintFullCheatSheet = () => {
    const win = window.open('', '_blank');
    if (!win) return;
    const chaptersHtml = CLASSROOM_MODULES.map(m => `
      <div class="box">
        <h3>${m.chapter}: ${m.title}</h3>
        <p><strong>Real-Life Analogy:</strong> ${m.analogy}</p>
        <p class="te"><strong>${m.telugu}</strong></p>
        <pre>${m.example}</pre>
        <p><strong>Industrial Application:</strong> ${m.industrial}</p>
        ${m.interviews.map(iv => `<p><strong>Interview Q: ${iv.q}</strong><br/>Ans: ${iv.a}</p>`).join('')}
      </div>
    `).join('');

    const formulasHtml = vlsiFormulas.map(f =>
      `<div class="box"><strong>${f.subject} [${f.tag}]:</strong><br/><code>${f.formula}</code></div>`
    ).join('');

    const htmlContent = `
      <html>
      <head>
        <title>Uday Kiran - Complete Bilingual VLSI Classroom & Interview Book</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 24px; color: #0f172a; line-height: 1.55; }
          h1 { color: #0284c7; border-bottom: 2px solid #0284c7; padding-bottom: 8px; }
          h2 { color: #0f172a; margin-top: 24px; background: #e0f2fe; padding: 8px 12px; border-left: 4px solid #0284c7; }
          h3 { color: #0369a1; margin: 6px 0; }
          .box { border: 1px solid #cbd5e1; border-radius: 8px; padding: 14px; margin-bottom: 14px; page-break-inside: avoid; }
          .te { background: #fef3c7; padding: 10px; border-radius: 6px; border-left: 4px solid #d97706; }
          pre { background: #0f172a; color: #f8fafc; padding: 12px; border-radius: 6px; white-space: pre-wrap; font-size: 12px; }
        </style>
      </head>
      <body>
        <h1>Maven Silicon VLSI Beginner-to-Industry Handbook — Kandregula Uday Kiran</h1>
        <h2>1. Chapter-by-Chapter Bilingual Lessons & Interview Q&A</h2>
        ${chaptersHtml}
        <h2>2. Core VLSI Equations & Timing Formulas</h2>
        ${formulasHtml}
        <script>window.onload = () => window.print();</script>
      </body>
      </html>
    `;
    win.document.write(htmlContent);
    win.document.close();
  };

  const handleLocalPdfUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLocalPdfUrl(URL.createObjectURL(file));
      setLocalPdfName(file.name);
    }
  };

  const handleSaveNewItem = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newBody.trim()) return;
    if (newItemType === 'snippet') {
      setSnippets([{ id: 's_' + Date.now(), title: newTitle, lang: newLang, note: newTelugu || 'Custom RTL Note', code: newBody }, ...snippets]);
      setActiveTab('vault');
      setVaultSubTab('code');
    } else if (newItemType === 'card') {
      setCards([...cards, { id: 'f_' + Date.now(), category: newLang, q: newTitle, a: newBody, te: newTelugu || 'తెలుగు నోట్ జోడించబడింది.' }]);
      setActiveTab('cards');
    } else if (newItemType === 'pdf') {
      setPdfVault([{ id: 'p_' + Date.now(), title: newTitle, category: newLang, summary: newTelugu || 'Custom Study PDF', url: newBody }, ...pdfVault]);
      setActiveTab('vault');
      setVaultSubTab('pdf');
    }
    setNewTitle('');
    setNewBody('');
    setNewTelugu('');
    setShowAddModal(false);
  };

  const setupSlack = (Number(tClk) + Number(tSkew) - (Number(tCq) + Number(tComb) + Number(tSetup))).toFixed(2);
  const holdSlack = (Number(tCq) + Number(tComb) - (Number(tHold) + Number(tSkew))).toFixed(2);
  const maxFreqMHz = (1000 / Math.max(0.1, Number(tCq) + Number(tComb) + Number(tSetup) - Number(tSkew))).toFixed(1);
  const fifoDepth = Math.max(0, Math.ceil(Number(burstSize) * (1 - Number(fRd) / Math.max(1, Number(fWr)))));
  const quizCorrectCount = quizList.filter(q => selectedAnswers[q.id] === q.correct).length;

  const activeModule = CLASSROOM_MODULES[selectedChapterIdx];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center">
      <div className={`w-full ${mobilePreview ? 'max-w-md my-4 rounded-3xl border-4 border-slate-800 shadow-2xl overflow-hidden' : 'max-w-5xl'} bg-slate-950 flex flex-col min-h-screen relative`}>

        {/* Top App Header */}
        <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-base sm:text-lg tracking-tight text-white flex items-center gap-2">
                VLSI Interactive Classroom
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Zero to Industry
                </span>
              </h1>
              <p className="text-xs text-slate-400">Uday Kiran • Animated Telugu + English Maven Silicon Hub</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-2.5 py-1 rounded-full text-xs font-semibold">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Day {dailyTasks.streak}</span>
            </div>
            <button
              onClick={() => setMobilePreview(!mobilePreview)}
              className="hidden sm:flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-700 transition"
            >
              {mobilePreview ? <Maximize2 className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
              <span>{mobilePreview ? 'Full Width' : 'Phone View'}</span>
            </button>
          </div>
        </header>

        {/* Main Scrollable Content */}
        <main className="flex-1 px-4 pt-4 pb-24 overflow-y-auto space-y-5">

          {/* ============================================================== */}
          {/* TAB 1: INTERACTIVE ANIMATED CLASSROOM (TELUGU + ENGLISH)       */}
          {/* ============================================================== */}
          {activeTab === 'learn' && (
            <div className="space-y-5">
              {/* Chapter Selector Pills */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2.5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Maven Silicon Step-by-Step Modules (Click Any Chapter)
                  </span>
                  <button
                    onClick={handlePrintFullCheatSheet}
                    className="flex items-center gap-1.5 text-xs bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 px-3 py-1 rounded-xl border border-cyan-500/30 font-semibold"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Download All Chapters as PDF</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {CLASSROOM_MODULES.map((mod, idx) => (
                    <button
                      key={mod.id}
                      onClick={() => { setSelectedChapterIdx(idx); setOpenQaKey(null); }}
                      className={`text-left p-2.5 rounded-xl border transition ${
                        selectedChapterIdx === idx
                          ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md shadow-cyan-500/10'
                          : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-[10px] font-bold uppercase text-cyan-400">{mod.chapter}</div>
                      <div className="text-xs font-semibold mt-0.5 line-clamp-1">{mod.title}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* LIVE INTERACTIVE ANIMATED VISUALIZER FOR CURRENT CHAPTER */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 border border-cyan-500/30 rounded-2xl p-4 space-y-4 shadow-lg">
                <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-2.5">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">
                      Interactive Hardware Simulator • Click Buttons Below to Experiment!
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-white">
                      {activeModule.chapter}: {activeModule.title}
                    </h2>
                  </div>
                </div>

                {/* SIMULATOR A: ASIC DESIGN FLOW ANIMATOR */}
                {activeModule.simulator === 'asic' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-xs text-slate-300">
                        Click any stage or press <strong>Auto-Animate Flow</strong> to watch how an idea becomes a chip:
                      </span>
                      <button
                        onClick={() => setAsicAutoPlay(!asicAutoPlay)}
                        className="flex items-center gap-1.5 text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl transition"
                      >
                        {asicAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        <span>{asicAutoPlay ? 'Pause Animation' : 'Auto-Animate Flow'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {ASIC_STAGES.map((st, idx) => {
                        const isCurrent = asicStep === idx;
                        const isPassed = idx < asicStep;
                        return (
                          <button
                            key={st.step}
                            onClick={() => { setAsicAutoPlay(false); setAsicStep(idx); }}
                            className={`p-2.5 rounded-xl border text-left transition-all duration-300 ${
                              isCurrent
                                ? 'bg-cyan-500/25 border-cyan-400 scale-[1.02] shadow-lg shadow-cyan-500/20'
                                : isPassed
                                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
                                : 'bg-slate-950 border-slate-800 text-slate-400'
                            }`}
                          >
                            <div className="flex items-center justify-between text-[10px] font-bold">
                              <span className={isCurrent ? 'text-cyan-300' : 'text-slate-400'}>STEP {st.step}</span>
                              {isCurrent && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />}
                            </div>
                            <div className="text-xs font-bold text-white mt-1">{st.name}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">{st.tool}</div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-sm font-bold text-cyan-300">
                          Stage {ASIC_STAGES[asicStep].step}: {ASIC_STAGES[asicStep].name} ({ASIC_STAGES[asicStep].role})
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono">
                          EDA Tool: {ASIC_STAGES[asicStep].tool}
                        </span>
                      </div>
                      <p className="text-xs text-slate-200">{ASIC_STAGES[asicStep].desc}</p>
                      <p className="text-xs text-amber-200 bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-lg">
                        <strong>తెలుగు:</strong> {ASIC_STAGES[asicStep].te}
                      </p>
                    </div>
                  </div>
                )}

                {/* SIMULATOR B: 4-BIT 2s COMPLEMENT & SIGNED OVERFLOW VISUALIZER */}
                {activeModule.simulator === 'twos' && (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 items-center justify-between">
                      <span className="text-xs text-slate-300">
                        Tap the <strong>0 / 1</strong> buttons below or try a preset test case:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        <button
                          onClick={() => { setBitsA([0, 1, 0, 1]); setBitsB([0, 1, 0, 0]); }}
                          className="text-[11px] bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/40 px-2.5 py-1 rounded-lg font-semibold"
                        >
                          Overflow Demo (+5 + +4)
                        </button>
                        <button
                          onClick={() => { setBitsA([0, 1, 0, 1]); setBitsB([1, 1, 1, 0]); }}
                          className="text-[11px] bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-500/40 px-2.5 py-1 rounded-lg font-semibold"
                        >
                          Safe Demo (+5 + -2)
                        </button>
                        <button
                          onClick={() => { setBitsA([1, 0, 1, 1]); setBitsB([1, 1, 0, 0]); }}
                          className="text-[11px] bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 px-2.5 py-1 rounded-lg font-semibold"
                        >
                          Negative Overflow (-5 + -4)
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Input A */}
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="font-bold text-cyan-300">Number A (Click bits to flip)</span>
                          <span className="font-mono font-bold text-white">Decimal = {valA >= 0 ? `+${valA}` : valA}</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {bitsA.map((b, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                const next = [...bitsA];
                                next[i] = next[i] === 0 ? 1 : 0;
                                setBitsA(next);
                              }}
                              className={`py-2.5 rounded-xl font-mono text-base font-extrabold border transition ${
                                b === 1
                                  ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-md shadow-cyan-500/30'
                                  : 'bg-slate-900 text-slate-300 border-slate-700'
                              }`}
                            >
                              <div>{b}</div>
                              <div className="text-[9px] font-normal opacity-80">{i === 0 ? 'MSB (-8)' : `+${Math.pow(2, 3 - i)}`}</div>
                            </button>
                          ))}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          1s Comp of A = <span className="text-amber-300">{onesCompA.join('')}</span> | 2s Comp (-A) = <span className="text-emerald-300">{twosCompA.join('')}</span>
                        </div>
                      </div>

                      {/* Input B */}
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="font-bold text-purple-300">Number B (Click bits to flip)</span>
                          <span className="font-mono font-bold text-white">Decimal = {valB >= 0 ? `+${valB}` : valB}</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {bitsB.map((b, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                const next = [...bitsB];
                                next[i] = next[i] === 0 ? 1 : 0;
                                setBitsB(next);
                              }}
                              className={`py-2.5 rounded-xl font-mono text-base font-extrabold border transition ${
                                b === 1
                                  ? 'bg-purple-500 text-slate-950 border-purple-300 shadow-md shadow-purple-500/30'
                                  : 'bg-slate-900 text-slate-300 border-slate-700'
                              }`}
                            >
                              <div>{b}</div>
                              <div className="text-[9px] font-normal opacity-80">{i === 0 ? 'MSB (-8)' : `+${Math.pow(2, 3 - i)}`}</div>
                            </button>
                          ))}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          True Math Sum = <span className="text-white font-bold">{valA + valB}</span> (4-bit safe range: -8 to +7)
                        </div>
                      </div>
                    </div>

                    {/* Sum & Live Signed Overflow Banner */}
                    <div className={`p-3.5 rounded-xl border ${addResult.overflow ? 'bg-rose-950/40 border-rose-500' : 'bg-emerald-950/30 border-emerald-500/50'}`}>
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="text-xs font-mono">
                          <span className="text-slate-300">4-Bit Hardware Sum: </span>
                          <span className="text-base font-extrabold text-white tracking-widest">{addResult.sum.join('')}</span>
                          <span className="ml-2 text-cyan-300">(Chip reads this as {valSum >= 0 ? `+${valSum}` : valSum})</span>
                        </div>
                        <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${addResult.overflow ? 'bg-rose-500 text-white animate-pulse' : 'bg-emerald-500 text-slate-950'}`}>
                          {addResult.overflow ? '⚠️ SIGNED OVERFLOW DETECTED!' : '✓ NO OVERFLOW (VALID ANSWER)'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-200 mt-2">
                        Carry into MSB = <code>{addResult.cInMsb}</code> | Carry out of MSB = <code>{addResult.cOutMsb}</code> →{' '}
                        <code>Overflow = {addResult.cInMsb} XOR {addResult.cOutMsb} = {addResult.overflow ? 1 : 0}</code>.{' '}
                        {addResult.overflow
                          ? 'Because the true sum (' + (valA + valB) + ') is outside -8..+7, the MSB sign bit flipped wrongly!'
                          : 'Result fits cleanly inside 4-bit signed range (-8 to +7).'}
                      </p>
                    </div>
                  </div>
                )}

                {/* SIMULATOR C: LOGIC GATES & UNIVERSAL 2:1 MUX SWITCHBOARD */}
                {activeModule.simulator === 'mux_gates' && (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {['MUX21', 'AND', 'OR', 'NAND', 'NOR', 'XOR'].map(g => (
                        <button
                          key={g}
                          onClick={() => setSelectedGate(g)}
                          className={`text-xs px-3 py-1.5 rounded-xl font-bold border transition ${
                            selectedGate === g
                              ? 'bg-cyan-500 text-slate-950 border-cyan-300'
                              : 'bg-slate-950 text-slate-300 border-slate-800'
                          }`}
                        >
                          {g === 'MUX21' ? '2:1 Multiplexer (Railway Switch)' : `${g} Gate`}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
                      {/* Inputs */}
                      <div className="space-y-2">
                        <button
                          onClick={() => setInA(inA === 0 ? 1 : 0)}
                          className={`w-full py-2.5 px-3 rounded-xl font-mono text-xs font-bold border flex justify-between items-center ${
                            inA === 1 ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-slate-900 border-slate-700 text-slate-400'
                          }`}
                        >
                          <span>{selectedGate === 'MUX21' ? 'Input I0 (A)' : 'Input A'}</span>
                          <span className="text-base">{inA}</span>
                        </button>

                        <button
                          onClick={() => setInB(inB === 0 ? 1 : 0)}
                          className={`w-full py-2.5 px-3 rounded-xl font-mono text-xs font-bold border flex justify-between items-center ${
                            inB === 1 ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-slate-900 border-slate-700 text-slate-400'
                          }`}
                        >
                          <span>{selectedGate === 'MUX21' ? 'Input I1 (B)' : 'Input B'}</span>
                          <span className="text-base">{inB}</span>
                        </button>

                        {selectedGate === 'MUX21' && (
                          <button
                            onClick={() => setMuxSel(muxSel === 0 ? 1 : 0)}
                            className="w-full py-2.5 px-3 rounded-xl font-mono text-xs font-bold border bg-amber-500/20 border-amber-400 text-amber-300 flex justify-between items-center"
                          >
                            <span>Select Line (S)</span>
                            <span className="text-base">{muxSel}</span>
                          </button>
                        )}
                      </div>

                      {/* Animated Hardware Block */}
                      <div className="text-center p-4 rounded-2xl bg-slate-900 border-2 border-cyan-500/40 space-y-1">
                        <div className="text-[10px] uppercase tracking-wider text-cyan-400 font-bold">Silicon Block</div>
                        <div className="text-lg font-extrabold text-white">{selectedGate === 'MUX21' ? '2 : 1 MUX' : `${selectedGate} GATE`}</div>
                        <div className="text-xs font-mono text-slate-300">
                          {selectedGate === 'MUX21'
                            ? `S=${muxSel} → Routes ${muxSel === 0 ? 'I0' : 'I1'} to Y`
                            : `F = ${inA} ${selectedGate} ${inB}`}
                        </div>
                      </div>

                      {/* Glowing Output Bulb */}
                      <div className={`p-4 rounded-2xl border-2 text-center transition-all duration-300 ${
                        gateOut === 1
                          ? 'bg-emerald-500/25 border-emerald-400 shadow-lg shadow-emerald-500/25'
                          : 'bg-slate-900 border-slate-800'
                      }`}>
                        <div className="text-xs uppercase font-bold text-slate-300">Output Wire (Y)</div>
                        <div className={`text-3xl font-mono font-extrabold mt-1 ${gateOut === 1 ? 'text-emerald-300' : 'text-slate-500'}`}>
                          {gateOut}
                        </div>
                        <div className="text-[11px] text-slate-300 mt-1">
                          {gateOut === 1 ? 'HIGH (VDD = 1.0V ON)' : 'LOW (GND = 0V OFF)'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SIMULATOR D: LIVE 8-SLOT SYNCHRONOUS FIFO QUEUE */}
                {activeModule.simulator === 'fifo' && (
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex gap-2">
                        <button
                          onClick={handleFifoWrite}
                          disabled={fifoQueue.length >= 8}
                          className="text-xs bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-bold px-3.5 py-2 rounded-xl transition"
                        >
                          + Write Data (wr_en = 1)
                        </button>
                        <button
                          onClick={handleFifoRead}
                          disabled={fifoQueue.length === 0}
                          className="text-xs bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold px-3.5 py-2 rounded-xl transition"
                        >
                          → Read Data (rd_en = 1)
                        </button>
                        <button
                          onClick={() => { setFifoQueue([]); setLastReadVal('-'); }}
                          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-xl border border-slate-700"
                        >
                          Reset rst_n
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className={`px-2.5 py-1 rounded-lg border font-bold ${fifoQueue.length === 0 ? 'bg-amber-500/25 border-amber-400 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                          EMPTY = {fifoQueue.length === 0 ? 1 : 0}
                        </span>
                        <span className={`px-2.5 py-1 rounded-lg border font-bold ${fifoQueue.length === 8 ? 'bg-rose-500/25 border-rose-400 text-rose-300 animate-pulse' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                          FULL = {fifoQueue.length === 8 ? 1 : 0}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                      {Array.from({ length: 8 }).map((_, slotIdx) => {
                        const val = fifoQueue[slotIdx];
                        return (
                          <div
                            key={slotIdx}
                            className={`p-2.5 rounded-xl border text-center font-mono transition-all ${
                              val
                                ? 'bg-cyan-500/20 border-cyan-400 text-white'
                                : 'bg-slate-900/60 border-slate-800 text-slate-600'
                            }`}
                          >
                            <div className="text-[9px] text-slate-400">Slot {slotIdx}</div>
                            <div className="text-xs font-bold mt-1">{val || '---'}</div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex justify-between text-xs text-slate-300 font-mono bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
                      <span>Count: <strong>{fifoQueue.length} / 8</strong> words</span>
                      <span>Last Read Output (`dout`): <strong className="text-emerald-400">{lastReadVal}</strong></span>
                    </div>
                  </div>
                )}
              </div>

              {/* DETAILED LESSON CARDS: ANALOGY + TELUGU + EXAMPLE + INDUSTRIAL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                    1. Zero-Fear Real-Life Story
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {activeModule.analogy}
                  </p>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    2. తెలుగులో సులభమైన వివరణ (Easy Telugu Explanation)
                  </span>
                  <p className="text-xs sm:text-sm text-amber-100 whitespace-pre-line leading-relaxed">
                    {activeModule.telugu}
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                  3. Step-by-Step Worked Example (Exam Style)
                </span>
                <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-100 whitespace-pre-wrap leading-relaxed">
                  {activeModule.example}
                </pre>
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs text-purple-200 leading-relaxed">
                  <strong className="text-purple-300">4. Real Semiconductor Industry Usage: </strong>
                  {activeModule.industrial}
                </div>
              </div>

              {/* INTERVIEW QUESTIONS FOR THIS SPECIFIC CHAPTER */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  5. Must-Prepare Placement Interview Questions ({activeModule.chapter})
                </span>
                <div className="space-y-2.5">
                  {activeModule.interviews.map((iv, idx) => {
                    const key = `${activeModule.id}_${idx}`;
                    const isOpen = openQaKey === key;
                    return (
                      <div key={key} className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
                        <button
                          onClick={() => setOpenQaKey(isOpen ? null : key)}
                          className="w-full text-left p-3.5 flex items-center justify-between gap-2 hover:bg-slate-900/70 transition"
                        >
                          <span className="text-xs sm:text-sm font-semibold text-white">
                            Q{idx + 1}: {iv.q}
                          </span>
                          <span className="text-[11px] text-cyan-400 font-bold shrink-0">
                            {isOpen ? 'Hide Answer' : 'Show Answer'}
                          </span>
                        </button>
                        {isOpen && (
                          <div className="px-3.5 pb-3.5 pt-1 text-xs text-emerald-200 border-t border-slate-800/80 leading-relaxed">
                            <strong className="text-emerald-400">Model Interview Answer: </strong>
                            {iv.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: 90-DAY MAVEN SILICON + VERILOG/SV/UVM TRACKER           */}
          {/* ============================================================== */}
          {activeTab === 'roadmap' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">Zero-to-VLSI Engineer Tracker</span>
                        <h2 className="text-lg font-bold text-white">Overall Mastery: {progressPct}%</h2>
                      </div>
                      <div className="text-right text-xs text-slate-400">
                        <div><span className="text-emerald-400 font-bold">{doneCount}</span> Done</div>
                        <div><span className="text-amber-400 font-bold">{doingCount}</span> Learning</div>
                      </div>
                    </div>
                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-300"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        Today's Step-by-Step Habit
                      </span>
                      <button
                        onClick={() => setDailyTasks({ streak: dailyTasks.streak + 1, concept2h: false, coding2h: false, mock2h: false })}
                        className="text-[11px] bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 px-2.5 py-0.5 rounded-md border border-cyan-500/30"
                      >
                        + Finish Day & Add Streak
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        { key: 'concept2h', label: '1 Chapter in Animated Classroom + Notes' },
                        { key: 'coding2h', label: 'Practice 2 Examples / EDA Playground' },
                        { key: 'mock2h', label: 'Speak Interview Q&As Aloud (Telugu + Eng)' }
                      ].map(item => (
                        <button
                          key={item.key}
                          onClick={() => setDailyTasks({ ...dailyTasks, [item.key]: !dailyTasks[item.key] })}
                          className={`flex items-center gap-2 p-2.5 rounded-xl border text-left text-xs transition ${
                            dailyTasks[item.key]
                              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200'
                              : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <CheckCircle2 className={`w-4 h-4 shrink-0 ${dailyTasks[item.key] ? 'text-emerald-400' : 'text-slate-600'}`} />
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Focus Timer */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Focus Timer</span>
                    <div className="flex gap-1">
                      {[15, 25, 50].map(mins => (
                        <button
                          key={mins}
                          onClick={() => { setTimerRunning(false); setTimerSeconds(mins * 60); }}
                          className="text-[11px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                        >
                          {mins}m
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between my-1">
                    <span className="text-3xl font-mono font-bold text-teal-400 tracking-tight">
                      {formatTimer(timerSeconds)}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setTimerRunning(!timerRunning)}
                        className="flex items-center gap-1 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-xl transition"
                      >
                        {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        <span>{timerRunning ? 'Pause' : 'Start'}</span>
                      </button>
                      <button
                        onClick={() => { setTimerRunning(false); setTimerSeconds(25 * 60); }}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">
                      Active Study Topic:
                    </label>
                    <select
                      value={linkedTopic}
                      onChange={(e) => setLinkedTopic(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200"
                    >
                      {allTopics.map(t => (
                        <option key={t.id} value={t.title}>{t.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {roadmap.map((monthObj, mIdx) => (
                <div key={mIdx} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-4">
                  <h3 className="font-bold text-sm sm:text-base text-cyan-300 border-b border-slate-800 pb-2">
                    {monthObj.month}
                  </h3>
                  {monthObj.weeks.map((weekObj, wIdx) => (
                    <div key={wIdx} className="space-y-2">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {weekObj.week}
                      </h4>
                      <div className="space-y-1.5">
                        {weekObj.topics.map((topic, tIdx) => (
                          <div
                            key={topic.id}
                            onClick={() => toggleTopicStatus(mIdx, wIdx, tIdx)}
                            className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-950/70 hover:bg-slate-800/60 border border-slate-800/80 cursor-pointer transition"
                          >
                            <div className="flex items-center gap-2.5">
                              <span
                                className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                                  topic.status === 'done'
                                    ? 'bg-emerald-400'
                                    : topic.status === 'doing'
                                    ? 'bg-amber-400'
                                    : 'bg-slate-700'
                                }`}
                              />
                              <span className={`text-xs sm:text-sm ${topic.status === 'done' ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                                {topic.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                                {topic.tag}
                              </span>
                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${
                                  topic.status === 'done'
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                    : topic.status === 'doing'
                                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                    : 'bg-slate-800 text-slate-400'
                                }`}
                              >
                                {topic.status === 'done' ? 'Revised' : topic.status === 'doing' ? 'Learning' : 'To Learn'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: VLSI WRITTEN TEST QUIZ & FORMULA CHEAT SHEET            */}
          {/* ============================================================== */}
          {activeTab === 'quiz' && (
            <div className="space-y-5">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold">VLSI Formula Tracker</span>
                    <h3 className="text-base font-bold text-white">Must-Know Equations (Overflow, STA, CMOS, FIFO & MUX)</h3>
                  </div>
                  <button
                    onClick={handlePrintFullCheatSheet}
                    className="flex items-center gap-1.5 text-xs bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 px-3 py-1.5 rounded-xl font-semibold"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Export Full PDF</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {vlsiFormulas.map((mod, idx) => (
                    <div
                      key={mod.id}
                      onClick={() => {
                        const updated = [...vlsiFormulas];
                        updated[idx].done = !updated[idx].done;
                        setVlsiFormulas(updated);
                      }}
                      className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 cursor-pointer transition space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className={`w-4 h-4 ${mod.done ? 'text-emerald-400' : 'text-slate-600'}`} />
                          <span className={`text-xs sm:text-sm font-bold ${mod.done ? 'line-through text-slate-500' : 'text-white'}`}>
                            {mod.subject}
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                          {mod.tag}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-cyan-300 pl-6">{mod.formula}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold">Written Exam Simulator</span>
                    <h3 className="text-base font-bold text-white">VLSI Placement MCQ Quiz</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-lg font-bold">
                      Score: {quizCorrectCount} / {quizList.length}
                    </span>
                    <button
                      onClick={() => setSelectedAnswers({})}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                {quizList.map((qItem, qIdx) => {
                  const chosen = selectedAnswers[qItem.id];
                  const answered = chosen !== undefined;
                  return (
                    <div key={qItem.id} className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                        Q{qIdx + 1} • {qItem.topic}
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">{qItem.question}</p>
                      <div className="space-y-2">
                        {qItem.options.map((opt, oIdx) => {
                          const isThisSelected = chosen === oIdx;
                          const isThisCorrect = qItem.correct === oIdx;
                          let btnStyle = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-cyan-500/50';
                          if (answered) {
                            if (isThisCorrect) btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold';
                            else if (isThisSelected) btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                          }
                          return (
                            <button
                              key={oIdx}
                              onClick={() => setSelectedAnswers({ ...selectedAnswers, [qItem.id]: oIdx })}
                              className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs transition flex items-center justify-between ${btnStyle}`}
                            >
                              <span>{String.fromCharCode(65 + oIdx)}. {opt}</span>
                              {answered && isThisCorrect && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                      {answered && (
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                          <strong className="text-cyan-400">Step-by-Step Solution: </strong>{qItem.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: CODE VAULT, FLASHCARDS & LOCAL PDF READER               */}
          {/* ============================================================== */}
          {activeTab === 'vault' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800">
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'code', label: 'RTL & SV Code', icon: Code },
                    { id: 'pdf', label: 'VLSI PDF Vault', icon: FileText },
                    { id: 'cards', label: 'Bilingual Flashcards', icon: Layers }
                  ].map(sub => {
                    const SubIcon = sub.icon;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => setVaultSubTab(sub.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                          vaultSubTab === sub.id ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <SubIcon className="w-3.5 h-3.5" />
                        <span>{sub.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrintFullCheatSheet}
                    className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-700"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Handbook</span>
                  </button>
                  <button
                    onClick={() => {
                      setNewItemType(vaultSubTab === 'pdf' ? 'pdf' : vaultSubTab === 'cards' ? 'card' : 'snippet');
                      setShowAddModal(true);
                    }}
                    className="flex items-center gap-1 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold px-3 py-1.5 rounded-xl"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New</span>
                  </button>
                </div>
              </div>

              {vaultSubTab === 'code' && (
                <>
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search Verilog, FIFO, FSM, Constraints..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  {snippets
                    .filter(s =>
                      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      s.lang.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      s.code.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map(snip => (
                      <div key={snip.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                                {snip.lang}
                              </span>
                              <h3 className="font-bold text-sm text-white">{snip.title}</h3>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">{snip.note}</p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleCopy(snip.id, snip.code)}
                              className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-700"
                            >
                              {copiedId === snip.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{copiedId === snip.id ? 'Copied' : 'Copy'}</span>
                            </button>
                            {snip.id.startsWith('s_') && (
                              <button onClick={() => setSnippets(snippets.filter(item => item.id !== snip.id))} className="p-1.5 text-slate-400 hover:text-rose-400">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                        <pre className="p-4 text-xs font-mono text-cyan-100 bg-slate-950/90 overflow-x-auto leading-relaxed">
                          <code>{snip.code}</code>
                        </pre>
                      </div>
                    ))}
                </>
              )}

              {vaultSubTab === 'pdf' && (
                <div className="space-y-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-sm text-white flex items-center gap-2">
                        <Upload className="w-4 h-4 text-cyan-400" />
                        Open Local VLSI Study PDF Inside App
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Select any downloaded study module or Maven Silicon PDF to read directly here.
                      </p>
                    </div>
                    <label className="cursor-pointer bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold px-4 py-2 rounded-xl shrink-0">
                      Choose PDF File
                      <input type="file" accept="application/pdf" onChange={handleLocalPdfUpload} className="hidden" />
                    </label>
                  </div>

                  {localPdfUrl && (
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                      <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                        <span className="text-xs font-bold text-cyan-300 truncate">{localPdfName}</span>
                        <button onClick={() => setLocalPdfUrl(null)} className="text-xs text-rose-400 hover:underline">Close Reader</button>
                      </div>
                      <iframe src={localPdfUrl} title="PDF Reader" className="w-full h-[480px] border-0" />
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {pdfVault.map(pdf => (
                      <div key={pdf.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                        <div>
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                            {pdf.category}
                          </span>
                          <h4 className="font-bold text-sm text-white mt-2">{pdf.title}</h4>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">{pdf.summary}</p>
                        </div>
                        <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                          {pdf.url ? (
                            <a href={pdf.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1.5 rounded-xl font-semibold">
                              <ExternalLink className="w-3.5 h-3.5" /> Open Cloud PDF
                            </a>
                          ) : (
                            <button onClick={handlePrintFullCheatSheet} className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 px-3 py-1.5 rounded-xl border border-slate-700 font-semibold">
                              <Printer className="w-3.5 h-3.5" /> Print / Save as PDF
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {vaultSubTab === 'cards' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {['All', 'Digital', 'STA', 'Verilog', 'SystemVerilog', 'UVM'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => { setCardFilter(cat); setCardIdx(0); setFlipped(false); }}
                        className={`text-xs px-3 py-1.5 rounded-xl font-medium transition ${
                          cardFilter === cat ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-300 border border-slate-800'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {currentCard && (
                    <div
                      onClick={() => setFlipped(!flipped)}
                      className="cursor-pointer select-none bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border-2 border-slate-800 hover:border-cyan-500/50 rounded-3xl p-6 min-h-[250px] flex flex-col justify-between transition shadow-xl"
                    >
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold">
                          {currentCard.category}
                        </span>
                        <span>Card {(cardIdx % filteredCards.length) + 1} of {filteredCards.length} • Tap to Flip</span>
                      </div>

                      {!flipped ? (
                        <div className="my-auto py-6 text-center space-y-3">
                          <span className="text-[11px] uppercase tracking-widest text-cyan-400 font-semibold">Interview Question</span>
                          <h3 className="text-base sm:text-xl font-bold text-white leading-snug">{currentCard.q}</h3>
                        </div>
                      ) : (
                        <div className="my-auto py-4 space-y-3">
                          <p className="text-xs sm:text-sm text-slate-100 whitespace-pre-line leading-relaxed">{currentCard.a}</p>
                          {currentCard.te && (
                            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 leading-relaxed">
                              {currentCard.te}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => { setFlipped(false); setCardIdx((cardIdx - 1 + filteredCards.length) % filteredCards.length); }}
                          className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-xl"
                        >
                          <ChevronLeft className="w-4 h-4" /> Prev
                        </button>
                        <button onClick={() => setFlipped(!flipped)} className="flex items-center gap-1 text-xs text-cyan-300 font-semibold">
                          <RotateCcw className="w-3.5 h-3.5" /> {flipped ? 'Question' : 'Answer'}
                        </button>
                        <button
                          onClick={() => { setFlipped(false); setCardIdx((cardIdx + 1) % filteredCards.length); }}
                          className="flex items-center gap-1 text-xs bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1.5 rounded-xl font-semibold"
                        >
                          Next <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 5: STA / FIFO CALCULATOR LAB & MAVEN SILICON PROJECTS      */}
          {/* ============================================================== */}
          {activeTab === 'lab' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <h3 className="font-bold text-sm text-cyan-300 flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Static Timing Analysis (STA) Calculator
                  </h3>
                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    {[
                      { label: 'Clock Period T_clk (ns)', val: tClk, set: setTClk },
                      { label: 'Clock-to-Q T_cq (ns)', val: tCq, set: setTCq },
                      { label: 'Combo Delay T_comb (ns)', val: tComb, set: setTComb },
                      { label: 'Setup Time T_su (ns)', val: tSetup, set: setTSetup },
                      { label: 'Hold Time T_hold (ns)', val: tHold, set: setTHold },
                      { label: 'Clock Skew T_skew (ns)', val: tSkew, set: setTSkew }
                    ].map((item, i) => (
                      <div key={i} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                        <label className="text-[11px] text-slate-400 block mb-1">{item.label}</label>
                        <input
                          type="number"
                          step="0.1"
                          value={item.val}
                          onChange={(e) => item.set(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white font-bold"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Setup Slack:</span>
                      <span className={`font-bold ${Number(setupSlack) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {setupSlack} ns ({Number(setupSlack) >= 0 ? 'MET' : 'VIOLATION!'})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Hold Slack:</span>
                      <span className={`font-bold ${Number(holdSlack) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {holdSlack} ns ({Number(holdSlack) >= 0 ? 'MET' : 'VIOLATION!'})
                      </span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-slate-800">
                      <span className="text-slate-400">Max Clock Frequency (F_max):</span>
                      <span className="font-bold text-cyan-300">{maxFreqMHz} MHz</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <h3 className="font-bold text-sm text-cyan-300 flex items-center gap-2">
                    <Layers className="w-4 h-4" /> Asynchronous FIFO Depth Calculator
                  </h3>
                  <div className="space-y-2.5 text-xs">
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      <label className="text-slate-400 block mb-1">Write Clock Frequency F_wr (MHz)</label>
                      <input type="number" value={fWr} onChange={(e) => setFWr(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white font-bold" />
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      <label className="text-slate-400 block mb-1">Read Clock Frequency F_rd (MHz)</label>
                      <input type="number" value={fRd} onChange={(e) => setFRd(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white font-bold" />
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      <label className="text-slate-400 block mb-1">Burst Length B (Words)</label>
                      <input type="number" value={burstSize} onChange={(e) => setBurstSize(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white font-bold" />
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                    <div className="text-slate-400">Formula: <code className="text-cyan-300">Depth = B × (1 - F_rd / F_wr)</code></div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-slate-300 font-semibold">Minimum FIFO Depth:</span>
                      <span className="text-base font-extrabold text-emerald-400">{fifoDepth} Words</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                  <Award className="w-4 h-4" />
                  <span>Maven Silicon Project 1: 1x3 Packet Router Verification (SV & UVM)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Architecture Summary:</strong> Accepts 8-bit packets on <code className="text-cyan-300">data_in</code> when <code className="text-cyan-300">pkt_valid</code> is high, decodes the 2-bit destination address (<code className="text-cyan-300">00, 01, 10</code>) from the Header byte, buffers payload bytes into 3 FIFOs (16x9), and verifies the final Parity byte.
                </p>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 leading-relaxed">
                  <strong>తెలుగులో ఇంటర్వ్యూ వివరణ:</strong> ఇందులో 3 బ్లాక్స్ ఉంటాయి: <strong>1) FSM Controller</strong>, <strong>2) Synchronizer</strong>, <strong>3) 3 FIFOs (16x9)</strong>. UVM లో 1 Source Agent మరియు 3 Destination Agents పెట్టి Small, Medium, Big ప్యాకెట్లు మరియు Bad Parity టెస్ట్ కేసులు రాశామని చెప్పండి.
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Floating Quick-Add Button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="fixed bottom-20 right-6 z-40 w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 text-white shadow-xl shadow-cyan-500/30 flex items-center justify-center hover:scale-105 transition"
          title="Add Custom Code, Flashcard, or PDF Link"
        >
          <Plus className="w-6 h-6" />
        </button>

        {/* Quick-Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <form onSubmit={handleSaveNewItem} className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-sm">Add to VLSI Classroom</h3>
                <button type="button" onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'snippet', label: 'RTL Code' },
                  { id: 'card', label: 'Flashcard' },
                  { id: 'pdf', label: 'PDF Link' }
                ].map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setNewItemType(t.id)}
                    className={`py-2 rounded-xl font-semibold border ${newItemType === t.id ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Title or Interview Question..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
              <select
                value={newLang}
                onChange={(e) => setNewLang(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              >
                {['Digital', 'CMOS', 'Verilog', 'SystemVerilog', 'UVM', 'STA', 'AMBA'].map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <textarea
                rows={4}
                required
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
                placeholder="Paste code, PDF URL, or interview answer..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
              <input
                type="text"
                value={newTelugu}
                onChange={(e) => setNewTelugu(e.target.value)}
                placeholder="తెలుగు వివరణ / Optional Note..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
              <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2.5 rounded-xl text-xs">
                Save to App
              </button>
            </form>
          </div>
        )}

        {/* Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 z-30 bg-slate-900/95 backdrop-blur border-t border-slate-800 flex justify-around py-2 px-2 max-w-5xl mx-auto">
          {[
            { id: 'learn', label: 'Classroom', icon: Sparkles },
            { id: 'roadmap', label: '90-Day Plan', icon: BookOpen },
            { id: 'quiz', label: 'VLSI Quiz', icon: HelpCircle },
            { id: 'vault', label: 'Code & PDF', icon: FileText },
            { id: 'lab', label: 'STA & Lab', icon: Cpu }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-medium transition ${
                  active ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}