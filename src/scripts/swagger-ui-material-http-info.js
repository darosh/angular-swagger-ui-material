'use strict';

angular.module('swaggerUiMaterial')
    .value('httpInfo', {
        /*eslint-disable */
        method: {
            "DELETE": {
                "description": "requests that the origin server remove the association between the target resource and its current functionality.",
                "idempotent": true,
                "title": "RFC7231#4.3.5",
                "url": "http://tools.ietf.org/html/rfc7231#section-4.3.5"
            },
            "GET": {
                "description": "requests transfer of a current selected representation for the target resource.",
                "safe": true,
                "idempotent": true,
                "cacheable": true,
                "title": "RFC7231#4.3.1",
                "url": "http://tools.ietf.org/html/rfc7231#section-4.3.1"
            },
            "HEAD": {
                "description": "is identical to GET except that the server MUST NOT send a message body in the response (i.e., the response terminates at the end of the header block).",
                "safe": true,
                "idempotent": true,
                "cacheable": true,
                "title": "RFC7231#4.3.2",
                "url": "http://tools.ietf.org/html/rfc7231#section-4.3.2"
            },
            "OPTIONS": {
                "description": "requests information about the communication options available on the request/response chain identified by the effective request URI.",
                "safe": true,
                "idempotent": true,
                "title": "RFC7231#4.3.7",
                "url": "http://tools.ietf.org/html/rfc7231#section-4.3.7"
            },
            "POST": {
                "description": "requests that the target resource process the representation enclosed in the request according to the resource's own specific semantics.",
                "title": "RFC7231#4.3.3",
                "url": "http://tools.ietf.org/html/rfc7231#section-4.3.3"
            },
            "PUT": {
                "description": "requests that the state of the target resource be created or replaced with the state defined by the representation enclosed in the request message payload.",
                "idempotent": true,
                "title": "RFC7231#4.3.4",
                "url": "http://tools.ietf.org/html/rfc7231#section-4.3.4"
            },
            "PATCH": {
                "description": "requests that a set of changes described in the request entity be applied to the resource identified by the Request-URI.",
                "title": "RFC5789",
                "url": "http://tools.ietf.org/html/rfc5789#section-2"
            }
        },
        status:  {
            "1": {
                "phrase": "**Informational**",
                "description": "indicates an interim response for communicating connection status or request progress prior to completing the requested action and sending a final response. ~ [sure](http://www.urbandictionary.com/define.php?term=sure)",
                "title": "RFC7231#6.2",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.2"
            },
            "2": {
                "phrase": "**Successful**",
                "description": "indicates that the client's request was successfully received, understood, and accepted. ~ [cool](https://twitter.com/DanaDanger/status/183316183494311936)",
                "title": "RFC7231#6.3",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.3"
            },
            "3": {
                "phrase": "**Redirection**",
                "description": "indicates that further action needs to be taken by the user agent in order to fulfill the request. ~ [ask that dude over there](https://twitter.com/DanaDanger/status/183316183494311936)",
                "title": "RFC7231#6.4",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.4"
            },
            "4": {
                "phrase": "**Client Error**",
                "description": "indicates that the client seems to have erred. ~ [*you* fucked up](https://twitter.com/DanaDanger/status/183316183494311936)",
                "title": "RFC7231#6.5",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.5"
            },
            "5": {
                "phrase": "**Server Error**",
                "description": "indicates that the server is aware that it has erred or is incapable of performing the requested method. ~ [*we* fucked up](https://twitter.com/DanaDanger/status/183316183494311936)",
                "title": "RFC7231#6.6",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.6"
            },
            "7": {
                "phrase": "**Developer Error**",
                "description": "[err](http://www.urbandictionary.com/define.php?term=err)",
                "title": "7xx-rfc",
                "url": "http://documentup.com/joho/7XX-rfc"
            },
            "100": {
                "phrase": "Continue",
                "description": "indicates that the initial part of a request has been received and has not yet been rejected by the server.",
                "title": "RFC7231#6.2.1",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.2.1"
            },
            "101": {
                "phrase": "Switching Protocols",
                "description": "indicates that the server understands and is willing to comply with the client's request, via the Upgrade header field, for a change in the application protocol being used on this connection.",
                "title": "RFC7231#6.2.2",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.2.2"
            },
            "102": {
                "phrase": "Processing",
                "description": "is an interim response used to inform the client that the server has accepted the complete request, but has not yet completed it.",
                "title": "RFC5218#10.1",
                "url": "http://tools.ietf.org/html/rfc2518#section-10.1"
            },
            "200": {
                "phrase": "OK",
                "description": "indicates that the request has succeeded.",
                "title": "RFC7231#6.3.1",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.3.1"
            },
            "201": {
                "phrase": "Created",
                "description": "indicates that the request has been fulfilled and has resulted in one or more new resources being created.",
                "title": "RFC7231#6.3.2",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.3.2"
            },
            "202": {
                "phrase": "Accepted",
                "description": "indicates that the request has been accepted for processing, but the processing has not been completed.",
                "title": "RFC7231#6.3.3",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.3.3"
            },
            "203": {
                "phrase": "Non-Authoritative Information",
                "description": "indicates that the request was successful but the enclosed payload has been modified from that of the origin server's 200 (OK) response by a transforming proxy.",
                "title": "RFC7231#6.3.4",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.3.4"
            },
            "204": {
                "phrase": "No Content",
                "description": "indicates that the server has successfully fulfilled the request and that there is no additional content to send in the response payload body.",
                "title": "RFC7231#6.3.5",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.3.5"
            },
            "205": {
                "phrase": "Reset Content",
                "description": "indicates that the server has fulfilled the request and desires that the user agent reset the \"document view\", which caused the request to be sent, to its original state as received from the origin server.",
                "title": "RFC7231#6.3.6",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.3.6"
            },
            "206": {
                "phrase": "Partial Content",
                "description": "indicates that the server is successfully fulfilling a range request for the target resource by transferring one or more parts of the selected representation that correspond to the satisfiable ranges found in the requests's Range header field.",
                "title": "RFC7233#4.1",
                "url": "http://tools.ietf.org/html/rfc7233#section-4.1"
            },
            "207": {
                "phrase": "Multi-Status",
                "description": "provides status for multiple independent operations.",
                "title": "RFC5218#10.2",
                "url": "http://tools.ietf.org/html/rfc2518#section-10.2"
            },
            "226": {
                "phrase": "IM Used",
                "description": "The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.",
                "title": "RFC3229#10.4.1",
                "url": "http://tools.ietf.org/html/rfc3229#section-10.4.1"
            },
            "300": {
                "phrase": "Multiple Choices",
                "description": "indicates that the target resource has more than one representation, each with its own more specific identifier, and information about the alternatives is being provided so that the user (or user agent) can select a preferred representation by redirecting its request to one or more of those identifiers.",
                "title": "RFC7231#6.4.1",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.4.1"
            },
            "301": {
                "phrase": "Moved Permanently",
                "description": "indicates that the target resource has been assigned a new permanent URI and any future references to this resource ought to use one of the enclosed URIs.",
                "title": "RFC7231#6.4.2",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.4.2"
            },
            "302": {
                "phrase": "Found",
                "description": "indicates that the target resource resides temporarily under a different URI.",
                "title": "RFC7231#6.4.3",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.4.3"
            },
            "303": {
                "phrase": "See Other",
                "description": "indicates that the server is redirecting the user agent to a different resource, as indicated by a URI in the Location header field, that is intended to provide an indirect response to the original request.",
                "title": "RFC7231#6.4.4",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.4.4"
            },
            "304": {
                "phrase": "Not Modified",
                "description": "indicates that a conditional GET request has been received and would have resulted in a 200 (OK) response if it were not for the fact that the condition has evaluated to false.",
                "title": "RFC7232#4.1",
                "url": "http://tools.ietf.org/html/rfc7232#section-4.1"
            },
            "305": {
                "phrase": "Use Proxy",
                "description": "*deprecated*",
                "title": "RFC7231#6.4.5",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.4.5"
            },
            "307": {
                "phrase": "Temporary Redirect",
                "description": "indicates that the target resource resides temporarily under a different URI and the user agent MUST NOT change the request method if it performs an automatic redirection to that URI.",
                "title": "RFC7231#6.4.7",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.4.7"
            },
            "308": {
                "phrase": "Permanent Redirect",
                "description": "The target resource has been assigned a new permanent URI and any future references to this resource SHOULD use one of the returned URIs. [...] This status code is similar to 301 Moved Permanently (Section 7.3.2 of rfc7231), except that it does not allow rewriting the request method from POST to GET.",
                "title": "RFC7238",
                "url": "http://tools.ietf.org/html/rfc7238"
            },
            "400": {
                "phrase": "Bad Request",
                "description": "indicates that the server cannot or will not process the request because the received syntax is invalid, nonsensical, or exceeds some limitation on what the server is willing to process.",
                "title": "RFC7231#6.5.1",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.5.1"
            },
            "401": {
                "phrase": "Unauthorized",
                "description": "indicates that the request has not been applied because it lacks valid authentication credentials for the target resource.",
                "title": "RFC7235#6.3.1",
                "url": "http://tools.ietf.org/html/rfc7235#section-3.1"
            },
            "402": {
                "phrase": "Payment Required",
                "description": "*reserved*",
                "title": "RFC7231#6.5.2",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.5.2"
            },
            "403": {
                "phrase": "Forbidden",
                "description": "indicates that the server understood the request but refuses to authorize it.",
                "title": "RFC7231#6.5.3",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.5.3"
            },
            "404": {
                "phrase": "Not Found",
                "description": "indicates that the origin server did not find a current representation for the target resource or is not willing to disclose that one exists.",
                "title": "RFC7231#6.5.4",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.5.4"
            },
            "405": {
                "phrase": "Method Not Allowed",
                "description": "indicates that the method specified in the request-line is known by the origin server but not supported by the target resource.",
                "title": "RFC7231#6.5.5",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.5.5"
            },
            "406": {
                "phrase": "Not Acceptable",
                "description": "indicates that the target resource does not have a current representation that would be acceptable to the user agent, according to the proactive negotiation header fields received in the request, and the server is unwilling to supply a default representation.",
                "title": "RFC7231#6.5.6",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.5.6"
            },
            "407": {
                "phrase": "Proxy Authentication Required",
                "description": "is similar to 401 (Unauthorized), but indicates that the client needs to authenticate itself in order to use a proxy.",
                "title": "RFC7231#6.3.2",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.3.2"
            },
            "408": {
                "phrase": "Request Timeout",
                "description": "indicates that the server did not receive a complete request message within the time that it was prepared to wait.",
                "title": "RFC7231#6.5.7",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.5.7"
            },
            "409": {
                "phrase": "Conflict",
                "description": "indicates that the request could not be completed due to a conflict with the current state of the resource.",
                "title": "RFC7231#6.5.8",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.5.8"
            },
            "410": {
                "phrase": "Gone",
                "description": "indicates that access to the target resource is no longer available at the origin server and that this condition is likely to be permanent.",
                "title": "RFC7231#6.5.9",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.5.9"
            },
            "411": {
                "phrase": "Length Required",
                "description": "indicates that the server refuses to accept the request without a defined Content-Length.",
                "title": "RFC7231#6.5.10",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.5.10"
            },
            "412": {
                "phrase": "Precondition Failed",
                "description": "indicates that one or more preconditions given in the request header fields evaluated to false when tested on the server.",
                "title": "RFC7232#4.2",
                "url": "http://tools.ietf.org/html/rfc7232#section-4.2"
            },
            "413": {
                "phrase": "Payload Too Large",
                "description": "indicates that the server is refusing to process a request because the request payload is larger than the server is willing or able to process.",
                "title": "RFC7231#6.5.11",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.5.11"
            },
            "414": {
                "phrase": "URI Too Long",
                "description": "indicates that the server is refusing to service the request because the request-target is longer than the server is willing to interpret.",
                "title": "RFC7231#6.5.12",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.5.12"
            },
            "415": {
                "phrase": "Unsupported Media Type",
                "description": "indicates that the origin server is refusing to service the request because the payload is in a format not supported by the target resource for this method.",
                "title": "RFC7231#6.5.13",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.5.13"
            },
            "416": {
                "phrase": "Range Not Satisfiable",
                "description": "indicates that none of the ranges in the request's Range header field overlap the current extent of the selected resource or that the set of ranges requested has been rejected due to invalid ranges or an excessive request of small or overlapping ranges.",
                "title": "RFC7233#4.4",
                "url": "http://tools.ietf.org/html/rfc7233#section-4.4"
            },
            "417": {
                "phrase": "Expectation Failed",
                "description": "indicates that the expectation given in the request's Expect header field could not be met by at least one of the inbound servers.",
                "title": "RFC7231#6.5.14",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.5.14"
            },
            "422": {
                "phrase": "Unprocessable Entity",
                "description": "means the server understands the content type of the request entity (hence a 415(Unsupported Media Type) status code is inappropriate), and the syntax of the request entity is correct (thus a 400 (Bad Request) status code is inappropriate) but was unable to process the contained instructions.",
                "title": "RFC5218#10.3",
                "url": "http://tools.ietf.org/html/rfc2518#section-10.3"
            },
            "423": {
                "phrase": "Locked",
                "description": "means the source or destination resource of a method is locked.",
                "title": "RFC5218#10.4",
                "url": "http://tools.ietf.org/html/rfc2518#section-10.4"
            },
            "424": {
                "phrase": "Failed Dependency",
                "description": "means that the method could not be performed on the resource because the requested action depended on another action and that action failed.",
                "title": "RFC5218#10.5",
                "url": "http://tools.ietf.org/html/rfc2518#section-10.5"
            },
            "426": {
                "phrase": "Upgrade Required",
                "description": "indicates that the server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol.",
                "title": "RFC7231#6.5.15",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.5.15"
            },
            "428": {
                "phrase": "Precondition Required",
                "description": "indicates that the origin server requires the request to be conditional.",
                "title": "RFC6585#3",
                "url": "http://tools.ietf.org/html/rfc6585#section-3"
            },
            "429": {
                "phrase": "Too Many Requests",
                "description": "indicates that the user has sent too many requests in a given amount of time (\"rate limiting\").",
                "title": "RFC6585#4",
                "url": "http://tools.ietf.org/html/rfc6585#section-4"
            },
            "431": {
                "phrase": "Request Header Fields Too Large",
                "description": "indicates that the server is unwilling to process the request because its header fields are too large.",
                "title": "RFC6585#5",
                "url": "http://tools.ietf.org/html/rfc6585#section-5"
            },
            "451": {
                "phrase": "Unavailable For Legal Reasons",
                "description": "This status code indicates that the server is denying access to the resource in response to a legal demand.",
                "title": "draft-tbray-http-legally-restricted-status",
                "url": "http://tools.ietf.org/html/draft-tbray-http-legally-restricted-status"
            },
            "500": {
                "phrase": "Internal Server Error",
                "description": "indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.",
                "title": "RFC7231#6.6.1",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.6.1"
            },
            "501": {
                "phrase": "Not Implemented",
                "description": "indicates that the server does not support the functionality required to fulfill the request.",
                "title": "RFC7231#6.6.2",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.6.2"
            },
            "502": {
                "phrase": "Bad Gateway",
                "description": "indicates that the server, while acting as a gateway or proxy, received an invalid response from an inbound server it accessed while attempting to fulfill the request.",
                "title": "RFC7231#6.6.3",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.6.3"
            },
            "503": {
                "phrase": "Service Unavailable",
                "description": "indicates that the server is currently unable to handle the request due to a temporary overload or scheduled maintenance, which will likely be alleviated after some delay.",
                "title": "RFC7231#6.6.4",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.6.4"
            },
            "504": {
                "phrase": "Gateway Time-out",
                "description": "indicates that the server, while acting as a gateway or proxy, did not receive a timely response from an upstream server it needed to access in order to complete the request.",
                "title": "RFC7231#6.6.5",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.6.5"
            },
            "505": {
                "phrase": "HTTP Version Not Supported",
                "description": "indicates that the server does not support, or refuses to support, the protocol version that was used in the request message.",
                "title": "RFC7231#6.6.6",
                "url": "http://tools.ietf.org/html/rfc7231#section-6.6.6"
            },
            "506": {
                "phrase": "Variant Also Negotiates",
                "description": "indicates that the server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.",
                "title": "RFC2295#8.1",
                "url": "http://tools.ietf.org/html/rfc2295#section-8.1"
            },
            "507": {
                "phrase": "Insufficient Storage",
                "description": "means the method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request.",
                "title": "RFC5218#10.6",
                "url": "http://tools.ietf.org/html/rfc2518#section-10.6"
            },
            "511": {
                "phrase": "Network Authentication Required",
                "description": "indicates that the client needs to authenticate to gain network access.",
                "title": "RFC6585#6",
                "url": "http://tools.ietf.org/html/rfc6585#section-6"
            }
        },
        header:  {
            "content-encoding": {
                "header": "Content-Encoding",
                "description": "indicates what content codings have been applied to the representation, beyond those inherent in the media type, and thus what decoding mechanisms have to be applied in order to obtain data in the media type referenced by the Content-Type header field.",
                "title": "RFC7231#3.1.2.2",
                "url": "http://tools.ietf.org/html/rfc7231#section-3.1.2.2"
            },
            "content-language": {
                "header": "Content-Language",
                "description": "describes the natural language(s) of the intended audience for the representation.",
                "title": "RFC7231#3.1.3.2",
                "url": "http://tools.ietf.org/html/rfc7231#section-3.1.3.2"
            },
            "content-location": {
                "header": "Content-Location",
                "description": "references a URI that can be used as an identifier for a specific resource corresponding to the representation in this message's payload.",
                "title": "RFC7231#3.1.4.2",
                "url": "http://tools.ietf.org/html/rfc7231#section-3.1.4.2"
            },
            "content-type": {
                "header": "Content-Type",
                "description": "indicates the media type of the associated representation: either the representation enclosed in the message payload or the selected representation, as determined by the message semantics.",
                "title": "RFC7231#3.1.1.5",
                "url": "http://tools.ietf.org/html/rfc7231#section-3.1.1.5"
            },
            "content-length": {
                "header": "Content-Length",
                "description": "can provide the anticipated size, as a decimal number of octets, for a potential payload body.",
                "title": "RFC7230#3.3.2",
                "url": "http://tools.ietf.org/html/rfc7230#section-3.3.2"
            },
            "content-range": {
                "header": "Content-Range",
                "description": "is sent in a single part 206 (Partial Content) response to indicate the partial range of the selected representation enclosed as the message payload, sent in each part of a multipart 206 response to indicate the range enclosed within each body part, and sent in 416 (Range Not Satisfiable) responses to provide information about the selected representation.",
                "title": "RFC7233#4.2",
                "url": "http://tools.ietf.org/html/rfc7233#section-4.2"
            },
            "transfer-encoding": {
                "header": "Transfer-Encoding",
                "description": "lists the transfer coding names corresponding to the sequence of transfer codings that have been (or will be) applied to the payload body in order to form the message body.",
                "title": "RFC7230#3.3.1",
                "url": "http://tools.ietf.org/html/rfc7230#section-3.3.1"
            },
            "cache-control": {
                "header": "Cache-Control",
                "description": "is used to specify directives for caches along the request/response chain.",
                "title": "RFC7234#7.2",
                "url": "http://tools.ietf.org/html/rfc7234#section-7.2"
            },
            "expect": {
                "header": "Expect",
                "description": "is used to indicate that particular server behaviors are required by the client.",
                "title": "RFC7231#5.1.1",
                "url": "http://tools.ietf.org/html/rfc7231#section-5.1.1"
            },
            "host": {
                "header": "Host",
                "description": "provides the host and port information from the target URI, enabling the origin server to distinguish among resources while servicing requests for multiple host names on a single IP address.",
                "title": "RFC7230#5.4",
                "url": "http://tools.ietf.org/html/rfc7230#section-5.4"
            },
            "max-forwards": {
                "header": "Max-Forwards",
                "description": "provides a mechanism with the TRACE and OPTIONS methods to limit the number of times that the request is forwarded by proxies.",
                "title": "RFC7231#5.1.2",
                "url": "http://tools.ietf.org/html/rfc7231#section-5.1.2"
            },
            "pragma": {
                "header": "Pragma",
                "description": "allows backwards compatibility with HTTP/1.0 caches, so that clients can specify a \"no-cache\" request that they will understand (as Cache-Control was not defined until HTTP/1.1).",
                "title": "RFC7234#7.4",
                "url": "http://tools.ietf.org/html/rfc7234#section-7.4"
            },
            "range": {
                "header": "Range",
                "description": "modifies the method semantics to request transfer of only one or more subranges of the selected representation data, rather than the entire selected representation data.",
                "title": "RFC7233#3.1",
                "url": "http://tools.ietf.org/html/rfc7233#section-3.1"
            },
            "te": {
                "header": "TE",
                "description": "indicates what transfer codings, besides chunked, the client is willing to accept in response, and whether or not the client is willing to accept trailer fields in a chunked transfer coding.",
                "title": "RFC7230#4.3",
                "url": "http://tools.ietf.org/html/rfc7230#section-4.3"
            },
            "if-match": {
                "header": "If-Match",
                "description": "can be used to make a request method conditional on the current existence or value of an entity-tag for one or more representations of the target resource.",
                "title": "RFC7232#3.1",
                "url": "http://tools.ietf.org/html/rfc7232#section-3.1"
            },
            "if-modified-since": {
                "header": "If-Modified-Since",
                "description": "can be used with GET or HEAD to make the method conditional by modification date: if the selected representation has not been modified since the time specified in this field, then do not perform the request method; instead, respond as detailed below.",
                "title": "RFC7232#3.3",
                "url": "http://tools.ietf.org/html/rfc7232#section-3.3"
            },
            "if-none-match": {
                "header": "If-None-Match",
                "description": "can be used to make a request method conditional on not matching any of the current entity-tag values for representations of the target resource.",
                "title": "RFC7232#3.2",
                "url": "http://tools.ietf.org/html/rfc7232#section-3.2"
            },
            "if-range": {
                "header": "If-Range",
                "description": "Informally, its meaning is: if the representation is unchanged, send me the part(s) that I am requesting in Range; otherwise, send me the entire representation.",
                "title": "RFC7233#3.2",
                "url": "http://tools.ietf.org/html/rfc7233#section-3.2"
            },
            "if-unmodified-since": {
                "header": "If-Unmodified-Since",
                "description": "can be used to make a request method conditional by modification date: if the selected representation has been modified since the time specified in this field, then the server MUST NOT perform the requested operation and MUST instead respond with the 412 (Precondition Failed) status code.",
                "title": "RFC7232#3.4",
                "url": "http://tools.ietf.org/html/rfc7232#section-3.4"
            },
            "accept": {
                "header": "Accept",
                "description": "can be used to specify certain media types which are acceptable for the response.",
                "title": "RFC7231#5.3.2",
                "url": "http://tools.ietf.org/html/rfc7231#section-5.3.2"
            },
            "accept-charset": {
                "header": "Accept-Charset",
                "description": "can be sent by a user agent to indicate what charsets are acceptable in textual response content.",
                "title": "RFC7231#5.3.3",
                "url": "http://tools.ietf.org/html/rfc7231#section-5.3.3"
            },
            "accept-encoding": {
                "header": "Accept-Encoding",
                "description": "can be used by user agents to indicate what response content-codings are acceptable in the response.",
                "title": "RFC7231#5.3.4",
                "url": "http://tools.ietf.org/html/rfc7231#section-5.3.4"
            },
            "accept-language": {
                "header": "Accept-Language",
                "description": "can be used by user agents to indicate the set of natural languages that are preferred in the response.",
                "title": "RFC7231#5.3.5",
                "url": "http://tools.ietf.org/html/rfc7231#section-5.3.5"
            },
            "authorization": {
                "header": "Authorization",
                "description": "allows a user agent to authenticate itself with a server -- usually, but not necessarily, after receiving a 401 (Unauthorized) response.",
                "title": "RFC7235#4.1",
                "url": "http://tools.ietf.org/html/rfc7235#section-4.1"
            },
            "proxy-authorization": {
                "header": "Proxy-Authorization",
                "description": "allows the client to identify itself (or its user) to a proxy that requires authentication.",
                "title": "RFC7235#4.3",
                "url": "http://tools.ietf.org/html/rfc7235#section-4.3"
            },
            "dnt": {
                "header": "DNT",
                "description": "defined as the means for expressing a user's tracking preference via HTTP.",
                "title": "Tracking Preference Expression (DNT)",
                "url": "http://www.w3.org/TR/tracking-dnt/#dnt-header-field"
            },
            "from": {
                "header": "From",
                "description": "contains an Internet email address for a human user who controls the requesting user agent.",
                "title": "RFC7231#5.5.1",
                "url": "http://tools.ietf.org/html/rfc7231#section-5.5.1"
            },
            "referer": {
                "header": "Referer",
                "description": "allows the user agent to specify a URI reference for the resource from which the target URI was obtained (i.e., the \"referrer\", though the field name is misspelled).",
                "title": "RFC7231#5.5.2",
                "url": "http://tools.ietf.org/html/rfc7231#section-5.5.2"
            },
            "user-agent": {
                "header": "User-Agent",
                "description": "contains information about the user agent originating the request, which is often used by servers to help identify the scope of reported interoperability problems, to work around or tailor responses to avoid particular user agent limitations, and for analytics regarding browser or operating system use.",
                "title": "RFC7231#5.5.3",
                "url": "http://tools.ietf.org/html/rfc7231#section-5.5.3"
            },
            "age": {
                "header": "Age",
                "description": "conveys the sender's estimate of the amount of time since the response was generated or successfully validated at the origin server.",
                "title": "RFC7234#5.1",
                "url": "http://tools.ietf.org/html/rfc7234#section-5.1"
            },
            "expires": {
                "header": "Expires",
                "description": "gives the date/time after which the response is considered stale.",
                "title": "RFC7234#7.3",
                "url": "http://tools.ietf.org/html/rfc7234#section-7.3"
            },
            "date": {
                "header": "Date",
                "description": "represents the date and time at which the message was originated",
                "title": "RFC7231#7.1.1.2",
                "url": "http://tools.ietf.org/html/rfc7231#section-7.1.1.2"
            },
            "location": {
                "header": "Location",
                "description": "is used in some responses to refer to a specific resource in relation to the response.",
                "title": "RFC7231#7.1.2",
                "url": "http://tools.ietf.org/html/rfc7231#section-7.1.2"
            },
            "retry-after": {
                "header": "Retry-After",
                "description": "indicates how long the user agent ought to wait before making a follow-up request.",
                "title": "RFC7231#7.1.3",
                "url": "http://tools.ietf.org/html/rfc7231#section-7.1.3"
            },
            "tk": {
                "header": "Tk",
                "description": "defined as an OPTIONAL means for indicating the tracking status that applied to the corresponding request and as a REQUIRED means for indicating that a state-changing request has resulted in an interactive change to the tracking status. ",
                "title": "Tracking Preference Expression (DNT)",
                "url": "http://www.w3.org/TR/tracking-dnt/#response-header-field"
            },
            "vary": {
                "header": "Vary",
                "description": "describes what parts of a request message, aside from the method and request target, might influence the origin server's process for selecting and representing the response.",
                "title": "RFC7231#7.1.4",
                "url": "http://tools.ietf.org/html/rfc7231#section-7.1.4"
            },
            "warning": {
                "header": "Warning",
                "description": "is used to carry additional information about the status or transformation of a message that might not be reflected in the message.",
                "title": "RFC7234#7.6",
                "url": "http://tools.ietf.org/html/rfc7234#section-7.6"
            },
            "etag": {
                "header": "ETag",
                "description": "provides the current entity-tag for the selected representation, as determined at the conclusion of handling the request.",
                "title": "RFC7232#2.3",
                "url": "http://tools.ietf.org/html/rfc7232#section-2.3"
            },
            "last-modified": {
                "header": "Last-Modified",
                "description": "provides a timestamp indicating the date and time at which the origin server believes the selected representation was last modified, as determined at the conclusion of handling the request.",
                "title": "RFC7232#2.2",
                "url": "http://tools.ietf.org/html/rfc7232#section-2.2"
            },
            "www-authenticate": {
                "header": "WWW-Authenticate",
                "description": "consists of at least one challenge that indicates the authentication scheme(s) and parameters applicable to the effective request URI.",
                "title": "RFC7235#4.4",
                "url": "http://tools.ietf.org/html/rfc7235#section-4.4"
            },
            "proxy-authenticate": {
                "header": "Proxy-Authenticate",
                "description": "consists of at least one challenge that indicates the authentication scheme(s) and parameters applicable to the proxy for this effective request URI.",
                "title": "RFC7235#4.2",
                "url": "http://tools.ietf.org/html/rfc7235#section-4.2"
            },
            "accept-ranges": {
                "header": "Accept-Ranges",
                "description": "allows a server to indicate that it supports range requests for the target resource.",
                "title": "RFC7233#2.3",
                "url": "http://tools.ietf.org/html/rfc7233#section-2.3"
            },
            "allow": {
                "header": "Allow",
                "description": "lists the set of methods advertised as supported by the target resource.",
                "title": "RFC7231#7.4.1",
                "url": "http://tools.ietf.org/html/rfc7231#section-7.4.1"
            },
            "server": {
                "header": "Server",
                "description": "contains information about the software used by the origin server to handle the request, which is often used by clients to help identify the scope of reported interoperability problems, to work around or tailor requests to avoid particular server limitations, and for analytics regarding server or operating system use.",
                "title": "RFC7231#7.4.2",
                "url": "http://tools.ietf.org/html/rfc7231#section-7.4.2"
            },
            "accept-patch": {
                "header": "Accept-Patch",
                "description": "used to specify the patch document formats accepted by the server.",
                "title": "RFC5789#3.1",
                "url": "http://tools.ietf.org/html/rfc5789#section-3.1"
            },
            "accept-post": {
                "header": "Accept-Post",
                "description": "indicates server support for specific media types for entity bodies in HTTP POST requests.",
                "title": "draft-wilde-accept-post",
                "url": "http://tools.ietf.org/html/draft-wilde-accept-post"
            },
            "access-control-allow-credentials": {
                "header": "Access-Control-Allow-Credentials",
                "description": "indicates whether the response to request can be exposed when the omit credentials flag is unset",
                "title": "CORS",
                "url": "http://www.w3.org/TR/cors/#access-control-allow-credentials-response-header"
            },
            "access-control-allow-headers": {
                "header": "Access-Control-Allow-Headers",
                "description": "indicates, as part of the response to a preflight request, which header field names can be used during the actual request",
                "title": "CORS",
                "url": "http://www.w3.org/TR/cors/#access-control-allow-headers-response-header"
            },
            "access-control-allow-methods": {
                "header": "Access-Control-Allow-Methods",
                "description": "indicates, as part of the response to a preflight request, which methods can be used during the actual request",
                "title": "CORS",
                "url": "http://www.w3.org/TR/cors/#access-control-allow-methods-response-header"
            },
            "access-control-allow-origin": {
                "header": "Access-Control-Allow-Origin",
                "description": "indicates whether a resource can be shared",
                "title": "CORS",
                "url": "http://www.w3.org/TR/cors/#access-control-allow-origin-response-header"
            },
            "access-control-expose-headers": {
                "header": "Access-Control-Expose-Headers",
                "description": "indicates which headers are safe to expose to the API of a CORS API specification",
                "title": "CORS",
                "url": "http://www.w3.org/TR/cors/#access-control-expose-headers-response-header"
            },
            "access-control-max-age": {
                "header": "Access-Control-Max-Age",
                "description": "indicates how long the results of a preflight request can be cached in a preflight result cache",
                "title": "CORS",
                "url": "http://www.w3.org/TR/cors/#access-control-max-age-response-header"
            },
            "access-control-request-headers": {
                "header": "Access-Control-Request-Headers",
                "description": "indicates which headers will be used in the actual request as part of the preflight request",
                "title": "CORS",
                "url": "http://www.w3.org/TR/cors/#access-control-request-headers-request-header"
            },
            "access-control-request-method": {
                "header": "Access-Control-Request-Method",
                "description": "indicates which method will be used in the actual request as part of the preflight request",
                "title": "CORS",
                "url": "http://www.w3.org/TR/cors/#access-control-request-method-request-header"
            },
            "content-disposition": {
                "header": "Content-Disposition",
                "description": "standard",
                "title": "RFC6266",
                "url": "http://tools.ietf.org/html/rfc6266"
            },
            "content-security-policy": {
                "header": "Content-Security-Policy",
                "description": "is the preferred mechanism for delivering a CSP policy",
                "title": "CSP",
                "url": "http://www.w3.org/TR/CSP/#content-security-policy-header-field"
            },
            "content-security-policy-report-only": {
                "header": "Content-Security-Policy-Report-Only",
                "description": "lets servers experiment with policies by monitoring (rather than enforcing) a policy",
                "title": "CSP",
                "url": "http://www.w3.org/TR/CSP/#content-security-policy-report-only-header-field"
            },
            "cookie": {
                "header": "Cookie",
                "description": "standard",
                "title": "RFC6265",
                "url": "http://tools.ietf.org/html/rfc6265"
            },
            "forwarded": {
                "header": "Forwarded",
                "description": "standard",
                "title": "RFC7239",
                "url": "http://tools.ietf.org/html/rfc7239"
            },
            "link": {
                "header": "Link",
                "description": "provides a means for serialising one or more links in HTTP headers.",
                "title": "RFC5988#5",
                "url": "http://tools.ietf.org/html/rfc5988#section-5"
            },
            "origin": {
                "header": "Origin",
                "description": "standard",
                "title": "RFC6454",
                "url": "http://tools.ietf.org/html/rfc6454"
            },
            "prefer": {
                "header": "Prefer",
                "description": "is used to indicate that particular server behaviors are preferred by the client, but not required for successful completion of the request.",
                "title": "draft-snell-http-prefer#2",
                "url": "http://tools.ietf.org/html/draft-snell-http-prefer#section-2"
            },
            "preference-applied": {
                "header": "Preference-Applied",
                "description": "MAY be included within a response message as an indication as to which Prefer tokens were honored by the server and applied to the processing of a request.",
                "title": "draft-snell-http-prefer#3",
                "url": "http://tools.ietf.org/html/draft-snell-http-prefer#section-3"
            },
            "set-cookie": {
                "header": "Set-Cookie",
                "description": "standard",
                "title": "RFC6265",
                "url": "http://tools.ietf.org/html/rfc6265"
            },
            "strict-transport-security": {
                "header": "Strict-Transport-Security",
                "description": "standard",
                "title": "RFC6797",
                "url": "http://tools.ietf.org/html/rfc6797"
            },
            "via": {
                "header": "Via",
                "description": "",
                "title": "RFC7230#5.7.1",
                "url": "http://tools.ietf.org/html/rfc7230#section-5.7.1"
            },
            "a-im": {
                "header": "A-IM",
                "description": "",
                "title": "RFC3229#10.5.3",
                "url": "http://tools.ietf.org/html/rfc3229#section-10.5.3"
            },
            "accept-features": {
                "header": "Accept-Features",
                "description": "can be used by a user agent to give information about the presence or absence of certain features in the feature set of the current request.",
                "title": "RFC2295#8.2",
                "url": "http://tools.ietf.org/html/rfc2295#section-8.2"
            },
            "alt-svc": {
                "header": "Alt-Svc",
                "description": "is advertising the availability of alternate services to HTTP/1.1 and HTTP/2.0 clients by adding an Alt-Svc header field to responses.",
                "title": "draft-nottingham-httpbis-alt-svc",
                "url": "http://tools.ietf.org/html/draft-nottingham-httpbis-alt-svc"
            },
            "alternates": {
                "header": "Alternates",
                "description": "is used to convey the list of variants bound to a negotiable resource.",
                "title": "RFC2295#8.3",
                "url": "http://tools.ietf.org/html/rfc2295#section-8.3"
            },
            "apply-to-redirect-ref": {
                "header": "Apply-To-Redirect-Ref",
                "description": "",
                "title": "RFC4437",
                "url": "http://tools.ietf.org/html/rfc4437"
            },
            "ch": {
                "header": "CH",
                "description": "describes an example list of client preferences that the server can use to adapt and optimize the resource to satisfy a given request.",
                "title": "draft-grigorik-http-client-hints",
                "url": "http://tools.ietf.org/html/draft-grigorik-http-client-hints"
            },
            "content-base": {
                "header": "Content-Base",
                "description": "obsoleted",
                "title": "RFC2068",
                "url": "http://tools.ietf.org/html/rfc2068"
            },
            "cookie2": {
                "header": "Cookie2",
                "description": "obsoleted",
                "title": "RFC2965",
                "url": "http://tools.ietf.org/html/rfc2965"
            },
            "dasl": {
                "header": "DASL",
                "description": "standard",
                "title": "RFC5323",
                "url": "http://tools.ietf.org/html/rfc5323"
            },
            "dav": {
                "header": "DAV",
                "description": "standard",
                "title": "RFC4918",
                "url": "http://tools.ietf.org/html/rfc4918"
            },
            "delta-base": {
                "header": "Delta-Base",
                "description": "",
                "title": "RFC3229#10.5.1",
                "url": "http://tools.ietf.org/html/rfc3229#section-10.5.1"
            },
            "depth": {
                "header": "Depth",
                "description": "standard",
                "title": "RFC4918",
                "url": "http://tools.ietf.org/html/rfc4918"
            },
            "destination": {
                "header": "Destination",
                "description": "standard",
                "title": "RFC4918",
                "url": "http://tools.ietf.org/html/rfc4918"
            },
            "im": {
                "header": "IM",
                "description": "",
                "title": "RFC3229#10.5.2",
                "url": "http://tools.ietf.org/html/rfc3229#section-10.5.2"
            },
            "if": {
                "header": "If",
                "description": "standard",
                "title": "RFC4918",
                "url": "http://tools.ietf.org/html/rfc4918"
            },
            "if-schedule-tag-match": {
                "header": "If-Schedule-Tag-Match",
                "description": "standard",
                "title": "RFC6638",
                "url": "http://tools.ietf.org/html/rfc6638"
            },
            "last-event-id": {
                "header": "Last-Event-ID",
                "description": "The value of the event source's last event ID string, encoded as UTF-8.",
                "title": "Server-Sent Events",
                "url": "http://www.w3.org/TR/eventsource/#last-event-id"
            },
            "link-template": {
                "header": "Link-Template",
                "description": "provides a means for serialising one or more links into HTTP headers.",
                "title": "draft-nottingham-link-template",
                "url": "http://tools.ietf.org/html/draft-nottingham-link-template"
            },
            "lock-token": {
                "header": "Lock-Token",
                "description": "standard",
                "title": "RFC4918",
                "url": "http://tools.ietf.org/html/rfc4918"
            },
            "negotiate": {
                "header": "Negotiate",
                "description": "can contain directives for any content negotiation process initiated by the request.",
                "title": "RFC2295#8.4",
                "url": "http://tools.ietf.org/html/rfc2295#section-8.4"
            },
            "nice": {
                "header": "Nice",
                "description": "indicates that a request is less important than a request that doesn't bear this header.",
                "title": "draft-thomson-http-nice",
                "url": "http://tools.ietf.org/html/draft-thomson-http-nice"
            },
            "overwrite": {
                "header": "Overwrite",
                "description": "standard",
                "title": "RFC4918",
                "url": "http://tools.ietf.org/html/rfc4918"
            },
            "redirect-ref": {
                "header": "Redirect-Ref",
                "description": "",
                "title": "RFC4437",
                "url": "http://tools.ietf.org/html/rfc4437"
            },
            "schedule-reply": {
                "header": "Schedule-Reply",
                "description": "standard",
                "title": "RFC6638",
                "url": "http://tools.ietf.org/html/rfc6638"
            },
            "schedule-tag": {
                "header": "Schedule-Tag",
                "description": "standard",
                "title": "RFC6638",
                "url": "http://tools.ietf.org/html/rfc6638"
            },
            "sec-websocket-accept": {
                "header": "Sec-WebSocket-Accept",
                "description": "standard",
                "title": "RFC6455",
                "url": "http://tools.ietf.org/html/rfc6455"
            },
            "sec-websocket-extensions": {
                "header": "Sec-WebSocket-Extensions",
                "description": "standard",
                "title": "RFC6455",
                "url": "http://tools.ietf.org/html/rfc6455"
            },
            "sec-websocket-key": {
                "header": "Sec-WebSocket-Key",
                "description": "standard",
                "title": "RFC6455",
                "url": "http://tools.ietf.org/html/rfc6455"
            },
            "sec-websocket-protocol": {
                "header": "Sec-WebSocket-Protocol",
                "description": "standard",
                "title": "RFC6455",
                "url": "http://tools.ietf.org/html/rfc6455"
            },
            "sec-websocket-version": {
                "header": "Sec-WebSocket-Version",
                "description": "standard",
                "title": "RFC6455",
                "url": "http://tools.ietf.org/html/rfc6455"
            },
            "set-cookie2": {
                "header": "Set-Cookie2",
                "description": "obsoleted",
                "title": "RFC2965",
                "url": "http://tools.ietf.org/html/rfc2965"
            },
            "slug": {
                "header": "SLUG",
                "description": "standard",
                "title": "RFC5023",
                "url": "http://tools.ietf.org/html/rfc5023"
            },
            "tcn": {
                "header": "TCN",
                "description": "is used by a server to signal that the resource is transparently negotiated.",
                "title": "RFC2295#8.5",
                "url": "http://tools.ietf.org/html/rfc2295#section-8.5"
            },
            "timeout": {
                "header": "Timeout",
                "description": "standard",
                "title": "RFC4918",
                "url": "http://tools.ietf.org/html/rfc4918"
            },
            "variant-vary": {
                "header": "Variant-Vary",
                "description": "can be used in a choice response to record any vary information which applies to the variant data (the entity body combined with some of the entity headers) contained in the response, rather than to the response as a whole.",
                "title": "RFC2295#8.6",
                "url": "http://tools.ietf.org/html/rfc2295#section-8.6"
            },
            "x-frame-options": {
                "header": "X-Frame-Options",
                "description": "indicates a policy that specifies whether the browser should render the transmitted resource within a <frame> or an <iframe>. Servers can declare this policy in the header of their HTTP responses to prevent clickjacking attacks, which ensures that their content is not embedded into other pages or frames.",
                "title": "RFC7034",
                "url": "http://tools.ietf.org/html/rfc7034"
            }
        }
        /*eslint-enable */
    });
