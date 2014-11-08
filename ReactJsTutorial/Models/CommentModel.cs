using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ReactJsTutorial.Models
{
	public class CommentModel
	{
		[JsonProperty("author")]
		public string Author { get; set; }

		[JsonProperty("text")]
		public string Text { get; set; }
	}
}