const soapRequest = require("easy-soap-request");
const convert = require('xml-js')
const request = require('request')

let xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
<soap:Body>
  <GetCharacterInfoByAccountIDResponse xmlns="https://api.maplestory.nexon.com/soap/">
    <GetCharacterInfoByAccountIDResult>
      <xsd:schema>schema</xsd:schema>dataset</GetCharacterInfoByAccountIDResult>
  </GetCharacterInfoByAccountIDResponse>
</soap:Body>
</soap:Envelope>`
const url = 'http://api.maplestory.nexon.com/soap/maplestory.asmx?wsdl';
const sampleHeaders = {
    'Content-Type':'text/xm; chatset=utf-8',
    'Content-Length': xml.length,
    'SOAPAction':'https://api.maplestory.nexon.com/soap/GetCharacterInfoByAccountID'
};

const getUserData = async() => {
    try{
        const { response } = await soapRequest({
            url: url,
            headers : sampleHeaders,
            xml : xml,
            timeout : 1000
        });
        const { header , body, statusCode } = response;
        console.log(`header : ${header}`)
        console.log(`body : ${body}`)
        console.log(`statusCode : ${statusCode}`)
    
        var xmlToJson = convert.xml2json(body, {compact:true,spaces:4})
        callBack(xmlToJson)
    } catch (error){
        console.log(error)
    }
}
getUserData( (userXML) => {
    res.json(JSON.parse(userXML))
})