# Translate & Text to Speech - Javascript Example
### AWS Polly, AWS Translate, Serverless, Node.js

## Request Body Properties - Required
* SourceLanguageCode
* TargetLanguageCode
	* [Language Codes](https://docs.aws.amazon.com/translate/latest/dg/pairs.html)

* VoiceId
	* [Voice option list](https://docs.aws.amazon.com/polly/latest/dg/voicelist.html)

* OutputFormat
	* [AWS Output Format: How text to speech works](https://docs.aws.amazon.com/polly/latest/dg/how-text-to-speech-works.html)

* Key
	* Filename (No extension required)

* Text 
	* The text to convert to translate and synthesis.

#### Example POST Request
Headers
```javascript
{
	"Content-Type": "application/json"
}
```
Body
```javascript
{
	"SourceLanguageCode": "en",
	"TargetLanguageCode": "es", 
	"Text": "Hi, my name is Miguel.",
	"VoiceId": "Miguel", 
	"OutputFormat": "mp3",
	"Key": "example"
}

```
#### Example Response
```javascript
{
    "url": "https://s3.amazonaws.com/bucket/example.mp3"
}
```
