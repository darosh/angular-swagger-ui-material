'use strict';

// noinspection HtmlDeprecatedTag
angular.module('sw.ui.md')
    .value('httpData', {
        method: {
            delete: [
                'requests that the origin server remove the association between the target resource and its current functionality.',
                'RFC7231#4.3.5',
                'http://tools.ietf.org/html/rfc7231#section-4.3.5',
                false,
                true,
                false
            ],
            get: [
                'requests transfer of a current selected representation for the target resource.',
                'RFC7231#4.3.1',
                'http://tools.ietf.org/html/rfc7231#section-4.3.1',
                true,
                true,
                true
            ],
            head: [
                'is identical to GET except that the server MUST NOT send a message body in the response (i.e., the response terminates at the end of the header block).',
                'RFC7231#4.3.2',
                'http://tools.ietf.org/html/rfc7231#section-4.3.2',
                true,
                true,
                true
            ],
            options: [
                'requests information about the communication options available on the request/response chain identified by the effective request URI.',
                'RFC7231#4.3.7',
                'http://tools.ietf.org/html/rfc7231#section-4.3.7',
                true,
                true,
                false
            ],
            post: [
                'requests that the target resource process the representation enclosed in the request according to the resource\'s own specific semantics.',
                'RFC7231#4.3.3',
                'http://tools.ietf.org/html/rfc7231#section-4.3.3',
                false,
                false,
                false
            ],
            put: [
                'requests that the state of the target resource be created or replaced with the state defined by the representation enclosed in the request message payload.',
                'RFC7231#4.3.4',
                'http://tools.ietf.org/html/rfc7231#section-4.3.4',
                false,
                true,
                false
            ],
            patch: [
                'requests that a set of changes described in the request entity be applied to the resource identified by the Request-URI.',
                'RFC5789',
                'http://tools.ietf.org/html/rfc5789#section-2',
                false,
                false,
                false
            ]
        },
        status: {
            100: [
                'Continue',
                'indicates that the initial part of a request has been received and has not yet been rejected by the server.',
                'RFC7231#6.2.1',
                'http://tools.ietf.org/html/rfc7231#section-6.2.1'
            ],
            101: [
                'Switching Protocols',
                'indicates that the server understands and is willing to comply with the client\'s request, via the Upgrade header field, for a change in the application protocol being used on this connection.',
                'RFC7231#6.2.2',
                'http://tools.ietf.org/html/rfc7231#section-6.2.2'
            ],
            102: [
                'Processing',
                'is an interim response used to inform the client that the server has accepted the complete request, but has not yet completed it.',
                'RFC5218#10.1',
                'http://tools.ietf.org/html/rfc2518#section-10.1'
            ],
            200: [
                'OK',
                'indicates that the request has succeeded.',
                'RFC7231#6.3.1',
                'http://tools.ietf.org/html/rfc7231#section-6.3.1'
            ],
            201: [
                'Created',
                'indicates that the request has been fulfilled and has resulted in one or more new resources being created.',
                'RFC7231#6.3.2',
                'http://tools.ietf.org/html/rfc7231#section-6.3.2'
            ],
            202: [
                'Accepted',
                'indicates that the request has been accepted for processing, but the processing has not been completed.',
                'RFC7231#6.3.3',
                'http://tools.ietf.org/html/rfc7231#section-6.3.3'
            ],
            203: [
                'Non-Authoritative Information',
                'indicates that the request was successful but the enclosed payload has been modified from that of the origin server\'s 200 (OK) response by a transforming proxy.',
                'RFC7231#6.3.4',
                'http://tools.ietf.org/html/rfc7231#section-6.3.4'
            ],
            204: [
                'No Content',
                'indicates that the server has successfully fulfilled the request and that there is no additional content to send in the response payload body.',
                'RFC7231#6.3.5',
                'http://tools.ietf.org/html/rfc7231#section-6.3.5'
            ],
            205: [
                'Reset Content',
                'indicates that the server has fulfilled the request and desires that the user agent reset the "document view", which caused the request to be sent, to its original state as received from the origin server.',
                'RFC7231#6.3.6',
                'http://tools.ietf.org/html/rfc7231#section-6.3.6'
            ],
            206: [
                'Partial Content',
                'indicates that the server is successfully fulfilling a range request for the target resource by transferring one or more parts of the selected representation that correspond to the satisfiable ranges found in the requests\'s Range header field.',
                'RFC7233#4.1',
                'http://tools.ietf.org/html/rfc7233#section-4.1'
            ],
            207: [
                'Multi-Status',
                'provides status for multiple independent operations.',
                'RFC5218#10.2',
                'http://tools.ietf.org/html/rfc2518#section-10.2'
            ],
            226: [
                'IM Used',
                'The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.',
                'RFC3229#10.4.1',
                'http://tools.ietf.org/html/rfc3229#section-10.4.1'
            ],
            300: [
                'Multiple Choices',
                'indicates that the target resource has more than one representation, each with its own more specific identifier, and information about the alternatives is being provided so that the user (or user agent) can select a preferred representation by redirecting its request to one or more of those identifiers.',
                'RFC7231#6.4.1',
                'http://tools.ietf.org/html/rfc7231#section-6.4.1'
            ],
            301: [
                'Moved Permanently',
                'indicates that the target resource has been assigned a new permanent URI and any future references to this resource ought to use one of the enclosed URIs.',
                'RFC7231#6.4.2',
                'http://tools.ietf.org/html/rfc7231#section-6.4.2'
            ],
            302: [
                'Found',
                'indicates that the target resource resides temporarily under a different URI.',
                'RFC7231#6.4.3',
                'http://tools.ietf.org/html/rfc7231#section-6.4.3'
            ],
            303: [
                'See Other',
                'indicates that the server is redirecting the user agent to a different resource, as indicated by a URI in the Location header field, that is intended to provide an indirect response to the original request.',
                'RFC7231#6.4.4',
                'http://tools.ietf.org/html/rfc7231#section-6.4.4'
            ],
            304: [
                'Not Modified',
                'indicates that a conditional GET request has been received and would have resulted in a 200 (OK) response if it were not for the fact that the condition has evaluated to false.',
                'RFC7232#4.1',
                'http://tools.ietf.org/html/rfc7232#section-4.1'
            ],
            305: [
                'Use Proxy',
                '*deprecated*',
                'RFC7231#6.4.5',
                'http://tools.ietf.org/html/rfc7231#section-6.4.5'
            ],
            307: [
                'Temporary Redirect',
                'indicates that the target resource resides temporarily under a different URI and the user agent MUST NOT change the request method if it performs an automatic redirection to that URI.',
                'RFC7231#6.4.7',
                'http://tools.ietf.org/html/rfc7231#section-6.4.7'
            ],
            308: [
                'Permanent Redirect',
                'The target resource has been assigned a new permanent URI and any future references to this resource SHOULD use one of the returned URIs. [...] This status code is similar to 301 Moved Permanently (Section 7.3.2 of rfc7231), except that it does not allow rewriting the request method from POST to GET.',
                'RFC7238',
                'http://tools.ietf.org/html/rfc7238'
            ],
            400: [
                'Bad Request',
                'indicates that the server cannot or will not process the request because the received syntax is invalid, nonsensical, or exceeds some limitation on what the server is willing to process.',
                'RFC7231#6.5.1',
                'http://tools.ietf.org/html/rfc7231#section-6.5.1'
            ],
            401: [
                'Unauthorized',
                'indicates that the request has not been applied because it lacks valid authentication credentials for the target resource.',
                'RFC7235#6.3.1',
                'http://tools.ietf.org/html/rfc7235#section-3.1'
            ],
            402: [
                'Payment Required',
                '*reserved*',
                'RFC7231#6.5.2',
                'http://tools.ietf.org/html/rfc7231#section-6.5.2'
            ],
            403: [
                'Forbidden',
                'indicates that the server understood the request but refuses to authorize it.',
                'RFC7231#6.5.3',
                'http://tools.ietf.org/html/rfc7231#section-6.5.3'
            ],
            404: [
                'Not Found',
                'indicates that the origin server did not find a current representation for the target resource or is not willing to disclose that one exists.',
                'RFC7231#6.5.4',
                'http://tools.ietf.org/html/rfc7231#section-6.5.4'
            ],
            405: [
                'Method Not Allowed',
                'indicates that the method specified in the request-line is known by the origin server but not supported by the target resource.',
                'RFC7231#6.5.5',
                'http://tools.ietf.org/html/rfc7231#section-6.5.5'
            ],
            406: [
                'Not Acceptable',
                'indicates that the target resource does not have a current representation that would be acceptable to the user agent, according to the proactive negotiation header fields received in the request, and the server is unwilling to supply a default representation.',
                'RFC7231#6.5.6',
                'http://tools.ietf.org/html/rfc7231#section-6.5.6'
            ],
            407: [
                'Proxy Authentication Required',
                'is similar to 401 (Unauthorized), but indicates that the client needs to authenticate itself in order to use a proxy.',
                'RFC7231#6.3.2',
                'http://tools.ietf.org/html/rfc7231#section-6.3.2'
            ],
            408: [
                'Request Timeout',
                'indicates that the server did not receive a complete request message within the time that it was prepared to wait.',
                'RFC7231#6.5.7',
                'http://tools.ietf.org/html/rfc7231#section-6.5.7'
            ],
            409: [
                'Conflict',
                'indicates that the request could not be completed due to a conflict with the current state of the resource.',
                'RFC7231#6.5.8',
                'http://tools.ietf.org/html/rfc7231#section-6.5.8'
            ],
            410: [
                'Gone',
                'indicates that access to the target resource is no longer available at the origin server and that this condition is likely to be permanent.',
                'RFC7231#6.5.9',
                'http://tools.ietf.org/html/rfc7231#section-6.5.9'
            ],
            411: [
                'Length Required',
                'indicates that the server refuses to accept the request without a defined Content-Length.',
                'RFC7231#6.5.10',
                'http://tools.ietf.org/html/rfc7231#section-6.5.10'
            ],
            412: [
                'Precondition Failed',
                'indicates that one or more preconditions given in the request header fields evaluated to false when tested on the server.',
                'RFC7232#4.2',
                'http://tools.ietf.org/html/rfc7232#section-4.2'
            ],
            413: [
                'Payload Too Large',
                'indicates that the server is refusing to process a request because the request payload is larger than the server is willing or able to process.',
                'RFC7231#6.5.11',
                'http://tools.ietf.org/html/rfc7231#section-6.5.11'
            ],
            414: [
                'URI Too Long',
                'indicates that the server is refusing to service the request because the request-target is longer than the server is willing to interpret.',
                'RFC7231#6.5.12',
                'http://tools.ietf.org/html/rfc7231#section-6.5.12'
            ],
            415: [
                'Unsupported Media Type',
                'indicates that the origin server is refusing to service the request because the payload is in a format not supported by the target resource for this method.',
                'RFC7231#6.5.13',
                'http://tools.ietf.org/html/rfc7231#section-6.5.13'
            ],
            416: [
                'Range Not Satisfiable',
                'indicates that none of the ranges in the request\'s Range header field overlap the current extent of the selected resource or that the set of ranges requested has been rejected due to invalid ranges or an excessive request of small or overlapping ranges.',
                'RFC7233#4.4',
                'http://tools.ietf.org/html/rfc7233#section-4.4'
            ],
            417: [
                'Expectation Failed',
                'indicates that the expectation given in the request\'s Expect header field could not be met by at least one of the inbound servers.',
                'RFC7231#6.5.14',
                'http://tools.ietf.org/html/rfc7231#section-6.5.14'
            ],
            422: [
                'Unprocessable Entity',
                'means the server understands the content type of the request entity (hence a 415(Unsupported Media Type) status code is inappropriate), and the syntax of the request entity is correct (thus a 400 (Bad Request) status code is inappropriate) but was unable to process the contained instructions.',
                'RFC5218#10.3',
                'http://tools.ietf.org/html/rfc2518#section-10.3'
            ],
            423: [
                'Locked',
                'means the source or destination resource of a method is locked.',
                'RFC5218#10.4',
                'http://tools.ietf.org/html/rfc2518#section-10.4'
            ],
            424: [
                'Failed Dependency',
                'means that the method could not be performed on the resource because the requested action depended on another action and that action failed.',
                'RFC5218#10.5',
                'http://tools.ietf.org/html/rfc2518#section-10.5'
            ],
            426: [
                'Upgrade Required',
                'indicates that the server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol.',
                'RFC7231#6.5.15',
                'http://tools.ietf.org/html/rfc7231#section-6.5.15'
            ],
            428: [
                'Precondition Required',
                'indicates that the origin server requires the request to be conditional.',
                'RFC6585#3',
                'http://tools.ietf.org/html/rfc6585#section-3'
            ],
            429: [
                'Too Many Requests',
                'indicates that the user has sent too many requests in a given amount of time ("rate limiting").',
                'RFC6585#4',
                'http://tools.ietf.org/html/rfc6585#section-4'
            ],
            431: [
                'Request Header Fields Too Large',
                'indicates that the server is unwilling to process the request because its header fields are too large.',
                'RFC6585#5',
                'http://tools.ietf.org/html/rfc6585#section-5'
            ],
            451: [
                'Unavailable For Legal Reasons',
                'This status code indicates that the server is denying access to the resource in response to a legal demand.',
                'draft-tbray-http-legally-restricted-status',
                'http://tools.ietf.org/html/draft-tbray-http-legally-restricted-status'
            ],
            500: [
                'Internal Server Error',
                'indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.',
                'RFC7231#6.6.1',
                'http://tools.ietf.org/html/rfc7231#section-6.6.1'
            ],
            501: [
                'Not Implemented',
                'indicates that the server does not support the functionality required to fulfill the request.',
                'RFC7231#6.6.2',
                'http://tools.ietf.org/html/rfc7231#section-6.6.2'
            ],
            502: [
                'Bad Gateway',
                'indicates that the server, while acting as a gateway or proxy, received an invalid response from an inbound server it accessed while attempting to fulfill the request.',
                'RFC7231#6.6.3',
                'http://tools.ietf.org/html/rfc7231#section-6.6.3'
            ],
            503: [
                'Service Unavailable',
                'indicates that the server is currently unable to handle the request due to a temporary overload or scheduled maintenance, which will likely be alleviated after some delay.',
                'RFC7231#6.6.4',
                'http://tools.ietf.org/html/rfc7231#section-6.6.4'
            ],
            504: [
                'Gateway Time-out',
                'indicates that the server, while acting as a gateway or proxy, did not receive a timely response from an upstream server it needed to access in order to complete the request.',
                'RFC7231#6.6.5',
                'http://tools.ietf.org/html/rfc7231#section-6.6.5'
            ],
            505: [
                'HTTP Version Not Supported',
                'indicates that the server does not support, or refuses to support, the protocol version that was used in the request message.',
                'RFC7231#6.6.6',
                'http://tools.ietf.org/html/rfc7231#section-6.6.6'
            ],
            506: [
                'Variant Also Negotiates',
                'indicates that the server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.',
                'RFC2295#8.1',
                'http://tools.ietf.org/html/rfc2295#section-8.1'
            ],
            507: [
                'Insufficient Storage',
                'means the method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request.',
                'RFC5218#10.6',
                'http://tools.ietf.org/html/rfc2518#section-10.6'
            ],
            511: [
                'Network Authentication Required',
                'indicates that the client needs to authenticate to gain network access.',
                'RFC6585#6',
                'http://tools.ietf.org/html/rfc6585#section-6'
            ],
            '1xx': [
                '**Informational**',
                'indicates an interim response for communicating connection status or request progress prior to completing the requested action and sending a final response. ~ [sure](http://www.urbandictionary.com/define.php?term=sure)',
                'RFC7231#6.2',
                'http://tools.ietf.org/html/rfc7231#section-6.2'
            ],
            '2xx': [
                '**Successful**',
                'indicates that the client\'s request was successfully received, understood, and accepted. ~ [cool](https://twitter.com/DanaDanger/status/183316183494311936)',
                'RFC7231#6.3',
                'http://tools.ietf.org/html/rfc7231#section-6.3'
            ],
            '3xx': [
                '**Redirection**',
                'indicates that further action needs to be taken by the user agent in order to fulfill the request. ~ [ask that dude over there](https://twitter.com/DanaDanger/status/183316183494311936)',
                'RFC7231#6.4',
                'http://tools.ietf.org/html/rfc7231#section-6.4'
            ],
            '4xx': [
                '**Client Error**',
                'indicates that the client seems to have erred. ~ [*you* fucked up](https://twitter.com/DanaDanger/status/183316183494311936)',
                'RFC7231#6.5',
                'http://tools.ietf.org/html/rfc7231#section-6.5'
            ],
            '5xx': [
                '**Server Error**',
                'indicates that the server is aware that it has erred or is incapable of performing the requested method. ~ [*we* fucked up](https://twitter.com/DanaDanger/status/183316183494311936)',
                'RFC7231#6.6',
                'http://tools.ietf.org/html/rfc7231#section-6.6'
            ],
            '7xx': [
                '**Developer Error**',
                '[err](http://www.urbandictionary.com/define.php?term=err)',
                '7xx-rfc',
                'http://documentup.com/joho/7XX-rfc'
            ]
        },
        header: {
            'content-encoding': [
                'Content-Encoding',
                'indicates what content codings have been applied to the representation, beyond those inherent in the media type, and thus what decoding mechanisms have to be applied in order to obtain data in the media type referenced by the Content-Type header field.',
                'RFC7231#3.1.2.2',
                'http://tools.ietf.org/html/rfc7231#section-3.1.2.2'
            ],
            'content-language': [
                'Content-Language',
                'describes the natural language(s) of the intended audience for the representation.',
                'RFC7231#3.1.3.2',
                'http://tools.ietf.org/html/rfc7231#section-3.1.3.2'
            ],
            'content-location': [
                'Content-Location',
                'references a URI that can be used as an identifier for a specific resource corresponding to the representation in this message\'s payload.',
                'RFC7231#3.1.4.2',
                'http://tools.ietf.org/html/rfc7231#section-3.1.4.2'
            ],
            'content-type': [
                'Content-Type',
                'indicates the media type of the associated representation: either the representation enclosed in the message payload or the selected representation, as determined by the message semantics.',
                'RFC7231#3.1.1.5',
                'http://tools.ietf.org/html/rfc7231#section-3.1.1.5'
            ],
            'content-length': [
                'Content-Length',
                'can provide the anticipated size, as a decimal number of octets, for a potential payload body.',
                'RFC7230#3.3.2',
                'http://tools.ietf.org/html/rfc7230#section-3.3.2'
            ],
            'content-range': [
                'Content-Range',
                'is sent in a single part 206 (Partial Content) response to indicate the partial range of the selected representation enclosed as the message payload, sent in each part of a multipart 206 response to indicate the range enclosed within each body part, and sent in 416 (Range Not Satisfiable) responses to provide information about the selected representation.',
                'RFC7233#4.2',
                'http://tools.ietf.org/html/rfc7233#section-4.2'
            ],
            'transfer-encoding': [
                'Transfer-Encoding',
                'lists the transfer coding names corresponding to the sequence of transfer codings that have been (or will be) applied to the payload body in order to form the message body.',
                'RFC7230#3.3.1',
                'http://tools.ietf.org/html/rfc7230#section-3.3.1'
            ],
            'cache-control': [
                'Cache-Control',
                'is used to specify directives for caches along the request/response chain.',
                'RFC7234#7.2',
                'http://tools.ietf.org/html/rfc7234#section-7.2'
            ],
            expect: [
                'Expect',
                'is used to indicate that particular server behaviors are required by the client.',
                'RFC7231#5.1.1',
                'http://tools.ietf.org/html/rfc7231#section-5.1.1'
            ],
            host: [
                'Host',
                'provides the host and port information from the target URI, enabling the origin server to distinguish among resources while servicing requests for multiple host names on a single IP address.',
                'RFC7230#5.4',
                'http://tools.ietf.org/html/rfc7230#section-5.4'
            ],
            'max-forwards': [
                'Max-Forwards',
                'provides a mechanism with the TRACE and OPTIONS methods to limit the number of times that the request is forwarded by proxies.',
                'RFC7231#5.1.2',
                'http://tools.ietf.org/html/rfc7231#section-5.1.2'
            ],
            pragma: [
                'Pragma',
                'allows backwards compatibility with HTTP/1.0 caches, so that clients can specify a "no-cache" request that they will understand (as Cache-Control was not defined until HTTP/1.1).',
                'RFC7234#7.4',
                'http://tools.ietf.org/html/rfc7234#section-7.4'
            ],
            range: [
                'Range',
                'modifies the method semantics to request transfer of only one or more subranges of the selected representation data, rather than the entire selected representation data.',
                'RFC7233#3.1',
                'http://tools.ietf.org/html/rfc7233#section-3.1'
            ],
            te: [
                'TE',
                'indicates what transfer codings, besides chunked, the client is willing to accept in response, and whether or not the client is willing to accept trailer fields in a chunked transfer coding.',
                'RFC7230#4.3',
                'http://tools.ietf.org/html/rfc7230#section-4.3'
            ],
            'if-match': [
                'If-Match',
                'can be used to make a request method conditional on the current existence or value of an entity-tag for one or more representations of the target resource.',
                'RFC7232#3.1',
                'http://tools.ietf.org/html/rfc7232#section-3.1'
            ],
            'if-modified-since': [
                'If-Modified-Since',
                'can be used with GET or HEAD to make the method conditional by modification date: if the selected representation has not been modified since the time specified in this field, then do not perform the request method; instead, respond as detailed below.',
                'RFC7232#3.3',
                'http://tools.ietf.org/html/rfc7232#section-3.3'
            ],
            'if-none-match': [
                'If-None-Match',
                'can be used to make a request method conditional on not matching any of the current entity-tag values for representations of the target resource.',
                'RFC7232#3.2',
                'http://tools.ietf.org/html/rfc7232#section-3.2'
            ],
            'if-range': [
                'If-Range',
                'Informally, its meaning is: if the representation is unchanged, send me the part(s) that I am requesting in Range; otherwise, send me the entire representation.',
                'RFC7233#3.2',
                'http://tools.ietf.org/html/rfc7233#section-3.2'
            ],
            'if-unmodified-since': [
                'If-Unmodified-Since',
                'can be used to make a request method conditional by modification date: if the selected representation has been modified since the time specified in this field, then the server MUST NOT perform the requested operation and MUST instead respond with the 412 (Precondition Failed) status code.',
                'RFC7232#3.4',
                'http://tools.ietf.org/html/rfc7232#section-3.4'
            ],
            accept: [
                'Accept',
                'can be used to specify certain media types which are acceptable for the response.',
                'RFC7231#5.3.2',
                'http://tools.ietf.org/html/rfc7231#section-5.3.2'
            ],
            'accept-charset': [
                'Accept-Charset',
                'can be sent by a user agent to indicate what charsets are acceptable in textual response content.',
                'RFC7231#5.3.3',
                'http://tools.ietf.org/html/rfc7231#section-5.3.3'
            ],
            'accept-encoding': [
                'Accept-Encoding',
                'can be used by user agents to indicate what response content-codings are acceptable in the response.',
                'RFC7231#5.3.4',
                'http://tools.ietf.org/html/rfc7231#section-5.3.4'
            ],
            'accept-language': [
                'Accept-Language',
                'can be used by user agents to indicate the set of natural languages that are preferred in the response.',
                'RFC7231#5.3.5',
                'http://tools.ietf.org/html/rfc7231#section-5.3.5'
            ],
            authorization: [
                'Authorization',
                'allows a user agent to authenticate itself with a server -- usually, but not necessarily, after receiving a 401 (Unauthorized) response.',
                'RFC7235#4.1',
                'http://tools.ietf.org/html/rfc7235#section-4.1'
            ],
            'proxy-authorization': [
                'Proxy-Authorization',
                'allows the client to identify itself (or its user) to a proxy that requires authentication.',
                'RFC7235#4.3',
                'http://tools.ietf.org/html/rfc7235#section-4.3'
            ],
            dnt: [
                'DNT',
                'defined as the means for expressing a user\'s tracking preference via HTTP.',
                'Tracking Preference Expression (DNT)',
                'http://www.w3.org/TR/tracking-dnt/#dnt-header-field'
            ],
            from: [
                'From',
                'contains an Internet email address for a human user who controls the requesting user agent.',
                'RFC7231#5.5.1',
                'http://tools.ietf.org/html/rfc7231#section-5.5.1'
            ],
            referer: [
                'Referer',
                'allows the user agent to specify a URI reference for the resource from which the target URI was obtained (i.e., the "referrer", though the field name is misspelled).',
                'RFC7231#5.5.2',
                'http://tools.ietf.org/html/rfc7231#section-5.5.2'
            ],
            'user-agent': [
                'User-Agent',
                'contains information about the user agent originating the request, which is often used by servers to help identify the scope of reported interoperability problems, to work around or tailor responses to avoid particular user agent limitations, and for analytics regarding browser or operating system use.',
                'RFC7231#5.5.3',
                'http://tools.ietf.org/html/rfc7231#section-5.5.3'
            ],
            age: [
                'Age',
                'conveys the sender\'s estimate of the amount of time since the response was generated or successfully validated at the origin server.',
                'RFC7234#5.1',
                'http://tools.ietf.org/html/rfc7234#section-5.1'
            ],
            expires: [
                'Expires',
                'gives the date/time after which the response is considered stale.',
                'RFC7234#7.3',
                'http://tools.ietf.org/html/rfc7234#section-7.3'
            ],
            date: [
                'Date',
                'represents the date and time at which the message was originated',
                'RFC7231#7.1.1.2',
                'http://tools.ietf.org/html/rfc7231#section-7.1.1.2'
            ],
            location: [
                'Location',
                'is used in some responses to refer to a specific resource in relation to the response.',
                'RFC7231#7.1.2',
                'http://tools.ietf.org/html/rfc7231#section-7.1.2'
            ],
            'retry-after': [
                'Retry-After',
                'indicates how long the user agent ought to wait before making a follow-up request.',
                'RFC7231#7.1.3',
                'http://tools.ietf.org/html/rfc7231#section-7.1.3'
            ],
            tk: [
                'Tk',
                'defined as an OPTIONAL means for indicating the tracking status that applied to the corresponding request and as a REQUIRED means for indicating that a state-changing request has resulted in an interactive change to the tracking status. ',
                'Tracking Preference Expression (DNT)',
                'http://www.w3.org/TR/tracking-dnt/#response-header-field'
            ],
            vary: [
                'Vary',
                'describes what parts of a request message, aside from the method and request target, might influence the origin server\'s process for selecting and representing the response.',
                'RFC7231#7.1.4',
                'http://tools.ietf.org/html/rfc7231#section-7.1.4'
            ],
            warning: [
                'Warning',
                'is used to carry additional information about the status or transformation of a message that might not be reflected in the message.',
                'RFC7234#7.6',
                'http://tools.ietf.org/html/rfc7234#section-7.6'
            ],
            etag: [
                'ETag',
                'provides the current entity-tag for the selected representation, as determined at the conclusion of handling the request.',
                'RFC7232#2.3',
                'http://tools.ietf.org/html/rfc7232#section-2.3'
            ],
            'last-modified': [
                'Last-Modified',
                'provides a timestamp indicating the date and time at which the origin server believes the selected representation was last modified, as determined at the conclusion of handling the request.',
                'RFC7232#2.2',
                'http://tools.ietf.org/html/rfc7232#section-2.2'
            ],
            'www-authenticate': [
                'WWW-Authenticate',
                'consists of at least one challenge that indicates the authentication scheme(s) and parameters applicable to the effective request URI.',
                'RFC7235#4.4',
                'http://tools.ietf.org/html/rfc7235#section-4.4'
            ],
            'proxy-authenticate': [
                'Proxy-Authenticate',
                'consists of at least one challenge that indicates the authentication scheme(s) and parameters applicable to the proxy for this effective request URI.',
                'RFC7235#4.2',
                'http://tools.ietf.org/html/rfc7235#section-4.2'
            ],
            'accept-ranges': [
                'Accept-Ranges',
                'allows a server to indicate that it supports range requests for the target resource.',
                'RFC7233#2.3',
                'http://tools.ietf.org/html/rfc7233#section-2.3'
            ],
            allow: [
                'Allow',
                'lists the set of methods advertised as supported by the target resource.',
                'RFC7231#7.4.1',
                'http://tools.ietf.org/html/rfc7231#section-7.4.1'
            ],
            server: [
                'Server',
                'contains information about the software used by the origin server to handle the request, which is often used by clients to help identify the scope of reported interoperability problems, to work around or tailor requests to avoid particular server limitations, and for analytics regarding server or operating system use.',
                'RFC7231#7.4.2',
                'http://tools.ietf.org/html/rfc7231#section-7.4.2'
            ],
            'accept-patch': [
                'Accept-Patch',
                'used to specify the patch document formats accepted by the server.',
                'RFC5789#3.1',
                'http://tools.ietf.org/html/rfc5789#section-3.1'
            ],
            'accept-post': [
                'Accept-Post',
                'indicates server support for specific media types for entity bodies in HTTP POST requests.',
                'draft-wilde-accept-post',
                'http://tools.ietf.org/html/draft-wilde-accept-post'
            ],
            'access-control-allow-credentials': [
                'Access-Control-Allow-Credentials',
                'indicates whether the response to request can be exposed when the omit credentials flag is unset',
                'CORS',
                'http://www.w3.org/TR/cors/#access-control-allow-credentials-response-header'
            ],
            'access-control-allow-headers': [
                'Access-Control-Allow-Headers',
                'indicates, as part of the response to a preflight request, which header field names can be used during the actual request',
                'CORS',
                'http://www.w3.org/TR/cors/#access-control-allow-headers-response-header'
            ],
            'access-control-allow-methods': [
                'Access-Control-Allow-Methods',
                'indicates, as part of the response to a preflight request, which methods can be used during the actual request',
                'CORS',
                'http://www.w3.org/TR/cors/#access-control-allow-methods-response-header'
            ],
            'access-control-allow-origin': [
                'Access-Control-Allow-Origin',
                'indicates whether a resource can be shared',
                'CORS',
                'http://www.w3.org/TR/cors/#access-control-allow-origin-response-header'
            ],
            'access-control-expose-headers': [
                'Access-Control-Expose-Headers',
                'indicates which headers are safe to expose to the API of a CORS API specification',
                'CORS',
                'http://www.w3.org/TR/cors/#access-control-expose-headers-response-header'
            ],
            'access-control-max-age': [
                'Access-Control-Max-Age',
                'indicates how long the results of a preflight request can be cached in a preflight result cache',
                'CORS',
                'http://www.w3.org/TR/cors/#access-control-max-age-response-header'
            ],
            'access-control-request-headers': [
                'Access-Control-Request-Headers',
                'indicates which headers will be used in the actual request as part of the preflight request',
                'CORS',
                'http://www.w3.org/TR/cors/#access-control-request-headers-request-header'
            ],
            'access-control-request-method': [
                'Access-Control-Request-Method',
                'indicates which method will be used in the actual request as part of the preflight request',
                'CORS',
                'http://www.w3.org/TR/cors/#access-control-request-method-request-header'
            ],
            'content-disposition': [
                'Content-Disposition',
                'standard',
                'RFC6266',
                'http://tools.ietf.org/html/rfc6266'
            ],
            'content-security-policy': [
                'Content-Security-Policy',
                'is the preferred mechanism for delivering a CSP policy',
                'CSP',
                'http://www.w3.org/TR/CSP/#content-security-policy-header-field'
            ],
            'content-security-policy-report-only': [
                'Content-Security-Policy-Report-Only',
                'lets servers experiment with policies by monitoring (rather than enforcing) a policy',
                'CSP',
                'http://www.w3.org/TR/CSP/#content-security-policy-report-only-header-field'
            ],
            cookie: [
                'Cookie',
                'standard',
                'RFC6265',
                'http://tools.ietf.org/html/rfc6265'
            ],
            forwarded: [
                'Forwarded',
                'standard',
                'RFC7239',
                'http://tools.ietf.org/html/rfc7239'
            ],
            link: [
                'Link',
                'provides a means for serialising one or more links in HTTP headers.',
                'RFC5988#5',
                'http://tools.ietf.org/html/rfc5988#section-5'
            ],
            origin: [
                'Origin',
                'standard',
                'RFC6454',
                'http://tools.ietf.org/html/rfc6454'
            ],
            prefer: [
                'Prefer',
                'is used to indicate that particular server behaviors are preferred by the client, but not required for successful completion of the request.',
                'draft-snell-http-prefer#2',
                'http://tools.ietf.org/html/draft-snell-http-prefer#section-2'
            ],
            'preference-applied': [
                'Preference-Applied',
                'MAY be included within a response message as an indication as to which Prefer tokens were honored by the server and applied to the processing of a request.',
                'draft-snell-http-prefer#3',
                'http://tools.ietf.org/html/draft-snell-http-prefer#section-3'
            ],
            'set-cookie': [
                'Set-Cookie',
                'standard',
                'RFC6265',
                'http://tools.ietf.org/html/rfc6265'
            ],
            'strict-transport-security': [
                'Strict-Transport-Security',
                'standard',
                'RFC6797',
                'http://tools.ietf.org/html/rfc6797'
            ],
            via: [
                'Via',
                '',
                'RFC7230#5.7.1',
                'http://tools.ietf.org/html/rfc7230#section-5.7.1'
            ],
            'a-im': [
                'A-IM',
                '',
                'RFC3229#10.5.3',
                'http://tools.ietf.org/html/rfc3229#section-10.5.3'
            ],
            'accept-features': [
                'Accept-Features',
                'can be used by a user agent to give information about the presence or absence of certain features in the feature set of the current request.',
                'RFC2295#8.2',
                'http://tools.ietf.org/html/rfc2295#section-8.2'
            ],
            'alt-svc': [
                'Alt-Svc',
                'is advertising the availability of alternate services to HTTP/1.1 and HTTP/2.0 clients by adding an Alt-Svc header field to responses.',
                'draft-nottingham-httpbis-alt-svc',
                'http://tools.ietf.org/html/draft-nottingham-httpbis-alt-svc'
            ],
            alternates: [
                'Alternates',
                'is used to convey the list of variants bound to a negotiable resource.',
                'RFC2295#8.3',
                'http://tools.ietf.org/html/rfc2295#section-8.3'
            ],
            'apply-to-redirect-ref': [
                'Apply-To-Redirect-Ref',
                '',
                'RFC4437',
                'http://tools.ietf.org/html/rfc4437'
            ],
            ch: [
                'CH',
                'describes an example list of client preferences that the server can use to adapt and optimize the resource to satisfy a given request.',
                'draft-grigorik-http-client-hints',
                'http://tools.ietf.org/html/draft-grigorik-http-client-hints'
            ],
            'content-base': [
                'Content-Base',
                'obsoleted',
                'RFC2068',
                'http://tools.ietf.org/html/rfc2068'
            ],
            cookie2: [
                'Cookie2',
                'obsoleted',
                'RFC2965',
                'http://tools.ietf.org/html/rfc2965'
            ],
            dasl: [
                'DASL',
                'standard',
                'RFC5323',
                'http://tools.ietf.org/html/rfc5323'
            ],
            dav: [
                'DAV',
                'standard',
                'RFC4918',
                'http://tools.ietf.org/html/rfc4918'
            ],
            'delta-base': [
                'Delta-Base',
                '',
                'RFC3229#10.5.1',
                'http://tools.ietf.org/html/rfc3229#section-10.5.1'
            ],
            depth: [
                'Depth',
                'standard',
                'RFC4918',
                'http://tools.ietf.org/html/rfc4918'
            ],
            destination: [
                'Destination',
                'standard',
                'RFC4918',
                'http://tools.ietf.org/html/rfc4918'
            ],
            im: [
                'IM',
                '',
                'RFC3229#10.5.2',
                'http://tools.ietf.org/html/rfc3229#section-10.5.2'
            ],
            if: [
                'If',
                'standard',
                'RFC4918',
                'http://tools.ietf.org/html/rfc4918'
            ],
            'if-schedule-tag-match': [
                'If-Schedule-Tag-Match',
                'standard',
                'RFC6638',
                'http://tools.ietf.org/html/rfc6638'
            ],
            'last-event-id': [
                'Last-Event-ID',
                'The value of the event source\'s last event ID string, encoded as UTF-8.',
                'Server-Sent Events',
                'http://www.w3.org/TR/eventsource/#last-event-id'
            ],
            'link-template': [
                'Link-Template',
                'provides a means for serialising one or more links into HTTP headers.',
                'draft-nottingham-link-template',
                'http://tools.ietf.org/html/draft-nottingham-link-template'
            ],
            'lock-token': [
                'Lock-Token',
                'standard',
                'RFC4918',
                'http://tools.ietf.org/html/rfc4918'
            ],
            negotiate: [
                'Negotiate',
                'can contain directives for any content negotiation process initiated by the request.',
                'RFC2295#8.4',
                'http://tools.ietf.org/html/rfc2295#section-8.4'
            ],
            nice: [
                'Nice',
                'indicates that a request is less important than a request that doesn\'t bear this header.',
                'draft-thomson-http-nice',
                'http://tools.ietf.org/html/draft-thomson-http-nice'
            ],
            overwrite: [
                'Overwrite',
                'standard',
                'RFC4918',
                'http://tools.ietf.org/html/rfc4918'
            ],
            'redirect-ref': [
                'Redirect-Ref',
                '',
                'RFC4437',
                'http://tools.ietf.org/html/rfc4437'
            ],
            'schedule-reply': [
                'Schedule-Reply',
                'standard',
                'RFC6638',
                'http://tools.ietf.org/html/rfc6638'
            ],
            'schedule-tag': [
                'Schedule-Tag',
                'standard',
                'RFC6638',
                'http://tools.ietf.org/html/rfc6638'
            ],
            'sec-websocket-accept': [
                'Sec-WebSocket-Accept',
                'standard',
                'RFC6455',
                'http://tools.ietf.org/html/rfc6455'
            ],
            'sec-websocket-extensions': [
                'Sec-WebSocket-Extensions',
                'standard',
                'RFC6455',
                'http://tools.ietf.org/html/rfc6455'
            ],
            'sec-websocket-key': [
                'Sec-WebSocket-Key',
                'standard',
                'RFC6455',
                'http://tools.ietf.org/html/rfc6455'
            ],
            'sec-websocket-protocol': [
                'Sec-WebSocket-Protocol',
                'standard',
                'RFC6455',
                'http://tools.ietf.org/html/rfc6455'
            ],
            'sec-websocket-version': [
                'Sec-WebSocket-Version',
                'standard',
                'RFC6455',
                'http://tools.ietf.org/html/rfc6455'
            ],
            'set-cookie2': [
                'Set-Cookie2',
                'obsoleted',
                'RFC2965',
                'http://tools.ietf.org/html/rfc2965'
            ],
            slug: [
                'SLUG',
                'standard',
                'RFC5023',
                'http://tools.ietf.org/html/rfc5023'
            ],
            tcn: [
                'TCN',
                'is used by a server to signal that the resource is transparently negotiated.',
                'RFC2295#8.5',
                'http://tools.ietf.org/html/rfc2295#section-8.5'
            ],
            timeout: [
                'Timeout',
                'standard',
                'RFC4918',
                'http://tools.ietf.org/html/rfc4918'
            ],
            'variant-vary': [
                'Variant-Vary',
                'can be used in a choice response to record any vary information which applies to the variant data (the entity body combined with some of the entity headers) contained in the response, rather than to the response as a whole.',
                'RFC2295#8.6',
                'http://tools.ietf.org/html/rfc2295#section-8.6'
            ],
            'x-frame-options': [
                'X-Frame-Options',
                'indicates a policy that specifies whether the browser should render the transmitted resource within a <frame> or an <iframe>. Servers can declare this policy in the header of their HTTP responses to prevent clickjacking attacks, which ensures that their content is not embedded into other pages or frames.',
                'RFC7034',
                'http://tools.ietf.org/html/rfc7034'
            ]
        }
    });
