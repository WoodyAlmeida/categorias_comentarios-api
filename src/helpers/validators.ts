import { Response } from 'express';

export async function validateDataSchema(body: any, schema: any, res: Response,){
    try {
        let valid = await schema.strict().validate(body);
        if (!(valid)) {
            res.json({ success: false, message: 'INVALID_DATA' });
            return false;
        }
        return true;
    } catch(err){
        res.json({ success: false, message: err.message });
        return false;
    }
}

export async function getValidatedObjectFromSchema(schema: any, body: any){
    let fields = Object.keys(schema.fields);
    let obj: any = Object.assign({});
    await fields.mapAsync(async (field) => {
        obj[field] = body[field];
    });

    return obj;
}