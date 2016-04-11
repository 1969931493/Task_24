$(document).ready(function(){
	
	var n = 1;

	function visit(node)
	{
		$("#content").css("background-color","aqua");
		$("#content div").css("background-color","aqua");
		node.css("background-color","red");
		node.siblings().css("background-color","aqua");
		node.children().css("background-color","aqua");
		
		alert("第 "+n+" 个DIV "+" 遍历完成");
		n++;
	}
	<!--非递归前序遍历-->
	function before_travel()
	{
		n=1;
		visit($("#content"));
		$("#content").css("background-color","aqua");

		$("#content div").each(function(index){
			visit($(this));
		});

		$("#content div").last().css("background-color","aqua");
		alert("前序遍历 完毕");
	}
	<!--递归后序遍历-->
	function after_travel_one(node)
	{
		if(node.children().length == 0)
		{
			visit(node);
			return;
		}	
		node.children().each(function(index){
			after_travel_one($(this));
		})
		visit(node);
	}
	function after_travel()
	{
		n=1;
		after_travel_one($("#content"));
		$("#content").css("background-color","aqua");
		alert("后序遍历结束");
	}
	<!--递归中序遍历-->
	function centerTravel(node)
	{
		if(node.children().length == 0)
			visit(node);
		else
		{
			centerTravel(node.children().first());
			visit(node);
			node.children().first().siblings().each(function(){
				centerTravel($(this));
			})
		}
	}
	function center_travel()
	{
		n=1;
		centerTravel($("#content"));
		$("#content div").last().css("background-color","aqua");
		alert("中序遍历结束");
	}



	/*查找时用到的 visit 方法*/
	function search_visit(node)
	{
		$("#content").css("background-color","aqua");
		$("#content div").css("background-color","aqua");
		
		node.siblings().css("background-color","aqua");
		node.children().css("background-color","aqua");
		node.css("background-color","red");

		var total_content = node.text();
		var content;
		/*区分有没有children两种*/
		if(node.children().length == 0)
		{
			var reg = /[\u4E00-\u9FA5|\d|a-z|A-Z]{1,}/;
			content = total_content.match(reg); 
		}
		else
		{
			var one_content = node.children("div").first().text();
			var index = total_content.indexOf(one_content);
			var newContent = total_content.substring(0,index);
			var reg = /[\u4E00-\u9FA5|\d|a-z|A-Z]{1,}/;
			content = newContent.match(reg); 	
		}
	
		var search_content = $("#search_content").val();
		if(content == search_content)
		{
			node.css("background-color","yellow");
			alert("找到, DIV 已被黄色标注");
			return true;
		}
		else
			alert("第 "+n+" 个DIV "+" 没找到相应内容");
		n++;
		return false;
	}
	/*中序查找*/
	function search()     
	{
		n=1;
		var result = false;

		if(search_visit($("#content")))
			return;
		$("#content").css("background-color","aqua");

		$("#content div").each(function(index){
			if(search_visit($(this)))
			{
				result = true;
				return false;
			}
			$(this).css("background-color","aqua");
		});
		
		if(result == false)
			alert("没找到相应内容");
	}






	/*删除 DIV*/
	function decide_blue(rgb_content)
	{
		var rgb_one = 0;
		var rgb_two = 0;
		var rgb_three = 255;
		var index_left = rgb_content.indexOf("(");
		var index_one = rgb_content.indexOf(",")
		var index_two = rgb_content.indexOf(",",index_one+1);
		var index_right = rgb_content.indexOf(")");

		var one = rgb_content.substring(index_left+1,index_one);
		var two = rgb_content.substring(index_one+1,index_two);
		var three = rgb_content.substring(index_two+1,index_right);

		if(rgb_one == one && rgb_two == two && rgb_three == three)
			return true;
		else
			return false;
	}
	function delete_div()
	{
		var color = $("#content").css("background-color");
		var result = decide_blue(color);
		if(result == true)
		{
			$("#content").remove();
			alert("删除完毕");
		}
		else
		{
			var n = $("#content div").length;
			$("#content div").each(function(index){
				var color = $(this).css("background-color");
				var result = decide_blue(color);
				if(result == true)
				{
					$(this).remove();
					alert("删除完毕");
					return false;
				}
				if(index == n-1)
				{
					alert("抱歉，您还未选择 DIV");
					return false;
				}
			})
		}
	}



	/*增加DIV*/
	function add_div()
	{
		var add_content = $("#add_content").val();

		var color = $("#content").css("background-color");
		var result = decide_blue(color);
		if(result == true)
		{
			var addDiv = $("<div></div>");
			addDiv.text(add_content);
			addDiv.addClass("addClassOne");
			addDiv.click(function(){
				$("#content").css("background-color","aqua");
				$("#content div").css("background-color","aqua");
				$(this).css("background-color","blue");
				$(this).children().css("background-color","aqua");
				$(this).parent().css("background-color","aqua");
				event.stopPropagation();
			})

			$("#content").append(addDiv);
			$("#content").css("background-color","aqua");
			alert("添加完毕");
		}
		else
		{
			var n = $("#content div").length;
			$("#content div").each(function(index){
				var color = $(this).css("background-color");
				var result = decide_blue(color);
				if(result == true)
				{
					var addDiv = $("<div></div>");
					addDiv.text(add_content);
					addDiv.addClass("addClassTwo");
					addDiv.click(function(){
						$("#content").css("background-color","aqua");
						$("#content div").css("background-color","aqua");
						$(this).css("background-color","blue");
						$(this).children().css("background-color","aqua");
						$(this).parent().css("background-color","aqua");
						event.stopPropagation();
					})
					
					$(this).append(addDiv);
					$(this).css("background-color","aqua");
					alert("添加完毕");
					return false;
				}
				if(index == n-1)
				{
					alert("抱歉，您还未选择 父DIV");
					return false;
				}
			})
		}
	}

	

	/*初始化函数-事件绑定*/
	function init()
	{
		$(":button:eq(0)").on("click",before_travel);
		$(":button:eq(1)").on("click",center_travel);
		$(":button:eq(2)").on("click",after_travel);
		$(":button:eq(3)").on("click",search);
		$(":button:eq(4)").on("click",delete_div);
		$(":button:eq(5)").on("click",add_div);

		<!--DIV单击事件绑定-->
		$("#content").click(function(){
			$("#content").css("background-color","blue");
			$("#content div").css("background-color","aqua");
			event.stopPropagation();
		});	
		$("#content div").each(function(){
			$(this).click(function(){
				$("#content").css("background-color","aqua");
				$("#content div").css("background-color","aqua");
				$(this).css("background-color","blue");
				$(this).children().css("background-color","aqua");
				$(this).parent().css("background-color","aqua");
				event.stopPropagation();
			});
		})	
	}

	init();
});
