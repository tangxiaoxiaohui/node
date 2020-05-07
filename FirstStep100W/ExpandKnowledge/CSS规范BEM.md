<title>BEM</title>
# 介绍
```
	BEM其实是块（block）、元素（element）、修饰符（modifier）的缩写，利用不同的区块，功能以及样式来给元素命名。
	这三个部分使用__与--连接
```



# 命名约定模式
```
.block 				组件:代表了更高级别的抽象或组件。
.block__element 	元素:代表.block的后代，用于形成一个完整的.block的整体。
.block--modifier 	状态:代表.block的不同状态或不同版本。
```

```style
.block{}
.block--modifier{}
.block__element{}
.block__element--modifier{}
```

