'use strict';
const { STAGE } = process.env
const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const polly = new AWS.Polly()
const translate = new AWS.Translate()

const Response = require('./lib/Response')


module.exports.postTranslateTTS = async (event) => {
	const res = new Response()
	try {
		console.log(`Event: ${JSON.stringify(event, null, 2)}`)

		event.body = JSON.parse(event.body)

		const { SourceLanguageCode, TargetLanguageCode, Text, VoiceId, OutputFormat, Key } = event.body
		const Bucket = `translatetts-audio-${STAGE}`
		const filename = `${Key}.${OutputFormat}`
		const url = `https://s3.amazonaws.com/${Bucket}/${filename}`

		const { TranslatedText } = await translate.translateText({ SourceLanguageCode, TargetLanguageCode, Text }).promise()

		const { AudioStream } = await polly.synthesizeSpeech({ Text: TranslatedText, OutputFormat, VoiceId }).promise()

		await s3.putObject({ Body: AudioStream, Key: filename, ACL: 'public-read', Bucket }).promise()

		res.setObj(200, { url } )
	} catch (e) {
		console.log(e)
		res.setObj(400, { message: 'Bad request' })
	}

	return res.getObj()
};
