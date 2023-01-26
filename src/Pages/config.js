let apiUrl = 'http://127.0.0.1:9500/api/v1/';
if (process.env.NODE_ENV === 'production'){
    apiUrl = 'http://83.222.8.15:9500/api/v1/';
}

export default apiUrl;

export const entities = {
    sheet_material: 'sheet_material/',
    calculation: 'calculation/',
    calculator_model: 'calculator_model/',
    chromaticity: 'chromaticity/',
    postpress: 'postpress/',
    template: 'postpress/'
};