function calcParams(params) {
    let d = {...params}
    d.interval = d?.jobDays * d.optZak / d?.demand
    d.demandInDay = d?.demand / d?.jobDays
    d.demandInAll = d?.leadTime * d?.demandInDay
    d.demandInPost = d?.demandInDay * d?.leadTime

    d.maxDemand = (d?.leadTime + d?.delay) * d?.demandInDay
    d.garant = d?.maxDemand - d?.demandInAll
    d.porog = d?.garant + d?.demandInAll
    d.maxWant = d?.porog + d?.interval * d?.demandInDay

    return d
}

function getOrDefault(v, def = undefined) {
    if (v != null) {
        return v
    }
    return def
}

function median(values) {
    if (values.length === 0) return 0;

    values.sort(function (a, b) {
        return a - b;
    });

    var half = Math.floor(values.length / 2);

    if (values.length % 2)
        return values[half];

    return (values[half - 1] + values[half]) / 2.0;
}


export class Data {

    constructor(params) {
        this.params = calcParams(params)
        this.data = []
        this.queue = []
        this.z = this.params?.maxWant + this.params?.demandInDay;
        this.currentDay = -1;
        this.queueIndex = 1
        this.delays = {}
    }

    nextDay() {
        if (!this.isValid()) {
            return;
        }
        if (this.currentDay > this?.params?.jobDays) {
            return;
        }
        this.currentDay += 1

        this.z -= this.params?.demandInDay;

        while (this.queue?.[0]?.t != null && this.queue?.[0]?.t + this.params?.leadTime + median([getOrDefault(this.delays?.[this.queue?.[0]?.index], 0), 0, this?.params?.delay]) === this.currentDay) {
            let p = this.queue.shift()
            this.z += p?.r;
        }

        if (this.queue?.[0] == null && this.params.porog >= this.z) {
            let r = this.params?.maxWant - this.z + this.params?.demandInPost
            console.log('a', r);
            this.queue.push({t: this.currentDay, r: r, index: this.queueIndex})
            this.queueIndex++
        }
        this.data.push({
            x: this.currentDay,
            y: parseFloat(this.z.toFixed(2)),
            porog: parseFloat(this.params.porog.toFixed(2)),
            garant: parseFloat(this.params.garant.toFixed(2)),
            maxWant: parseFloat(this.params.maxWant.toFixed(2)),
        })
    }

    getData() {
        return this.data
    }

    calcAll() {
        if (!this.isValid()) {
            return
        }
        while (this.currentDay < this.params.jobDays) {
            this.nextDay()
        }
    }

    clear() {
        this.data = []
        this.queue = []
        this.z = this.params?.maxWant + this.params?.demandInDay;
        this.currentDay = -1;
        this.queueIndex = 1
        this.delays = {}
        this.dd = null
    }

    isValid() {
        return !isNaN(this.params.maxWant)
    }

    setDelays(delays) {
        this.dd = delays
        this.delays = {}
        for (let i in delays) {
            this.delays[delays[i]?.pos] = parseInt(delays[i]?.delay)
        }
        console.log('delays ', this.delays)
    }

}

