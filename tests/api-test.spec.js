const { test, expect } = require ( "@playwright/test");
const { Ajv } = require("ajv");
const { clear } = require("console");

const ajv = new Ajv()

test('Test Case 1', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/2');
    expect(response.status()).toBe(200)

    const responseData = await response.json()

    expect(responseData.data.id).toEqual(2)
    expect(responseData.data.email).toEqual("janet.weaver@reqres.in")
    expect(responseData.data.first_name).toEqual("Janet")
    expect(responseData.data.last_name).toEqual("Weaver")

    const valid = ajv.validate(require("./jsonschema/get-object-schema.json"), responseData)

    if (!valid){
        console.error("AJV Validate Errors:", ajv.errorsText());
    }

    expect(valid).toBe(true);
});

test('Test Case 2', async ({ request }) => {

    const bodyData = {
        "name": "morpheus",
    "job": "leader"
    }

    const headerData = {
        Accept: 'application/json'
    }

    const response = await request.post('https://reqres.in/api/users', {
        header: headerData,
        data: bodyData
    })

    expect(response.status()).toBe(201)

    const responseData = await response.json()

    expect(responseData.name).toEqual("morpheus")
    expect(responseData.job).toEqual("leader")

    const valid = ajv.validate(require('./jsonschema/get-objectschema.json'), responseData)

    if (!valid){
        console.error("AJV Validate Errors:", ajv.errorsText());
    }

    expect(valid).toBe(true);

});

test('Test Case 3', async ({ request }) => {

    const bodyData = {
            "name": "morpheus",
            "job": "zion resident"
    }

    const headerData = {
        Accept: 'application/json'
    }
    const response = await request.post('https://reqres.in/api/users2', {
        header: headerData,
        data: bodyData
    })

    expect(response.status()).toBe(201)

    const responseData = await response.json()

    expect(responseData.name).toEqual("morpheus")
    expect(responseData.job).toEqual("zion resident")

})

test('Test Case 4', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/2');
    expect(response.status()).toBe(204)
});



