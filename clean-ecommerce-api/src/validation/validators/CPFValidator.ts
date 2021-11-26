class CPFValidator {
    static readonly VALID_CPF_LENGHT = 11;

    validate(cpf: string) {
        if (!cpf) {
            return false
        }
        const newCpf = this.normalizeCpf(cpf)
        if (newCpf.length != CPFValidator.VALID_CPF_LENGHT) {
            return false
        }
        if (this.areAllDigitsTheSame(newCpf)) {
            return false
        }
        try {
            let d1, d2;
            let dg1, dg2, rest;
            let digito;
            let nDigResult;
            d1 = d2 = 0;
            dg1 = dg2 = rest = 0;

            for (let nCount = 1; nCount < newCpf.length - 1; nCount++) {
                digito = parseInt(newCpf.substring(nCount - 1, nCount));
                d1 = d1 + (11 - nCount) * digito;
                d2 = d2 + (12 - nCount) * digito;
            };

            rest = (d1 % 11);

            dg1 = (rest < 2) ? dg1 = 0 : 11 - rest;
            d2 += 2 * dg1;
            rest = (d2 % 11);
            if (rest < 2)
                dg2 = 0;
            else
                dg2 = 11 - rest;

            let nDigVerific = newCpf.substring(newCpf.length - 2, newCpf.length);
            nDigResult = "" + dg1 + "" + dg2;
            return nDigVerific == nDigResult;
        } catch (e) {
            console.error("Erro !" + e);
        }

        return false
    }

    normalizeCpf(cpf: string) {
        return cpf
            .replace('.', '')
            .replace('.', '')
            .replace('-', '')
            .replace(" ", "")
    }

    areAllDigitsTheSame(cpf: string){
        return !cpf.split("").every(c => c === cpf[0])        
    }

}

export { CPFValidator }
