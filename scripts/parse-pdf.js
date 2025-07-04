const fs = require('fs-extra');

async function main() {
    try {
        console.log('🏥 Creating test hospital data...');
        
        // Create data directory
        await fs.ensureDir('./data');
        
        // Create test data (replace with real PDF parsing later)
        const hospitalData = {
            timestamp: new Date().toISOString(),
            lastUpdated: new Date().toLocaleString('en-US', { timeZone: 'America/Regina' }),
            hospitals: {
                RUH: {
                    admittedNoBeds: 19,
                    activeConsults: 24,
                    totalED: 49
                },
                SPH: {
                    admittedNoBeds: 8,
                    activeConsults: 26,
                    totalED: 35
                },
                JPCH: {
                    admittedNoBeds: 0,
                    activeConsults: 2,
                    totalED: 2
                }
            },
            systemTotals: {
                totalAdmittedNoBeds: 27,
                totalActiveConsults: 50,
                totalEDPatients: 86
            },
            summary: "27 admitted (no beds), 50 consults, 86 total ED patients",
            dataSource: 'Test data - GitHub Action working',
            note: 'This is test data. Real PDF parsing will be added next.'
        };
        
        // Save data files
        await fs.writeJSON('./data/hospital-data.json', hospitalData, { spaces: 2 });
        
        // Create CSV
        const csvHeader = 'timestamp,ruh_admitted,ruh_consults,ruh_total,sph_admitted,sph_consults,sph_total,jpch_admitted,jpch_consults,jpch_total\n';
        const csvRow = `${hospitalData.timestamp},19,24,49,8,26,35,0,2,2\n`;
        await fs.writeFile('./data/historical-data.csv', csvHeader + csvRow);
        
        console.log('✅ Test data created successfully!');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

main();
