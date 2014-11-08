using ReactJsTutorial.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using JResult = Newtonsoft.JsonResult;

namespace ReactJsTutorial.Controllers
{
	public class HomeController : Controller
	{
		private static readonly IList<CommentModel> comments;

		static HomeController()
		{
			comments = new List<CommentModel>()
			{
				new CommentModel {
					Author = "Tim R",
					Text = "Some text from C#"
				},
				new CommentModel {
					Author = "Someone else",
					Text = "Just testing"
				}
			};
		}

		[HttpPost]
		public ActionResult AddComment(CommentModel comment)
		{
			comments.Add(comment);
			return Content("OK");
		}

		public ActionResult Comments()
		{
			return new JResult.JsonResult
			{
				JsonRequestBehavior = JsonRequestBehavior.AllowGet,
				Data = comments
			};
		}

		public ActionResult Index()
		{
			return View();
		}
	}
}
