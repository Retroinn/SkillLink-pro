import React, { useState } from 'react';
import { BellIcon, ChatBubbleLeftIcon, HandThumbUpIcon, UserPlusIcon } from '@heroicons/react/24/solid';
import { AnimatePresence, motion } from 'framer-motion';

const typeIcon = {
  follow: <UserPlusIcon className="w-5 h-5 text-sky-500" />,
  like: <HandThumbUpIcon className="w-5 h-5 text-amber-500" />,
  comment: <ChatBubbleLeftIcon className="w-5 h-5 text-emerald-500" />,
};

const NotificationBell = ({ notifications = [] }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative w-11 h-11 rounded-2xl grid place-items-center bg-white dark:bg-slate-900 shadow-card border border-slate-100 dark:border-slate-800"
      >
        <BellIcon className="w-6 h-6 text-slate-600 dark:text-slate-300" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-rose-500 text-white text-xs grid place-items-center">
            {notifications.length}
          </span>
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl p-3 space-y-2 z-30"
          >
            {notifications.map((note) => (
              <div
                key={note.id}
                className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                <div className="mt-1">{typeIcon[note.type] || typeIcon.like}</div>
                <div>
                  <p className="text-sm font-semibold">{note.message}</p>
                  <p className="text-xs text-slate-500">{note.time} ago</p>
                </div>
              </div>
            ))}
            <button className="w-full py-2 text-sm font-semibold bg-slate-100 dark:bg-slate-800 rounded-xl">View all</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
