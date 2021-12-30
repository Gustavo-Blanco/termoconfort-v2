
export const isNumber = (value: any) => {
    return Number(value) != NaN;
}

export const formatRequest = (body: any) => {
    const keyValuesPair = Object.entries(body);
    const requestBody: any = {}
    
    const keyValues = keyValuesPair.map((pair) => {
        const [key, value] = pair;

        if (typeof value == 'boolean' || typeof value == 'number') {
            return {key, value}
        }

        if (value === '') {
            return {key, value: ''}
        }
        
        
        if (value === 'true' || value === 'false') {
            
            return {
                key,
                value: value === 'true'
            }
        }
        
        if (!isNaN(Number(value))) {
            return {
                key,
                value: Number(value)
            }
        };
        return {
            key, value
        }
    });
    
    for (const iterator of keyValues) {
        if (!(iterator.value === '')) {
            requestBody[iterator.key] = iterator.value
        }
    }
    
    return requestBody;
}

export const formartReqUpdate = (body: any) => {
    if (!body.image) return body;
    if (body.image === 'undefined') delete body.image;
    return body;
    
}

export const toStringIfNumber = (value: any) => {
    if(typeof value === 'string') return Number(value);
    return value;
}