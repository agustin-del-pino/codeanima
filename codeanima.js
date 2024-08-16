const codeanima = new (class {
    #writings = []
    #atchar = [];

    #delay(ms) {
        return new Promise((res) => setTimeout(res, ms));
    }

    #fireAtChar(ch) {
        this.#atchar.forEach(ac => ac(ch));
    }

    atChar(fn) {
        this.#atchar.push(fn);
        return this;
    }

    write(text, { span = 0, char = 5, newline = false }) {
        if (span < 0 && char < 0) {
            throw new Error("span or char must have a time value")
        }
        if (newline) {
            text += "\n";
        }
        if (span > 0) {
            char = span / text.length;
            console.log(char);
        }

        this.#writings.push(async () => {
            for (const ch of text) {
                await this.#delay(char);
                this.#fireAtChar(ch);
            }
        })
        return this;
    }

    newline(ms) {
        return this.write("\n", { char: ms })
    }

    wait(ms) {
        this.#writings.push(async () => {
            await this.#delay(ms);
        });
        return this;
    }
    async play() {
        for (const w of this.#writings) {
            await w();
        }
    }
})