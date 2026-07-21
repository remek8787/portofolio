#!/bin/bash
sed -i "s/family=Inter:wght@400;500;600;700;800/family=Plus+Jakarta+Sans:wght@400;500;600;700;800/g" styles.css
sed -i "s/font-family: 'Inter', system-ui, sans-serif;/font-family: 'Plus Jakarta Sans', system-ui, sans-serif;/g" styles.css
sed -i "s/--radius: 24px;/--radius: 28px;/g" styles.css
sed -i "s/--radius-sm: 18px;/--radius-sm: 20px;/g" styles.css
