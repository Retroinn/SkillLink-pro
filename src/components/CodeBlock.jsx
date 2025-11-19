import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Copy } from 'lucide-react';

function CodeBlock({ label = 'Code', content }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass-panel">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-white"
      >
        <span>{label}</span>
        <ChevronDown size={16} className={`transition ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.pre
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden px-4 pb-4"
          >
            <div className="relative">
              <button
                className="absolute right-2 top-2 rounded-lg border border-slate-700 px-2 py-1 text-xs text-slate-300"
                onClick={() => navigator.clipboard?.writeText(content)}
              >
                <Copy size={14} />
              </button>
              <code className="block whitespace-pre-wrap rounded-lg bg-slate-900/70 p-4 text-xs text-slate-200">{content}</code>
            </div>
          </motion.pre>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CodeBlock;
