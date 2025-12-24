
import React from 'react';
import { motion } from 'framer-motion';
import LeaveCalculator from '../components/LeaveCalculator';

const LeaveCalculatorPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-4xl mx-auto px-4 py-16"
        >
            <LeaveCalculator />
        </motion.div>
    );
};

export default LeaveCalculatorPage;
