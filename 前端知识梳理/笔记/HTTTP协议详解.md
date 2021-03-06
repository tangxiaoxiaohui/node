# 简介
	HTTP协议是Hyper Text Transfer Protocol(超文本传输协议)的缩写
	HTTP是一个基于TCP/IP通信协议来传递数据(HTML 文件, 图片文件, 查询结果等)。
	HTTP是一个属于应用层的面向对象的协议,由于其简捷、快速的方式,适用于分布式超媒体信息系统
	目前在WWW中使用的是HTTP/1.0的第六版
	HTTP协议工作于客户端-服务端架构为上。
	浏览器作为HTTP客户端通过URL向HTTP服务端即WEB服务器发送所有请求。Web服务器根据接收到的请求后,向客户端发送响应信息。

# 特点
1. 简单快速:
	客户向服务器请求服务时,只需传送请求方法和路径
	请求方法常用的有GET、HEAD、POST。每种方法规定了客户与服务器联系的类型不同.
	由于HTTP协议简单,使得HTTP服务器的程序规模小,因而通信速度很快。
2. 灵活:
	HTTP允许传输任意类型的数据对象。正在传输的类型由Content-Type加以标记。
3. 无连接:
	无连接的含义是限制每次连接只处理一个请求。
	服务器处理完客户的请求,并收到客户的应答后,即断开连接。采用这种方式可以节省传输时间。
	HTTP协议永远都是客户端发起请求,无法实现在客户端没有发起请求的时候,服务器将消息推送给客户端。
4. 无状态:
	HTTP协议是无状态协议。无状态是指协议对于事务处理没有记忆能力。
	缺少状态意味着如果后续处理需要前面的信息,则它必须重传,这样可能导致每次连接传送的数据量增大。另一方面,在服务器不需要先前信息时它的应答就较快。
5. 扩展:
	支持B/S及C/S模式。

# HTTP在TCP/IP协议栈中的位置
	HTTP协议通常承载于TCP协议之上,有时也承载于TLS或SSL协议层之上,这个时候,就成了我们常说的HTTPS。
	默认HTTP的端口号为80,HTTPS的端口号为443。

# URL
	HTTP使用统一资源标识符(Uniform Resource Identifiers, URI)来传输数据和建立连接
	URL是一种特殊类型的URI,包含了用于查找某个资源的足够的信息
	URL组成	http://www.aspxfans.com:8080/news/index.asp?boardID=5&ID=24618&page=1#name
	协议部分: 
		该URL的协议部分为“http:”,这代表网页使用的是HTTP协议。
		在Internet中可以使用多种协议,如HTTP,FTP等等本例中使用的是HTTP协议。
		在"HTTP"后面的“//”为分隔符
	域名部分:
		该URL的域名部分为"www.aspxfans.com"。
		一个URL中,也可以使用IP地址作为域名使用
	端口部分:
		跟在域名后面的是端口,域名和端口之间使用":"作为分隔符。
		端口不是一个URL必须的部分,如果省略端口部分,将采用默认端口
	虚拟目录部分:
		从域名后的第一个"/"开始到最后一个"/"为止,是虚拟目录部分。
		虚拟目录也不是一个URL必须的部分。本例中的虚拟目录是"/news/"
	文件名部分:
		从域名后的最后一个"/"开始到"？"为止,是文件名部分
		如果没有"?",则是从域名后的最后一个"/"开始到"#"为止,是文件部分
		如果没有"？"和"#",那么从域名后的最后一个"/"开始到结束,都是文件名部分。
		本例中的文件名是“index.asp”。文件名部分也不是一个URL必须的部分,如果省略该部分,则使用默认的文件名
	锚部分:
		从"#"开始到最后,都是锚部分。
		本例中的锚部分是"name"。锚部分也不是一个URL必须的部分
	参数部分:
		从"?"开始到"#"为止之间的部分为参数部分,又称搜索部分、查询部分。
		本例中的参数部分为“boardID=5&ID=24618&page=1”。参数可以允许有多个参数,参数与参数之间用“&”作为分隔符。

# URI/URL/URN的区别
	URI(是uniform resource identifier,统一资源标识符,用来唯一的标识一个资源。)
		Web上可用的每种资源如HTML文档、图像、视频片段、程序等都是一个来URI来定位的
		URI一般由三部组成:
			①访问资源的命名机制
			②存放资源的主机名
			③资源自身的名称,由路径表示,着重强调于资源。
	URL(是uniform resource locator,统一资源定位器,它是一种具体的URI,即URL可以用来标识一个资源,而且还指明了如何locate这个资源。)
		URL是Internet上用来描述信息资源的字符串,主要用在各种WWW客户程序和服务器程序上,特别是著名的Mosaic。
		采用URL可以用一种统一的格式来描述各种信息资源,包括文件、服务器的地址和目录等。URL一般由三部组成:
		①协议(或称为服务方式)
		②存有该资源的主机IP地址(有时也包括端口号)
		③主机资源的具体地址。如目录和文件名等
	URN(uniform resource name,统一资源命名,是通过名字来标识资源,比如mailto:java-net@java.sun.com)
		URI是以一种抽象的,高层次概念定义统一资源标识,而URL和URN则是具体的资源标识的方式。
		URL和URN都是一种URI。
		笼统地说,每个 URL 都是 URI,但不一定每个 URI 都是 URL。
		这是因为 URI 还包括一个子类,即统一资源名称 (URN),它命名资源但不指定如何定位资源。上面的 mailto、news 和 isbn URI 都是 URN 的示例。
		在Java的URI中,一个URI实例可以代表绝对的,也可以是相对的,只要它符合URI的语法规则。
		而URL类则不仅符合语义,还包含了定位该资源的信息,因此它不能是相对的。
		在Java类库中,URI类不包含任何访问资源的方法,它唯一的作用就是解析。相反的是,URL类可以打开一个到达资源的流。

# 请求消息Request
	客户端发送一个HTTP请求到服务器的请求消息包括(请求行(request line)、请求头部(header)、空行和请求数据)四个部分组成。
	请求行:(用来说明请求类型,要访问的资源以及所使用的HTTP版本.)
		GET /562f25980001b1b106000338.jpg HTTP/1.1
		请求方法 空格 URL 空格 协议版本 回车符 换行符
		GET(请求方法) /562f25980001b1b106000338.jpg(URL) HTTP/1.1(协议版本)
	请求头部:(请求头部,紧接着请求行(即第一行)之后的部分,用来说明服务器要使用的附加信息)
		头部字段名 : 值 回车符 换行符
		HOST		指出请求的目的地.
		User-Agent	服务器端和客户端脚本都能访问它,它是浏览器类型检测逻辑的重要基础
	空行:(空行,请求头部后面的空行是必须的)
	请求数据:(也叫主体,可以添加任意的其他数据。)

# 响应消息Response
	HTTP响应也由四个部分组成,分别是(状态行、消息报头、空行和响应正文)。
	状态行:(由HTTP协议版本号, 状态码, 状态消息 三部分组成)
		HTTP/1.1 200 OK
		HTTP协议版本号  状态码 状态消息
	消息报头:(用来说明客户端要使用的一些附加信息)
		Date			生成响应的日期和时间
		Content-Type	指定了MIME类型的HTML(text/html),编码类型是UTF-8
	空行:(消息报头后面的空行是必须的)
	响应正文:(服务器返回给客户端的文本信息)

# 头域:
	HOST	
		指定请求资源的Intenet主机和端口号,必须表示请求url的原始服务器或网关的位置。
		HTTP/1.1 请求必须包含主机头域,否则系统会以400状态码返回
	Referer	
		允许客户端指定请求uri的源资源地址,这可以允许服务器生成回退链表,可用来登陆、优化cache等。
		他也允许废除的或错误的连接由于维护的目的被追踪。如果请求的uri没有自己的uri地址,Referer不能被发送。
		如果指定的是部分uri地址,则此地址应该是一个相对地址。
	User-Agent
		User-Agent头域的内容包含发出请求的用户信息
	Cache-Control
		Cache-Control指定请求和响应遵循的缓存机制。
		在请求消息或响应消息中设置Cache-Control并不会修改另一个消息处理过程中的缓存处理过程。
		请求时的缓存指令包括
			no-cache、
			no-store、
			max-age(最大缓存周期(单位是秒))、
			max-stale(表示客户端愿意接收一个过期的资源,但是响应不能超过设置的过期时间)、
			min-fresh(表示客户端希望在指定的时间内获取最新的消息)、
			only-if-cached(只要有缓存就不要请求服务器),
		响应消息中的指令包括
			public(可以被任何中间层缓存,包括服务器,代理服务器等等)、
			private(只能被一个东西缓存,服务器可以缓存(代理服务器不能缓存))、
			no-cache(使用缓存前要向服务器验证)、
			no-store(不使用缓存)、
			no-transform(不许对缓存资源进行转换,或者转码)、
			must-revalidate(在使用缓存之前验证资源的状态,如果资源过期则不能使用)、
			proxy-revalidate(和上面作用相同,适用于共享缓存(比如代理服务器))、
			max-age。
	Date
		Date头域表示消息发送的时间,时间的描述格式由rfc822定义
		例如,Date:Mon,31Dec200104:25:57GMT。Date描述的时间表示世界标准时,换算成本地时间,需要知道用户所在的时区。
	Connection
		当client和server通信时对于长链接如何进行处理。
		在http1.1中,client和server都是默认对方支持长链接的, 如果client使用http1.1协议,但又不希望使用长链接,则需要在header中指明connection的值为close;
		如果server方也不想支持长链接,则在response中也需要明确说明connection的值为close。
		不论request还是response的header中包含了值为close的connection,都表明当前正在使用的tcp链接在当天请求处理完毕后会被断掉。
		以后client再进行新的请求时就必须创建新的tcp链接了。

# 请求头域
	Cache(缓存)头域
		If-Modified-Since: 
			把浏览器端缓存页面的最后修改时间发送到服务器去,服务器会把这个时间与服务器上实际文件的最后修改时间进行对比。
			如果时间一致,那么返回304,客户端就直接使用本地缓存文件。
			如果时间不一致,就会返回200和新的文件内容。客户端接到之后,会丢弃旧文件,把新文件缓存起来,并显示在浏览器中.
		If-None-Match:
			If-None-Match和ETag一起工作,工作原理是在HTTP Response中添加ETag信息。 
			当用户再次请求该资源时,将在HTTP Request 中加入If-None-Match信息(ETag的值)。
			如果服务器验证资源的ETag没有改变(该资源没有更新),将返回一个304状态告诉客户端使用本地缓存文件。
			否则将返回200状态和新的资源和Etag.  使用这样的机制将提高网站的性能
		Pragma:
			防止页面被缓存, 在HTTP/1.1版本中,它和Cache-Control:no-cache作用一模一样
			Pargma只有一个用法	Pragma: no-cache
			注意: 在HTTP/1.0版本中,只实现了Pragema:no-cache, 没有实现Cache-Control
		Cache-Control
			这个是非常重要的规则。 这个用来指定Response-Request遵循的缓存机制
			Cache-Control:Public   	可以被任何缓存所缓存
			Cache-Control:Private   内容只缓存到私有缓存中
			Cache-Control:no-cache  所有内容都不会被缓存
	Client(客户端)头域
		Accept:
			浏览器端可以接受的MIME(媒体)类型
			Accept: text/html  
				代表浏览器可以接受服务器回发的类型为 text/html  也就是我们常说的html文档.
				如果服务器无法返回text/html类型的数据,服务器应该返回一个406错误(non acceptable)
			通配符 * 代表任意类型 
				Accept: */*  代表浏览器可以处理所有类型,(一般浏览器发给服务器都是发这个)
		Accept-Encoding:
			浏览器申明自己接收的编码方法,通常指定压缩方法,是否支持压缩,支持什么压缩方法(gzip,deflate),(注意:这不是指字符编码);
			Accept-Encoding: gzip, deflate
		Accept-Language:
			浏览器申明自己接收的语言。 
			语言跟字符集的区别:中文是语言,中文有多种字符集,比如big5,gb2312,gbk等等;
			Accept-Language: en-us
		Accept-Charset:
			浏览器申明自己接收的字符集,这就是本文前面介绍的各种字符集和字符编码,如gb2312,utf-8(通常我们说Charset包括了相应的字符编码方案);	
		User-Agent:
			告诉HTTP服务器, 客户端使用的操作系统和浏览器的名称和版本.
			我们上网登陆论坛的时候,往往会看到一些欢迎信息,其中列出了你的操作系统的名称和版本,你所使用的浏览器的名称和版本,
			服务器应用程序就是从User-Agent这个请求报头域中获取到这些信息User-Agent请求报头域允许客户端将它的操作系统、浏览器和其它属性告诉服务器。
			User-Agent: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; CIBA; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET4.0C; InfoPath.2; .NET4.0E)
	Cookie/Login 头域
		Cookie:
			最重要的header, 将cookie的值发送给HTTP 服务器
	Entity(请求/响应数据)头域
		Content-Length
			发送给HTTP服务器数据的长度。
			Content-Length: 38
		Content-Type
			指定发送给服务器的数据的数据类型
			Content-Type: application/x-www-form-urlencoded
	Miscellaneous头域
		Referer
			提供了Request的上下文信息的服务器,告诉服务器我是从哪个链接过来的,
			比如从我主页上链接到一个朋友那里,他的服务器就能够从HTTP Referer中统计出每天有多少用户点击我主页上的链接访问他的网站。
			例如: Referer:http://translate.google.cn/?hl=zh-cn&tab=wT
	Transport(传输)头域
		Connection
			Connection: keep-alive   
				当一个网页打开完成后,客户端和服务器之间用于传输HTTP数据的TCP连接不会关闭,如果客户端再次访问这个服务器上的网页,会继续使用这一条已经建立的连接
			Connection: close  
				代表一个Request完成后,客户端和服务器之间用于传输HTTP数据的TCP连接会关闭, 当客户端再次发送Request,需要重新建立TCP连接。
		Host(发送请求时,该报头域是必需的)
			请求报头域主要用于指定被请求资源的Internet主机和端口号,它通常从HTTP URL中提取出来的

# 响应头域
	Cache(缓存)头域
		Date:
			生成消息的具体时间和日期
		Expires:
			浏览器会在指定过期时间内使用本地缓存
		Vary:
			表明需要哪些request header去充分决定一个response是否是fresh的,缓存服务器是否可以不用重新确认就使用一个reponse。
			Vary: Accept-Encoding
			Vary: Accept-Encoding,User-Agent
	Cookie/Login头域
		P3P
			用于跨域设置Cookie, 这样可以解决iframe跨域访问cookie的问题
			P3P: CP=CURa ADMa DEVa PSAo PSDo OUR BUS UNI PUR INT DEM STA PRE COM NAV OTC NOI DSP COR
		Set-Cookie
			非常重要的header, 用于把cookie 发送到客户端浏览器, 每一个写入cookie都会生成一个Set-Cookie.
	Entity头域
		ETag:
			与 If-None-Match 配合使用,用以标识缓存
		Last-Modified:
			用于指示资源的最后修改日期和时间.
			Last-Modified: Wed, 21 Dec 2011 09:09:10 GMT
		Content-Type:
			WEB服务器告诉浏览器自己响应的对象的类型和字符集,
			Content-Type: text/html; charset=utf-8
			Content-Type:text/html;charset=GB2312
			Content-Type: image/jpeg
		Content-Length:
			指明实体正文的长度,以字节方式存储的十进制数字来表示。
			在数据下行的过程中,Content-Length的方式要预先在服务器中缓存所有数据,然后所有数据再一股脑儿地发给客户端。
			Content-Length: 19847
		Content-Encoding:
			WEB服务器表明自己使用了什么压缩方法(gzip,deflate)压缩响应中的对象。
			Content-Encoding:gzip
		Content-Language:
			WEB服务器告诉浏览器自己响应的对象的语言
			Content-Language:da
		Content-Location:
			表示客户应当到哪里去提取文档
		Content-MD5:
			MD5 实体的一种MD5摘要,用作校验。
			发送方和接受方都计算MD5摘要,接受方将其计算的值与此头标中传递的值进行比较。
			Eg1:Content-MD5: <base64 of 128 MD5 digest>.Eg2:dfdfdfdfdfdfdff==;
		Content-Range:
			随部分实体一同发送;
			标明被插入字节的低位与高位字节偏移,也标明此实体的总长度。
			Eg1:Content-Range: 1001-2000/5000,eg2:bytes 2543-4532/7898
		Content-Disposition:
			作为对下载文件的一个标识字段
		Expires:
			为0证明不缓存;
	Miscellaneous(其他)头域
		Allow:
			服务器支持哪些请求方法(如GET、POST等);
		Server:
			指明HTTP服务器的软件信息
			Server: Microsoft-IIS/7.5
		X-AspNet-Version:
			如果网站是用ASP.NET开发的,这个header用来表示ASP.NET的版本
			X-AspNet-Version: 4.0.30319
		X-Powered-By:
			表示网站是用什么技术开发的
			X-Powered-By: ASP.NET
	Transport(传输)头域
		Connection
			Connection: keep-alive   
				当一个网页打开完成后,客户端和服务器之间用于传输HTTP数据的TCP连接不会关闭,如果客户端再次访问这个服务器上的网页,会继续使用这一条已经建立的连接
			Connection: close  
				代表一个Request完成后,客户端和服务器之间用于传输HTTP数据的TCP连接会关闭, 当客户端再次发送Request,需要重新建立TCP连接。
		Host(发送请求时,该报头域是必需的)
			请求报头域主要用于指定被请求资源的Internet主机和端口号,它通常从HTTP URL中提取出来的
	Location头域
		Location
			用于重定向一个新的位置, 包含新的URL地址
			Location通常不是直接设置的,而是通过HttpServletResponse的sendRedirect方法,该方法同时设置状态代码为302;
	 		实例请看304状态实例

# HTTP的几个重要概念
	连接(Connection):
		一个传输层的实际环流,它是建立在两个相互通讯的应用程序之间。
		在http1.1,request和reponse头中都有可能出现一个connection的头,此header的含义是当client和server通信时对于长链接如何进行处理。
		在http1.1中,client和server都是默认对方支持长链接的, 如果client使用http1.1协议,但又不希望使用长链接,则需要在header中指明connection的值为close;
		如果server方也不想支持长链接,则在response中也需要明确说明connection的值为close。
		不论request还是response的header中包含了值为close的connection,都表明当前正在使用的tcp链接在当天请求处理完毕后会被断掉。
		以后client再进行新的请求时就必须创建新的tcp链接了。
	消息(Message)
		HTTP通讯的基本单位,包括一个结构化的八元组序列并通过连接传输。
	请求(Request)
		一个从客户端到服务器的请求信息包括应用于资源的方法、资源的标识符和协议的版本号。
	响应(Response)
		一个从服务器返回的信息包括HTTP协议的版本号、请求的状态(例如“成功”或“没找到”)和文档的MIME类型。
	资源(Resource)
		由URI标识的网络数据对象或服务。
	实体(Entity)
		数据资源或来自服务资源的回映的一种特殊表示方法,它可能被包围在一个请求或响应信息中。一个实体包括实体头信息和实体的本身内容。
	客户机(Client)
		一个为发送请求目的而建立连接的应用程序。
	用户代理(UserAgent)
		初始化一个请求的客户机。它们是浏览器、编辑器或其它用户工具。
	服务器(Server)
		一个接受连接并对请求返回信息的应用程序
	源服务器(Originserver)
		是一个给定资源可以在其上驻留或被创建的服务器。
	代理(Proxy)
		一个中间程序,它可以充当一个服务器,也可以充当一个客户机,为其它客户机建立请求。
		请求是通过可能的翻译在内部或经过传递到其它的服务器中。一个代理在发送请求信息之前,必须解释并且如果可能重写它。
		代理经常作为通过防火墙的客户机端的门户,代理还可以作为一个帮助应用来通过协议处理没有被用户代理完成的请求。	
	网关(Gateway)
		一个作为其它服务器中间媒介的服务器。与代理不同的是,网关接受请求就好象对被请求的资源来说它就是源服务器;发出请求的客户机并没有意识到它在同网关打交道。
		网关经常作为通过防火墙的服务器端的门户,网关还可以作为一个协议翻译器以便存取那些存储在非HTTP系统中的资源。
	通道(Tunnel)
		是作为两个连接中继的中介程序。
		一旦激活,通道便被认为不属于HTTP通讯,尽管通道可能是被一个HTTP请求初始化的。
		当被中继的连接两端关闭时,通道便消失。当一个门户(Portal)必须存在或中介(Intermediary)不能解释中继的通讯时通道被经常使用。
	缓存(Cache)
		反应信息的局域存储。
		
# HTTP之状态码
	1xx:(信息性状态码)
		指示信息--表示请求已接收,继续处理
	2xx:(成功状态码)
		成功--表示请求已被成功接收、理解、接受
	3xx:(重定向状态码)
		重定向--要完成请求必须进行更进一步的操作
	4xx:(客户端错误状态码)
		客户端错误--请求有语法错误或请求无法实现
	5xx:(服务器端错误状态码)
		服务器端错误--服务器未能实现合法的请求
	常见状态码:
	200 OK                        //客户端请求成功
	400 Bad Request               //客户端请求有语法错误,不能被服务器所理解
	401 Unauthorized              //请求未经授权,这个状态代码必须和WWW-Authenticate报头域一起使用 
	403 Forbidden                 //服务器收到请求,但是拒绝提供服务
	404 Not Found                 //请求资源不存在,eg:输入了错误的URL
	500 Internal Server Error     //服务器发生不可预期的错误
	503 Server Unavailable        //服务器当前不能处理客户端的请求,一段时间后可能恢复正常

# HTTP请求方法
	根据HTTP标准,HTTP请求可以使用多种请求方法。
	HTTP1.0定义了三种请求方法: GET(得到),POST(给予)和HEAD(头部)方法。
	HTTP1.1新增了五种请求方法: DELETE(删除),PUT(放置),OPTIONS(选择),TRACE(痕迹)和CONNECT(链接)方法。
		GET     	
			GET方法用来请求访问已被URI识别的资源。
			也就是指定了服务器处理请求之后响应的内容。
			请求指定的页面信息,并返回实体主体。
		HEAD     	
			类似于get请求,只不过返回的响应中没有具体的内容,用于获取报头
			HEAD方法类似GET方法，但是不同的是HEAD方法不要求返回数据。
			用于确认URI的有效性及资源更新时间等。
		POST     
			向指定资源提交数据进行处理请求(例如提交表单或者上传文件)。
			数据被包含在请求体中。POST请求可能会导致新的资源的建立和/或已有资源的修改。
		PUT     	
			从客户端向服务器传送的数据取代指定的文档的内容。
			PUT方法用来传输文件。
			类似FTP协议，文件内容包含在请求报文的实体中，然后请求保存到URL指定的服务器位置。
		DELETE      
			请求服务器删除指定的页面。
			DELETE方法用来删除文件，是与PUT相反的方法。
			DELETE是要求返回URL指定的资源。
		CONNECT     
			HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器。
			CONNECT方法要求在与代理服务器通信时建立隧道，实现用隧道协议进行TCP通信。
			主要使用SSL/TLS协议对通信内容加密后传输。
		OPTIONS     
			允许客户端查看服务器的性能。
			因为并不是所有的服务器都支持规定的方法，为了安全有些服务器可能会禁止掉一些方法例如DELETE、PUT等。
			那么OPTIONS就是用来询问服务器支持的方法。
		TRACE     	
			回显服务器收到的请求,主要用于测试或诊断。
			TRACE方法是让Web服务器将之前的请求通信环回给客户端的方法。这个方法并不常用。

# HTTP工作原理
	HTTP协议定义Web客户端如何从Web服务器请求Web页面,以及服务器如何把Web页面传送给客户端。
	HTTP协议采用了请求/响应模型。
	客户端向服务器发送一个请求报文,请求报文包含请求的方法、URL、协议版本、请求头部和请求数据。
	服务器以一个状态行作为响应,响应的内容包括协议的版本、成功或者错误代码、服务器信息、响应头部和响应数据。

	以下是 HTTP 请求/响应的步骤:
		1、客户端连接到Web服务器
		一个HTTP客户端,通常是浏览器,与Web服务器的HTTP端口(默认为80)建立一个TCP套接字连接。例如,http://www.oakcms.cn。

		2、发送HTTP请求
		通过TCP套接字,客户端向Web服务器发送一个文本的请求报文,一个请求报文由请求行、请求头部、空行和请求数据4部分组成。

		3、服务器接受请求并返回HTTP响应
		Web服务器解析请求,定位请求资源。服务器将资源复本写到TCP套接字,由客户端读取。一个响应由状态行、响应头部、空行和响应数据4部分组成。

		4、释放连接TCP连接
			若connection 模式为close,则服务器主动关闭TCP连接,客户端被动关闭连接,释放TCP连接;
			若connection 模式为keepalive,则该连接会保持一段时间,在该时间内可以继续接收请求;

		5、客户端浏览器解析HTML内容
		客户端浏览器首先解析状态行,查看表明请求是否成功的状态代码。
		然后解析每一个响应头,响应头告知以下为若干字节的HTML文档和文档的字符集。
		客户端浏览器读取响应数据HTML,根据HTML的语法对其进行格式化,并在浏览器窗口中显示。
		例如:在浏览器地址栏键入URL,按下回车之后会经历以下流程:
			1、浏览器向 DNS 服务器请求解析该 URL 中的域名所对应的 IP 地址;
			2、解析出 IP 地址后,根据该 IP 地址和默认端口 80,和服务器建立TCP连接;
			3、浏览器发出读取文件(URL 中域名后面部分对应的文件)的HTTP 请求,该请求报文作为 TCP 三次握手的第三个报文的数据发送给服务器;
			4、服务器对浏览器请求作出响应,并把对应的 html 文本发送给浏览器;
			5、释放 TCP连接;
			6、浏览器将该 html 文本并显示内容; 

# GET和POST请求的区别
	GET请求
	GET /books/?sex=man&name=Professional HTTP/1.1
	Host: www.wrox.com
	User-Agent: Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7.6)
	Gecko/20050225 Firefox/1.0.1
	Connection: Keep-Alive
	注意最后一行是空行

	POST请求
	POST / HTTP/1.1
	Host: www.wrox.com
	User-Agent: Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7.6)
	Gecko/20050225 Firefox/1.0.1
	Content-Type: application/x-www-form-urlencoded
	Content-Length: 40
	Connection: Keep-Alive

	name=Professional%20Ajax&publisher=Wiley


	1、GET提交的数据会在地址栏中显示出来,而POST提交,地址栏不会改变
		GET提交:
			请求的数据会附在URL之后(就是把数据放置在HTTP协议头中),以?分割URL和传输数据,多个参数用&连接;
			例 如:login.action?name=hyddd&password=idontknow&verify=%E4%BD%A0 %E5%A5%BD。
			如果数据是英文字母/数字,原样发送,如果是空格,转换为+,如果是中文/其他字符,则直接把字符串用BASE64加密,得出如: %E4%BD%A0%E5%A5%BD,其中％XX中的XX为该符号以16进制表示的ASCII。
		POST提交:
			把提交的数据放置在是HTTP包的包体中。上文示例中红色字体标明的就是实际的传输数据

	2.传输数据的大小:首先声明:HTTP协议没有对传输的数据大小进行限制,HTTP协议规范也没有对URL长度进行限制。
		而在实际开发中存在的限制主要有:
		GET:
			特定浏览器和服务器对URL长度有限制,例如 IE对URL长度的限制是2083字节(2K+35)。
			对于其他浏览器,如Netscape、FireFox等,理论上没有长度限制,其限制取决于操作系 统的支持。
			因此对于GET提交时,传输数据就会受到URL长度的 限制。
		POST:
			由于不是通过URL传值,理论上数据不受 限。但实际各个WEB服务器会规定对post提交数据大小进行限制,Apache、IIS6都有各自的配置。

	3.安全性
		POST的安全性要比GET的安全性高。
		比如:通过GET提交数据,用户名和密码将明文出现在URL上.
		(1)登录页面有可能被浏览器缓存
		(2)其他人查看浏览器的历史纪录,那么别人就可以拿到你的账号和密码了
		(3)除此之外,使用GET提交数据还可能会造成Cross-site request forgery攻击

	4、Http get,post,soap协议都是在http上运行的
		get:
			请求参数是作为一个key/value对的序列(查询字符串)附加到URL上的
			查询字符串的长度受到web浏览器和web服务器的限制(如IE最多支持2048个字符),不适合传输大型数据集同时,它很不安全

		post:
			请求参数是在http标题的一个不同部分(名为entity body)传输的,这一部分用来传输表单信息,因此必须将Content-type设置为:application/x-www-form- urlencoded。post设计用来支持web窗体上的用户字段,其参数也是作为key/value对传输。
			但是:它不支持复杂数据类型,因为post没有定义传输数据结构的语义和规则。

		soap:
			是http post的一个专用版本,遵循一种特殊的xml消息格式
			Content-type设置为: text/xml 任何数据都可以xml化。

	Http协议定义了很多与服务器交互的方法,最基本的有4种,分别是GET,POST,PUT,DELETE. 
	一个URL地址用于描述一个网络上的资源,而HTTP中的GET, POST, PUT, DELETE就对应着对这个资源的查,改,增,删4个操作。
	我们最常见的就是GET和POST了。GET一般用于获取/查询资源信息,而POST一般用于更新资源信息.

	我们看看GET和POST的区别:
		GET提交的数据会放在URL之后,以?分割URL和传输数据,参数之间以&相连,如EditPosts.aspx?name=test1&id=123456. POST方法是把提交的数据放在HTTP包的Body中.
		GET提交的数据大小有限制(因为浏览器对URL的长度有限制),而POST方法提交的数据没有限制.
		GET方式需要使用Request.QueryString来取得变量的值,而POST方式通过Request.Form来获取变量的值。
		GET方式提交数据,会带来安全问题,比如一个登录页面,通过GET方式提交数据时,用户名和密码将出现在URL上,如果页面可以被缓存或者其他人可以访问这台机器,就可以从历史记录获得该用户的账号和密码.

# HTTP协议是无状态的和Connection: keep-alive的区别
	无状态是指协议对于事务处理没有记忆能力,服务器不知道客户端是什么状态。从另一方面讲,打开一个服务器上的网页和你之前打开这个服务器上的网页之间没有任何联系
	HTTP是一个无状态的面向连接的协议,无状态不代表HTTP不能保持TCP连接,更不能代表HTTP使用的是UDP协议(无连接)
	从HTTP/1.1起,默认都开启了Keep-Alive,保持连接特性.
	简单地说,当一个网页打开完成后,客户端和服务器之间用于传输HTTP数据的TCP连接不会关闭,如果客户端再次访问这个服务器上的网页,会继续使用这一条已经建立的连接
	Keep-Alive不会永久保持连接,它有一个保持时间,可以在不同的服务器软件(如Apache)中设定这个时间

# Cookie和Session
	Cookie和Session都为了用来保存状态信息,都是保存客户端状态的机制,它们都是为了解决HTTP无状态的问题而所做的努力。
	Session可以用Cookie来实现,也可以用URL回写的机制来实现。用Cookie来实现的Session可以认为是对Cookie更高级的应用。
	两者比较:
		Cookie将状态保存在客户端,Session将状态保存在服务器端;
		
		Cookies是服务器在本地机器上存储的小段文本并随每一个请求发送至同一个服务器。
		Cookie最早在RFC2109中实现,后续RFC2965做了增强。
		网络服务器用HTTP头向客户端发送cookies,在客户终端,浏览器解析这些cookies并将它们保存为一个本地文件,它会自动将同一服务器的任何请求缚上这些cookies。
		Session并没有在HTTP的协议中定义;

		Session是针对每一个用户的,变量的值保存在服务器上,用一个sessionID来区分是哪个用户session变量,这个值是通过用户的浏览器在访问的时候返回给服务器。
		当客户禁用cookie时,这个值也可能设置为由get来返回给服务器;

		就安全性来说:当你访问一个使用session 的站点,同时在自己机子上建立一个cookie,建议在服务器端的SESSION机制更安全些.因为它不会任意读取客户存储的信息。
	
	 Session机制:
	 	Session机制是一种服务器端的机制,服务器使用一种类似于散列表的结构(也可能就是使用散列表)来保存信息。
	 	当程序需要为某个客户端的请求创建一个session的时候,服务器首先检查这个客户端的请求里是否已包含了一个session标识 - 称为 session id,
	 	如果已包含一个session id则说明以前已经为此客户端创建过session,服务器就按照session id把这个 session检索出来使用(如果检索不到,可能会新建一个),
	 	如果客户端请求不包含session id,则为此客户端创建一个session并且生成一个与此session相关联的session id,
	 	session id的值应该是一个既不会重复,又不容易被找到规律以仿造的字符串,这个 session id将被在本次响应中返回给客户端保存。

	 Session的实现方式:
	 	使用Cookie来实现
	 		服务器给每个Session分配一个唯一的JSESSIONID,并通过Cookie发送给客户端。
			当客户端发起新的请求的时候,将在Cookie头中携带这个JSESSIONID。这样服务器能够找到这个客户端对应的Session。
		使用URL回显来实现
			URL回写是指服务器在发送给浏览器页面的所有链接中都携带JSESSIONID的参数,这样客户端点击任何一个链接都会把JSESSIONID带会服务器。
			如果直接在浏览器输入服务端资源的url来请求该资源,那么Session是匹配不到的。
			Tomcat对Session的实现,是一开始同时使用Cookie和URL回写机制,如果发现客户端支持Cookie,就继续使用Cookie,停止使用URL回写。
			如果发现Cookie被禁用,就一直使用URL回写。jsp开发处理到Session的时候,对页面中的链接记得使用response.encodeURL() 。
	
	在J2EE项目中Session失效的几种情况
		Session超时:Session在指定时间内失效,例如30分钟,若在30分钟内没有操作,则Session会失效,例如在web.xml中进行了如下设置:
			<session-config> 
	        	<session-timeout>30</session-timeout> //单位:分钟
	    	</session-config>
    	使用session.invalidate()明确的去掉Session。

    与Cookie相关的HTTP扩展头
    	Cookie:
    		客户端将服务器设置的Cookie返回到服务器;
		Set-Cookie:
			服务器向客户端设置Cookie;
		Cookie2 (RFC2965):
			客户端指示服务器支持Cookie的版本;	
		Set-Cookie2 (RFC2965):
			服务器向客户端设置Cookie。

	Cookie的流程
		服务器在响应消息中用Set-Cookie头将Cookie的内容回送给客户端,客户端在新的请求中将相同的内容携带在Cookie头中发送给服务器。从而实现会话的保持。
	
# 缓存的实现原理
	什么是Web缓存
		WEB缓存(cache)位于Web服务器和客户端之间。
		缓存会根据请求保存输出内容的副本,例如html页面,图片,文件,当下一个请求来到的时候:如果是相同的URL,缓存直接使用副本响应访问请求,而不是向源服务器再次发送请求。
		HTTP协议定义了相关的消息头来使WEB缓存尽可能好的工作。	
	缓存的优点
		减少相应延迟:
			因为请求从缓存服务器(离客户端更近)而不是源服务器被相应,这个过程耗时更少,让web服务器看上去相应更快。
		减少网络带宽消耗:
			当副本被重用时会减低客户端的带宽消耗;客户可以节省带宽费用,控制带宽的需求的增长并更易于管理。
	与缓存相关的HTTP扩展消息头
		Expires:
			指示响应内容过期的时间,格林威治时间GMT
		Cache-Control:
			更细致的控制缓存的内容
		Last-Modified:
			响应中资源最后一次修改的时间
		ETag:
			响应中资源的校验值,在服务器上某个时段是唯一标识的。
		Date:
			服务器的时间
		If-Modified-Since:
			客户端存取的该资源最后一次修改的时间,同Last-Modified。
		If-None-Match:
			客户端存取的该资源的检验值,同ETag。
	客户端缓存生效的常见流程
		服务器收到请求时,会在200OK中回送该资源的Last-Modified和ETag头,客户端将该资源保存在cache中,并记录这两个属性。
		当客户端需要发送相同的请求时,会在请求中携带If-Modified-Since和If-None-Match两个头。
		两个头的值分别是响应中Last-Modified和ETag头的值。服务器通过这两个头判断本地资源未发生变化,客户端不需要重新下载,返回304响应。
	Web缓存机制
		HTTP/1.1中缓存的目的是为了在很多情况下减少发送请求,同时在许多情况下可以不需要发送完整响应。
		前者减少了网络回路的数量;HTTP利用一个"过期(expiration)"机制来为此目的。
		后者减少了网络应用的带宽;HTTP用"验证(validation)"机制来为此目的。
		HTTP定义了3种缓存机制:
			Freshness:
				允许一个回应消息可以在源服务器不被重新检查,并且可以由服务器和客户端来控制。
				例如,Expires回应头给了一个文档不可用的时间。Cache-Control中的max-age标识指明了缓存的最长时间;
			Validation:
				用来检查以一个缓存的回应是否仍然可用。
				例如,如果一个回应有一个Last-Modified回应头,缓存能够使用If-Modified-Since来判断是否已改变,以便判断根据情况发送请求;
			Invalidation:
				在另一个请求通过缓存的时候,常常有一个副作用。
				例如,如果一个URL关联到一个缓存回应,但是其后跟着POST、PUT和DELETE的请求的话,缓存就会过期。

# 断点续传和多线程下载的实现原理
	HTTP协议的GET方法,支持只请求某个资源的某一部分;
	206 Partial Content 部分内容响应;
	Range 请求的资源范围;
	Content-Range 响应的资源范围;
	在连接断开重连时,客户端只请求该资源未下载的部分,而不是重新请求整个资源,来实现断点续传。

	分块请求资源实例:
		Eg1:Range: bytes=306302- :请求这个资源从306302个字节到末尾的部分;
		Eg2:Content-Range: bytes 306302-604047/604048:响应中指示携带的是该资源的第306302-604047的字节,该资源共604048个字节;
		客户端通过并发的请求相同资源的不同片段,来实现对某个资源的并发分块下载。从而达到快速下载的目的。目前流行的FlashGet和迅雷基本都是这个原理。
			
	多线程下载的原理:
		下载工具开启多个发出HTTP请求的线程;
		每个http请求只请求资源文件的一部分:Content-Range: bytes 20000-40000/47000;
		合并每个线程下载的文件。
		
# https通信过程
	什么是https
		HTTPS（全称:Hypertext Transfer Protocol over Secure Socket Layer）,是以安全为目标的HTTP通道,
		简单讲是HTTP的安全版。即HTTP下加入SSL层,HTTPS的安全基础是SSL,因此加密的详细内容请看SSL。
		https所用的端口号是443。
	https的实现原理
		有两种基本的加解密算法类型:
			对称加密:
				密钥只有一个,加密解密为同一个密码,且加解密速度快,典型的对称加密算法有DES、AES等;
			非对称加密:
				密钥成对出现（且根据公钥无法推知私钥,根据私钥也无法推知公钥）,加密解密使用不同密钥（公钥加密需要私钥解密,私钥加密需要公钥解密）,相对对称加密速度较慢,
				典型的非对称加密算法有RSA、DSA等。
	https的通信过程:
		1.客户端请求httos链接
		2.服务端返回证书(公钥)
		3.产生 随机/对称 密钥
		4.使用公钥对对称密钥加密
		5.发送加密后的对称密钥
		6.发送通过对称密钥加密的密文通信
	https通信的优点:
		客户端产生的密钥只有客户端和服务器端能得到;
		加密的数据只有客户端和服务器端才能得到明文;
		客户端到服务端的通信是安全的。

# http代理
	http代理服务器
		代理服务器英文全称是Proxy Server,其功能就是代理网络用户去取得网络信息。形象的说:它是网络信息的中转站。
		
		代理服务器是介于浏览器和Web服务器之间的一台服务器,
		有了它之后,浏览器不是直接到Web服务器去取回网页而是向代理服务器发出请求,Request信号会先送到代理服务器,由代理服务器来取回浏览器所需要的信息并传送给你的浏览器。
		
		而且,大部分代理服务器都具有缓冲的功能,就好象一个大的Cache,它有很大的存储空间,它不断将新取得数据储存到它本机的存储器上,
		如果浏览器所请求的数据在它本机的存储器上已经存在而且是最新的,那么它就不重新从Web服务器取数据,而直接将存储器上的数据传送给用户的浏览器,这样就能显著提高浏览速度和效率。
		
		更重要的是:Proxy Server(代理服务器)是Internet链路级网关所提供的一种重要的安全功能,它的工作主要在开放系统互联(OSI)模型的对话层。

	 http代理服务器的主要功能
	 	突破自身IP访问限制,访问国外站点。如:教育网、169网等网络用户可以通过代理访问国外网站;

		访问一些单位或团体内部资源,如某大学FTP(前提是该代理地址在该资源的允许访问范围之内),
		使用教育网内地址段免费代理服务器,就可以用于对教育 网开放的各类FTP下载上传,以及各类资料查询共享等服务;
		
		突破中国电信的IP封锁:中国电信用户有很多网站是被限制访问的,这种限制是人为的,不同Serve对地址的封锁是不同的。所以不能访问时可以换一个国 外的代理服务器试试;
		
		提高访问速度:通常代理服务器都设置一个较大的硬盘缓冲区,当有外界的信息通过时,同时也将其保存到缓冲区中,当其他用户再访问相同的信息时, 则直接由缓冲区中取出信息,传给用户,以提高访问速度;

		隐藏真实IP:上网者也可以通过这种方法隐藏自己的IP,免受攻击。

# 虚拟主机的实现
	什么是虚拟主机
		虚拟主机:是在网络服务器上划分出一定的磁盘空间供用户放置站点、应用组件等,提供必要的站点功能与数据存放、传输功能。  

		所谓虚拟主机,也叫"网站空间"就是把一台运行在互联网上的服务器划分成多个"虚拟"的服务器,每一个虚拟主机都具有独立的域名和完整的Internet服务器（支持WWW、FTP、E-mail等）功能。
		一台服务器上的不同虚拟主机是各自独立的,并由用户自行管理。
		但一台服务器主机只能够支持一定数量的虚拟主机,当超过这个数量时,用户将会感到性能急剧下降。

	虚拟主机的实现原理
		虚拟主机是用同一个WEB服务器,为不同域名网站提供服务的技术。Apache、Tomcat等均可通过配置实现这个功能。

# 工具
	抓包工具Wireshark

