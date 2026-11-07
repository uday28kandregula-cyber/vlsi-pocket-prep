import React, { useState, useEffect } from 'react';
import {
  BookOpen, Code, Layers, Cpu, Sparkles, CheckCircle2, Clock,
  Plus, Trash2, Copy, Check, ChevronRight, ChevronLeft, RotateCcw,
  Smartphone, Maximize2, Flame, Search, X, Zap, Award, FileText,
  HelpCircle, Play, Pause, RefreshCw, ExternalLink, Printer, Upload
} from 'lucide-react';

const INITIAL_ROADMAP = [
  {
    month: 'Month 1: Digital Electronics & Verilog (Days 1–30)',
    weeks: [
      {
        week: 'Week 1: Combinational Logic & Number Systems',
        topics: [
          { id: 'w1_1', title: '1s & 2s Complement, Signed Overflow & Hex/Binary', status: 'todo', tag: 'Digital' },
          { id: 'w1_2', title: 'Boolean Algebra, De-Morgan Laws & 4-Var K-Maps', status: 'todo', tag: 'Digital' },
          { id: 'w1_3', title: 'All Logic Gates & Latch Design using ONLY 2:1 MUX', status: 'todo', tag: 'Must-Ask' },
          { id: 'w1_4', title: 'Half/Full Adder, Carry Look-Ahead, Decoder, Priority Encoder', status: 'todo', tag: 'Digital' }
        ]
      },
      {
        week: 'Week 2: Sequential Circuits, FSM & STA Basics',
        topics: [
          { id: 'w2_1', title: 'Latch vs Flip-Flop, SR/JK/D/T Conversions', status: 'todo', tag: 'Digital' },
          { id: 'w2_2', title: 'Shift Registers, Ring vs Johnson Counter, Sync/Async Counters', status: 'todo', tag: 'Digital' },
          { id: 'w2_3', title: 'Setup & Hold Time Equations, Violations & Fixes', status: 'todo', tag: 'STA' },
          { id: 'w2_4', title: 'Mealy vs Moore FSM (1011 / 1101 Sequence Detector)', status: 'todo', tag: 'FSM' }
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
  { id: 'vf1', subject: 'Static Timing Analysis (Setup & Hold)', tag: 'STA', done: false, formula: 'Setup: T_clk + T_skew >= T_cq + T_comb + T_su | Hold: T_cq + T_comb >= T_hold + T_skew' },
  { id: 'vf2', subject: 'CMOS Power Dissipation (Dynamic & Static)', tag: 'CMOS', done: false, formula: 'P_total = α·C_L·V_DD²·f_clk + V_DD·I_sc + V_DD·I_leakage' },
  { id: 'vf3', subject: 'Asynchronous FIFO Depth & Pointer Math', tag: 'RTL / FIFO', done: false, formula: 'Depth = Burst × (1 - F_rd / F_wr) | Binary-to-Gray: G = B ^ (B >> 1)' },
  { id: 'vf4', subject: '2:1 MUX Universal Gate Count & Counters', tag: 'Digital', done: false, formula: 'NOT/AND/OR/Latch = 1 MUX | XOR/XNOR/NAND/NOR = 2 MUX | Ring = N states, Johnson = 2N states' },
  { id: 'vf5', subject: 'SystemVerilog Coverage & SVA Operators', tag: 'Verification', done: false, formula: '|-> Overlapping (Same Clk) | |=> Non-Overlapping (Next Clk) | Total Cov = Code + Functional' }
];

const INITIAL_QUIZ = [
  {
    id: 'q1',
    topic: 'Digital / MUX Design',
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
    topic: 'Static Timing Analysis (STA)',
    question: 'In a synchronous sequential circuit, T_cq = 1.5 ns, T_comb = 4.5 ns, T_setup = 1.0 ns, T_hold = 0.8 ns, and Clock Skew = +0.5 ns (capture clock delayed). What is the maximum operating clock frequency?',
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
    topic: 'FIFO Design',
    question: 'An Asynchronous FIFO has Write Clock = 100 MHz and Read Clock = 80 MHz. Up to 100 data words are written in a continuous burst without idle cycles. What is the minimum FIFO depth required?',
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
    explanation: 'Only run_phase() (and its 12 runtime sub-phases like reset_phase, main_phase) is a task that consumes simulation time (#delays, @posedge). All other phases are functions.'
  },
  {
    id: 'q6',
    topic: 'CMOS Fundamentals',
    question: 'Why are PMOS transistors used in the Pull-Up Network (PUN) and NMOS in the Pull-Down Network (PDN) of standard CMOS logic gates?',
    options: [
      'PMOS passes strong 0 and NMOS passes strong 1',
      'PMOS passes strong 1 (degraded 0) and NMOS passes strong 0 (degraded 1)',
      'PMOS has higher electron mobility than NMOS',
      'To increase sub-threshold leakage current'
    ],
    correct: 1,
    explanation: 'PMOS passes a strong logic 1 (V_DD) without threshold voltage drop, while NMOS passes a strong logic 0 (GND) without threshold drop.'
  }
];

const INITIAL_PDF_VAULT = [
  {
    id: 'p1',
    title: 'Digital Logic, 2:1 MUX & K-Map Master Cheat Sheet',
    category: 'Digital Design',
    summary: 'Complete 2s complement overflow formulas, MUX universal gate table, Flip-Flop conversions, and Mealy/Moore FSM templates.',
    url: ''
  },
  {
    id: 'p2',
    title: 'Static Timing Analysis (STA) & Async FIFO Formula Sheet',
    category: 'STA / Timing',
    summary: 'Setup & Hold slack equations with positive/negative skew, multi-cycle paths, CDC 2-FF synchronizers, and FIFO depth cases.',
    url: ''
  },
  {
    id: 'p3',
    title: 'SystemVerilog OOP, Constraints & UVM Phasing Handbook',
    category: 'SV & UVM',
    summary: 'Shallow vs Deep copy, Polymorphism, rand/dist/solve-before constraints, UVM Factory overrides, and TLM handshake.',
    url: ''
  },
  {
    id: 'p4',
    title: 'AMBA APB, AHB-Lite & AXI4 Protocol Timing Guide',
    category: 'AMBA Protocols',
    summary: 'APB state diagram, AHB pipelined burst transfers (INCR/WRAP), and AXI4 5-channel VALID/READY deadlock rules.',
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
    note: 'Standard 3-block or 2-block FSM template asked in 90% of written tests.',
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
    title: 'Top 5 SystemVerilog Constraints Asked in Interviews',
    lang: 'SystemVerilog',
    note: 'Covers odd/even, unique array elements, weighted distribution, and pattern 010101.',
    code: `class interview_packet;
  rand bit [7:0] addr;
  rand int       arr[];
  rand bit       pattern[10];

  // 1. Weighted distribution (:= vs :/)
  constraint c_addr {
    addr inside {[0:15], [100:120]};
    addr dist { [0:3] := 40, [4:7] :/ 60 };
  }

  // 2. Dynamic array size & ascending order with unique odd numbers
  constraint c_arr {
    arr.size() inside {[5:8]};
    unique {arr};
    foreach (arr[i]) {
      arr[i] inside {[1:50]};
      arr[i] % 2 == 1; // Odd numbers only
      if (i > 0) arr[i] > arr[i-1];
    }
  }

  // 3. Alternating 010101 pattern
  constraint c_pat {
    foreach (pattern[i]) pattern[i] == (i % 2);
  }
endclass`
  },
  {
    id: 's5',
    title: 'UVM Driver & Sequence Handshake Template',
    lang: 'UVM',
    note: 'Shows uvm_config_db virtual interface retrieval and get_next_item / item_done loop.',
    code: `class router_driver extends uvm_driver #(router_xtn);
  \`uvm_component_utils(router_driver)
  virtual router_if.DRV_MP vif;

  function new(string name="router_driver", uvm_component parent=null);
    super.new(name, parent);
  endfunction

  function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    if (!uvm_config_db#(virtual router_if)::get(this, "", "vif", vif))
      \`uvm_fatal("DRV", "Cannot get vif from uvm_config_db!")
  endfunction

  task run_phase(uvm_phase phase);
    forever begin
      seq_item_port.get_next_item(req);
      drive_to_dut(req);
      seq_item_port.item_done();
    end
  endtask
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
    a: 'Setup: Min time data must be stable BEFORE clock edge. Fix: Reduce combo delay, pipeline, upsize cells, or reduce clock freq (increase Tclk).\nHold: Min time data must be stable AFTER clock edge. Fix: Add buffers in data path (Hold is independent of clock frequency!).',
    te: 'తెలుగు: క్లాక్ ఎడ్జ్ కంటే ముందు డేటా స్థిరంగా ఉండాల్సిన సమయం Setup Time. క్లాక్ ఫ్రీక్వెన్సీ తగ్గించి Setup violation సరిచేయవచ్చు, కానీ Hold violation క్లాక్ ఫ్రీక్వెన్సీపై ఆధారపడదు (డేటా పాత్‌లో బఫర్లు యాడ్ చేయాలి).'
  },
  {
    id: 'f3',
    category: 'Verilog',
    q: 'Difference between Blocking (=) and Non-Blocking (<=) assignments?',
    a: 'Blocking (=) executes sequentially inside begin-end (used for combinational logic). Non-Blocking (<=) evaluates RHS immediately in Active region and updates LHS in NBA region at the end of time step (used for sequential flip-flops to prevent race conditions).',
    te: 'తెలుగు: Blocking (=) ఒకదాని తర్వాత ఒకటి జరుగుతుంది (Combinational circuits కి వాడతారు). Non-Blocking (<=) లో RHS ముందు లెక్కించబడి, క్లాక్ ఎడ్జ్ చివరిలో (NBA రీజియన్) LHS అప్‌డేట్ అవుతుంది (Sequential circuits కి వాడతారు).'
  },
  {
    id: 'f4',
    category: 'SystemVerilog',
    q: 'Difference between Shallow Copy and Deep Copy in SystemVerilog?',
    a: 'Shallow Copy (pkt2 = new pkt1) copies class properties of pkt1, automatic variables, and ONLY the handle (pointer) of nested sub-objects. Deep Copy uses a custom copy() method that explicitly calls new() for every nested sub-object so both objects are 100% independent.',
    te: 'తెలుగు: Shallow copy (`new pkt1`) కేవలం పైన ఉన్న వేరియబుల్స్ మాత్రమే కాపీ చేస్తుంది, లోపల ఉన్న ఆబ్జెక్ట్ హ్యాండిల్స్ రెండింటికీ ఒకటే ఉంటాయి. Deep copy లో ప్రతి లోపలి ఆబ్జెక్ట్‌కు విడిగా మెమరీ క్రియేట్ చేస్తాము.'
  },
  {
    id: 'f5',
    category: 'SystemVerilog',
    q: 'What happens if I have 100% Code Coverage but only 50% Functional Coverage?',
    a: 'It means every line/branch of RTL code was executed during simulation, directly proving no dead code exists—but half of the design requirement scenarios (corner cases, protocol bursts, cross-combinations in your testplan) were NEVER tested by the stimulus!',
    te: 'తెలుగు: 100% Code Coverage అంటే RTL లోని అన్ని లైన్లు రన్ అయ్యాయని అర్థం. కానీ 50% Functional Coverage మాత్రమే ఉందంటే, స్పెసిఫికేషన్ ప్రకారం మనం టెస్ట్ చేయాల్సిన సగం ఫీచర్లు/కార్నర్ కేసులు ఇంకా టెస్ట్ చేయలేదని అర్థం!'
  },
  {
    id: 'f6',
    category: 'UVM',
    q: 'Why is UVM build_phase() top-down while connect_phase() is bottom-up?',
    a: 'build_phase() is top-down because parent components (uvm_test -> uvm_env -> uvm_agent) must exist and set configuration parameters in uvm_config_db before child components are created. connect_phase() is bottom-up so all child TLM ports/exports exist before parents bind them.',
    te: 'తెలుగు: పేరెంట్ కంపోనెంట్ (Test/Env) ముందు క్రియేట్ అయ్యి config_db ద్వారా సెట్టింగ్స్ పాస్ చేయాలి కాబట్టి build_phase Top-Down గా నడుస్తుంది.'
  },
  {
    id: 'f7',
    category: 'AMBA',
    q: 'What is the deadlock rule for VALID and READY in AMBA AXI?',
    a: '1) A source (Master) is NOT permitted to wait for READY to be asserted before asserting VALID.\n2) Once VALID is asserted, it must remain asserted until the rising clock edge after READY is asserted.',
    te: 'తెలుగు: AXI ప్రోటోకాల్‌లో డెడ్‌లాక్ రాకుండా ఉండాలంటే, VALID సిగ్నల్ ఎప్పుడూ READY కోసం ఎదురుచూడకూడదు. ఒక్కసారి VALID=1 అయితే, హ్యాండ్‌షేక్ పూర్తయ్యే వరకు అది 1 గానే ఉండాలి.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('roadmap');
  const [mobilePreview, setMobilePreview] = useState(false);

  const [roadmap, setRoadmap] = useState(() => {
    const saved = localStorage.getItem('vlsi_roadmap_v2');
    return saved ? JSON.parse(saved) : INITIAL_ROADMAP;
  });

  const [dailyTasks, setDailyTasks] = useState(() => {
    const saved = localStorage.getItem('vlsi_daily_v2');
    return saved ? JSON.parse(saved) : {
      streak: 1,
      concept2h: false,
      coding2h: false,
      mock2h: false
    };
  });

  const [snippets, setSnippets] = useState(() => {
    const saved = localStorage.getItem('vlsi_snippets_v2');
    return saved ? JSON.parse(saved) : INITIAL_SNIPPETS;
  });

  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem('vlsi_cards_v2');
    return saved ? JSON.parse(saved) : INITIAL_FLASHCARDS;
  });

  const [vlsiFormulas, setVlsiFormulas] = useState(() => {
    const saved = localStorage.getItem('vlsi_formulas_only_v1');
    return saved ? JSON.parse(saved) : INITIAL_VLSI_FORMULAS;
  });

  const [quizList, setQuizList] = useState(() => {
    const saved = localStorage.getItem('vlsi_quiz_only_v1');
    return saved ? JSON.parse(saved) : INITIAL_QUIZ;
  });

  const [pdfVault, setPdfVault] = useState(() => {
    const saved = localStorage.getItem('vlsi_pdf_only_v1');
    return saved ? JSON.parse(saved) : INITIAL_PDF_VAULT;
  });

  // Focus Timer State (15m / 25m / 50m linked to VLSI topic)
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [linkedTopic, setLinkedTopic] = useState('1s & 2s Complement, Signed Overflow & Hex/Binary');

  // Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // PDF Viewer State
  const [localPdfUrl, setLocalPdfUrl] = useState(null);
  const [localPdfName, setLocalPdfName] = useState('');
  const [vaultSubTab, setVaultSubTab] = useState('code'); // 'code' or 'pdf'

  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [cardFilter, setCardFilter] = useState('All');
  const [copiedId, setCopiedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemType, setNewItemType] = useState('snippet');
  const [newTitle, setNewTitle] = useState('');
  const [newLang, setNewLang] = useState('Verilog');
  const [newBody, setNewBody] = useState('');
  const [newTelugu, setNewTelugu] = useState('');

  // STA & FIFO Lab States
  const [tClk, setTClk] = useState(10);
  const [tCq, setTCq] = useState(1.2);
  const [tComb, setTComb] = useState(6.5);
  const [tSetup, setTSetup] = useState(0.8);
  const [tHold, setTHold] = useState(0.5);
  const [tSkew, setTSkew] = useState(0.2);

  const [fWr, setFWr] = useState(100);
  const [fRd, setFRd] = useState(80);
  const [burstSize, setBurstSize] = useState(120);

  useEffect(() => { localStorage.setItem('vlsi_roadmap_v2', JSON.stringify(roadmap)); }, [roadmap]);
  useEffect(() => { localStorage.setItem('vlsi_daily_v2', JSON.stringify(dailyTasks)); }, [dailyTasks]);
  useEffect(() => { localStorage.setItem('vlsi_snippets_v2', JSON.stringify(snippets)); }, [snippets]);
  useEffect(() => { localStorage.setItem('vlsi_cards_v2', JSON.stringify(cards)); }, [cards]);
  useEffect(() => { localStorage.setItem('vlsi_formulas_only_v1', JSON.stringify(vlsiFormulas)); }, [vlsiFormulas]);
  useEffect(() => { localStorage.setItem('vlsi_quiz_only_v1', JSON.stringify(quizList)); }, [quizList]);
  useEffect(() => { localStorage.setItem('vlsi_pdf_only_v1', JSON.stringify(pdfVault)); }, [pdfVault]);

  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const toggleTopicStatus = (mIdx, wIdx, tIdx) => {
    const updated = [...roadmap];
    const current = updated[mIdx].weeks[wIdx].topics[tIdx].status;
    const next = current === 'todo' ? 'doing' : current === 'doing' ? 'done' : 'todo';
    updated[mIdx].weeks[wIdx].topics[tIdx].status = next;
    setRoadmap(updated);
  };

  const allTopics = roadmap.flatMap(m => m.weeks.flatMap(w => w.topics));
  const doneCount = allTopics.filter(t => t.status === 'done').length;
  const doingCount = allTopics.filter(t => t.status === 'doing').length;
  const progressPct = Math.round((doneCount / allTopics.length) * 100);

  const filteredCards = cardFilter === 'All'
    ? cards
    : cards.filter(c => c.category === cardFilter);

  const currentCard = filteredCards[cardIdx % Math.max(1, filteredCards.length)];

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handlePrintFullCheatSheet = () => {
    const win = window.open('', '_blank');
    if (!win) return;
    const htmlContent = `
      <html>
      <head>
        <title>Uday Kiran - VLSI ASIC Design & Verification Revision PDF</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 24px; color: #0f172a; line-height: 1.5; }
          h1 { color: #0284c7; border-bottom: 2px solid #0284c7; padding-bottom: 8px; }
          h2 { color: #0f172a; margin-top: 24px; background: #f1f5f9; padding: 8px 12px; border-left: 4px solid #0284c7; }
          .box { border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; margin-bottom: 12px; }
          pre { background: #0f172a; color: #f8fafc; padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px; }
        </style>
      </head>
      <body>
        <h1>VLSI ASIC Design & Verification Vault — Kandregula Uday Kiran</h1>
        <h2>1. Core VLSI, STA, FIFO & CMOS Formulas</h2>
        ${vlsiFormulas.map(f => `<div class="box"><strong>${f.subject} [${f.tag}]:</strong><br/><code>${f.formula}</code></div>`).join('')}
        <h2>2. VLSI Interview Flashcards (English + Telugu)</h2>
        ${cards.map(c => `<div class="box"><strong>Q [${c.category}]: ${c.q}</strong><br/>A: ${c.a}<br/><em>${c.te || ''}</em></div>`).join('')}
        <h2>3. Synthesizable RTL, SystemVerilog & UVM Code Vault</h2>
        ${snippets.map(s => `<div class="box"><strong>${s.title} (${s.lang})</strong><p>${s.note}</p><pre>${s.code}</pre></div>`).join('')}
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
      const url = URL.createObjectURL(file);
      setLocalPdfUrl(url);
      setLocalPdfName(file.name);
    }
  };

  const handleSaveNewItem = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newBody.trim()) return;
    if (newItemType === 'snippet') {
      setSnippets([
        {
          id: 's_' + Date.now(),
          title: newTitle,
          lang: newLang,
          note: newTelugu || 'Custom RTL / Verification Note',
          code: newBody
        },
        ...snippets
      ]);
      setActiveTab('vault');
      setVaultSubTab('code');
    } else if (newItemType === 'card') {
      setCards([
        ...cards,
        {
          id: 'f_' + Date.now(),
          category: newLang,
          q: newTitle,
          a: newBody,
          te: newTelugu || 'తెలుగు నోట్ జోడించబడింది.'
        }
      ]);
      setActiveTab('cards');
    } else if (newItemType === 'pdf') {
      setPdfVault([
        {
          id: 'p_' + Date.now(),
          title: newTitle,
          category: newLang,
          summary: newTelugu || 'Custom VLSI Study PDF / Drive Link',
          url: newBody
        },
        ...pdfVault
      ]);
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center">
      <div className={`w-full ${mobilePreview ? 'max-w-md my-4 rounded-3xl border-4 border-slate-800 shadow-2xl overflow-hidden' : 'max-w-5xl'} bg-slate-950 flex flex-col min-h-screen relative`}>
        
        {/* Top App Bar */}
        <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-base sm:text-lg tracking-tight text-white flex items-center gap-2">
                VLSI Pocket Prep
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  90-Day Target
                </span>
              </h1>
              <p className="text-xs text-slate-400">Uday Kiran • ASIC Design, Verification & PDF Hub</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-2.5 py-1 rounded-full text-xs font-semibold">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Day {dailyTasks.streak}</span>
            </div>
            <button
              onClick={() => setMobilePreview(!mobilePreview)}
              title="Toggle Phone / Full Screen View"
              className="hidden sm:flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-700 transition"
            >
              {mobilePreview ? <Maximize2 className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
              <span>{mobilePreview ? 'Full Width' : 'Phone View'}</span>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 px-4 pt-4 pb-24 overflow-y-auto space-y-5">

          {/* TAB 1: 90-DAY ROADMAP + FOCUS TIMER */}
          {activeTab === 'roadmap' && (
            <div className="space-y-5">
              {/* Top Grid: Mastery Progress + Focus Timer */}
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
                        <div><span className="text-amber-400 font-bold">{doingCount}</span> In Progress</div>
                      </div>
                    </div>
                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-300"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Daily 6-Hour Routine Checklist */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        Today's 6-Hour VLSI Habit
                      </span>
                      <button
                        onClick={() => setDailyTasks({
                          streak: dailyTasks.streak + 1,
                          concept2h: false,
                          coding2h: false,
                          mock2h: false
                        })}
                        className="text-[11px] bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 px-2.5 py-0.5 rounded-md border border-cyan-500/30"
                      >
                        + Complete Day & Increment Streak
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        { key: 'concept2h', label: '2h Concept Theory (Morris Mano / Notes)' },
                        { key: 'coding2h', label: '2h EDA Playground RTL / SV Coding' },
                        { key: 'mock2h', label: '2h Self-Mock Interview (20 Qs Aloud)' }
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

                {/* Focus Timer Card */}
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
                        title="Reset Timer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">
                      🎯 Link Active VLSI Topic:
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

              {/* Month-by-Month Checklist */}
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
                                    ? 'bg-emerald-400 shadow-sm shadow-emerald-400'
                                    : topic.status === 'doing'
                                    ? 'bg-amber-400 shadow-sm shadow-amber-400'
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

          {/* TAB 2: VLSI WRITTEN TEST MCQ QUIZ & FORMULA SHEET */}
          {activeTab === 'quiz' && (
            <div className="space-y-5">
              {/* VLSI Core Formulas & Equations Tracker */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold">VLSI Written Test Cheat Sheet</span>
                    <h3 className="text-base font-bold text-white">Must-Know Equations (STA, CMOS, FIFO & RTL)</h3>
                  </div>
                  <button
                    onClick={handlePrintFullCheatSheet}
                    className="flex items-center gap-1.5 text-xs bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 px-3 py-1.5 rounded-xl font-semibold"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Export Revision PDF</span>
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

              {/* Interactive VLSI Written Test MCQ Quiz Engine */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold">Interactive Written Test Simulator</span>
                    <h3 className="text-base font-bold text-white">VLSI Placement MCQ Quiz (ASIC / RTL / Verification)</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-lg font-bold">
                      Score: {quizCorrectCount} / {quizList.length}
                    </span>
                    <button
                      onClick={() => setSelectedAnswers({})}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700"
                    >
                      Reset Quiz
                    </button>
                  </div>
                </div>

                {quizList.map((qItem, qIdx) => {
                  const chosen = selectedAnswers[qItem.id];
                  const answered = chosen !== undefined;
                  return (
                    <div key={qItem.id} className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                          Q{qIdx + 1} • {qItem.topic}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                        {qItem.question}
                      </p>
                      <div className="space-y-2">
                        {qItem.options.map((opt, oIdx) => {
                          const isThisSelected = chosen === oIdx;
                          const isThisCorrect = qItem.correct === oIdx;
                          let btnStyle = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-cyan-500/50';
                          if (answered) {
                            if (isThisCorrect) {
                              btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold';
                            } else if (isThisSelected) {
                              btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                            }
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
                          <strong className="text-cyan-400">Solution: </strong>{qItem.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: CODE VAULT & UNIFIED VLSI PDF ENGINE */}
          {activeTab === 'vault' && (
            <div className="space-y-4">
              {/* Sub-navigation between RTL Code Vault & VLSI PDF Vault */}
              <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800">
                <div className="flex gap-2">
                  <button
                    onClick={() => setVaultSubTab('code')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                      vaultSubTab === 'code' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Code className="w-4 h-4" />
                    <span>RTL & SV Code Vault</span>
                  </button>
                  <button
                    onClick={() => setVaultSubTab('pdf')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                      vaultSubTab === 'pdf' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>VLSI PDF Vault</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrintFullCheatSheet}
                    className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-700"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Generate Full PDF Book</span>
                  </button>
                  <button
                    onClick={() => {
                      setNewItemType(vaultSubTab === 'pdf' ? 'pdf' : 'snippet');
                      setShowAddModal(true);
                    }}
                    className="flex items-center gap-1 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold px-3 py-1.5 rounded-xl"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{vaultSubTab === 'pdf' ? 'Add PDF Link' : 'Add Code'}</span>
                  </button>
                </div>
              </div>

              {vaultSubTab === 'code' ? (
                <>
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search Verilog, FIFO, FSM, Constraints, UVM..."
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
                        <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-2">
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
                              <button
                                onClick={() => setSnippets(snippets.filter(item => item.id !== snip.id))}
                                className="p-1.5 text-slate-400 hover:text-rose-400"
                              >
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
              ) : (
                <div className="space-y-4">
                  {/* Open Local PDF File In-App */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-sm text-white flex items-center gap-2">
                        <Upload className="w-4 h-4 text-cyan-400" />
                        Open Local VLSI PDF Reader
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Select any Maven Silicon lab manual, handwritten note, or VLSI textbook PDF from your device to read directly inside this app.
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
                        <button onClick={() => setLocalPdfUrl(null)} className="text-xs text-rose-400 hover:underline">
                          Close Reader
                        </button>
                      </div>
                      <iframe src={localPdfUrl} title="PDF Reader" className="w-full h-[480px] border-0" />
                    </div>
                  )}

                  {/* Saved PDF Modules & Printable Cheat Sheets */}
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
                            <a
                              href={pdf.url}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-1 text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1.5 rounded-xl font-semibold"
                            >
                              <ExternalLink className="w-3.5 h-3.5" /> Open Cloud PDF
                            </a>
                          ) : (
                            <button
                              onClick={handlePrintFullCheatSheet}
                              className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 px-3 py-1.5 rounded-xl border border-slate-700 font-semibold"
                            >
                              <Printer className="w-3.5 h-3.5" /> Print / Save as PDF
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: FLASHCARDS & INTERVIEW Q&A */}
          {activeTab === 'cards' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {['All', 'Digital', 'STA', 'Verilog', 'SystemVerilog', 'UVM', 'AMBA'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => { setCardFilter(cat); setCardIdx(0); setFlipped(false); }}
                      className={`text-xs px-3 py-1.5 rounded-xl font-medium transition ${
                        cardFilter === cat
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => { setNewItemType('card'); setShowAddModal(true); }}
                  className="text-xs bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Q&A</span>
                </button>
              </div>

              {currentCard && (
                <div
                  onClick={() => setFlipped(!flipped)}
                  className="cursor-pointer select-none bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border-2 border-slate-800 hover:border-cyan-500/50 rounded-3xl p-6 min-h-[260px] flex flex-col justify-between transition shadow-xl"
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
                      <h3 className="text-base sm:text-xl font-bold text-white leading-snug">
                        {currentCard.q}
                      </h3>
                    </div>
                  ) : (
                    <div className="my-auto py-4 space-y-3">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold">English Answer:</span>
                        <p className="text-xs sm:text-sm text-slate-100 whitespace-pre-line mt-1 leading-relaxed">
                          {currentCard.a}
                        </p>
                      </div>
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
                    <button
                      onClick={() => setFlipped(!flipped)}
                      className="flex items-center gap-1 text-xs text-cyan-300 font-semibold"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> {flipped ? 'Show Question' : 'Reveal Answer'}
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

          {/* TAB 5: STA/FIFO CALCULATOR LAB & MAVEN SILICON PROJECTS */}
          {activeTab === 'lab' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* STA Calculator */}
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

                {/* Async FIFO Depth Calculator */}
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
                      <label className="text-slate-400 block mb-1">Burst Length B (Data Words Written Back-to-Back)</label>
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

              {/* Maven Silicon Projects Defense Section */}
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

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>Maven Silicon Project 2: AMBA AHB-to-APB Bridge Verification</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Architecture Summary:</strong> Translates pipelined <strong>AMBA AHB-Lite</strong> transfers (<code className="text-cyan-300">IDLE, BUSY, NONSEQ, SEQ</code>) to 2-cycle <strong>AMBA APB</strong> peripheral accesses (<code className="text-cyan-300">SETUP, ACCESS</code>), asserting <code className="text-cyan-300">HREADYOUT=0</code> wait states when stretching cycles.
                </p>
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

        {/* Add Note / Flashcard / PDF Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <form onSubmit={handleSaveNewItem} className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-sm">Add to VLSI Pocket Prep</h3>
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
                placeholder={newItemType === 'snippet' ? 'Title (e.g., Up/Down Counter Verilog)' : newItemType === 'pdf' ? 'PDF Title (e.g., Maven Silicon SV Notes)' : 'Interview Question'}
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
                placeholder={newItemType === 'snippet' ? 'Paste Verilog / SV / UVM code here...' : newItemType === 'pdf' ? 'Paste Google Drive / Web PDF URL here...' : 'Write the interview answer...'}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
              <input
                type="text"
                value={newTelugu}
                onChange={(e) => setNewTelugu(e.target.value)}
                placeholder="Optional summary / తెలుగు వివరణ..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
              <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2.5 rounded-xl text-xs">
                Save to App
              </button>
            </form>
          </div>
        )}

        {/* Bottom Mobile Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 z-30 bg-slate-900/95 backdrop-blur border-t border-slate-800 flex justify-around py-2 px-2 max-w-5xl mx-auto">
          {[
            { id: 'roadmap', label: '90-Day Plan', icon: BookOpen },
            { id: 'quiz', label: 'VLSI Quiz', icon: HelpCircle },
            { id: 'vault', label: 'Code & PDF', icon: FileText },
            { id: 'cards', label: 'Flashcards', icon: Layers },
            { id: 'lab', label: 'STA & Projects', icon: Cpu }
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