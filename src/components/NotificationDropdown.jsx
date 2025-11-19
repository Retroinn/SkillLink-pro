import { BellRing, CheckCircle2, MessageCircle, Sparkles, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockNotifications } from '../data/mockData.js';

const icons = {
  follow: <Users size={16} />,
  comment: <MessageCircle size={16} />, 
  badge: <Sparkles size={16} />,
};

function NotificationDropdown({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <div className="glass-panel absolute right-0 mt-3 w-80 divide-y divide-slate-800 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <BellRing size={16} />
                <p className="text-sm font-semibold">Notifications</p>
              </div>
              <button onClick={onClose} className="text-xs text-slate-400 hover:text-primary">Close</button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {mockNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 flex items-start gap-3 ${notification.is_read ? 'bg-slate-900/60' : 'bg-slate-900/90'}`}
                >
                  <div className="mt-1 text-secondary">{icons[notification.type]}</div>
                  <div>
                    <p className="text-sm text-slate-100">{notification.message}</p>
                    <p className="text-xs text-slate-500">{notification.created_at} ago</p>
                  </div>
                  {!notification.is_read && <CheckCircle2 size={16} className="ml-auto text-primary" />}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default NotificationDropdown;
