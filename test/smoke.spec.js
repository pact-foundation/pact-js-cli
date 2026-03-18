const { execFileSync } = require('child_process');
const path = require('path');

const tools = ['mock', 'verifier', 'plugin', 'broker'];
const binaries = [
    'pact-mock-server.js',
    'pact-verifier.js',
    'pact-broker.js',
    'pact-stub-server.js',
    'pactflow.js',
    'pact-plugin.js'
];

let allPassed = true;

// Test main CLI tools
tools.forEach(tool => {
        try {
                const driftPath = path.resolve(__dirname, '../bin/pact.js');
                const output = execFileSync(process.execPath, [driftPath, tool, '--version'], { encoding: 'utf8' });
                
                if (output.match(/\d+\.\d+\.\d+/)) {
                        console.log(`✓ Smoke test passed for ${tool}:`, output.trim());
                } else {
                        console.error(`✗ Unexpected output for ${tool}:`, output.trim());
                        allPassed = false;
                }
        } catch (err) {
                console.error(`✗ Smoke test failed for ${tool}:`, err.message);
                allPassed = false;
        }
});

// Test individual binaries
binaries.forEach(binary => {
        try {
                const binPath = path.resolve(__dirname, '../bin', binary);
                let output;
                
                if (binary === 'pactflow.js') {
                         output = execFileSync(process.execPath, [binPath, '--help'], { encoding: 'utf8' });
                }
                else {
                    output = execFileSync(process.execPath, [binPath, '--version'], { encoding: 'utf8' });
                }
                
                console.log(`✓ Smoke test passed for ${binary}:`, output.trim());
        } catch (err) {
                console.error(`✗ Smoke test failed for ${binary}:`, err.message);
                allPassed = false;
        }
});

process.exit(allPassed ? 0 : 1);