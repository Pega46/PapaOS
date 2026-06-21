import { motion } from 'motion/react'

export function TreeSvg() {
  const branchTransition = { duration: 0.78, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <motion.svg
      className="tree-svg"
      viewBox="0 0 1000 1040"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.28 }}
    >
      <defs>
        <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4b2b15" />
          <stop offset="38%" stopColor="#7a4a23" />
          <stop offset="62%" stopColor="#9a6432" />
          <stop offset="100%" stopColor="#3d230f" />
        </linearGradient>
        <linearGradient id="branchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5a3518" />
          <stop offset="55%" stopColor="#865629" />
          <stop offset="100%" stopColor="#4a2b13" />
        </linearGradient>
        <filter id="woodShadow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="18" stdDeviation="12" floodColor="#2c1708" floodOpacity="0.24" />
        </filter>
        <linearGradient id="canopyLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b9ecc2" />
          <stop offset="52%" stopColor="#5faf81" />
          <stop offset="100%" stopColor="#27634e" />
        </linearGradient>
        <linearGradient id="canopyCenter" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#d5f1bc" />
          <stop offset="50%" stopColor="#70bd83" />
          <stop offset="100%" stopColor="#2b715b" />
        </linearGradient>
        <linearGradient id="canopyRight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9fe0bd" />
          <stop offset="55%" stopColor="#4b9f79" />
          <stop offset="100%" stopColor="#245d50" />
        </linearGradient>
        <filter id="canopyShadow" x="-15%" y="-18%" width="130%" height="145%">
          <feDropShadow dx="0" dy="16" stdDeviation="16" floodColor="#174334" floodOpacity="0.2" />
        </filter>
      </defs>

      <g className="canopy-masses" filter="url(#canopyShadow)" transform="translate(-250 -145) scale(1.5)">
        <path className="canopy-mass canopy-mass-left" d="M93 506 C58 454 84 372 142 345 C98 288 140 208 218 212 C218 132 310 94 372 139 C406 85 492 98 516 168 C526 264 480 361 410 438 C328 503 203 544 93 506Z" fill="url(#canopyLeft)" />
        <path className="canopy-mass canopy-mass-center" d="M277 338 C244 262 303 195 372 193 C350 119 424 59 500 101 C552 44 651 86 638 165 C724 166 767 251 714 304 C748 373 686 446 609 423 C550 475 453 455 424 395 C366 413 306 391 277 338Z" fill="url(#canopyCenter)" />
        <path className="canopy-mass canopy-mass-right" d="M507 441 C535 362 589 289 677 253 C665 173 751 132 804 183 C857 140 944 187 927 259 C991 285 993 381 929 411 C958 479 887 540 820 507 C766 556 676 523 661 457 C608 475 540 474 507 441Z" fill="url(#canopyRight)" />
        <path className="canopy-vein" d="M155 437 C260 382 358 324 463 212 M323 365 C405 312 495 251 584 163 M584 393 C688 348 793 307 905 272" />
      </g>

      <g className="root-network" fill="none" stroke="url(#branchGradient)" strokeLinecap="round" filter="url(#woodShadow)">
        <motion.path d="M500 930 C450 964 372 958 300 988 C234 1014 168 1012 88 1028" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.05, ...branchTransition }} />
        <motion.path d="M500 928 C560 966 642 956 716 990 C782 1020 856 1014 936 1030" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.08, ...branchTransition }} />
        <motion.path d="M502 934 C468 976 430 1000 390 1034" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.1, ...branchTransition }} />
        <motion.path d="M498 934 C536 978 574 1000 620 1034" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.12, ...branchTransition }} />
      </g>

      <g className="tree-wood" filter="url(#woodShadow)" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <motion.path
          className="trunk-core"
          d="M504 930 C464 800 474 690 492 570 C510 444 478 330 500 168"
          stroke="url(#trunkGradient)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.18, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          className="trunk-highlight"
          d="M524 900 C500 744 522 604 514 480 C508 382 522 282 536 190"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.path className="branch-heavy" d="M492 654 C396 586 292 530 132 514" stroke="url(#branchGradient)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.58, ...branchTransition }} />
        <motion.path className="branch-heavy" d="M510 648 C604 574 710 526 872 506" stroke="url(#branchGradient)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.62, ...branchTransition }} />
        <motion.path className="branch-medium" d="M494 512 C406 434 318 356 178 286" stroke="url(#branchGradient)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.68, ...branchTransition }} />
        <motion.path className="branch-medium" d="M512 512 C610 426 702 350 836 284" stroke="url(#branchGradient)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.72, ...branchTransition }} />
        <motion.path className="branch-light" d="M500 378 C430 290 370 216 288 142" stroke="url(#branchGradient)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.78, ...branchTransition }} />
        <motion.path className="branch-light" d="M510 376 C582 284 650 214 742 142" stroke="url(#branchGradient)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.82, ...branchTransition }} />
        <motion.path className="twig" d="M302 532 C252 458 236 408 196 350" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9, duration: 0.52 }} />
        <motion.path className="twig" d="M706 532 C744 462 782 420 826 354" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.94, duration: 0.52 }} />
        <motion.path className="twig" d="M370 402 C320 330 302 280 254 212" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.98, duration: 0.52 }} />
        <motion.path className="twig" d="M638 398 C678 318 714 274 778 214" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.02, duration: 0.52 }} />
      </g>

      <g className="canopy-foreground" filter="url(#canopyShadow)" transform="translate(-250 -145) scale(1.5)">
        <path d="M18 520 C-8 424 38 330 118 296 C50 204 130 100 228 139 C245 45 370 8 445 91 C495 12 635 26 681 113 C776 57 883 127 862 216 C970 198 1032 312 962 394 C1008 484 923 574 827 532 C752 609 626 578 600 485 C510 552 381 531 337 450 C245 546 91 583 18 520Z" fill="url(#canopyCenter)" opacity="0.64" />
        <path className="canopy-highlight" d="M100 401 C204 348 312 336 399 274 M449 202 C535 168 638 175 730 231 M618 391 C724 357 824 374 913 423" />
      </g>
    </motion.svg>
  )
}
