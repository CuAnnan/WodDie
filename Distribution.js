class Distribution
{
    constructor()
    {
        this.results = {};
        this.maxValue = 0;
        this.minValue = Number.MAX_SAFE_INTEGER;
    }

    addResult(result)
    {
        this.results[result] = this.results[result]?this.results[result] + result:result;
        this.maxValue = Math.max(this.maxValue, result);
        this.minValue = Math.min(this.value, result);
    }

    toString()
    {
        return JSON.stringify(this.results);
    }
}

module.exports = Distribution;