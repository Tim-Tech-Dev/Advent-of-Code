// Run all days

console.time("Execution took");

for (let i = 1; i <= 25; i++) {
    const day = i.toString(10).padStart(2, "0");
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const mod = require(`./${day}`) as { main(): void };
        mod.main();
    } catch (error) {
        throw new Error(`Error runnin Day${day}: ${error}`);
    }
}

console.timeLog("Execution took");
