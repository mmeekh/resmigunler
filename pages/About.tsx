
import React from 'react';
import { motion } from 'framer-motion';

const About = () => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto px-4 py-16 text-center"
    >
        <h1 className="text-3xl font-bold mb-6">Hakkında</h1>
        <p className="text-lg text-slate-600 mb-4">
            ResmiGunler.com, Türkiye'de yaşayan herkesin yıllık izinlerini en verimli şekilde kullanmasına yardımcı olmak için tasarlanmış, modern ve kullanıcı dostu bir araçtır.
        </p>
        <p className="text-slate-600">
            Yapay zeka destekli tasarım prensipleri ve performans odaklı kod yapısı ile geliştirilmiştir. Verilerimiz her yıl güncellenmektedir.
        </p>
    </motion.div>
);

export default About;
