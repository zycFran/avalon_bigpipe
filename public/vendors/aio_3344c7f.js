;
/*!/public/vendors/bootstrap/js/bootstrap.js*/
if ("undefined" == typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");
+function (t) {
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}(jQuery), +function (t) {
    "use strict";
    function e() {
        var t = document.createElement("bootstrap"), e = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var i in e)if (void 0 !== t.style[i])return {end: e[i]};
        return !1
    }

    t.fn.emulateTransitionEnd = function (e) {
        var i = !1, o = this;
        t(this).one("bsTransitionEnd", function () {
            i = !0
        });
        var s = function () {
            i || t(o).trigger(t.support.transition.end)
        };
        return setTimeout(s, e), this
    }, t(function () {
        t.support.transition = e(), t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function (e) {
                return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery), +function (t) {
    "use strict";
    function e(e) {
        return this.each(function () {
            var i = t(this), s = i.data("bs.alert");
            s || i.data("bs.alert", s = new o(this)), "string" == typeof e && s[e].call(i)
        })
    }

    var i = '[data-dismiss="alert"]', o = function (e) {
        t(e).on("click", i, this.close)
    };
    o.VERSION = "3.3.0", o.TRANSITION_DURATION = 150, o.prototype.close = function (e) {
        function i() {
            r.detach().trigger("closed.bs.alert").remove()
        }

        var s = t(this), n = s.attr("data-target");
        n || (n = s.attr("href"), n = n && n.replace(/.*(?=#[^\s]*$)/, ""));
        var r = t(n);
        e && e.preventDefault(), r.length || (r = s.closest(".alert")), r.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (r.removeClass("in"), t.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", i).emulateTransitionEnd(o.TRANSITION_DURATION) : i())
    };
    var s = t.fn.alert;
    t.fn.alert = e, t.fn.alert.Constructor = o, t.fn.alert.noConflict = function () {
        return t.fn.alert = s, this
    }, t(document).on("click.bs.alert.data-api", i, o.prototype.close)
}(jQuery), +function (t) {
    "use strict";
    function e(e) {
        return this.each(function () {
            var o = t(this), s = o.data("bs.button"), n = "object" == typeof e && e;
            s || o.data("bs.button", s = new i(this, n)), "toggle" == e ? s.toggle() : e && s.setState(e)
        })
    }

    var i = function (e, o) {
        this.$element = t(e), this.options = t.extend({}, i.DEFAULTS, o), this.isLoading = !1
    };
    i.VERSION = "3.3.0", i.DEFAULTS = {loadingText: "loading..."}, i.prototype.setState = function (e) {
        var i = "disabled", o = this.$element, s = o.is("input") ? "val" : "html", n = o.data();
        e += "Text", null == n.resetText && o.data("resetText", o[s]()), setTimeout(t.proxy(function () {
            o[s](null == n[e] ? this.options[e] : n[e]), "loadingText" == e ? (this.isLoading = !0, o.addClass(i).attr(i, i)) : this.isLoading && (this.isLoading = !1, o.removeClass(i).removeAttr(i))
        }, this), 0)
    }, i.prototype.toggle = function () {
        var t = !0, e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var i = this.$element.find("input");
            "radio" == i.prop("type") && (i.prop("checked") && this.$element.hasClass("active") ? t = !1 : e.find(".active").removeClass("active")), t && i.prop("checked", !this.$element.hasClass("active")).trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
        t && this.$element.toggleClass("active")
    };
    var o = t.fn.button;
    t.fn.button = e, t.fn.button.Constructor = i, t.fn.button.noConflict = function () {
        return t.fn.button = o, this
    }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (i) {
        var o = t(i.target);
        o.hasClass("btn") || (o = o.closest(".btn")), e.call(o, "toggle"), i.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (e) {
        t(e.target).closest(".btn").toggleClass("focus", "focus" == e.type)
    })
}(jQuery), +function (t) {
    "use strict";
    function e(e) {
        return this.each(function () {
            var o = t(this), s = o.data("bs.carousel"), n = t.extend({}, i.DEFAULTS, o.data(), "object" == typeof e && e), r = "string" == typeof e ? e : n.slide;
            s || o.data("bs.carousel", s = new i(this, n)), "number" == typeof e ? s.to(e) : r ? s[r]() : n.interval && s.pause().cycle()
        })
    }

    var i = function (e, i) {
        this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = i, this.paused = this.sliding = this.interval = this.$active = this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart"in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
    };
    i.VERSION = "3.3.0", i.TRANSITION_DURATION = 600, i.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, i.prototype.keydown = function (t) {
        switch (t.which) {
            case 37:
                this.prev();
                break;
            case 39:
                this.next();
                break;
            default:
                return
        }
        t.preventDefault()
    }, i.prototype.cycle = function (e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
    }, i.prototype.getItemIndex = function (t) {
        return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
    }, i.prototype.getItemForDirection = function (t, e) {
        var i = "prev" == t ? -1 : 1, o = this.getItemIndex(e), s = (o + i) % this.$items.length;
        return this.$items.eq(s)
    }, i.prototype.to = function (t) {
        var e = this, i = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function () {
            e.to(t)
        }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", this.$items.eq(t))
    }, i.prototype.pause = function (e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, i.prototype.next = function () {
        return this.sliding ? void 0 : this.slide("next")
    }, i.prototype.prev = function () {
        return this.sliding ? void 0 : this.slide("prev")
    }, i.prototype.slide = function (e, o) {
        var s = this.$element.find(".item.active"), n = o || this.getItemForDirection(e, s), r = this.interval, a = "next" == e ? "left" : "right", l = "next" == e ? "first" : "last", h = this;
        if (!n.length) {
            if (!this.options.wrap)return;
            n = this.$element.find(".item")[l]()
        }
        if (n.hasClass("active"))return this.sliding = !1;
        var d = n[0], p = t.Event("slide.bs.carousel", {relatedTarget: d, direction: a});
        if (this.$element.trigger(p), !p.isDefaultPrevented()) {
            if (this.sliding = !0, r && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var c = t(this.$indicators.children()[this.getItemIndex(n)]);
                c && c.addClass("active")
            }
            var f = t.Event("slid.bs.carousel", {relatedTarget: d, direction: a});
            return t.support.transition && this.$element.hasClass("slide") ? (n.addClass(e), n[0].offsetWidth, s.addClass(a), n.addClass(a), s.one("bsTransitionEnd", function () {
                n.removeClass([e, a].join(" ")).addClass("active"), s.removeClass(["active", a].join(" ")), h.sliding = !1, setTimeout(function () {
                    h.$element.trigger(f)
                }, 0)
            }).emulateTransitionEnd(i.TRANSITION_DURATION)) : (s.removeClass("active"), n.addClass("active"), this.sliding = !1, this.$element.trigger(f)), r && this.cycle(), this
        }
    };
    var o = t.fn.carousel;
    t.fn.carousel = e, t.fn.carousel.Constructor = i, t.fn.carousel.noConflict = function () {
        return t.fn.carousel = o, this
    };
    var s = function (i) {
        var o, s = t(this), n = t(s.attr("data-target") || (o = s.attr("href")) && o.replace(/.*(?=#[^\s]+$)/, ""));
        if (n.hasClass("carousel")) {
            var r = t.extend({}, n.data(), s.data()), a = s.attr("data-slide-to");
            a && (r.interval = !1), e.call(n, r), a && n.data("bs.carousel").to(a), i.preventDefault()
        }
    };
    t(document).on("click.bs.carousel.data-api", "[data-slide]", s).on("click.bs.carousel.data-api", "[data-slide-to]", s), t(window).on("load", function () {
        t('[data-ride="carousel"]').each(function () {
            var i = t(this);
            e.call(i, i.data())
        })
    })
}(jQuery), +function (t) {
    "use strict";
    function e(e) {
        var i, o = e.attr("data-target") || (i = e.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
        return t(o)
    }

    function i(e) {
        return this.each(function () {
            var i = t(this), s = i.data("bs.collapse"), n = t.extend({}, o.DEFAULTS, i.data(), "object" == typeof e && e);
            !s && n.toggle && "show" == e && (n.toggle = !1), s || i.data("bs.collapse", s = new o(this, n)), "string" == typeof e && s[e]()
        })
    }

    var o = function (e, i) {
        this.$element = t(e), this.options = t.extend({}, o.DEFAULTS, i), this.$trigger = t(this.options.trigger).filter('[href="#' + e.id + '"], [data-target="#' + e.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    o.VERSION = "3.3.0", o.TRANSITION_DURATION = 350, o.DEFAULTS = {
        toggle: !0,
        trigger: '[data-toggle="collapse"]'
    }, o.prototype.dimension = function () {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height"
    }, o.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e, s = this.$parent && this.$parent.find("> .panel").children(".in, .collapsing");
            if (!(s && s.length && (e = s.data("bs.collapse"), e && e.transitioning))) {
                var n = t.Event("show.bs.collapse");
                if (this.$element.trigger(n), !n.isDefaultPrevented()) {
                    s && s.length && (i.call(s, "hide"), e || s.data("bs.collapse", null));
                    var r = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[r](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var a = function () {
                        this.$element.removeClass("collapsing").addClass("collapse in")[r](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!t.support.transition)return a.call(this);
                    var l = t.camelCase(["scroll", r].join("-"));
                    this.$element.one("bsTransitionEnd", t.proxy(a, this)).emulateTransitionEnd(o.TRANSITION_DURATION)[r](this.$element[0][l])
                }
            }
        }
    }, o.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var i = this.dimension();
                this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var s = function () {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return t.support.transition ? void this.$element[i](0).one("bsTransitionEnd", t.proxy(s, this)).emulateTransitionEnd(o.TRANSITION_DURATION) : s.call(this)
            }
        }
    }, o.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, o.prototype.getParent = function () {
        return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function (i, o) {
            var s = t(o);
            this.addAriaAndCollapsedClass(e(s), s)
        }, this)).end()
    }, o.prototype.addAriaAndCollapsedClass = function (t, e) {
        var i = t.hasClass("in");
        t.attr("aria-expanded", i), e.toggleClass("collapsed", !i).attr("aria-expanded", i)
    };
    var s = t.fn.collapse;
    t.fn.collapse = i, t.fn.collapse.Constructor = o, t.fn.collapse.noConflict = function () {
        return t.fn.collapse = s, this
    }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (o) {
        var s = t(this);
        s.attr("data-target") || o.preventDefault();
        var n = e(s), r = n.data("bs.collapse"), a = r ? "toggle" : t.extend({}, s.data(), {trigger: this});
        i.call(n, a)
    })
}(jQuery), +function (t) {
    "use strict";
    function e(e) {
        e && 3 === e.which || (t(s).remove(), t(n).each(function () {
            var o = t(this), s = i(o), n = {relatedTarget: this};
            s.hasClass("open") && (s.trigger(e = t.Event("hide.bs.dropdown", n)), e.isDefaultPrevented() || (o.attr("aria-expanded", "false"), s.removeClass("open").trigger("hidden.bs.dropdown", n)))
        }))
    }

    function i(e) {
        var i = e.attr("data-target");
        i || (i = e.attr("href"), i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
        var o = i && t(i);
        return o && o.length ? o : e.parent()
    }

    function o(e) {
        return this.each(function () {
            var i = t(this), o = i.data("bs.dropdown");
            o || i.data("bs.dropdown", o = new r(this)), "string" == typeof e && o[e].call(i)
        })
    }

    var s = ".dropdown-backdrop", n = '[data-toggle="dropdown"]', r = function (e) {
        t(e).on("click.bs.dropdown", this.toggle)
    };
    r.VERSION = "3.3.0", r.prototype.toggle = function (o) {
        var s = t(this);
        if (!s.is(".disabled, :disabled")) {
            var n = i(s), r = n.hasClass("open");
            if (e(), !r) {
                "ontouchstart"in document.documentElement && !n.closest(".navbar-nav").length && t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click", e);
                var a = {relatedTarget: this};
                if (n.trigger(o = t.Event("show.bs.dropdown", a)), o.isDefaultPrevented())return;
                s.trigger("focus").attr("aria-expanded", "true"), n.toggleClass("open").trigger("shown.bs.dropdown", a)
            }
            return !1
        }
    }, r.prototype.keydown = function (e) {
        if (/(38|40|27|32)/.test(e.which)) {
            var o = t(this);
            if (e.preventDefault(), e.stopPropagation(), !o.is(".disabled, :disabled")) {
                var s = i(o), r = s.hasClass("open");
                if (!r && 27 != e.which || r && 27 == e.which)return 27 == e.which && s.find(n).trigger("focus"), o.trigger("click");
                var a = " li:not(.divider):visible a", l = s.find('[role="menu"]' + a + ', [role="listbox"]' + a);
                if (l.length) {
                    var h = l.index(e.target);
                    38 == e.which && h > 0 && h--, 40 == e.which && h < l.length - 1 && h++, ~h || (h = 0), l.eq(h).trigger("focus")
                }
            }
        }
    };
    var a = t.fn.dropdown;
    t.fn.dropdown = o, t.fn.dropdown.Constructor = r, t.fn.dropdown.noConflict = function () {
        return t.fn.dropdown = a, this
    }, t(document).on("click.bs.dropdown.data-api", e).on("click.bs.dropdown.data-api", ".dropdown form", function (t) {
        t.stopPropagation()
    }).on("click.bs.dropdown.data-api", n, r.prototype.toggle).on("keydown.bs.dropdown.data-api", n, r.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', r.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', r.prototype.keydown)
}(jQuery), +function (t) {
    "use strict";
    function e(e, o) {
        return this.each(function () {
            var s = t(this), n = s.data("bs.modal"), r = t.extend({}, i.DEFAULTS, s.data(), "object" == typeof e && e);
            n || s.data("bs.modal", n = new i(this, r)), "string" == typeof e ? n[e](o) : r.show && n.show(o)
        })
    }

    var i = function (e, i) {
        this.options = i, this.$body = t(document.body), this.$element = t(e), this.$backdrop = this.isShown = null, this.scrollbarWidth = 0, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function () {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    i.VERSION = "3.3.0", i.TRANSITION_DURATION = 300, i.BACKDROP_TRANSITION_DURATION = 150, i.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, i.prototype.toggle = function (t) {
        return this.isShown ? this.hide() : this.show(t)
    }, i.prototype.show = function (e) {
        var o = this, s = t.Event("show.bs.modal", {relatedTarget: e});
        this.$element.trigger(s), this.isShown || s.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.$body.addClass("modal-open"), this.setScrollbar(), this.escape(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.backdrop(function () {
            var s = t.support.transition && o.$element.hasClass("fade");
            o.$element.parent().length || o.$element.appendTo(o.$body), o.$element.show().scrollTop(0), s && o.$element[0].offsetWidth, o.$element.addClass("in").attr("aria-hidden", !1), o.enforceFocus();
            var n = t.Event("shown.bs.modal", {relatedTarget: e});
            s ? o.$element.find(".modal-dialog").one("bsTransitionEnd", function () {
                o.$element.trigger("focus").trigger(n)
            }).emulateTransitionEnd(i.TRANSITION_DURATION) : o.$element.trigger("focus").trigger(n)
        }))
    }, i.prototype.hide = function (e) {
        e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : this.hideModal())
    }, i.prototype.enforceFocus = function () {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function (t) {
            this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
        }, this))
    }, i.prototype.escape = function () {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function (t) {
            27 == t.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, i.prototype.hideModal = function () {
        var t = this;
        this.$element.hide(), this.backdrop(function () {
            t.$body.removeClass("modal-open"), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
        })
    }, i.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, i.prototype.backdrop = function (e) {
        var o = this, s = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var n = t.support.transition && s;
            if (this.$backdrop = t('<div class="modal-backdrop ' + s + '" />').prependTo(this.$element).on("click.dismiss.bs.modal", t.proxy(function (t) {
                    t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
                }, this)), n && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e)return;
            n ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : e()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var r = function () {
                o.removeBackdrop(), e && e()
            };
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", r).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : r()
        } else e && e()
    }, i.prototype.checkScrollbar = function () {
        this.scrollbarWidth = this.measureScrollbar()
    }, i.prototype.setScrollbar = function () {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.scrollbarWidth && this.$body.css("padding-right", t + this.scrollbarWidth)
    }, i.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", "")
    }, i.prototype.measureScrollbar = function () {
        if (document.body.clientWidth >= window.innerWidth)return 0;
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure", this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t), e
    };
    var o = t.fn.modal;
    t.fn.modal = e, t.fn.modal.Constructor = i, t.fn.modal.noConflict = function () {
        return t.fn.modal = o, this
    }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (i) {
        var o = t(this), s = o.attr("href"), n = t(o.attr("data-target") || s && s.replace(/.*(?=#[^\s]+$)/, "")), r = n.data("bs.modal") ? "toggle" : t.extend({remote: !/#/.test(s) && s}, n.data(), o.data());
        o.is("a") && i.preventDefault(), n.one("show.bs.modal", function (t) {
            t.isDefaultPrevented() || n.one("hidden.bs.modal", function () {
                o.is(":visible") && o.trigger("focus")
            })
        }), e.call(n, r, this)
    })
}(jQuery), +function (t) {
    "use strict";
    function e(e) {
        return this.each(function () {
            var o = t(this), s = o.data("bs.tooltip"), n = "object" == typeof e && e, r = n && n.selector;
            (s || "destroy" != e) && (r ? (s || o.data("bs.tooltip", s = {}), s[r] || (s[r] = new i(this, n))) : s || o.data("bs.tooltip", s = new i(this, n)), "string" == typeof e && s[e]())
        })
    }

    var i = function (t, e) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", t, e)
    };
    i.VERSION = "3.3.0", i.TRANSITION_DURATION = 150, i.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {selector: "body", padding: 0}
    }, i.prototype.init = function (e, i, o) {
        this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(o), this.$viewport = this.options.viewport && t(this.options.viewport.selector || this.options.viewport);
        for (var s = this.options.trigger.split(" "), n = s.length; n--;) {
            var r = s[n];
            if ("click" == r)this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this)); else if ("manual" != r) {
                var a = "hover" == r ? "mouseenter" : "focusin", l = "hover" == r ? "mouseleave" : "focusout";
                this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, i.prototype.getDefaults = function () {
        return i.DEFAULTS
    }, i.prototype.getOptions = function (e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e
    }, i.prototype.getDelegateOptions = function () {
        var e = {}, i = this.getDefaults();
        return this._options && t.each(this._options, function (t, o) {
            i[t] != o && (e[t] = o)
        }), e
    }, i.prototype.enter = function (e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i && i.$tip && i.$tip.is(":visible") ? void(i.hoverState = "in") : (i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? void(i.timeout = setTimeout(function () {
            "in" == i.hoverState && i.show()
        }, i.options.delay.show)) : i.show())
    }, i.prototype.leave = function (e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? void(i.timeout = setTimeout(function () {
            "out" == i.hoverState && i.hide()
        }, i.options.delay.hide)) : i.hide()
    }, i.prototype.show = function () {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var o = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !o)return;
            var s = this, n = this.tip(), r = this.getUID(this.type);
            this.setContent(), n.attr("id", r), this.$element.attr("aria-describedby", r), this.options.animation && n.addClass("fade");
            var a = "function" == typeof this.options.placement ? this.options.placement.call(this, n[0], this.$element[0]) : this.options.placement, l = /\s?auto?\s?/i, h = l.test(a);
            h && (a = a.replace(l, "") || "top"), n.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(a).data("bs." + this.type, this), this.options.container ? n.appendTo(this.options.container) : n.insertAfter(this.$element);
            var d = this.getPosition(), p = n[0].offsetWidth, c = n[0].offsetHeight;
            if (h) {
                var f = a, u = this.options.container ? t(this.options.container) : this.$element.parent(), g = this.getPosition(u);
                a = "bottom" == a && d.bottom + c > g.bottom ? "top" : "top" == a && d.top - c < g.top ? "bottom" : "right" == a && d.right + p > g.width ? "left" : "left" == a && d.left - p < g.left ? "right" : a, n.removeClass(f).addClass(a)
            }
            var v = this.getCalculatedOffset(a, d, p, c);
            this.applyPlacement(v, a);
            var m = function () {
                var t = s.hoverState;
                s.$element.trigger("shown.bs." + s.type), s.hoverState = null, "out" == t && s.leave(s)
            };
            t.support.transition && this.$tip.hasClass("fade") ? n.one("bsTransitionEnd", m).emulateTransitionEnd(i.TRANSITION_DURATION) : m()
        }
    }, i.prototype.applyPlacement = function (e, i) {
        var o = this.tip(), s = o[0].offsetWidth, n = o[0].offsetHeight, r = parseInt(o.css("margin-top"), 10), a = parseInt(o.css("margin-left"), 10);
        isNaN(r) && (r = 0), isNaN(a) && (a = 0), e.top = e.top + r, e.left = e.left + a, t.offset.setOffset(o[0], t.extend({
            using: function (t) {
                o.css({top: Math.round(t.top), left: Math.round(t.left)})
            }
        }, e), 0), o.addClass("in");
        var l = o[0].offsetWidth, h = o[0].offsetHeight;
        "top" == i && h != n && (e.top = e.top + n - h);
        var d = this.getViewportAdjustedDelta(i, e, l, h);
        d.left ? e.left += d.left : e.top += d.top;
        var p = /top|bottom/.test(i), c = p ? 2 * d.left - s + l : 2 * d.top - n + h, f = p ? "offsetWidth" : "offsetHeight";
        o.offset(e), this.replaceArrow(c, o[0][f], p)
    }, i.prototype.replaceArrow = function (t, e, i) {
        this.arrow().css(i ? "left" : "top", 50 * (1 - t / e) + "%").css(i ? "top" : "left", "")
    }, i.prototype.setContent = function () {
        var t = this.tip(), e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, i.prototype.hide = function (e) {
        function o() {
            "in" != s.hoverState && n.detach(), s.$element.removeAttr("aria-describedby").trigger("hidden.bs." + s.type), e && e()
        }

        var s = this, n = this.tip(), r = t.Event("hide.bs." + this.type);
        return this.$element.trigger(r), r.isDefaultPrevented() ? void 0 : (n.removeClass("in"), t.support.transition && this.$tip.hasClass("fade") ? n.one("bsTransitionEnd", o).emulateTransitionEnd(i.TRANSITION_DURATION) : o(), this.hoverState = null, this)
    }, i.prototype.fixTitle = function () {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, i.prototype.hasContent = function () {
        return this.getTitle()
    }, i.prototype.getPosition = function (e) {
        e = e || this.$element;
        var i = e[0], o = "BODY" == i.tagName, s = i.getBoundingClientRect();
        null == s.width && (s = t.extend({}, s, {width: s.right - s.left, height: s.bottom - s.top}));
        var n = o ? {
            top: 0,
            left: 0
        } : e.offset(), r = {scroll: o ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()}, a = o ? {
            width: t(window).width(),
            height: t(window).height()
        } : null;
        return t.extend({}, s, r, a, n)
    }, i.prototype.getCalculatedOffset = function (t, e, i, o) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - i / 2
        } : "top" == t ? {
            top: e.top - o,
            left: e.left + e.width / 2 - i / 2
        } : "left" == t ? {top: e.top + e.height / 2 - o / 2, left: e.left - i} : {
            top: e.top + e.height / 2 - o / 2,
            left: e.left + e.width
        }
    }, i.prototype.getViewportAdjustedDelta = function (t, e, i, o) {
        var s = {top: 0, left: 0};
        if (!this.$viewport)return s;
        var n = this.options.viewport && this.options.viewport.padding || 0, r = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var a = e.top - n - r.scroll, l = e.top + n - r.scroll + o;
            a < r.top ? s.top = r.top - a : l > r.top + r.height && (s.top = r.top + r.height - l)
        } else {
            var h = e.left - n, d = e.left + n + i;
            h < r.left ? s.left = r.left - h : d > r.width && (s.left = r.left + r.width - d)
        }
        return s
    }, i.prototype.getTitle = function () {
        var t, e = this.$element, i = this.options;
        return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title)
    }, i.prototype.getUID = function (t) {
        do t += ~~(1e6 * Math.random()); while (document.getElementById(t));
        return t
    }, i.prototype.tip = function () {
        return this.$tip = this.$tip || t(this.options.template)
    }, i.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, i.prototype.enable = function () {
        this.enabled = !0
    }, i.prototype.disable = function () {
        this.enabled = !1
    }, i.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    }, i.prototype.toggle = function (e) {
        var i = this;
        e && (i = t(e.currentTarget).data("bs." + this.type), i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i))), i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    }, i.prototype.destroy = function () {
        var t = this;
        clearTimeout(this.timeout), this.hide(function () {
            t.$element.off("." + t.type).removeData("bs." + t.type)
        })
    };
    var o = t.fn.tooltip;
    t.fn.tooltip = e, t.fn.tooltip.Constructor = i, t.fn.tooltip.noConflict = function () {
        return t.fn.tooltip = o, this
    }
}(jQuery), +function (t) {
    "use strict";
    function e(e) {
        return this.each(function () {
            var o = t(this), s = o.data("bs.popover"), n = "object" == typeof e && e, r = n && n.selector;
            (s || "destroy" != e) && (r ? (s || o.data("bs.popover", s = {}), s[r] || (s[r] = new i(this, n))) : s || o.data("bs.popover", s = new i(this, n)), "string" == typeof e && s[e]())
        })
    }

    var i = function (t, e) {
        this.init("popover", t, e)
    };
    if (!t.fn.tooltip)throw new Error("Popover requires tooltip.js");
    i.VERSION = "3.3.0", i.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), i.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), i.prototype.constructor = i, i.prototype.getDefaults = function () {
        return i.DEFAULTS
    }, i.prototype.setContent = function () {
        var t = this.tip(), e = this.getTitle(), i = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof i ? "html" : "append" : "text"](i), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
    }, i.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    }, i.prototype.getContent = function () {
        var t = this.$element, e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }, i.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }, i.prototype.tip = function () {
        return this.$tip || (this.$tip = t(this.options.template)), this.$tip
    };
    var o = t.fn.popover;
    t.fn.popover = e, t.fn.popover.Constructor = i, t.fn.popover.noConflict = function () {
        return t.fn.popover = o, this
    }
}(jQuery), +function (t) {
    "use strict";
    function e(i, o) {
        var s = t.proxy(this.process, this);
        this.$body = t("body"), this.$scrollElement = t(t(i).is("body") ? window : i), this.options = t.extend({}, e.DEFAULTS, o), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", s), this.refresh(), this.process()
    }

    function i(i) {
        return this.each(function () {
            var o = t(this), s = o.data("bs.scrollspy"), n = "object" == typeof i && i;
            s || o.data("bs.scrollspy", s = new e(this, n)), "string" == typeof i && s[i]()
        })
    }

    e.VERSION = "3.3.0", e.DEFAULTS = {offset: 10}, e.prototype.getScrollHeight = function () {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, e.prototype.refresh = function () {
        var e = "offset", i = 0;
        t.isWindow(this.$scrollElement[0]) || (e = "position", i = this.$scrollElement.scrollTop()), this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight();
        var o = this;
        this.$body.find(this.selector).map(function () {
            var o = t(this), s = o.data("target") || o.attr("href"), n = /^#./.test(s) && t(s);
            return n && n.length && n.is(":visible") && [[n[e]().top + i, s]] || null
        }).sort(function (t, e) {
            return t[0] - e[0]
        }).each(function () {
            o.offsets.push(this[0]), o.targets.push(this[1])
        })
    }, e.prototype.process = function () {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset, i = this.getScrollHeight(), o = this.options.offset + i - this.$scrollElement.height(), s = this.offsets, n = this.targets, r = this.activeTarget;
        if (this.scrollHeight != i && this.refresh(), e >= o)return r != (t = n[n.length - 1]) && this.activate(t);
        if (r && e < s[0])return this.activeTarget = null, this.clear();
        for (t = s.length; t--;)r != n[t] && e >= s[t] && (!s[t + 1] || e <= s[t + 1]) && this.activate(n[t])
    }, e.prototype.activate = function (e) {
        this.activeTarget = e, this.clear();
        var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]', o = t(i).parents("li").addClass("active");
        o.parent(".dropdown-menu").length && (o = o.closest("li.dropdown").addClass("active")), o.trigger("activate.bs.scrollspy")
    }, e.prototype.clear = function () {
        t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var o = t.fn.scrollspy;
    t.fn.scrollspy = i, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function () {
        return t.fn.scrollspy = o, this
    }, t(window).on("load.bs.scrollspy.data-api", function () {
        t('[data-spy="scroll"]').each(function () {
            var e = t(this);
            i.call(e, e.data())
        })
    })
}(jQuery), +function (t) {
    "use strict";
    function e(e) {
        return this.each(function () {
            var o = t(this), s = o.data("bs.tab");
            s || o.data("bs.tab", s = new i(this)), "string" == typeof e && s[e]()
        })
    }

    var i = function (e) {
        this.element = t(e)
    };
    i.VERSION = "3.3.0", i.TRANSITION_DURATION = 150, i.prototype.show = function () {
        var e = this.element, i = e.closest("ul:not(.dropdown-menu)"), o = e.data("target");
        if (o || (o = e.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var s = i.find(".active:last a"), n = t.Event("hide.bs.tab", {relatedTarget: e[0]}), r = t.Event("show.bs.tab", {relatedTarget: s[0]});
            if (s.trigger(n), e.trigger(r), !r.isDefaultPrevented() && !n.isDefaultPrevented()) {
                var a = t(o);
                this.activate(e.closest("li"), i), this.activate(a, a.parent(), function () {
                    s.trigger({type: "hidden.bs.tab", relatedTarget: e[0]}), e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: s[0]
                    })
                })
            }
        }
    }, i.prototype.activate = function (e, o, s) {
        function n() {
            r.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), a ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu") && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), s && s()
        }

        var r = o.find("> .active"), a = s && t.support.transition && (r.length && r.hasClass("fade") || !!o.find("> .fade").length);
        r.length && a ? r.one("bsTransitionEnd", n).emulateTransitionEnd(i.TRANSITION_DURATION) : n(), r.removeClass("in")
    };
    var o = t.fn.tab;
    t.fn.tab = e, t.fn.tab.Constructor = i, t.fn.tab.noConflict = function () {
        return t.fn.tab = o, this
    };
    var s = function (i) {
        i.preventDefault(), e.call(t(this), "show")
    };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', s).on("click.bs.tab.data-api", '[data-toggle="pill"]', s)
}(jQuery), +function (t) {
    "use strict";
    function e(e) {
        return this.each(function () {
            var o = t(this), s = o.data("bs.affix"), n = "object" == typeof e && e;
            s || o.data("bs.affix", s = new i(this, n)), "string" == typeof e && s[e]()
        })
    }

    var i = function (e, o) {
        this.options = t.extend({}, i.DEFAULTS, o), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(e), this.affixed = this.unpin = this.pinnedOffset = null, this.checkPosition()
    };
    i.VERSION = "3.3.0", i.RESET = "affix affix-top affix-bottom", i.DEFAULTS = {
        offset: 0,
        target: window
    }, i.prototype.getState = function (t, e, i, o) {
        var s = this.$target.scrollTop(), n = this.$element.offset(), r = this.$target.height();
        if (null != i && "top" == this.affixed)return i > s ? "top" : !1;
        if ("bottom" == this.affixed)return null != i ? s + this.unpin <= n.top ? !1 : "bottom" : t - o >= s + r ? !1 : "bottom";
        var a = null == this.affixed, l = a ? s : n.top, h = a ? r : e;
        return null != i && i >= l ? "top" : null != o && l + h >= t - o ? "bottom" : !1
    }, i.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset)return this.pinnedOffset;
        this.$element.removeClass(i.RESET).addClass("affix");
        var t = this.$target.scrollTop(), e = this.$element.offset();
        return this.pinnedOffset = e.top - t
    }, i.prototype.checkPositionWithEventLoop = function () {
        setTimeout(t.proxy(this.checkPosition, this), 1)
    }, i.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var e = this.$element.height(), o = this.options.offset, s = o.top, n = o.bottom, r = t("body").height();
            "object" != typeof o && (n = s = o), "function" == typeof s && (s = o.top(this.$element)), "function" == typeof n && (n = o.bottom(this.$element));
            var a = this.getState(r, e, s, n);
            if (this.affixed != a) {
                null != this.unpin && this.$element.css("top", "");
                var l = "affix" + (a ? "-" + a : ""), h = t.Event(l + ".bs.affix");
                if (this.$element.trigger(h), h.isDefaultPrevented())return;
                this.affixed = a, this.unpin = "bottom" == a ? this.getPinnedOffset() : null, this.$element.removeClass(i.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == a && this.$element.offset({top: r - e - n})
        }
    };
    var o = t.fn.affix;
    t.fn.affix = e, t.fn.affix.Constructor = i, t.fn.affix.noConflict = function () {
        return t.fn.affix = o, this
    }, t(window).on("load", function () {
        t('[data-spy="affix"]').each(function () {
            var i = t(this), o = i.data();
            o.offset = o.offset || {}, null != o.offsetBottom && (o.offset.bottom = o.offsetBottom), null != o.offsetTop && (o.offset.top = o.offsetTop), e.call(i, o)
        })
    })
}(jQuery);
;
/*!/public/vendors/bootstrap/js/bootstrap.min.js*/
if ("undefined" == typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");
+function (t) {
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}(jQuery), +function (t) {
    "use strict";
    function e() {
        var t = document.createElement("bootstrap"), e = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var i in e)if (void 0 !== t.style[i])return {end: e[i]};
        return !1
    }

    t.fn.emulateTransitionEnd = function (e) {
        var i = !1, o = this;
        t(this).one("bsTransitionEnd", function () {
            i = !0
        });
        var s = function () {
            i || t(o).trigger(t.support.transition.end)
        };
        return setTimeout(s, e), this
    }, t(function () {
        t.support.transition = e(), t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function (e) {
                return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery), +function (t) {
    "use strict";
    function e(e) {
        return this.each(function () {
            var i = t(this), s = i.data("bs.alert");
            s || i.data("bs.alert", s = new o(this)), "string" == typeof e && s[e].call(i)
        })
    }

    var i = '[data-dismiss="alert"]', o = function (e) {
        t(e).on("click", i, this.close)
    };
    o.VERSION = "3.3.0", o.TRANSITION_DURATION = 150, o.prototype.close = function (e) {
        function i() {
            r.detach().trigger("closed.bs.alert").remove()
        }

        var s = t(this), n = s.attr("data-target");
        n || (n = s.attr("href"), n = n && n.replace(/.*(?=#[^\s]*$)/, ""));
        var r = t(n);
        e && e.preventDefault(), r.length || (r = s.closest(".alert")), r.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (r.removeClass("in"), t.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", i).emulateTransitionEnd(o.TRANSITION_DURATION) : i())
    };
    var s = t.fn.alert;
    t.fn.alert = e, t.fn.alert.Constructor = o, t.fn.alert.noConflict = function () {
        return t.fn.alert = s, this
    }, t(document).on("click.bs.alert.data-api", i, o.prototype.close)
}(jQuery), +function (t) {
    "use strict";
    function e(e) {
        return this.each(function () {
            var o = t(this), s = o.data("bs.button"), n = "object" == typeof e && e;
            s || o.data("bs.button", s = new i(this, n)), "toggle" == e ? s.toggle() : e && s.setState(e)
        })
    }

    var i = function (e, o) {
        this.$element = t(e), this.options = t.extend({}, i.DEFAULTS, o), this.isLoading = !1
    };
    i.VERSION = "3.3.0", i.DEFAULTS = {loadingText: "loading..."}, i.prototype.setState = function (e) {
        var i = "disabled", o = this.$element, s = o.is("input") ? "val" : "html", n = o.data();
        e += "Text", null == n.resetText && o.data("resetText", o[s]()), setTimeout(t.proxy(function () {
            o[s](null == n[e] ? this.options[e] : n[e]), "loadingText" == e ? (this.isLoading = !0, o.addClass(i).attr(i, i)) : this.isLoading && (this.isLoading = !1, o.removeClass(i).removeAttr(i))
        }, this), 0)
    }, i.prototype.toggle = function () {
        var t = !0, e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var i = this.$element.find("input");
            "radio" == i.prop("type") && (i.prop("checked") && this.$element.hasClass("active") ? t = !1 : e.find(".active").removeClass("active")), t && i.prop("checked", !this.$element.hasClass("active")).trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
        t && this.$element.toggleClass("active")
    };
    var o = t.fn.button;
    t.fn.button = e, t.fn.button.Constructor = i, t.fn.button.noConflict = function () {
        return t.fn.button = o, this
    }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (i) {
        var o = t(i.target);
        o.hasClass("btn") || (o = o.closest(".btn")), e.call(o, "toggle"), i.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (e) {
        t(e.target).closest(".btn").toggleClass("focus", "focus" == e.type)
    })
}(jQuery), +function (t) {
    "use strict";
    function e(e) {
        return this.each(function () {
            var o = t(this), s = o.data("bs.carousel"), n = t.extend({}, i.DEFAULTS, o.data(), "object" == typeof e && e), r = "string" == typeof e ? e : n.slide;
            s || o.data("bs.carousel", s = new i(this, n)), "number" == typeof e ? s.to(e) : r ? s[r]() : n.interval && s.pause().cycle()
        })
    }

    var i = function (e, i) {
        this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = i, this.paused = this.sliding = this.interval = this.$active = this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart"in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
    };
    i.VERSION = "3.3.0", i.TRANSITION_DURATION = 600, i.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, i.prototype.keydown = function (t) {
        switch (t.which) {
            case 37:
                this.prev();
                break;
            case 39:
                this.next();
                break;
            default:
                return
        }
        t.preventDefault()
    }, i.prototype.cycle = function (e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
    }, i.prototype.getItemIndex = function (t) {
        return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
    }, i.prototype.getItemForDirection = function (t, e) {
        var i = "prev" == t ? -1 : 1, o = this.getItemIndex(e), s = (o + i) % this.$items.length;
        return this.$items.eq(s)
    }, i.prototype.to = function (t) {
        var e = this, i = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function () {
            e.to(t)
        }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", this.$items.eq(t))
    }, i.prototype.pause = function (e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, i.prototype.next = function () {
        return this.sliding ? void 0 : this.slide("next")
    }, i.prototype.prev = function () {
        return this.sliding ? void 0 : this.slide("prev")
    }, i.prototype.slide = function (e, o) {
        var s = this.$element.find(".item.active"), n = o || this.getItemForDirection(e, s), r = this.interval, a = "next" == e ? "left" : "right", l = "next" == e ? "first" : "last", h = this;
        if (!n.length) {
            if (!this.options.wrap)return;
            n = this.$element.find(".item")[l]()
        }
        if (n.hasClass("active"))return this.sliding = !1;
        var d = n[0], p = t.Event("slide.bs.carousel", {relatedTarget: d, direction: a});
        if (this.$element.trigger(p), !p.isDefaultPrevented()) {
            if (this.sliding = !0, r && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var c = t(this.$indicators.children()[this.getItemIndex(n)]);
                c && c.addClass("active")
            }
            var f = t.Event("slid.bs.carousel", {relatedTarget: d, direction: a});
            return t.support.transition && this.$element.hasClass("slide") ? (n.addClass(e), n[0].offsetWidth, s.addClass(a), n.addClass(a), s.one("bsTransitionEnd", function () {
                n.removeClass([e, a].join(" ")).addClass("active"), s.removeClass(["active", a].join(" ")), h.sliding = !1, setTimeout(function () {
                    h.$element.trigger(f)
                }, 0)
            }).emulateTransitionEnd(i.TRANSITION_DURATION)) : (s.removeClass("active"), n.addClass("active"), this.sliding = !1, this.$element.trigger(f)), r && this.cycle(), this
        }
    };
    var o = t.fn.carousel;
    t.fn.carousel = e, t.fn.carousel.Constructor = i, t.fn.carousel.noConflict = function () {
        return t.fn.carousel = o, this
    };
    var s = function (i) {
        var o, s = t(this), n = t(s.attr("data-target") || (o = s.attr("href")) && o.replace(/.*(?=#[^\s]+$)/, ""));
        if (n.hasClass("carousel")) {
            var r = t.extend({}, n.data(), s.data()), a = s.attr("data-slide-to");
            a && (r.interval = !1), e.call(n, r), a && n.data("bs.carousel").to(a), i.preventDefault()
        }
    };
    t(document).on("click.bs.carousel.data-api", "[data-slide]", s).on("click.bs.carousel.data-api", "[data-slide-to]", s), t(window).on("load", function () {
        t('[data-ride="carousel"]').each(function () {
            var i = t(this);
            e.call(i, i.data())
        })
    })
}(jQuery), +function (t) {
    "use strict";
    function e(e) {
        var i, o = e.attr("data-target") || (i = e.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
        return t(o)
    }

    function i(e) {
        return this.each(function () {
            var i = t(this), s = i.data("bs.collapse"), n = t.extend({}, o.DEFAULTS, i.data(), "object" == typeof e && e);
            !s && n.toggle && "show" == e && (n.toggle = !1), s || i.data("bs.collapse", s = new o(this, n)), "string" == typeof e && s[e]()
        })
    }

    var o = function (e, i) {
        this.$element = t(e), this.options = t.extend({}, o.DEFAULTS, i), this.$trigger = t(this.options.trigger).filter('[href="#' + e.id + '"], [data-target="#' + e.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    o.VERSION = "3.3.0", o.TRANSITION_DURATION = 350, o.DEFAULTS = {
        toggle: !0,
        trigger: '[data-toggle="collapse"]'
    }, o.prototype.dimension = function () {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height"
    }, o.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e, s = this.$parent && this.$parent.find("> .panel").children(".in, .collapsing");
            if (!(s && s.length && (e = s.data("bs.collapse"), e && e.transitioning))) {
                var n = t.Event("show.bs.collapse");
                if (this.$element.trigger(n), !n.isDefaultPrevented()) {
                    s && s.length && (i.call(s, "hide"), e || s.data("bs.collapse", null));
                    var r = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[r](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var a = function () {
                        this.$element.removeClass("collapsing").addClass("collapse in")[r](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!t.support.transition)return a.call(this);
                    var l = t.camelCase(["scroll", r].join("-"));
                    this.$element.one("bsTransitionEnd", t.proxy(a, this)).emulateTransitionEnd(o.TRANSITION_DURATION)[r](this.$element[0][l])
                }
            }
        }
    }, o.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var i = this.dimension();
                this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var s = function () {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return t.support.transition ? void this.$element[i](0).one("bsTransitionEnd", t.proxy(s, this)).emulateTransitionEnd(o.TRANSITION_DURATION) : s.call(this)
            }
        }
    }, o.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, o.prototype.getParent = function () {
        return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function (i, o) {
            var s = t(o);
            this.addAriaAndCollapsedClass(e(s), s)
        }, this)).end()
    }, o.prototype.addAriaAndCollapsedClass = function (t, e) {
        var i = t.hasClass("in");
        t.attr("aria-expanded", i), e.toggleClass("collapsed", !i).attr("aria-expanded", i)
    };
    var s = t.fn.collapse;
    t.fn.collapse = i, t.fn.collapse.Constructor = o, t.fn.collapse.noConflict = function () {
        return t.fn.collapse = s, this
    }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (o) {
        var s = t(this);
        s.attr("data-target") || o.preventDefault();
        var n = e(s), r = n.data("bs.collapse"), a = r ? "toggle" : t.extend({}, s.data(), {trigger: this});
        i.call(n, a)
    })
}(jQuery), +function (t) {
    "use strict";
    function e(e) {
        e && 3 === e.which || (t(s).remove(), t(n).each(function () {
            var o = t(this), s = i(o), n = {relatedTarget: this};
            s.hasClass("open") && (s.trigger(e = t.Event("hide.bs.dropdown", n)), e.isDefaultPrevented() || (o.attr("aria-expanded", "false"), s.removeClass("open").trigger("hidden.bs.dropdown", n)))
        }))
    }

    function i(e) {
        var i = e.attr("data-target");
        i || (i = e.attr("href"), i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
        var o = i && t(i);
        return o && o.length ? o : e.parent()
    }

    function o(e) {
        return this.each(function () {
            var i = t(this), o = i.data("bs.dropdown");
            o || i.data("bs.dropdown", o = new r(this)), "string" == typeof e && o[e].call(i)
        })
    }

    var s = ".dropdown-backdrop", n = '[data-toggle="dropdown"]', r = function (e) {
        t(e).on("click.bs.dropdown", this.toggle)
    };
    r.VERSION = "3.3.0", r.prototype.toggle = function (o) {
        var s = t(this);
        if (!s.is(".disabled, :disabled")) {
            var n = i(s), r = n.hasClass("open");
            if (e(), !r) {
                "ontouchstart"in document.documentElement && !n.closest(".navbar-nav").length && t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click", e);
                var a = {relatedTarget: this};
                if (n.trigger(o = t.Event("show.bs.dropdown", a)), o.isDefaultPrevented())return;
                s.trigger("focus").attr("aria-expanded", "true"), n.toggleClass("open").trigger("shown.bs.dropdown", a)
            }
            return !1
        }
    }, r.prototype.keydown = function (e) {
        if (/(38|40|27|32)/.test(e.which)) {
            var o = t(this);
            if (e.preventDefault(), e.stopPropagation(), !o.is(".disabled, :disabled")) {
                var s = i(o), r = s.hasClass("open");
                if (!r && 27 != e.which || r && 27 == e.which)return 27 == e.which && s.find(n).trigger("focus"), o.trigger("click");
                var a = " li:not(.divider):visible a", l = s.find('[role="menu"]' + a + ', [role="listbox"]' + a);
                if (l.length) {
                    var h = l.index(e.target);
                    38 == e.which && h > 0 && h--, 40 == e.which && h < l.length - 1 && h++, ~h || (h = 0), l.eq(h).trigger("focus")
                }
            }
        }
    };
    var a = t.fn.dropdown;
    t.fn.dropdown = o, t.fn.dropdown.Constructor = r, t.fn.dropdown.noConflict = function () {
        return t.fn.dropdown = a, this
    }, t(document).on("click.bs.dropdown.data-api", e).on("click.bs.dropdown.data-api", ".dropdown form", function (t) {
        t.stopPropagation()
    }).on("click.bs.dropdown.data-api", n, r.prototype.toggle).on("keydown.bs.dropdown.data-api", n, r.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', r.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', r.prototype.keydown)
}(jQuery), +function (t) {
    "use strict";
    function e(e, o) {
        return this.each(function () {
            var s = t(this), n = s.data("bs.modal"), r = t.extend({}, i.DEFAULTS, s.data(), "object" == typeof e && e);
            n || s.data("bs.modal", n = new i(this, r)), "string" == typeof e ? n[e](o) : r.show && n.show(o)
        })
    }

    var i = function (e, i) {
        this.options = i, this.$body = t(document.body), this.$element = t(e), this.$backdrop = this.isShown = null, this.scrollbarWidth = 0, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function () {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    i.VERSION = "3.3.0", i.TRANSITION_DURATION = 300, i.BACKDROP_TRANSITION_DURATION = 150, i.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, i.prototype.toggle = function (t) {
        return this.isShown ? this.hide() : this.show(t)
    }, i.prototype.show = function (e) {
        var o = this, s = t.Event("show.bs.modal", {relatedTarget: e});
        this.$element.trigger(s), this.isShown || s.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.$body.addClass("modal-open"), this.setScrollbar(), this.escape(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.backdrop(function () {
            var s = t.support.transition && o.$element.hasClass("fade");
            o.$element.parent().length || o.$element.appendTo(o.$body), o.$element.show().scrollTop(0), s && o.$element[0].offsetWidth, o.$element.addClass("in").attr("aria-hidden", !1), o.enforceFocus();
            var n = t.Event("shown.bs.modal", {relatedTarget: e});
            s ? o.$element.find(".modal-dialog").one("bsTransitionEnd", function () {
                o.$element.trigger("focus").trigger(n)
            }).emulateTransitionEnd(i.TRANSITION_DURATION) : o.$element.trigger("focus").trigger(n)
        }))
    }, i.prototype.hide = function (e) {
        e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : this.hideModal())
    }, i.prototype.enforceFocus = function () {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function (t) {
            this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
        }, this))
    }, i.prototype.escape = function () {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function (t) {
            27 == t.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, i.prototype.hideModal = function () {
        var t = this;
        this.$element.hide(), this.backdrop(function () {
            t.$body.removeClass("modal-open"), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
        })
    }, i.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, i.prototype.backdrop = function (e) {
        var o = this, s = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var n = t.support.transition && s;
            if (this.$backdrop = t('<div class="modal-backdrop ' + s + '" />').prependTo(this.$element).on("click.dismiss.bs.modal", t.proxy(function (t) {
                    t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
                }, this)), n && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e)return;
            n ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : e()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var r = function () {
                o.removeBackdrop(), e && e()
            };
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", r).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : r()
        } else e && e()
    }, i.prototype.checkScrollbar = function () {
        this.scrollbarWidth = this.measureScrollbar()
    }, i.prototype.setScrollbar = function () {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.scrollbarWidth && this.$body.css("padding-right", t + this.scrollbarWidth)
    }, i.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", "")
    }, i.prototype.measureScrollbar = function () {
        if (document.body.clientWidth >= window.innerWidth)return 0;
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure", this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t), e
    };
    var o = t.fn.modal;
    t.fn.modal = e, t.fn.modal.Constructor = i, t.fn.modal.noConflict = function () {
        return t.fn.modal = o, this
    }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (i) {
        var o = t(this), s = o.attr("href"), n = t(o.attr("data-target") || s && s.replace(/.*(?=#[^\s]+$)/, "")), r = n.data("bs.modal") ? "toggle" : t.extend({remote: !/#/.test(s) && s}, n.data(), o.data());
        o.is("a") && i.preventDefault(), n.one("show.bs.modal", function (t) {
            t.isDefaultPrevented() || n.one("hidden.bs.modal", function () {
                o.is(":visible") && o.trigger("focus")
            })
        }), e.call(n, r, this)
    })
}(jQuery), +function (t) {
    "use strict";
    function e(e) {
        return this.each(function () {
            var o = t(this), s = o.data("bs.tooltip"), n = "object" == typeof e && e, r = n && n.selector;
            (s || "destroy" != e) && (r ? (s || o.data("bs.tooltip", s = {}), s[r] || (s[r] = new i(this, n))) : s || o.data("bs.tooltip", s = new i(this, n)), "string" == typeof e && s[e]())
        })
    }

    var i = function (t, e) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", t, e)
    };
    i.VERSION = "3.3.0", i.TRANSITION_DURATION = 150, i.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {selector: "body", padding: 0}
    }, i.prototype.init = function (e, i, o) {
        this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(o), this.$viewport = this.options.viewport && t(this.options.viewport.selector || this.options.viewport);
        for (var s = this.options.trigger.split(" "), n = s.length; n--;) {
            var r = s[n];
            if ("click" == r)this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this)); else if ("manual" != r) {
                var a = "hover" == r ? "mouseenter" : "focusin", l = "hover" == r ? "mouseleave" : "focusout";
                this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, i.prototype.getDefaults = function () {
        return i.DEFAULTS
    }, i.prototype.getOptions = function (e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e
    }, i.prototype.getDelegateOptions = function () {
        var e = {}, i = this.getDefaults();
        return this._options && t.each(this._options, function (t, o) {
            i[t] != o && (e[t] = o)
        }), e
    }, i.prototype.enter = function (e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i && i.$tip && i.$tip.is(":visible") ? void(i.hoverState = "in") : (i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? void(i.timeout = setTimeout(function () {
            "in" == i.hoverState && i.show()
        }, i.options.delay.show)) : i.show())
    }, i.prototype.leave = function (e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? void(i.timeout = setTimeout(function () {
            "out" == i.hoverState && i.hide()
        }, i.options.delay.hide)) : i.hide()
    }, i.prototype.show = function () {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var o = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !o)return;
            var s = this, n = this.tip(), r = this.getUID(this.type);
            this.setContent(), n.attr("id", r), this.$element.attr("aria-describedby", r), this.options.animation && n.addClass("fade");
            var a = "function" == typeof this.options.placement ? this.options.placement.call(this, n[0], this.$element[0]) : this.options.placement, l = /\s?auto?\s?/i, h = l.test(a);
            h && (a = a.replace(l, "") || "top"), n.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(a).data("bs." + this.type, this), this.options.container ? n.appendTo(this.options.container) : n.insertAfter(this.$element);
            var d = this.getPosition(), p = n[0].offsetWidth, c = n[0].offsetHeight;
            if (h) {
                var f = a, u = this.options.container ? t(this.options.container) : this.$element.parent(), g = this.getPosition(u);
                a = "bottom" == a && d.bottom + c > g.bottom ? "top" : "top" == a && d.top - c < g.top ? "bottom" : "right" == a && d.right + p > g.width ? "left" : "left" == a && d.left - p < g.left ? "right" : a, n.removeClass(f).addClass(a)
            }
            var v = this.getCalculatedOffset(a, d, p, c);
            this.applyPlacement(v, a);
            var m = function () {
                var t = s.hoverState;
                s.$element.trigger("shown.bs." + s.type), s.hoverState = null, "out" == t && s.leave(s)
            };
            t.support.transition && this.$tip.hasClass("fade") ? n.one("bsTransitionEnd", m).emulateTransitionEnd(i.TRANSITION_DURATION) : m()
        }
    }, i.prototype.applyPlacement = function (e, i) {
        var o = this.tip(), s = o[0].offsetWidth, n = o[0].offsetHeight, r = parseInt(o.css("margin-top"), 10), a = parseInt(o.css("margin-left"), 10);
        isNaN(r) && (r = 0), isNaN(a) && (a = 0), e.top = e.top + r, e.left = e.left + a, t.offset.setOffset(o[0], t.extend({
            using: function (t) {
                o.css({top: Math.round(t.top), left: Math.round(t.left)})
            }
        }, e), 0), o.addClass("in");
        var l = o[0].offsetWidth, h = o[0].offsetHeight;
        "top" == i && h != n && (e.top = e.top + n - h);
        var d = this.getViewportAdjustedDelta(i, e, l, h);
        d.left ? e.left += d.left : e.top += d.top;
        var p = /top|bottom/.test(i), c = p ? 2 * d.left - s + l : 2 * d.top - n + h, f = p ? "offsetWidth" : "offsetHeight";
        o.offset(e), this.replaceArrow(c, o[0][f], p)
    }, i.prototype.replaceArrow = function (t, e, i) {
        this.arrow().css(i ? "left" : "top", 50 * (1 - t / e) + "%").css(i ? "top" : "left", "")
    }, i.prototype.setContent = function () {
        var t = this.tip(), e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, i.prototype.hide = function (e) {
        function o() {
            "in" != s.hoverState && n.detach(), s.$element.removeAttr("aria-describedby").trigger("hidden.bs." + s.type), e && e()
        }

        var s = this, n = this.tip(), r = t.Event("hide.bs." + this.type);
        return this.$element.trigger(r), r.isDefaultPrevented() ? void 0 : (n.removeClass("in"), t.support.transition && this.$tip.hasClass("fade") ? n.one("bsTransitionEnd", o).emulateTransitionEnd(i.TRANSITION_DURATION) : o(), this.hoverState = null, this)
    }, i.prototype.fixTitle = function () {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, i.prototype.hasContent = function () {
        return this.getTitle()
    }, i.prototype.getPosition = function (e) {
        e = e || this.$element;
        var i = e[0], o = "BODY" == i.tagName, s = i.getBoundingClientRect();
        null == s.width && (s = t.extend({}, s, {width: s.right - s.left, height: s.bottom - s.top}));
        var n = o ? {
            top: 0,
            left: 0
        } : e.offset(), r = {scroll: o ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()}, a = o ? {
            width: t(window).width(),
            height: t(window).height()
        } : null;
        return t.extend({}, s, r, a, n)
    }, i.prototype.getCalculatedOffset = function (t, e, i, o) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - i / 2
        } : "top" == t ? {
            top: e.top - o,
            left: e.left + e.width / 2 - i / 2
        } : "left" == t ? {top: e.top + e.height / 2 - o / 2, left: e.left - i} : {
            top: e.top + e.height / 2 - o / 2,
            left: e.left + e.width
        }
    }, i.prototype.getViewportAdjustedDelta = function (t, e, i, o) {
        var s = {top: 0, left: 0};
        if (!this.$viewport)return s;
        var n = this.options.viewport && this.options.viewport.padding || 0, r = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var a = e.top - n - r.scroll, l = e.top + n - r.scroll + o;
            a < r.top ? s.top = r.top - a : l > r.top + r.height && (s.top = r.top + r.height - l)
        } else {
            var h = e.left - n, d = e.left + n + i;
            h < r.left ? s.left = r.left - h : d > r.width && (s.left = r.left + r.width - d)
        }
        return s
    }, i.prototype.getTitle = function () {
        var t, e = this.$element, i = this.options;
        return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title)
    }, i.prototype.getUID = function (t) {
        do t += ~~(1e6 * Math.random()); while (document.getElementById(t));
        return t
    }, i.prototype.tip = function () {
        return this.$tip = this.$tip || t(this.options.template)
    }, i.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, i.prototype.enable = function () {
        this.enabled = !0
    }, i.prototype.disable = function () {
        this.enabled = !1
    }, i.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    }, i.prototype.toggle = function (e) {
        var i = this;
        e && (i = t(e.currentTarget).data("bs." + this.type), i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i))), i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    }, i.prototype.destroy = function () {
        var t = this;
        clearTimeout(this.timeout), this.hide(function () {
            t.$element.off("." + t.type).removeData("bs." + t.type)
        })
    };
    var o = t.fn.tooltip;
    t.fn.tooltip = e, t.fn.tooltip.Constructor = i, t.fn.tooltip.noConflict = function () {
        return t.fn.tooltip = o, this
    }
}(jQuery), +function (t) {
    "use strict";
    function e(e) {
        return this.each(function () {
            var o = t(this), s = o.data("bs.popover"), n = "object" == typeof e && e, r = n && n.selector;
            (s || "destroy" != e) && (r ? (s || o.data("bs.popover", s = {}), s[r] || (s[r] = new i(this, n))) : s || o.data("bs.popover", s = new i(this, n)), "string" == typeof e && s[e]())
        })
    }

    var i = function (t, e) {
        this.init("popover", t, e)
    };
    if (!t.fn.tooltip)throw new Error("Popover requires tooltip.js");
    i.VERSION = "3.3.0", i.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), i.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), i.prototype.constructor = i, i.prototype.getDefaults = function () {
        return i.DEFAULTS
    }, i.prototype.setContent = function () {
        var t = this.tip(), e = this.getTitle(), i = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof i ? "html" : "append" : "text"](i), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
    }, i.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    }, i.prototype.getContent = function () {
        var t = this.$element, e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }, i.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }, i.prototype.tip = function () {
        return this.$tip || (this.$tip = t(this.options.template)), this.$tip
    };
    var o = t.fn.popover;
    t.fn.popover = e, t.fn.popover.Constructor = i, t.fn.popover.noConflict = function () {
        return t.fn.popover = o, this
    }
}(jQuery), +function (t) {
    "use strict";
    function e(i, o) {
        var s = t.proxy(this.process, this);
        this.$body = t("body"), this.$scrollElement = t(t(i).is("body") ? window : i), this.options = t.extend({}, e.DEFAULTS, o), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", s), this.refresh(), this.process()
    }

    function i(i) {
        return this.each(function () {
            var o = t(this), s = o.data("bs.scrollspy"), n = "object" == typeof i && i;
            s || o.data("bs.scrollspy", s = new e(this, n)), "string" == typeof i && s[i]()
        })
    }

    e.VERSION = "3.3.0", e.DEFAULTS = {offset: 10}, e.prototype.getScrollHeight = function () {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, e.prototype.refresh = function () {
        var e = "offset", i = 0;
        t.isWindow(this.$scrollElement[0]) || (e = "position", i = this.$scrollElement.scrollTop()), this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight();
        var o = this;
        this.$body.find(this.selector).map(function () {
            var o = t(this), s = o.data("target") || o.attr("href"), n = /^#./.test(s) && t(s);
            return n && n.length && n.is(":visible") && [[n[e]().top + i, s]] || null
        }).sort(function (t, e) {
            return t[0] - e[0]
        }).each(function () {
            o.offsets.push(this[0]), o.targets.push(this[1])
        })
    }, e.prototype.process = function () {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset, i = this.getScrollHeight(), o = this.options.offset + i - this.$scrollElement.height(), s = this.offsets, n = this.targets, r = this.activeTarget;
        if (this.scrollHeight != i && this.refresh(), e >= o)return r != (t = n[n.length - 1]) && this.activate(t);
        if (r && e < s[0])return this.activeTarget = null, this.clear();
        for (t = s.length; t--;)r != n[t] && e >= s[t] && (!s[t + 1] || e <= s[t + 1]) && this.activate(n[t])
    }, e.prototype.activate = function (e) {
        this.activeTarget = e, this.clear();
        var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]', o = t(i).parents("li").addClass("active");
        o.parent(".dropdown-menu").length && (o = o.closest("li.dropdown").addClass("active")), o.trigger("activate.bs.scrollspy")
    }, e.prototype.clear = function () {
        t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var o = t.fn.scrollspy;
    t.fn.scrollspy = i, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function () {
        return t.fn.scrollspy = o, this
    }, t(window).on("load.bs.scrollspy.data-api", function () {
        t('[data-spy="scroll"]').each(function () {
            var e = t(this);
            i.call(e, e.data())
        })
    })
}(jQuery), +function (t) {
    "use strict";
    function e(e) {
        return this.each(function () {
            var o = t(this), s = o.data("bs.tab");
            s || o.data("bs.tab", s = new i(this)), "string" == typeof e && s[e]()
        })
    }

    var i = function (e) {
        this.element = t(e)
    };
    i.VERSION = "3.3.0", i.TRANSITION_DURATION = 150, i.prototype.show = function () {
        var e = this.element, i = e.closest("ul:not(.dropdown-menu)"), o = e.data("target");
        if (o || (o = e.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var s = i.find(".active:last a"), n = t.Event("hide.bs.tab", {relatedTarget: e[0]}), r = t.Event("show.bs.tab", {relatedTarget: s[0]});
            if (s.trigger(n), e.trigger(r), !r.isDefaultPrevented() && !n.isDefaultPrevented()) {
                var a = t(o);
                this.activate(e.closest("li"), i), this.activate(a, a.parent(), function () {
                    s.trigger({type: "hidden.bs.tab", relatedTarget: e[0]}), e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: s[0]
                    })
                })
            }
        }
    }, i.prototype.activate = function (e, o, s) {
        function n() {
            r.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), a ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu") && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), s && s()
        }

        var r = o.find("> .active"), a = s && t.support.transition && (r.length && r.hasClass("fade") || !!o.find("> .fade").length);
        r.length && a ? r.one("bsTransitionEnd", n).emulateTransitionEnd(i.TRANSITION_DURATION) : n(), r.removeClass("in")
    };
    var o = t.fn.tab;
    t.fn.tab = e, t.fn.tab.Constructor = i, t.fn.tab.noConflict = function () {
        return t.fn.tab = o, this
    };
    var s = function (i) {
        i.preventDefault(), e.call(t(this), "show")
    };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', s).on("click.bs.tab.data-api", '[data-toggle="pill"]', s)
}(jQuery), +function (t) {
    "use strict";
    function e(e) {
        return this.each(function () {
            var o = t(this), s = o.data("bs.affix"), n = "object" == typeof e && e;
            s || o.data("bs.affix", s = new i(this, n)), "string" == typeof e && s[e]()
        })
    }

    var i = function (e, o) {
        this.options = t.extend({}, i.DEFAULTS, o), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(e), this.affixed = this.unpin = this.pinnedOffset = null, this.checkPosition()
    };
    i.VERSION = "3.3.0", i.RESET = "affix affix-top affix-bottom", i.DEFAULTS = {
        offset: 0,
        target: window
    }, i.prototype.getState = function (t, e, i, o) {
        var s = this.$target.scrollTop(), n = this.$element.offset(), r = this.$target.height();
        if (null != i && "top" == this.affixed)return i > s ? "top" : !1;
        if ("bottom" == this.affixed)return null != i ? s + this.unpin <= n.top ? !1 : "bottom" : t - o >= s + r ? !1 : "bottom";
        var a = null == this.affixed, l = a ? s : n.top, h = a ? r : e;
        return null != i && i >= l ? "top" : null != o && l + h >= t - o ? "bottom" : !1
    }, i.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset)return this.pinnedOffset;
        this.$element.removeClass(i.RESET).addClass("affix");
        var t = this.$target.scrollTop(), e = this.$element.offset();
        return this.pinnedOffset = e.top - t
    }, i.prototype.checkPositionWithEventLoop = function () {
        setTimeout(t.proxy(this.checkPosition, this), 1)
    }, i.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var e = this.$element.height(), o = this.options.offset, s = o.top, n = o.bottom, r = t("body").height();
            "object" != typeof o && (n = s = o), "function" == typeof s && (s = o.top(this.$element)), "function" == typeof n && (n = o.bottom(this.$element));
            var a = this.getState(r, e, s, n);
            if (this.affixed != a) {
                null != this.unpin && this.$element.css("top", "");
                var l = "affix" + (a ? "-" + a : ""), h = t.Event(l + ".bs.affix");
                if (this.$element.trigger(h), h.isDefaultPrevented())return;
                this.affixed = a, this.unpin = "bottom" == a ? this.getPinnedOffset() : null, this.$element.removeClass(i.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == a && this.$element.offset({top: r - e - n})
        }
    };
    var o = t.fn.affix;
    t.fn.affix = e, t.fn.affix.Constructor = i, t.fn.affix.noConflict = function () {
        return t.fn.affix = o, this
    }, t(window).on("load", function () {
        t('[data-spy="affix"]').each(function () {
            var i = t(this), o = i.data();
            o.offset = o.offset || {}, null != o.offsetBottom && (o.offset.bottom = o.offsetBottom), null != o.offsetTop && (o.offset.top = o.offsetTop), e.call(i, o)
        })
    })
}(jQuery);
;
/*!/public/vendors/html5shiv/html5shiv.js*/
!function (e, t) {
    function n() {
        var e = g.elements;
        return "string" == typeof e ? e.split(" ") : e
    }

    function a(e) {
        var t = f[e[u]];
        return t || (t = {}, h++, e[u] = h, f[h] = t), t
    }

    function r(e, n, r) {
        return n || (n = t), l ? n.createElement(e) : (r || (r = a(n)), n = r.cache[e] ? r.cache[e].cloneNode() : d.test(e) ? (r.cache[e] = r.createElem(e)).cloneNode() : r.createElem(e), n.canHaveChildren && !s.test(e) ? r.frag.appendChild(n) : n)
    }

    function c(e, t) {
        t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function (n) {
            return g.shivMethods ? r(n, e, t) : t.createElem(n)
        }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + n().join().replace(/[\w\-]+/g, function (e) {
            return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
        }) + ");return n}")(g, t.frag)
    }

    function o(e) {
        e || (e = t);
        var n = a(e);
        if (g.shivCSS && !i && !n.hasCSS) {
            var r, o = e;
            r = o.createElement("p"), o = o.getElementsByTagName("head")[0] || o.documentElement, r.innerHTML = "x<style>article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}</style>", r = o.insertBefore(r.lastChild, o.firstChild), n.hasCSS = !!r
        }
        return l || c(e, n), e
    }

    var i, l, m = e.html5 || {}, s = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, d = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, u = "_html5shiv", h = 0, f = {};
    !function () {
        try {
            var e = t.createElement("a");
            e.innerHTML = "<xyz></xyz>", i = "hidden"in e;
            var n;
            if (!(n = 1 == e.childNodes.length)) {
                t.createElement("a");
                var a = t.createDocumentFragment();
                n = "undefined" == typeof a.cloneNode || "undefined" == typeof a.createDocumentFragment || "undefined" == typeof a.createElement
            }
            l = n
        } catch (r) {
            l = i = !0
        }
    }();
    var g = {
        elements: m.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
        version: "3.7.0",
        shivCSS: !1 !== m.shivCSS,
        supportsUnknownElements: l,
        shivMethods: !1 !== m.shivMethods,
        type: "default",
        shivDocument: o,
        createElement: r,
        createDocumentFragment: function (e, r) {
            if (e || (e = t), l)return e.createDocumentFragment();
            for (var r = r || a(e), c = r.frag.cloneNode(), o = 0, i = n(), m = i.length; m > o; o++)c.createElement(i[o]);
            return c
        }
    };
    e.html5 = g, o(t)
}(this, document);
;
/*!/public/vendors/metisMenu/jquery.metisMenu.js*/
!function (e, i, t) {
    function l(i, t) {
        this.element = e(i), this.settings = e.extend({}, a, t), this._defaults = a, this._name = o, this.init()
    }

    var o = "metisMenu", a = {toggle: !0, doubleTapToGo: !1};
    l.prototype = {
        init: function () {
            var i = this.element, l = this.settings.toggle, a = this;
            this.isIE() <= 9 ? (i.find("li.active").has("ul").children("ul").collapse("show"), i.find("li").not(".active").has("ul").children("ul").collapse("hide")) : (i.find("li.active").has("ul").children("ul").addClass("collapse in"), i.find("li").not(".active").has("ul").children("ul").addClass("collapse")), a.settings.doubleTapToGo && i.find("li.active").has("ul").children("a").addClass("doubleTapToGo"), i.find("li").has("ul").children("a").on("click." + o, function (i) {
                return i.preventDefault(), a.settings.doubleTapToGo && a.doubleTapToGo(e(this)) && "#" !== e(this).attr("href") && "" !== e(this).attr("href") ? (i.stopPropagation(), void(t.location = e(this).attr("href"))) : (e(this).parent("li").toggleClass("active").children("ul").collapse("toggle"), void(l && e(this).parent("li").siblings().removeClass("active").children("ul.in").collapse("hide")))
            })
        }, isIE: function () {
            for (var e, i = 3, l = t.createElement("div"), o = l.getElementsByTagName("i"); l.innerHTML = "<!--[if gt IE " + ++i + "]><i></i><![endif]-->", o[0];)return i > 4 ? i : e
        }, doubleTapToGo: function (e) {
            var i = this.element;
            return e.hasClass("doubleTapToGo") ? (e.removeClass("doubleTapToGo"), !0) : e.parent().children("ul").length ? (i.find(".doubleTapToGo").removeClass("doubleTapToGo"), e.addClass("doubleTapToGo"), !1) : void 0
        }, remove: function () {
            this.element.off("." + o), this.element.removeData(o)
        }
    }, e.fn[o] = function (i) {
        return this.each(function () {
            var t = e(this);
            t.data(o) && t.data(o).remove(), t.data(o, new l(this, i))
        }), this
    }
}(jQuery, window, document);
;
/*!/public/vendors/pace/pace.min.js*/
(function () {
    var t, e, n, r, s, o, i, a, u, c, l, p, h, g, d, f, m, y, v, w, P, b, S, k, q, L, x, R, T, E, M, j, A, N, O, _, F, C, U, W, X, D, H, I, z, G, B, J, K = [].slice, Q = {}.hasOwnProperty, V = function (t, e) {
        function n() {
            this.constructor = t
        }

        for (var r in e)Q.call(e, r) && (t[r] = e[r]);
        return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
    }, Y = [].indexOf || function (t) {
            for (var e = 0, n = this.length; n > e; e++)if (e in this && this[e] === t)return e;
            return -1
        };
    for (w = {
        catchupTime: 500,
        initialRate: .03,
        minTime: 500,
        ghostTime: 500,
        maxProgressPerFrame: 10,
        easeFactor: 1.25,
        startOnPageLoad: !0,
        restartOnPushState: !0,
        restartOnRequestAfter: 500,
        target: "body",
        elements: {checkInterval: 100, selectors: ["body"]},
        eventLag: {minSamples: 10, sampleCount: 3, lagThreshold: 3},
        ajax: {trackMethods: ["GET"], trackWebSockets: !0, ignoreURLs: []}
    }, R = function () {
        var t;
        return null != (t = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance.now() : void 0) ? t : +new Date
    }, E = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, v = window.cancelAnimationFrame || window.mozCancelAnimationFrame, null == E && (E = function (t) {
        return setTimeout(t, 50)
    }, v = function (t) {
        return clearTimeout(t)
    }), j = function (t) {
        var e, n;
        return e = R(), (n = function () {
            var r;
            return r = R() - e, r >= 33 ? (e = R(), t(r, function () {
                return E(n)
            })) : setTimeout(n, 33 - r)
        })()
    }, M = function () {
        var t, e, n;
        return n = arguments[0], e = arguments[1], t = 3 <= arguments.length ? K.call(arguments, 2) : [], "function" == typeof n[e] ? n[e].apply(n, t) : n[e]
    }, P = function () {
        var t, e, n, r, s, o, i;
        for (e = arguments[0], r = 2 <= arguments.length ? K.call(arguments, 1) : [], o = 0, i = r.length; i > o; o++)if (n = r[o])for (t in n)Q.call(n, t) && (s = n[t], null != e[t] && "object" == typeof e[t] && null != s && "object" == typeof s ? P(e[t], s) : e[t] = s);
        return e
    }, f = function (t) {
        var e, n, r, s, o;
        for (n = e = 0, s = 0, o = t.length; o > s; s++)r = t[s], n += Math.abs(r), e++;
        return n / e
    }, S = function (t, e) {
        var n, r, s;
        if (null == t && (t = "options"), null == e && (e = !0), s = document.querySelector("[data-pace-" + t + "]")) {
            if (n = s.getAttribute("data-pace-" + t), !e)return n;
            try {
                return JSON.parse(n)
            } catch (o) {
                return r = o, "undefined" != typeof console && null !== console ? console.error("Error parsing inline pace options", r) : void 0
            }
        }
    }, i = function () {
        function t() {
        }

        return t.prototype.on = function (t, e, n, r) {
            var s;
            return null == r && (r = !1), null == this.bindings && (this.bindings = {}), null == (s = this.bindings)[t] && (s[t] = []), this.bindings[t].push({
                handler: e,
                ctx: n,
                once: r
            })
        }, t.prototype.once = function (t, e, n) {
            return this.on(t, e, n, !0)
        }, t.prototype.off = function (t, e) {
            var n, r, s;
            if (null != (null != (r = this.bindings) ? r[t] : void 0)) {
                if (null == e)return delete this.bindings[t];
                for (n = 0, s = []; n < this.bindings[t].length;)s.push(this.bindings[t][n].handler === e ? this.bindings[t].splice(n, 1) : n++);
                return s
            }
        }, t.prototype.trigger = function () {
            var t, e, n, r, s, o, i, a, u;
            if (n = arguments[0], t = 2 <= arguments.length ? K.call(arguments, 1) : [], null != (i = this.bindings) ? i[n] : void 0) {
                for (s = 0, u = []; s < this.bindings[n].length;)a = this.bindings[n][s], r = a.handler, e = a.ctx, o = a.once, r.apply(null != e ? e : this, t), u.push(o ? this.bindings[n].splice(s, 1) : s++);
                return u
            }
        }, t
    }(), null == window.Pace && (window.Pace = {}), P(Pace, i.prototype), T = Pace.options = P({}, w, window.paceOptions, S()), G = ["ajax", "document", "eventLag", "elements"], D = 0, I = G.length; I > D; D++)_ = G[D], T[_] === !0 && (T[_] = w[_]);
    u = function (t) {
        function e() {
            return B = e.__super__.constructor.apply(this, arguments)
        }

        return V(e, t), e
    }(Error), e = function () {
        function t() {
            this.progress = 0
        }

        return t.prototype.getElement = function () {
            var t;
            if (null == this.el) {
                if (t = document.querySelector(T.target), !t)throw new u;
                this.el = document.createElement("div"), this.el.className = "pace pace-active", document.body.className = document.body.className.replace(/pace-done/g, ""), document.body.className += " pace-running", this.el.innerHTML = '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>', null != t.firstChild ? t.insertBefore(this.el, t.firstChild) : t.appendChild(this.el)
            }
            return this.el
        }, t.prototype.finish = function () {
            var t;
            return t = this.getElement(), t.className = t.className.replace("pace-active", ""), t.className += " pace-inactive", document.body.className = document.body.className.replace("pace-running", ""), document.body.className += " pace-done"
        }, t.prototype.update = function (t) {
            return this.progress = t, this.render()
        }, t.prototype.destroy = function () {
            try {
                this.getElement().parentNode.removeChild(this.getElement())
            } catch (t) {
                u = t
            }
            return this.el = void 0
        }, t.prototype.render = function () {
            var t, e;
            return null == document.querySelector(T.target) ? !1 : (t = this.getElement(), t.children[0].style.width = "" + this.progress + "%", (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) && (t.children[0].setAttribute("data-progress-text", "" + (0 | this.progress) + "%"), this.progress >= 100 ? e = "99" : (e = this.progress < 10 ? "0" : "", e += 0 | this.progress), t.children[0].setAttribute("data-progress", "" + e)), this.lastRenderedProgress = this.progress)
        }, t.prototype.done = function () {
            return this.progress >= 100
        }, t
    }(), a = function () {
        function t() {
            this.bindings = {}
        }

        return t.prototype.trigger = function (t, e) {
            var n, r, s, o, i;
            if (null != this.bindings[t]) {
                for (o = this.bindings[t], i = [], r = 0, s = o.length; s > r; r++)n = o[r], i.push(n.call(this, e));
                return i
            }
        }, t.prototype.on = function (t, e) {
            var n;
            return null == (n = this.bindings)[t] && (n[t] = []), this.bindings[t].push(e)
        }, t
    }(), X = window.XMLHttpRequest, W = window.XDomainRequest, U = window.WebSocket, b = function (t, e) {
        var n, r, s, o;
        o = [];
        for (r in e.prototype)try {
            s = e.prototype[r], o.push(null == t[r] && "function" != typeof s ? t[r] = s : void 0)
        } catch (i) {
            n = i
        }
        return o
    }, L = [], Pace.ignore = function () {
        var t, e, n;
        return e = arguments[0], t = 2 <= arguments.length ? K.call(arguments, 1) : [], L.unshift("ignore"), n = e.apply(null, t), L.shift(), n
    }, Pace.track = function () {
        var t, e, n;
        return e = arguments[0], t = 2 <= arguments.length ? K.call(arguments, 1) : [], L.unshift("track"), n = e.apply(null, t), L.shift(), n
    }, O = function (t) {
        var e;
        if (null == t && (t = "GET"), "track" === L[0])return "force";
        if (!L.length && T.ajax) {
            if ("socket" === t && T.ajax.trackWebSockets)return !0;
            if (e = t.toUpperCase(), Y.call(T.ajax.trackMethods, e) >= 0)return !0
        }
        return !1
    }, c = function (t) {
        function e() {
            var t, n = this;
            e.__super__.constructor.apply(this, arguments), t = function (t) {
                var e;
                return e = t.open, t.open = function (r, s) {
                    return O(r) && n.trigger("request", {type: r, url: s, request: t}), e.apply(t, arguments)
                }
            }, window.XMLHttpRequest = function (e) {
                var n;
                return n = new X(e), t(n), n
            }, b(window.XMLHttpRequest, X), null != W && (window.XDomainRequest = function () {
                var e;
                return e = new W, t(e), e
            }, b(window.XDomainRequest, W)), null != U && T.ajax.trackWebSockets && (window.WebSocket = function (t, e) {
                var r;
                return r = null != e ? new U(t, e) : new U(t), O("socket") && n.trigger("request", {
                    type: "socket",
                    url: t,
                    protocols: e,
                    request: r
                }), r
            }, b(window.WebSocket, U))
        }

        return V(e, t), e
    }(a), H = null, k = function () {
        return null == H && (H = new c), H
    }, N = function (t) {
        var e, n, r, s;
        for (s = T.ajax.ignoreURLs, n = 0, r = s.length; r > n; n++)if (e = s[n], "string" == typeof e) {
            if (-1 !== t.indexOf(e))return !0
        } else if (e.test(t))return !0;
        return !1
    }, k().on("request", function (e) {
        var n, r, s, o, i;
        return o = e.type, s = e.request, i = e.url, N(i) ? void 0 : Pace.running || T.restartOnRequestAfter === !1 && "force" !== O(o) ? void 0 : (r = arguments, n = T.restartOnRequestAfter || 0, "boolean" == typeof n && (n = 0), setTimeout(function () {
            var e, n, i, a, u, c;
            if (e = "socket" === o ? s.readyState < 2 : 0 < (a = s.readyState) && 4 > a) {
                for (Pace.restart(), u = Pace.sources, c = [], n = 0, i = u.length; i > n; n++) {
                    if (_ = u[n], _ instanceof t) {
                        _.watch.apply(_, r);
                        break
                    }
                    c.push(void 0)
                }
                return c
            }
        }, n))
    }), t = function () {
        function t() {
            var t = this;
            this.elements = [], k().on("request", function () {
                return t.watch.apply(t, arguments)
            })
        }

        return t.prototype.watch = function (t) {
            var e, n, r, s;
            return r = t.type, e = t.request, s = t.url, N(s) ? void 0 : (n = "socket" === r ? new h(e) : new g(e), this.elements.push(n))
        }, t
    }(), g = function () {
        function t(t) {
            var e, n, r, s, o, i, a = this;
            if (this.progress = 0, null != window.ProgressEvent)for (n = null, t.addEventListener("progress", function (t) {
                return a.progress = t.lengthComputable ? 100 * t.loaded / t.total : a.progress + (100 - a.progress) / 2
            }), i = ["load", "abort", "timeout", "error"], r = 0, s = i.length; s > r; r++)e = i[r], t.addEventListener(e, function () {
                return a.progress = 100
            }); else o = t.onreadystatechange, t.onreadystatechange = function () {
                var e;
                return 0 === (e = t.readyState) || 4 === e ? a.progress = 100 : 3 === t.readyState && (a.progress = 50), "function" == typeof o ? o.apply(null, arguments) : void 0
            }
        }

        return t
    }(), h = function () {
        function t(t) {
            var e, n, r, s, o = this;
            for (this.progress = 0, s = ["error", "open"], n = 0, r = s.length; r > n; n++)e = s[n], t.addEventListener(e, function () {
                return o.progress = 100
            })
        }

        return t
    }(), r = function () {
        function t(t) {
            var e, n, r, o;
            for (null == t && (t = {}), this.elements = [], null == t.selectors && (t.selectors = []), o = t.selectors, n = 0, r = o.length; r > n; n++)e = o[n], this.elements.push(new s(e))
        }

        return t
    }(), s = function () {
        function t(t) {
            this.selector = t, this.progress = 0, this.check()
        }

        return t.prototype.check = function () {
            var t = this;
            return document.querySelector(this.selector) ? this.done() : setTimeout(function () {
                return t.check()
            }, T.elements.checkInterval)
        }, t.prototype.done = function () {
            return this.progress = 100
        }, t
    }(), n = function () {
        function t() {
            var t, e, n = this;
            this.progress = null != (e = this.states[document.readyState]) ? e : 100, t = document.onreadystatechange, document.onreadystatechange = function () {
                return null != n.states[document.readyState] && (n.progress = n.states[document.readyState]), "function" == typeof t ? t.apply(null, arguments) : void 0
            }
        }

        return t.prototype.states = {loading: 0, interactive: 50, complete: 100}, t
    }(), o = function () {
        function t() {
            var t, e, n, r, s, o = this;
            this.progress = 0, t = 0, s = [], r = 0, n = R(), e = setInterval(function () {
                var i;
                return i = R() - n - 50, n = R(), s.push(i), s.length > T.eventLag.sampleCount && s.shift(), t = f(s), ++r >= T.eventLag.minSamples && t < T.eventLag.lagThreshold ? (o.progress = 100, clearInterval(e)) : o.progress = 100 * (3 / (t + 3))
            }, 50)
        }

        return t
    }(), p = function () {
        function t(t) {
            this.source = t, this.last = this.sinceLastUpdate = 0, this.rate = T.initialRate, this.catchup = 0, this.progress = this.lastProgress = 0, null != this.source && (this.progress = M(this.source, "progress"))
        }

        return t.prototype.tick = function (t, e) {
            var n;
            return null == e && (e = M(this.source, "progress")), e >= 100 && (this.done = !0), e === this.last ? this.sinceLastUpdate += t : (this.sinceLastUpdate && (this.rate = (e - this.last) / this.sinceLastUpdate), this.catchup = (e - this.progress) / T.catchupTime, this.sinceLastUpdate = 0, this.last = e), e > this.progress && (this.progress += this.catchup * t), n = 1 - Math.pow(this.progress / 100, T.easeFactor), this.progress += n * this.rate * t, this.progress = Math.min(this.lastProgress + T.maxProgressPerFrame, this.progress), this.progress = Math.max(0, this.progress), this.progress = Math.min(100, this.progress), this.lastProgress = this.progress, this.progress
        }, t
    }(), F = null, A = null, m = null, C = null, d = null, y = null, Pace.running = !1, q = function () {
        return T.restartOnPushState ? Pace.restart() : void 0
    }, null != window.history.pushState && (z = window.history.pushState, window.history.pushState = function () {
        return q(), z.apply(window.history, arguments)
    }), null != window.history.replaceState && (J = window.history.replaceState, window.history.replaceState = function () {
        return q(), J.apply(window.history, arguments)
    }), l = {ajax: t, elements: r, document: n, eventLag: o}, (x = function () {
        var t, n, r, s, o, i, a, u;
        for (Pace.sources = F = [], i = ["ajax", "elements", "document", "eventLag"], n = 0, s = i.length; s > n; n++)t = i[n], T[t] !== !1 && F.push(new l[t](T[t]));
        for (u = null != (a = T.extraSources) ? a : [], r = 0, o = u.length; o > r; r++)_ = u[r], F.push(new _(T));
        return Pace.bar = m = new e, A = [], C = new p
    })(), Pace.stop = function () {
        return Pace.trigger("stop"), Pace.running = !1, m.destroy(), y = !0, null != d && ("function" == typeof v && v(d), d = null), x()
    }, Pace.restart = function () {
        return Pace.trigger("restart"), Pace.stop(), Pace.start()
    }, Pace.go = function () {
        var t;
        return Pace.running = !0, m.render(), t = R(), y = !1, d = j(function (e, n) {
            var r, s, o, i, a, u, c, l, h, g, d, f, v, w, P, b;
            for (l = 100 - m.progress, s = d = 0, o = !0, u = f = 0, w = F.length; w > f; u = ++f)for (_ = F[u], g = null != A[u] ? A[u] : A[u] = [], a = null != (b = _.elements) ? b : [_], c = v = 0, P = a.length; P > v; c = ++v)i = a[c], h = null != g[c] ? g[c] : g[c] = new p(i), o &= h.done, h.done || (s++, d += h.tick(e));
            return r = d / s, m.update(C.tick(e, r)), m.done() || o || y ? (m.update(100), Pace.trigger("done"), setTimeout(function () {
                return m.finish(), Pace.running = !1, Pace.trigger("hide")
            }, Math.max(T.ghostTime, Math.max(T.minTime - (R() - t), 0)))) : n()
        })
    }, Pace.start = function (t) {
        P(T, t), Pace.running = !0;
        try {
            m.render()
        } catch (e) {
            u = e
        }
        return document.querySelector(".pace") ? (Pace.trigger("start"), Pace.go()) : setTimeout(Pace.start, 50)
    }, "function" == typeof define && define.amd ? define(function () {
        return Pace
    }) : "object" == typeof exports ? module.exports = Pace : T.startOnPageLoad && Pace.start()
}).call(this);
;
/*!/public/vendors/respond/respond.min.js*/
!function (e) {
    "use strict";
    e.matchMedia = e.matchMedia || function (e) {
        var t, n = e.documentElement, a = n.firstElementChild || n.firstChild, r = e.createElement("body"), s = e.createElement("div");
        return s.id = "mq-test-1", s.style.cssText = "position:absolute;top:-100em", r.style.background = "none", r.appendChild(s), function (e) {
            return s.innerHTML = '&shy;<style media="' + e + '"> #mq-test-1 { width: 42px; }</style>', n.insertBefore(r, a), t = 42 === s.offsetWidth, n.removeChild(r), {
                matches: t,
                media: e
            }
        }
    }(e.document)
}(this), function (e) {
    "use strict";
    function t() {
        w(!0)
    }

    var n = {};
    e.respond = n, n.update = function () {
    };
    var a = [], r = function () {
        var t = !1;
        try {
            t = new e.XMLHttpRequest
        } catch (n) {
            t = new e.ActiveXObject("Microsoft.XMLHTTP")
        }
        return function () {
            return t
        }
    }(), s = function (e, t) {
        var n = r();
        n && (n.open("GET", e, !0), n.onreadystatechange = function () {
            4 !== n.readyState || 200 !== n.status && 304 !== n.status || t(n.responseText)
        }, 4 !== n.readyState && n.send(null))
    }, i = function (e) {
        return e.replace(n.regex.minmaxwh, "").match(n.regex.other)
    };
    if (n.ajax = s, n.queue = a, n.unsupportedmq = i, n.regex = {
            media: /@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,
            keyframes: /@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,
            comments: /\/\*[^*]*\*+([^/][^*]*\*+)*\//gi,
            urls: /(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,
            findStyles: /@media *([^\{]+)\{([\S\s]+?)$/,
            only: /(only\s+)?([a-zA-Z]+)\s?/,
            minw: /\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,
            maxw: /\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,
            minmaxwh: /\(\s*m(in|ax)\-(height|width)\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/gi,
            other: /\([^\)]*\)/g
        }, n.mediaQueriesSupported = e.matchMedia && null !== e.matchMedia("only all") && e.matchMedia("only all").matches, !n.mediaQueriesSupported) {
        var o, l, m, d = e.document, h = d.documentElement, u = [], c = [], f = [], p = {}, g = 30, y = d.getElementsByTagName("head")[0] || h, x = d.getElementsByTagName("base")[0], v = y.getElementsByTagName("link"), E = function () {
            var e, t = d.createElement("div"), n = d.body, a = h.style.fontSize, r = n && n.style.fontSize, s = !1;
            return t.style.cssText = "position:absolute;font-size:1em;width:1em", n || (n = s = d.createElement("body"), n.style.background = "none"), h.style.fontSize = "100%", n.style.fontSize = "100%", n.appendChild(t), s && h.insertBefore(n, h.firstChild), e = t.offsetWidth, s ? h.removeChild(n) : n.removeChild(t), h.style.fontSize = a, r && (n.style.fontSize = r), e = m = parseFloat(e)
        }, w = function (t) {
            var n = "clientWidth", a = h[n], r = "CSS1Compat" === d.compatMode && a || d.body[n] || a, s = {}, i = v[v.length - 1], p = (new Date).getTime();
            if (t && o && g > p - o)return e.clearTimeout(l), void(l = e.setTimeout(w, g));
            o = p;
            for (var x in u)if (u.hasOwnProperty(x)) {
                var S = u[x], T = S.minw, C = S.maxw, b = null === T, $ = null === C, z = "em";
                T && (T = parseFloat(T) * (T.indexOf(z) > -1 ? m || E() : 1)), C && (C = parseFloat(C) * (C.indexOf(z) > -1 ? m || E() : 1)), S.hasquery && (b && $ || !(b || r >= T) || !($ || C >= r)) || (s[S.media] || (s[S.media] = []), s[S.media].push(c[S.rules]))
            }
            for (var M in f)f.hasOwnProperty(M) && f[M] && f[M].parentNode === y && y.removeChild(f[M]);
            f.length = 0;
            for (var R in s)if (s.hasOwnProperty(R)) {
                var O = d.createElement("style"), k = s[R].join("\n");
                O.type = "text/css", O.media = R, y.insertBefore(O, i.nextSibling), O.styleSheet ? O.styleSheet.cssText = k : O.appendChild(d.createTextNode(k)), f.push(O)
            }
        }, S = function (e, t, a) {
            var r = e.replace(n.regex.comments, "").replace(n.regex.keyframes, "").match(n.regex.media), s = r && r.length || 0;
            t = t.substring(0, t.lastIndexOf("/"));
            var o = function (e) {
                return e.replace(n.regex.urls, "$1" + t + "$2$3")
            }, l = !s && a;
            t.length && (t += "/"), l && (s = 1);
            for (var m = 0; s > m; m++) {
                var d, h, f, p;
                l ? (d = a, c.push(o(e))) : (d = r[m].match(n.regex.findStyles) && RegExp.$1, c.push(RegExp.$2 && o(RegExp.$2))), f = d.split(","), p = f.length;
                for (var g = 0; p > g; g++)h = f[g], i(h) || u.push({
                    media: h.split("(")[0].match(n.regex.only) && RegExp.$2 || "all",
                    rules: c.length - 1,
                    hasquery: h.indexOf("(") > -1,
                    minw: h.match(n.regex.minw) && parseFloat(RegExp.$1) + (RegExp.$2 || ""),
                    maxw: h.match(n.regex.maxw) && parseFloat(RegExp.$1) + (RegExp.$2 || "")
                })
            }
            w()
        }, T = function () {
            if (a.length) {
                var t = a.shift();
                s(t.href, function (n) {
                    S(n, t.href, t.media), p[t.href] = !0, e.setTimeout(function () {
                        T()
                    }, 0)
                })
            }
        }, C = function () {
            for (var t = 0; t < v.length; t++) {
                var n = v[t], r = n.href, s = n.media, i = n.rel && "stylesheet" === n.rel.toLowerCase();
                r && i && !p[r] && (n.styleSheet && n.styleSheet.rawCssText ? (S(n.styleSheet.rawCssText, r, s), p[r] = !0) : (!/^([a-zA-Z:]*\/\/)/.test(r) && !x || r.replace(RegExp.$1, "").split("/")[0] === e.location.host) && ("//" === r.substring(0, 2) && (r = e.location.protocol + r), a.push({
                    href: r,
                    media: s
                })))
            }
            T()
        };
        C(), n.update = C, n.getEmValue = E, e.addEventListener ? e.addEventListener("resize", t, !1) : e.attachEvent && e.attachEvent("onresize", t)
    }
}(this);
;
/*!/public/vendors/slimscroll/jquery.slimscroll.min.js*/
!function (e) {
    jQuery.fn.extend({
        slimScroll: function (i) {
            var o = e.extend({
                width: "auto",
                height: "250px",
                size: "7px",
                color: "#000",
                position: "right",
                distance: "1px",
                start: "top",
                opacity: .4,
                alwaysVisible: !1,
                disableFadeOut: !1,
                railVisible: !1,
                railColor: "#333",
                railOpacity: .2,
                railDraggable: !0,
                railClass: "slimScrollRail",
                barClass: "slimScrollBar",
                wrapperClass: "slimScrollDiv",
                allowPageScroll: !1,
                wheelStep: 20,
                touchScrollStep: 200,
                borderRadius: "7px",
                railBorderRadius: "7px"
            }, i);
            return this.each(function () {
                function s(t) {
                    t = t || window.event;
                    var i = 0;
                    t.wheelDelta && (i = -t.wheelDelta / 120), t.detail && (i = t.detail / 3), e(t.target || t.srcTarget || t.srcElement).closest("." + o.wrapperClass).is(y.parent()) && r(i, !0), t.preventDefault && !m && t.preventDefault(), m || (t.returnValue = !1)
                }

                function r(e, t, i) {
                    m = !1;
                    var s = e, r = y.outerHeight() - C.outerHeight();
                    t && (s = parseInt(C.css("top")) + e * parseInt(o.wheelStep) / 100 * C.outerHeight(), s = Math.min(Math.max(s, 0), r), s = e > 0 ? Math.ceil(s) : Math.floor(s), C.css({top: s + "px"})), v = parseInt(C.css("top")) / (y.outerHeight() - C.outerHeight()), s = v * (y[0].scrollHeight - y.outerHeight()), i && (s = e, e = s / y[0].scrollHeight * y.outerHeight(), e = Math.min(Math.max(e, 0), r), C.css({top: e + "px"})), y.scrollTop(s), y.trigger("slimscrolling", ~~s), n(), c()
                }

                function a() {
                    window.addEventListener ? (this.addEventListener("DOMMouseScroll", s, !1), this.addEventListener("mousewheel", s, !1)) : document.attachEvent("onmousewheel", s)
                }

                function l() {
                    f = Math.max(y.outerHeight() / y[0].scrollHeight * y.outerHeight(), w), C.css({height: f + "px"});
                    var e = f == y.outerHeight() ? "none" : "block";
                    C.css({display: e})
                }

                function n() {
                    l(), clearTimeout(p), v == ~~v ? (m = o.allowPageScroll, b != v && y.trigger("slimscroll", 0 == ~~v ? "top" : "bottom")) : m = !1, b = v, f >= y.outerHeight() ? m = !0 : (C.stop(!0, !0).fadeIn("fast"), o.railVisible && H.stop(!0, !0).fadeIn("fast"))
                }

                function c() {
                    o.alwaysVisible || (p = setTimeout(function () {
                        o.disableFadeOut && h || u || d || (C.fadeOut("slow"), H.fadeOut("slow"))
                    }, 1e3))
                }

                var h, u, d, p, g, f, v, b, w = 30, m = !1, y = e(this);
                if (y.parent().hasClass(o.wrapperClass)) {
                    var x = y.scrollTop(), C = y.parent().find("." + o.barClass), H = y.parent().find("." + o.railClass);
                    if (l(), e.isPlainObject(i)) {
                        if ("height"in i && "auto" == i.height) {
                            y.parent().css("height", "auto"), y.css("height", "auto");
                            var S = y.parent().parent().height();
                            y.parent().css("height", S), y.css("height", S)
                        }
                        if ("scrollTo"in i)x = parseInt(o.scrollTo); else if ("scrollBy"in i)x += parseInt(o.scrollBy); else if ("destroy"in i)return C.remove(), H.remove(), void y.unwrap();
                        r(x, !1, !0)
                    }
                } else {
                    o.height = "auto" == i.height ? y.parent().height() : i.height, x = e("<div></div>").addClass(o.wrapperClass).css({
                        position: "relative",
                        overflow: "hidden",
                        width: o.width,
                        height: o.height
                    }), y.css({overflow: "hidden", width: o.width, height: o.height});
                    var H = e("<div></div>").addClass(o.railClass).css({
                        width: o.size,
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        display: o.alwaysVisible && o.railVisible ? "block" : "none",
                        "border-radius": o.railBorderRadius,
                        background: o.railColor,
                        opacity: o.railOpacity,
                        zIndex: 90
                    }), C = e("<div></div>").addClass(o.barClass).css({
                        background: o.color,
                        width: o.size,
                        position: "absolute",
                        top: 0,
                        opacity: o.opacity,
                        display: o.alwaysVisible ? "block" : "none",
                        "border-radius": o.borderRadius,
                        BorderRadius: o.borderRadius,
                        MozBorderRadius: o.borderRadius,
                        WebkitBorderRadius: o.borderRadius,
                        zIndex: 99
                    }), S = "right" == o.position ? {right: o.distance} : {left: o.distance};
                    H.css(S), C.css(S), y.wrap(x), y.parent().append(C), y.parent().append(H), o.railDraggable && C.bind("mousedown", function (i) {
                        var o = e(document);
                        return d = !0, t = parseFloat(C.css("top")), pageY = i.pageY, o.bind("mousemove.slimscroll", function (e) {
                            currTop = t + e.pageY - pageY, C.css("top", currTop), r(0, C.position().top, !1)
                        }), o.bind("mouseup.slimscroll", function () {
                            d = !1, c(), o.unbind(".slimscroll")
                        }), !1
                    }).bind("selectstart.slimscroll", function (e) {
                        return e.stopPropagation(), e.preventDefault(), !1
                    }), H.hover(function () {
                        n()
                    }, function () {
                        c()
                    }), C.hover(function () {
                        u = !0
                    }, function () {
                        u = !1
                    }), y.hover(function () {
                        h = !0, n(), c()
                    }, function () {
                        h = !1, c()
                    }), y.bind("touchstart", function (e) {
                        e.originalEvent.touches.length && (g = e.originalEvent.touches[0].pageY)
                    }), y.bind("touchmove", function (e) {
                        m || e.originalEvent.preventDefault(), e.originalEvent.touches.length && (r((g - e.originalEvent.touches[0].pageY) / o.touchScrollStep, !0), g = e.originalEvent.touches[0].pageY)
                    }), l(), "bottom" === o.start ? (C.css({top: y.outerHeight() - C.outerHeight()}), r(0, !0)) : "top" !== o.start && (r(e(o.start).position().top, null, !0), o.alwaysVisible || C.hide()), a()
                }
            }), this
        }
    }), jQuery.fn.extend({slimscroll: jQuery.fn.slimScroll})
}(jQuery);
;
/*!/public/vendors/echart/echarts.js*/
var define, require, esl;
!function (t) {
    function e(t, e) {
        function o(t) {
            0 === t.indexOf(".") && n.push(t)
        }

        var n = [];
        if ("string" == typeof t ? o(t) : O(t, function (t) {
                o(t)
            }), n.length > 0)throw new Error("[REQUIRE_FATAL]Relative ID is not allowed in global require: " + n.join(", "));
        var r = U.waitSeconds;
        return r && t instanceof Array && (P && clearTimeout(P), P = setTimeout(i, 1e3 * r)), Y(t, e)
    }

    function i() {
        function t(s, a) {
            if (!r[s] && !d(s, B)) {
                r[s] = 1, d(s, F) || o[s] || (o[s] = 1, e.push(s));
                var h = R[s];
                h ? a && (o[s] || (o[s] = 1, e.push(s)), O(h.depMs, function (e) {
                    t(e.absId, e.hard)
                })) : n[s] || (n[s] = 1, i.push(s))
            }
        }

        var e = [], i = [], o = {}, n = {}, r = {};
        for (var s in D)t(s, 1);
        if (e.length || i.length)throw new Error("[MODULE_TIMEOUT]Hang( " + (e.join(", ") || "none") + " ) Miss( " + (i.join(", ") || "none") + " )")
    }

    function o(t, e, i) {
        if (null == i && (null == e ? (i = t, t = null) : (i = e, e = null, t instanceof Array && (e = t, t = null))), null != i) {
            var o = window.opera;
            if (!t && document.attachEvent && (!o || "[object Opera]" !== o.toString())) {
                var n = L();
                t = n && n.getAttribute("data-require-id")
            }
            t ? (r(t, e, i), W && clearTimeout(W)) : X[0] = {deps: e, factory: i}
        }
    }

    function n() {
        var t = U.config[this.id];
        return t && "object" == typeof t ? t : {}
    }

    function r(t, e, i) {
        R[t] || (R[t] = {
            id: t,
            depsDec: e,
            deps: e || ["require", "exports", "module"],
            factoryDeps: [],
            factory: i,
            exports: {},
            config: n,
            state: H,
            require: C(t),
            depMs: [],
            depMkv: {},
            depRs: [],
            depPMs: []
        })
    }

    function s(t) {
        var e = R[t];
        if (e && !d(t, N)) {
            var i = e.deps, o = e.factory, n = 0;
            "function" == typeof o && (n = Math.min(o.length, i.length), !e.depsDec && o.toString().replace(/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm, "").replace(/require\(\s*(['"'])([^'"]+)\1\s*\)/g, function (t, e, o) {
                i.push(o)
            }));
            var r = [];
            O(i, function (i, o) {
                var s, a, h = E(i), l = z(h.mod, t);
                l && !G[l] ? (h.res && (a = {
                    id: i,
                    mod: l,
                    res: h.res
                }, D[l] = 1, e.depPMs.push(l), e.depRs.push(a)), s = e.depMkv[l], s || (s = {
                    id: h.mod,
                    absId: l,
                    hard: n > o
                }, e.depMs.push(s), e.depMkv[l] = s, r.push(l))) : s = {absId: l}, n > o && e.factoryDeps.push(a || s)
            }), e.state = N, l(t), _(r)
        }
    }

    function a() {
        for (var t in D)h(t), c(t)
    }

    function h(t) {
        function e(t) {
            if (!d(t, N))return !1;
            if (d(t, F) || i[t])return !0;
            i[t] = 1;
            var o = R[t], n = !0;
            return O(o.depMs, function (t) {
                return n = e(t.absId)
            }), n && O(o.depRs, function (t) {
                return n = !(!t.absId || !d(t.absId, B))
            }), n && (o.state = F), n
        }

        var i = {};
        e(t)
    }

    function l(e) {
        function i() {
            if (!o && n.state === F) {
                o = 1;
                var i = 1, r = [];
                if (O(n.factoryDeps, function (t) {
                        var e = t.absId;
                        return G[e] || (c(e), d(e, B)) ? void r.push(e) : (i = 0, !1)
                    }), i) {
                    try {
                        var s = u(r, {
                            require: n.require,
                            exports: n.exports,
                            module: n
                        }), a = n.factory, h = "function" == typeof a ? a.apply(t, s) : a;
                        null != h && (n.exports = h), n.invokeFactory = null, delete D[e]
                    } catch (l) {
                        if (o = 0, /^\[MODULE_MISS\]"([^"]+)/.test(l.message)) {
                            var p = n.depMkv[RegExp.$1];
                            return void(p && (p.hard = 1))
                        }
                        throw l
                    }
                    f(e)
                }
            }
        }

        var o, n = R[e];
        n.invokeFactory = i, O(n.depPMs, function (t) {
            p(t, function () {
                O(n.depRs, function (i) {
                    i.absId || i.mod !== t || (i.absId = z(i.id, e), _([i.absId], a))
                })
            })
        })
    }

    function d(t, e) {
        return R[t] && R[t].state >= e
    }

    function c(t) {
        var e = R[t];
        e && e.invokeFactory && e.invokeFactory()
    }

    function u(t, e) {
        var i = [];
        return O(t, function (t, o) {
            i[o] = e[t] || g(t)
        }), i
    }

    function p(t, e) {
        if (d(t, B))return void e();
        var i = q[t];
        i || (i = q[t] = []), i.push(e)
    }

    function f(t) {
        var e = q[t] || [], i = R[t];
        i.state = B;
        for (var o = e.length; o--;)e[o]();
        e.length = 0, delete q[t]
    }

    function g(t) {
        return d(t, B) ? R[t].exports : null
    }

    function m(t) {
        O(X, function (e) {
            r(t, e.deps, e.factory)
        }), X.length = 0, s(t)
    }

    function _(e, i, o, n) {
        function r() {
            if (!h) {
                var o = 1;
                O(e, function (t) {
                    return G[t] ? void 0 : o = !!d(t, B)
                }), o && (h = 1, "function" == typeof i && i.apply(t, u(e, G)))
            }
        }

        if ("string" == typeof e) {
            if (c(e), !d(e, B))throw new Error('[MODULE_MISS]"' + e + '" is not exists!');
            return g(e)
        }
        n = n || {};
        var h = 0;
        e instanceof Array && (r(), h || (O(e, function (t) {
            G[t] || d(t, B) || (p(t, r), n[t] || (t.indexOf("!") > 0 ? v : y)(t, o), s(t))
        }), a()))
    }

    function y(t) {
        function e() {
            var e = i.readyState;
            if ("undefined" == typeof e || /^(loaded|complete)$/.test(e)) {
                i.onload = i.onreadystatechange = null, i = null, m(t);
                for (var o in D)s(o);
                a()
            }
        }

        if (!V[t] && !R[t]) {
            V[t] = 1;
            var i = document.createElement("script");
            i.setAttribute("data-require-id", t), i.src = S(t + ".js"), i.async = !0, i.readyState ? i.onreadystatechange = e : i.onload = e, M(i)
        }
    }

    function v(t, e) {
        function i(e) {
            s.exports = e || !0, f(t)
        }

        function o(o) {
            var s = e ? R[e].require : Y;
            o.load(r.res, s, i, n.call({id: t}))
        }

        if (!R[t]) {
            var r = E(t), s = {id: t, state: N};
            R[t] = s, i.fromText = function (t, e) {
                D[t] = 1, new Function(e)(), m(t)
            }, o(g(r.mod))
        }
    }

    function x(t, e) {
        var i = A(t, 1, e);
        return i.sort(I), i
    }

    function b() {
        U.baseUrl = U.baseUrl.replace(/\/$/, "") + "/", Z = x(U.paths), j = x(U.map, 1), O(j, function (t) {
            t.v = x(t.v)
        }), Q = [], O(U.packages, function (t) {
            var e = t;
            "string" == typeof t && (e = {
                name: t.split("/")[0],
                location: t,
                main: "main"
            }), e.location = e.location || e.name, e.main = (e.main || "main").replace(/\.js$/i, ""), e.reg = k(e.name), Q.push(e)
        }), Q.sort(I), K = x(U.urlArgs, 1), $ = x(U.noRequests), O($, function (t) {
            var e = t.v, i = {};
            t.v = i, e instanceof Array || (e = [e]), O(e, function (t) {
                i[t] = 1
            })
        })
    }

    function T(t, e, i) {
        O(e, function (e) {
            return e.reg.test(t) ? (i(e.v, e.k, e), !1) : void 0
        })
    }

    function S(t) {
        var e = /(\.[a-z0-9]+)$/i, i = /(\?[^#]*)$/, o = "", n = t, r = "";
        i.test(t) && (r = RegExp.$1, t = t.replace(i, "")), e.test(t) && (o = RegExp.$1, n = t.replace(e, ""));
        var s, a = n;
        return T(n, Z, function (t, e) {
            a = a.replace(e, t), s = 1
        }), s || T(n, Q, function (t, e, i) {
            a = a.replace(i.name, i.location)
        }), /^([a-z]{2,10}:\/)?\//i.test(a) || (a = U.baseUrl + a), a += o + r, T(n, K, function (t) {
            a += (a.indexOf("?") > 0 ? "&" : "?") + t
        }), a
    }

    function C(t) {
        function e(e, o) {
            if ("string" == typeof e)return i[e] || (i[e] = _(z(e, t))), i[e];
            if (e instanceof Array) {
                var n = [], r = [], s = [];
                O(e, function (e, i) {
                    var o = E(e), a = z(o.mod, t);
                    r.push(a), D[a] = 1, o.res ? (n.push(a), s[i] = null) : s[i] = a
                });
                var a = {};
                O(r, function (t) {
                    var e;
                    T(t, $, function (t) {
                        e = t
                    }), e && (e["*"] ? a[t] = 1 : O(r, function (i) {
                        return e[i] ? (a[t] = 1, !1) : void 0
                    }))
                }), _(r, function () {
                    O(s, function (i, o) {
                        null == i && (s[o] = z(e[o], t))
                    }), _(s, o, t)
                }, t, a)
            }
        }

        var i = {};
        return e.toUrl = function (e) {
            return S(z(e, t))
        }, e
    }

    function z(t, e) {
        if (!t)return "";
        e = e || "";
        var i = E(t);
        if (!i)return t;
        var o = i.res, n = w(i.mod, e);
        if (O(Q, function (t) {
                var e = t.name;
                return e === n ? (n = e + "/" + t.main, !1) : void 0
            }), T(e, j, function (t) {
                T(n, t, function (t, e) {
                    n = n.replace(e, t)
                })
            }), o) {
            var r = g(n);
            o = r.normalize ? r.normalize(o, function (t) {
                return z(t, e)
            }) : z(o, e), n += "!" + o
        }
        return n
    }

    function w(t, e) {
        if (0 === t.indexOf(".")) {
            var i = e.split("/"), o = t.split("/"), n = i.length - 1, r = o.length, s = 0, a = 0;
            t:for (var h = 0; r > h; h++) {
                var l = o[h];
                switch (l) {
                    case"..":
                        if (!(n > s))break t;
                        s++, a++;
                        break;
                    case".":
                        a++;
                        break;
                    default:
                        break t
                }
            }
            return i.length = n - s, o = o.slice(a), i.concat(o).join("/")
        }
        return t
    }

    function E(t) {
        var e = t.split("!");
        return e[0] ? {mod: e[0], res: e[1]} : null
    }

    function A(t, e, i) {
        var o = [];
        for (var n in t)if (t.hasOwnProperty(n)) {
            var r = {k: n, v: t[n]};
            o.push(r), e && (r.reg = "*" === n && i ? /^/ : k(n))
        }
        return o
    }

    function L() {
        if (J)return J;
        if (te && "interactive" === te.readyState)return te;
        for (var t = document.getElementsByTagName("script"), e = t.length; e--;) {
            var i = t[e];
            if ("interactive" === i.readyState)return te = i, i
        }
    }

    function M(t) {
        J = t, ie ? ee.insertBefore(t, ie) : ee.appendChild(t), J = null
    }

    function k(t) {
        return new RegExp("^" + t + "(/|$)")
    }

    function O(t, e) {
        if (t instanceof Array)for (var i = 0, o = t.length; o > i && e(t[i], i) !== !1; i++);
    }

    function I(t, e) {
        var i = t.k || t.name, o = e.k || e.name;
        return "*" === o ? -1 : "*" === i ? 1 : o.length - i.length
    }

    var P, R = {}, D = {}, H = 1, N = 2, F = 3, B = 4, Y = C();
    e.version = "1.8.6", e.loader = "esl", e.toUrl = Y.toUrl;
    var W;
    o.amd = {};
    var q = {}, G = {require: e, exports: 1, module: 1}, X = [], V = {}, U = {
        baseUrl: "./",
        paths: {},
        config: {},
        map: {},
        packages: [],
        waitSeconds: 0,
        noRequests: {},
        urlArgs: {}
    };
    e.config = function (t) {
        function e(t) {
            n.push(t)
        }

        if (t) {
            for (var i in U) {
                var o = t[i], n = U[i];
                if (o)if ("urlArgs" === i && "string" == typeof o)U.urlArgs["*"] = o; else if (n instanceof Array)O(o, e); else if ("object" == typeof n)for (var i in o)n[i] = o[i]; else U[i] = o
            }
            b()
        }
    }, b();
    var Z, Q, j, K, $, J, te, ee = document.getElementsByTagName("head")[0], ie = document.getElementsByTagName("base")[0];
    ie && (ee = ie.parentNode), t.define || (t.define = o, t.require || (t.require = e), t.esl = e)
}(this), define("echarts", ["echarts/echarts"], function (t) {
    return t
}), define("echarts/echarts", ["require", "./config", "zrender/tool/util", "zrender/tool/event", "zrender/tool/env", "zrender", "zrender/config", "./chart/island", "./component/toolbox", "./component", "./component/title", "./component/tooltip", "./component/legend", "./util/ecData", "./chart", "zrender/tool/color", "./component/timeline", "zrender/shape/Image", "zrender/loadingEffect/Bar", "zrender/loadingEffect/Bubble", "zrender/loadingEffect/DynamicLine", "zrender/loadingEffect/Ring", "zrender/loadingEffect/Spin", "zrender/loadingEffect/Whirling", "./theme/default"], function (t) {
    function e() {
        s.Dispatcher.call(this)
    }

    function i(t) {
        this._themeConfig = r.clone(n), this.dom = t, this._connected = !1, this._status = {
            dragIn: !1,
            dragOut: !1,
            needRefresh: !1
        }, this._curEventType = !1, this._chartList = [], this._messageCenter = new e, this._messageCenterOutSide = new e, this.resize = this.resize(), this._init()
    }

    function o(t, e, i, o, n) {
        for (var r = t._chartList, s = r.length; s--;) {
            var a = r[s];
            "function" == typeof a[e] && a[e](i, o, n)
        }
    }

    var n = t("./config"), r = t("zrender/tool/util"), s = t("zrender/tool/event"), a = {}, h = t("zrender/tool/env").canvasSupported, l = new Date - 0, d = {}, c = "_echarts_instance_";
    a.version = "2.1.10", a.dependencies = {zrender: "2.0.6"}, a.init = function (e, o) {
        var n = t("zrender");
        (n.version || "1.0.3").replace(".", "") - 0 < a.dependencies.zrender.replace(".", "") - 0 && console.error("ZRender " + (n.version || "1.0.3-") + " is too old for ECharts " + a.version + ". Current version need ZRender " + a.dependencies.zrender + "+"), e = e instanceof Array ? e[0] : e;
        var r = e.getAttribute(c);
        return r || (r = l++, e.setAttribute(c, r)), d[r] && d[r].dispose(), d[r] = new i(e), d[r].id = r, d[r].canvasSupported = h, d[r].setTheme(o), d[r]
    }, a.getInstanceById = function (t) {
        return d[t]
    }, r.merge(e.prototype, s.Dispatcher.prototype, !0);
    var u = t("zrender/config").EVENT, p = ["CLICK", "DBLCLICK", "MOUSEOVER", "MOUSEOUT", "DRAGSTART", "DRAGEND", "DRAGENTER", "DRAGOVER", "DRAGLEAVE", "DROP"];
    return i.prototype = {
        _init: function () {
            var e = this, i = t("zrender").init(this.dom);
            this._zr = i, this._messageCenter.dispatch = function (t, i, o, n) {
                o = o || {}, o.type = t, o.event = i, e._messageCenter.dispatchWithContext(t, o, n), "HOVER" != t && "MOUSEOUT" != t ? setTimeout(function () {
                    e._messageCenterOutSide.dispatchWithContext(t, o, n)
                }, 50) : e._messageCenterOutSide.dispatchWithContext(t, o, n)
            }, this._onevent = function (t) {
                return e.__onevent(t)
            };
            for (var o in n.EVENT)"CLICK" != o && "DBLCLICK" != o && "HOVER" != o && "MOUSEOUT" != o && "MAP_ROAM" != o && this._messageCenter.bind(n.EVENT[o], this._onevent, this);
            var r = {};
            this._onzrevent = function (t) {
                return e[r[t.type]](t)
            };
            for (var s = 0, a = p.length; a > s; s++) {
                var h = p[s], l = u[h];
                r[l] = "_on" + h.toLowerCase(), i.on(l, this._onzrevent)
            }
            this.chart = {}, this.component = {};
            var d = t("./chart/island");
            this._island = new d(this._themeConfig, this._messageCenter, i, {}, this), this.chart.island = this._island;
            var c = t("./component/toolbox");
            this._toolbox = new c(this._themeConfig, this._messageCenter, i, {}, this), this.component.toolbox = this._toolbox;
            var f = t("./component");
            f.define("title", t("./component/title")), f.define("tooltip", t("./component/tooltip")), f.define("legend", t("./component/legend")), (0 === i.getWidth() || 0 === i.getHeight()) && console.error("Dom’s width & height should be ready before init.")
        }, __onevent: function (t) {
            t.__echartsId = t.__echartsId || this.id;
            var e = t.__echartsId === this.id;
            switch (this._curEventType || (this._curEventType = t.type), t.type) {
                case n.EVENT.LEGEND_SELECTED:
                    this._onlegendSelected(t);
                    break;
                case n.EVENT.DATA_ZOOM:
                    if (!e) {
                        var i = this.component.dataZoom;
                        i && (i.silence(!0), i.absoluteZoom(t.zoom), i.silence(!1))
                    }
                    this._ondataZoom(t);
                    break;
                case n.EVENT.DATA_RANGE:
                    e && this._ondataRange(t);
                    break;
                case n.EVENT.MAGIC_TYPE_CHANGED:
                    if (!e) {
                        var o = this.component.toolbox;
                        o && (o.silence(!0), o.setMagicType(t.magicType), o.silence(!1))
                    }
                    this._onmagicTypeChanged(t);
                    break;
                case n.EVENT.DATA_VIEW_CHANGED:
                    e && this._ondataViewChanged(t);
                    break;
                case n.EVENT.TOOLTIP_HOVER:
                    e && this._tooltipHover(t);
                    break;
                case n.EVENT.RESTORE:
                    this._onrestore();
                    break;
                case n.EVENT.REFRESH:
                    e && this._onrefresh(t);
                    break;
                case n.EVENT.TOOLTIP_IN_GRID:
                case n.EVENT.TOOLTIP_OUT_GRID:
                    if (e) {
                        if (this._connected) {
                            var r = this.component.grid;
                            r && (t.x = (t.event.zrenderX - r.getX()) / r.getWidth(), t.y = (t.event.zrenderY - r.getY()) / r.getHeight())
                        }
                    } else {
                        var r = this.component.grid;
                        r && this._zr.trigger("mousemove", {
                            connectTrigger: !0,
                            zrenderX: r.getX() + t.x * r.getWidth(),
                            zrenderY: r.getY() + t.y * r.getHeight()
                        })
                    }
            }
            if (this._connected && e && this._curEventType === t.type) {
                for (var s in this._connected)this._connected[s].connectedEventHandler(t);
                this._curEventType = null
            }
            (!e || !this._connected && e) && (this._curEventType = null)
        }, _onclick: function (t) {
            if (o(this, "onclick", t), t.target) {
                var e = this._eventPackage(t.target);
                e && null != e.seriesIndex && this._messageCenter.dispatch(n.EVENT.CLICK, t.event, e, this)
            }
        }, _ondblclick: function (t) {
            if (o(this, "ondblclick", t), t.target) {
                var e = this._eventPackage(t.target);
                e && null != e.seriesIndex && this._messageCenter.dispatch(n.EVENT.DBLCLICK, t.event, e, this)
            }
        }, _onmouseover: function (t) {
            if (t.target) {
                var e = this._eventPackage(t.target);
                e && null != e.seriesIndex && this._messageCenter.dispatch(n.EVENT.HOVER, t.event, e, this)
            }
        }, _onmouseout: function (t) {
            if (t.target) {
                var e = this._eventPackage(t.target);
                e && null != e.seriesIndex && this._messageCenter.dispatch(n.EVENT.MOUSEOUT, t.event, e, this)
            }
        }, _ondragstart: function (t) {
            this._status = {dragIn: !1, dragOut: !1, needRefresh: !1}, o(this, "ondragstart", t)
        }, _ondragenter: function (t) {
            o(this, "ondragenter", t)
        }, _ondragover: function (t) {
            o(this, "ondragover", t)
        }, _ondragleave: function (t) {
            o(this, "ondragleave", t)
        }, _ondrop: function (t) {
            o(this, "ondrop", t, this._status), this._island.ondrop(t, this._status)
        }, _ondragend: function (t) {
            if (o(this, "ondragend", t, this._status), this._timeline && this._timeline.ondragend(t, this._status), this._island.ondragend(t, this._status), this._status.needRefresh) {
                this._syncBackupData(this._option);
                var e = this._messageCenter;
                e.dispatch(n.EVENT.DATA_CHANGED, t.event, this._eventPackage(t.target), this), e.dispatch(n.EVENT.REFRESH, null, null, this)
            }
        }, _onlegendSelected: function (t) {
            this._status.needRefresh = !1, o(this, "onlegendSelected", t, this._status), this._status.needRefresh && this._messageCenter.dispatch(n.EVENT.REFRESH, null, null, this)
        }, _ondataZoom: function (t) {
            this._status.needRefresh = !1, o(this, "ondataZoom", t, this._status), this._status.needRefresh && this._messageCenter.dispatch(n.EVENT.REFRESH, null, null, this)
        }, _ondataRange: function (t) {
            this._clearEffect(), this._status.needRefresh = !1, o(this, "ondataRange", t, this._status), this._status.needRefresh && this._zr.refresh()
        }, _onmagicTypeChanged: function () {
            this._clearEffect(), this._render(this._toolbox.getMagicOption())
        }, _ondataViewChanged: function (t) {
            this._syncBackupData(t.option), this._messageCenter.dispatch(n.EVENT.DATA_CHANGED, null, t, this), this._messageCenter.dispatch(n.EVENT.REFRESH, null, null, this)
        }, _tooltipHover: function (t) {
            var e = [];
            o(this, "ontooltipHover", t, e)
        }, _onrestore: function () {
            this.restore()
        }, _onrefresh: function (t) {
            this._refreshInside = !0, this.refresh(t), this._refreshInside = !1
        }, _syncBackupData: function (t) {
            this.component.dataZoom && this.component.dataZoom.syncBackupData(t)
        }, _eventPackage: function (e) {
            if (e) {
                var i = t("./util/ecData"), o = i.get(e, "seriesIndex"), n = i.get(e, "dataIndex");
                return n = -1 != o && this.component.dataZoom ? this.component.dataZoom.getRealDataIndex(o, n) : n, {
                    seriesIndex: o,
                    seriesName: (i.get(e, "series") || {}).name,
                    dataIndex: n,
                    data: i.get(e, "data"),
                    name: i.get(e, "name"),
                    value: i.get(e, "value"),
                    special: i.get(e, "special")
                }
            }
        }, _render: function (e) {
            this._mergeGlobalConifg(e);
            var i = e.backgroundColor;
            if (i)if (h || -1 == i.indexOf("rgba"))this.dom.style.backgroundColor = i; else {
                var o = i.split(",");
                this.dom.style.filter = "alpha(opacity=" + 100 * o[3].substring(0, o[3].lastIndexOf(")")) + ")", o.length = 3, o[0] = o[0].replace("a", ""), this.dom.style.backgroundColor = o.join(",") + ")"
            }
            this._zr.clearAnimation(), this._chartList = [];
            var r = t("./chart"), s = t("./component");
            (e.xAxis || e.yAxis) && (e.grid = e.grid || {}, e.dataZoom = e.dataZoom || {});
            for (var a, l, d, c = ["title", "legend", "tooltip", "dataRange", "roamController", "grid", "dataZoom", "xAxis", "yAxis", "polar"], u = 0, p = c.length; p > u; u++)l = c[u], d = this.component[l], e[l] ? (d ? d.refresh && d.refresh(e) : (a = s.get(/^[xy]Axis$/.test(l) ? "axis" : l), d = new a(this._themeConfig, this._messageCenter, this._zr, e, this, l), this.component[l] = d), this._chartList.push(d)) : d && (d.dispose(), this.component[l] = null, delete this.component[l]);
            for (var f, g, m, _ = {}, u = 0, p = e.series.length; p > u; u++)g = e.series[u].type, g ? _[g] || (_[g] = !0, f = r.get(g), f ? (this.chart[g] ? (m = this.chart[g], m.refresh(e)) : m = new f(this._themeConfig, this._messageCenter, this._zr, e, this), this._chartList.push(m), this.chart[g] = m) : console.error(g + " has not been required.")) : console.error("series[" + u + "] chart type has not been defined.");
            for (g in this.chart)g == n.CHART_TYPE_ISLAND || _[g] || (this.chart[g].dispose(), this.chart[g] = null, delete this.chart[g]);
            this.component.grid && this.component.grid.refixAxisShape(this.component), this._island.refresh(e), this._toolbox.refresh(e), e.animation && !e.renderAsImage ? this._zr.refresh() : this._zr.render();
            var y = "IMG" + this.id, v = document.getElementById(y);
            e.renderAsImage && h ? (v ? v.src = this.getDataURL(e.renderAsImage) : (v = this.getImage(e.renderAsImage), v.id = y, v.style.position = "absolute", v.style.left = 0, v.style.top = 0, this.dom.firstChild.appendChild(v)), this.un(), this._zr.un(), this._disposeChartList(), this._zr.clear()) : v && v.parentNode.removeChild(v), v = null, this._option = e
        }, restore: function () {
            this._clearEffect(), this._option = r.clone(this._optionRestore), this._disposeChartList(), this._island.clear(), this._toolbox.reset(this._option, !0), this._render(this._option)
        }, refresh: function (t) {
            this._clearEffect(), t = t || {};
            var e = t.option;
            !this._refreshInside && e && (e = this.getOption(), r.merge(e, t.option, !0), r.merge(this._optionRestore, t.option, !0), this._toolbox.reset(e)), this._island.refresh(e), this._toolbox.refresh(e), this._zr.clearAnimation();
            for (var i = 0, o = this._chartList.length; o > i; i++)this._chartList[i].refresh && this._chartList[i].refresh(e);
            this.component.grid && this.component.grid.refixAxisShape(this.component), this._zr.refresh()
        }, _disposeChartList: function () {
            this._clearEffect(), this._zr.clearAnimation();
            for (var t = this._chartList.length; t--;) {
                var e = this._chartList[t];
                if (e) {
                    var i = e.type;
                    this.chart[i] && delete this.chart[i], this.component[i] && delete this.component[i], e.dispose && e.dispose()
                }
            }
            this._chartList = []
        }, _mergeGlobalConifg: function (e) {
            for (var i = ["backgroundColor", "calculable", "calculableColor", "calculableHolderColor", "nameConnector", "valueConnector", "animation", "animationThreshold", "animationDuration", "animationEasing", "addDataAnimation", "symbolList", "DRAG_ENABLE_TIME"], o = i.length; o--;) {
                var n = i[o];
                null == e[n] && (e[n] = this._themeConfig[n])
            }
            var r = e.color;
            r && r.length || (r = this._themeConfig.color), h || (e.animation = !1, e.addDataAnimation = !1), this._zr.getColor = function (e) {
                var i = t("zrender/tool/color");
                return i.getColor(e, r)
            }
        }, setOption: function (t, e) {
            return t.timeline ? this._setTimelineOption(t) : this._setOption(t, e)
        }, _setOption: function (t, e) {
            return this._option = !e && this._option ? r.merge(this.getOption(), r.clone(t), !0) : r.clone(t), this._optionRestore = r.clone(this._option), this._option.series && 0 !== this._option.series.length ? (this.component.dataZoom && (this._option.dataZoom || this._option.toolbox && this._option.toolbox.feature && this._option.toolbox.feature.dataZoom && this._option.toolbox.feature.dataZoom.show) && this.component.dataZoom.syncOption(this._option), this._toolbox.reset(this._option), this._render(this._option), this) : void this._zr.clear()
        }, getOption: function () {
            function t(t) {
                var o = i._optionRestore[t];
                if (o)if (o instanceof Array)for (var n = o.length; n--;)e[t][n].data = r.clone(o[n].data); else e[t].data = r.clone(o.data)
            }

            var e = r.clone(this._option), i = this;
            return t("xAxis"), t("yAxis"), t("series"), e
        }, setSeries: function (t, e) {
            return e ? (this._option.series = t, this.setOption(this._option, e)) : this.setOption({series: t}), this
        }, getSeries: function () {
            return this.getOption().series
        }, _setTimelineOption: function (e) {
            this._timeline && this._timeline.dispose();
            var i = t("./component/timeline"), o = new i(this._themeConfig, this._messageCenter, this._zr, e, this);
            return this._timeline = o, this.component.timeline = this._timeline, this
        }, addData: function (t, e, i, o, s) {
            for (var a = t instanceof Array ? t : [[t, e, i, o, s]], h = this.getOption(), l = this._optionRestore, d = 0, c = a.length; c > d; d++) {
                t = a[d][0], e = a[d][1], i = a[d][2], o = a[d][3], s = a[d][4];
                var u = l.series[t], p = i ? "unshift" : "push", f = i ? "pop" : "shift";
                if (u) {
                    var g = u.data, m = h.series[t].data;
                    if (g[p](e), m[p](e), o || (g[f](), e = m[f]()), null != s) {
                        var _, y;
                        if (u.type === n.CHART_TYPE_PIE && (_ = l.legend) && (y = _.data)) {
                            var v = h.legend.data;
                            if (y[p](s), v[p](s), !o) {
                                var x = r.indexOf(y, e.name);
                                -1 != x && y.splice(x, 1), x = r.indexOf(v, e.name), -1 != x && v.splice(x, 1)
                            }
                        } else if (null != l.xAxis && null != l.yAxis) {
                            var b, T, S = u.xAxisIndex || 0;
                            (null == l.xAxis[S].type || "category" === l.xAxis[S].type) && (b = l.xAxis[S].data, T = h.xAxis[S].data, b[p](s), T[p](s), o || (b[f](), T[f]())), S = u.yAxisIndex || 0, "category" === l.yAxis[S].type && (b = l.yAxis[S].data, T = h.yAxis[S].data, b[p](s), T[p](s), o || (b[f](), T[f]()))
                        }
                    }
                    this._option.series[t].data = h.series[t].data
                }
            }
            this._zr.clearAnimation();
            for (var C = this._chartList, d = 0, c = C.length; c > d; d++)h.addDataAnimation && C[d].addDataAnimation && C[d].addDataAnimation(a);
            this.component.dataZoom && this.component.dataZoom.syncOption(h), this._option = h;
            var z = this;
            return setTimeout(function () {
                if (z._zr) {
                    z._zr.clearAnimation();
                    for (var t = 0, e = C.length; e > t; t++)C[t].motionlessOnce = h.addDataAnimation && C[t].addDataAnimation;
                    z._messageCenter.dispatch(n.EVENT.REFRESH, null, {option: h}, z)
                }
            }, h.addDataAnimation ? 500 : 0), this
        }, addMarkPoint: function (t, e) {
            return this._addMark(t, e, "markPoint")
        }, addMarkLine: function (t, e) {
            return this._addMark(t, e, "markLine")
        }, _addMark: function (t, e, i) {
            var o, n = this._option.series;
            if (n && (o = n[t])) {
                var s = this._optionRestore.series, a = s[t], h = o[i], l = a[i];
                h = o[i] = h || {data: []}, l = a[i] = l || {data: []};
                for (var d in e)"data" === d ? (h.data = h.data.concat(e.data), l.data = l.data.concat(e.data)) : "object" != typeof e[d] || null == h[d] ? h[d] = l[d] = e[d] : (r.merge(h[d], e[d], !0), r.merge(l[d], e[d], !0));
                var c = this.chart[o.type];
                c && c.addMark(t, e, i)
            }
            return this
        }, delMarkPoint: function (t, e) {
            return this._delMark(t, e, "markPoint")
        }, delMarkLine: function (t, e) {
            return this._delMark(t, e, "markLine")
        }, _delMark: function (t, e, i) {
            var o, n, r, s = this._option.series;
            if (!(s && (o = s[t]) && (n = o[i]) && (r = n.data)))return this;
            e = e.split(" > ");
            for (var a = -1, h = 0, l = r.length; l > h; h++) {
                var d = r[h];
                if (d instanceof Array) {
                    if (d[0].name === e[0] && d[1].name === e[1]) {
                        a = h;
                        break
                    }
                } else if (d.name === e[0]) {
                    a = h;
                    break
                }
            }
            if (a > -1) {
                r.splice(a, 1), this._optionRestore.series[t][i].data.splice(a, 1);
                var c = this.chart[o.type];
                c && c.delMark(t, e.join(" > "), i)
            }
            return this
        }, getDom: function () {
            return this.dom
        }, getZrender: function () {
            return this._zr
        }, getDataURL: function (t) {
            if (!h)return "";
            if (0 === this._chartList.length) {
                var e = "IMG" + this.id, i = document.getElementById(e);
                if (i)return i.src
            }
            var o = this.component.tooltip;
            switch (o && o.hideTip(), t) {
                case"jpeg":
                    break;
                default:
                    t = "png"
            }
            var n = this._option.backgroundColor;
            return n && "rgba(0,0,0,0)" === n.replace(" ", "") && (n = "#fff"), this._zr.toDataURL("image/" + t, n)
        }, getImage: function (t) {
            var e = this._optionRestore.title, i = document.createElement("img");
            return i.src = this.getDataURL(t), i.title = e && e.text || "ECharts", i
        }, getConnectedDataURL: function (e) {
            if (!this.isConnected())return this.getDataURL(e);
            var i = this.dom, o = {
                self: {
                    img: this.getDataURL(e),
                    left: i.offsetLeft,
                    top: i.offsetTop,
                    right: i.offsetLeft + i.offsetWidth,
                    bottom: i.offsetTop + i.offsetHeight
                }
            }, n = o.self.left, r = o.self.top, s = o.self.right, a = o.self.bottom;
            for (var h in this._connected)i = this._connected[h].getDom(), o[h] = {
                img: this._connected[h].getDataURL(e),
                left: i.offsetLeft,
                top: i.offsetTop,
                right: i.offsetLeft + i.offsetWidth,
                bottom: i.offsetTop + i.offsetHeight
            }, n = Math.min(n, o[h].left), r = Math.min(r, o[h].top), s = Math.max(s, o[h].right), a = Math.max(a, o[h].bottom);
            var l = document.createElement("div");
            l.style.position = "absolute", l.style.left = "-4000px", l.style.width = s - n + "px", l.style.height = a - r + "px", document.body.appendChild(l);
            var d = t("zrender").init(l), c = t("zrender/shape/Image");
            for (var h in o)d.addShape(new c({style: {x: o[h].left - n, y: o[h].top - r, image: o[h].img}}));
            d.render();
            var u = this._option.backgroundColor;
            u && "rgba(0,0,0,0)" === u.replace(/ /g, "") && (u = "#fff");
            var p = d.toDataURL("image/png", u);
            return setTimeout(function () {
                d.dispose(), l.parentNode.removeChild(l), l = null
            }, 100), p
        }, getConnectedImage: function (t) {
            var e = this._optionRestore.title, i = document.createElement("img");
            return i.src = this.getConnectedDataURL(t), i.title = e && e.text || "ECharts", i
        }, on: function (t, e) {
            return this._messageCenterOutSide.bind(t, e, this), this
        }, un: function (t, e) {
            return this._messageCenterOutSide.unbind(t, e), this
        }, connect: function (t) {
            if (!t)return this;
            if (this._connected || (this._connected = {}), t instanceof Array)for (var e = 0, i = t.length; i > e; e++)this._connected[t[e].id] = t[e]; else this._connected[t.id] = t;
            return this
        }, disConnect: function (t) {
            if (!t || !this._connected)return this;
            if (t instanceof Array)for (var e = 0, i = t.length; i > e; e++)delete this._connected[t[e].id]; else delete this._connected[t.id];
            for (var o in this._connected)return this;
            return this._connected = !1, this
        }, connectedEventHandler: function (t) {
            t.__echartsId != this.id && this._onevent(t)
        }, isConnected: function () {
            return !!this._connected
        }, showLoading: function (e) {
            var i = {
                bar: t("zrender/loadingEffect/Bar"),
                bubble: t("zrender/loadingEffect/Bubble"),
                dynamicLine: t("zrender/loadingEffect/DynamicLine"),
                ring: t("zrender/loadingEffect/Ring"),
                spin: t("zrender/loadingEffect/Spin"),
                whirling: t("zrender/loadingEffect/Whirling")
            };
            this._toolbox.hideDataView(), e = e || {};
            var o = e.textStyle || {};
            e.textStyle = o;
            var n = r.merge(r.clone(o), this._themeConfig.textStyle);
            o.textFont = n.fontStyle + " " + n.fontWeight + " " + n.fontSize + "px " + n.fontFamily, o.text = e.text || this._themeConfig.loadingText, null != e.x && (o.x = e.x), null != e.y && (o.y = e.y), e.effectOption = e.effectOption || {}, e.effectOption.textStyle = o;
            var s = e.effect;
            return ("string" == typeof s || null == s) && (s = i[e.effect || "spin"]), this._zr.showLoading(new s(e.effectOption)), this
        }, hideLoading: function () {
            return this._zr.hideLoading(), this
        }, setTheme: function (e) {
            if (e) {
                if ("string" == typeof e)switch (e) {
                    default:
                        e = t("./theme/default")
                } else e = e || {};
                for (var i in this._themeConfig)delete this._themeConfig[i];
                for (var i in n)this._themeConfig[i] = r.clone(n[i]);
                e.color && (this._themeConfig.color = []), e.symbolList && (this._themeConfig.symbolList = []), r.merge(this._themeConfig, r.clone(e), !0)
            }
            h || (this._themeConfig.textStyle.fontFamily = this._themeConfig.textStyle.fontFamily2), this._timeline && this._timeline.setTheme(!0), this._optionRestore && this.restore()
        }, resize: function () {
            var t = this;
            return function () {
                if (t._clearEffect(), t._zr.resize(), t._option && t._option.renderAsImage && h)return t._render(t._option), t;
                t._zr.clearAnimation(), t._island.resize(), t._toolbox.resize(), t._timeline && t._timeline.resize();
                for (var e = 0, i = t._chartList.length; i > e; e++)t._chartList[e].resize && t._chartList[e].resize();
                return t.component.grid && t.component.grid.refixAxisShape(t.component), t._zr.refresh(), t._messageCenter.dispatch(n.EVENT.RESIZE, null, null, t), t
            }
        }, _clearEffect: function () {
            this._zr.modLayer(n.EFFECT_ZLEVEL, {motionBlur: !1}), this._zr.painter.clearLayer(n.EFFECT_ZLEVEL)
        }, clear: function () {
            return this._disposeChartList(), this._zr.clear(), this._option = {}, this._optionRestore = {}, this.dom.style.backgroundColor = null, this
        }, dispose: function () {
            var t = this.dom.getAttribute(c);
            t && delete d[t], this._island.dispose(), this._toolbox.dispose(), this._timeline && this._timeline.dispose(), this._messageCenter.unbind(), this.clear(), this._zr.dispose(), this._zr = null
        }
    }, a
}), define("echarts/config", [], function () {
    var t = {
        CHART_TYPE_LINE: "line",
        CHART_TYPE_BAR: "bar",
        CHART_TYPE_SCATTER: "scatter",
        CHART_TYPE_PIE: "pie",
        CHART_TYPE_RADAR: "radar",
        CHART_TYPE_MAP: "map",
        CHART_TYPE_K: "k",
        CHART_TYPE_ISLAND: "island",
        CHART_TYPE_FORCE: "force",
        CHART_TYPE_CHORD: "chord",
        CHART_TYPE_GAUGE: "gauge",
        CHART_TYPE_FUNNEL: "funnel",
        CHART_TYPE_EVENTRIVER: "eventRiver",
        COMPONENT_TYPE_TITLE: "title",
        COMPONENT_TYPE_LEGEND: "legend",
        COMPONENT_TYPE_DATARANGE: "dataRange",
        COMPONENT_TYPE_DATAVIEW: "dataView",
        COMPONENT_TYPE_DATAZOOM: "dataZoom",
        COMPONENT_TYPE_TOOLBOX: "toolbox",
        COMPONENT_TYPE_TOOLTIP: "tooltip",
        COMPONENT_TYPE_GRID: "grid",
        COMPONENT_TYPE_AXIS: "axis",
        COMPONENT_TYPE_POLAR: "polar",
        COMPONENT_TYPE_X_AXIS: "xAxis",
        COMPONENT_TYPE_Y_AXIS: "yAxis",
        COMPONENT_TYPE_AXIS_CATEGORY: "categoryAxis",
        COMPONENT_TYPE_AXIS_VALUE: "valueAxis",
        COMPONENT_TYPE_TIMELINE: "timeline",
        COMPONENT_TYPE_ROAMCONTROLLER: "roamController",
        backgroundColor: "rgba(0,0,0,0)",
        color: ["#ff7f50", "#87cefa", "#da70d6", "#32cd32", "#6495ed", "#ff69b4", "#ba55d3", "#cd5c5c", "#ffa500", "#40e0d0", "#1e90ff", "#ff6347", "#7b68ee", "#00fa9a", "#ffd700", "#6699FF", "#ff6666", "#3cb371", "#b8860b", "#30e0e0"],
        title: {
            text: "",
            subtext: "",
            x: "left",
            y: "top",
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#ccc",
            borderWidth: 0,
            padding: 5,
            itemGap: 5,
            textStyle: {fontSize: 18, fontWeight: "bolder", color: "#333"},
            subtextStyle: {color: "#aaa"}
        },
        legend: {
            show: !0,
            orient: "horizontal",
            x: "center",
            y: "top",
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#ccc",
            borderWidth: 0,
            padding: 5,
            itemGap: 10,
            itemWidth: 20,
            itemHeight: 14,
            textStyle: {color: "#333"},
            selectedMode: !0
        },
        dataRange: {
            show: !0,
            orient: "vertical",
            x: "left",
            y: "bottom",
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#ccc",
            borderWidth: 0,
            padding: 5,
            itemGap: 10,
            itemWidth: 20,
            itemHeight: 14,
            precision: 0,
            splitNumber: 5,
            calculable: !1,
            hoverLink: !0,
            realtime: !0,
            color: ["#006edd", "#e0ffff"],
            textStyle: {color: "#333"}
        },
        toolbox: {
            show: !1,
            orient: "horizontal",
            x: "right",
            y: "top",
            color: ["#1e90ff", "#22bb22", "#4b0082", "#d2691e"],
            disableColor: "#ddd",
            effectiveColor: "red",
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#ccc",
            borderWidth: 0,
            padding: 5,
            itemGap: 10,
            itemSize: 16,
            showTitle: !0,
            feature: {
                mark: {
                    show: !1,
                    title: {mark: "辅助线开关", markUndo: "删除辅助线", markClear: "清空辅助线"},
                    lineStyle: {width: 1, color: "#1e90ff", type: "dashed"}
                },
                dataZoom: {show: !1, title: {dataZoom: "区域缩放", dataZoomReset: "区域缩放后退"}},
                dataView: {show: !1, title: "数据视图", readOnly: !1, lang: ["数据视图", "关闭", "刷新"]},
                magicType: {
                    show: !1,
                    title: {
                        line: "折线图切换",
                        bar: "柱形图切换",
                        stack: "堆积",
                        tiled: "平铺",
                        force: "力导向布局图切换",
                        chord: "和弦图切换",
                        pie: "饼图切换",
                        funnel: "漏斗图切换"
                    },
                    type: []
                },
                restore: {show: !1, title: "还原"},
                saveAsImage: {show: !1, title: "保存为图片", type: "png", lang: ["点击保存"]}
            }
        },
        tooltip: {
            show: !0,
            showContent: !0,
            trigger: "item",
            islandFormatter: "{a} <br/>{b} : {c}",
            showDelay: 20,
            hideDelay: 100,
            transitionDuration: .4,
            enterable: !1,
            backgroundColor: "rgba(0,0,0,0.7)",
            borderColor: "#333",
            borderRadius: 4,
            borderWidth: 0,
            padding: 5,
            axisPointer: {
                type: "line",
                lineStyle: {color: "#48b", width: 2, type: "solid"},
                crossStyle: {color: "#1e90ff", width: 1, type: "dashed"},
                shadowStyle: {color: "rgba(150,150,150,0.3)", width: "auto", type: "default"}
            },
            textStyle: {color: "#fff"}
        },
        dataZoom: {
            show: !1,
            orient: "horizontal",
            backgroundColor: "rgba(0,0,0,0)",
            dataBackgroundColor: "#eee",
            fillerColor: "rgba(144,197,237,0.2)",
            handleColor: "rgba(70,130,180,0.8)",
            showDetail: !0,
            realtime: !0
        },
        grid: {x: 80, y: 60, x2: 80, y2: 60, backgroundColor: "rgba(0,0,0,0)", borderWidth: 1, borderColor: "#ccc"},
        categoryAxis: {
            show: !0,
            position: "bottom",
            name: "",
            nameLocation: "end",
            nameTextStyle: {},
            boundaryGap: !0,
            axisLine: {show: !0, onZero: !0, lineStyle: {color: "#48b", width: 2, type: "solid"}},
            axisTick: {show: !0, interval: "auto", inside: !1, length: 5, lineStyle: {color: "#333", width: 1}},
            axisLabel: {show: !0, interval: "auto", rotate: 0, margin: 8, textStyle: {color: "#333"}},
            splitLine: {show: !0, lineStyle: {color: ["#ccc"], width: 1, type: "solid"}},
            splitArea: {show: !1, areaStyle: {color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]}}
        },
        valueAxis: {
            show: !0,
            position: "left",
            name: "",
            nameLocation: "end",
            nameTextStyle: {},
            boundaryGap: [0, 0],
            axisLine: {show: !0, onZero: !0, lineStyle: {color: "#48b", width: 2, type: "solid"}},
            axisTick: {show: !1, inside: !1, length: 5, lineStyle: {color: "#333", width: 1}},
            axisLabel: {show: !0, rotate: 0, margin: 8, textStyle: {color: "#333"}},
            splitLine: {show: !0, lineStyle: {color: ["#ccc"], width: 1, type: "solid"}},
            splitArea: {show: !1, areaStyle: {color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]}}
        },
        polar: {
            center: ["50%", "50%"],
            radius: "75%",
            startAngle: 90,
            boundaryGap: [0, 0],
            splitNumber: 5,
            name: {show: !0, textStyle: {color: "#333"}},
            axisLine: {show: !0, lineStyle: {color: "#ccc", width: 1, type: "solid"}},
            axisLabel: {show: !1, textStyle: {color: "#333"}},
            splitArea: {show: !0, areaStyle: {color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]}},
            splitLine: {show: !0, lineStyle: {width: 1, color: "#ccc"}},
            type: "polygon"
        },
        timeline: {
            show: !0,
            type: "time",
            notMerge: !1,
            realtime: !0,
            x: 80,
            x2: 80,
            y2: 0,
            height: 50,
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#ccc",
            borderWidth: 0,
            padding: 5,
            controlPosition: "left",
            autoPlay: !1,
            loop: !0,
            playInterval: 2e3,
            lineStyle: {width: 1, color: "#666", type: "dashed"},
            label: {show: !0, interval: "auto", rotate: 0, textStyle: {color: "#333"}},
            checkpointStyle: {
                symbol: "auto",
                symbolSize: "auto",
                color: "auto",
                borderColor: "auto",
                borderWidth: "auto",
                label: {show: !1, textStyle: {color: "auto"}}
            },
            controlStyle: {normal: {color: "#333"}, emphasis: {color: "#1e90ff"}},
            symbol: "emptyDiamond",
            symbolSize: 4,
            currentIndex: 0
        },
        roamController: {
            show: !0,
            x: "left",
            y: "top",
            width: 80,
            height: 120,
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#ccc",
            borderWidth: 0,
            padding: 5,
            handleColor: "#6495ed",
            fillerColor: "#fff",
            step: 15,
            mapTypeControl: null
        },
        bar: {
            clickable: !0,
            legendHoverLink: !0,
            xAxisIndex: 0,
            yAxisIndex: 0,
            barMinHeight: 0,
            barGap: "30%",
            barCategoryGap: "20%",
            itemStyle: {
                normal: {barBorderColor: "#fff", barBorderRadius: 0, barBorderWidth: 0, label: {show: !1}},
                emphasis: {barBorderColor: "#fff", barBorderRadius: 0, barBorderWidth: 0, label: {show: !1}}
            }
        },
        line: {
            clickable: !0,
            legendHoverLink: !0,
            xAxisIndex: 0,
            yAxisIndex: 0,
            itemStyle: {
                normal: {
                    label: {show: !1},
                    lineStyle: {
                        width: 2,
                        type: "solid",
                        shadowColor: "rgba(0,0,0,0)",
                        shadowBlur: 0,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0
                    }
                }, emphasis: {label: {show: !1}}
            },
            symbolSize: 2,
            showAllSymbol: !1
        },
        k: {
            clickable: !0,
            legendHoverLink: !1,
            xAxisIndex: 0,
            yAxisIndex: 0,
            itemStyle: {
                normal: {
                    color: "#fff",
                    color0: "#00aa11",
                    lineStyle: {width: 1, color: "#ff3200", color0: "#00aa11"}
                }, emphasis: {}
            }
        },
        scatter: {
            clickable: !0,
            legendHoverLink: !0,
            xAxisIndex: 0,
            yAxisIndex: 0,
            symbolSize: 4,
            large: !1,
            largeThreshold: 2e3,
            itemStyle: {
                normal: {
                    label: {
                        show: !1, formatter: function (t, e, i) {
                            return "undefined" != typeof i[2] ? i[2] : i[0] + " , " + i[1]
                        }
                    }
                }, emphasis: {
                    label: {
                        show: !1, formatter: function (t, e, i) {
                            return "undefined" != typeof i[2] ? i[2] : i[0] + " , " + i[1]
                        }
                    }
                }
            }
        },
        radar: {
            clickable: !0,
            legendHoverLink: !0,
            polarIndex: 0,
            itemStyle: {
                normal: {label: {show: !1}, lineStyle: {width: 2, type: "solid"}},
                emphasis: {label: {show: !1}}
            },
            symbolSize: 2
        },
        pie: {
            clickable: !0,
            legendHoverLink: !0,
            center: ["50%", "50%"],
            radius: [0, "75%"],
            clockWise: !0,
            startAngle: 90,
            minAngle: 0,
            selectedOffset: 10,
            itemStyle: {
                normal: {
                    borderColor: "rgba(0,0,0,0)",
                    borderWidth: 1,
                    label: {show: !0, position: "outer"},
                    labelLine: {show: !0, length: 20, lineStyle: {width: 1, type: "solid"}}
                },
                emphasis: {
                    borderColor: "rgba(0,0,0,0)",
                    borderWidth: 1,
                    label: {show: !1},
                    labelLine: {show: !1, length: 20, lineStyle: {width: 1, type: "solid"}}
                }
            }
        },
        map: {
            mapType: "china",
            mapValuePrecision: 0,
            showLegendSymbol: !0,
            dataRangeHoverLink: !0,
            hoverable: !0,
            clickable: !0,
            itemStyle: {
                normal: {
                    borderColor: "rgba(0,0,0,0)",
                    borderWidth: 1,
                    areaStyle: {color: "#ccc"},
                    label: {show: !1, textStyle: {color: "rgb(139,69,19)"}}
                },
                emphasis: {
                    borderColor: "rgba(0,0,0,0)",
                    borderWidth: 1,
                    areaStyle: {color: "rgba(255,215,0,0.8)"},
                    label: {show: !1, textStyle: {color: "rgb(100,0,0)"}}
                }
            }
        },
        force: {
            center: ["50%", "50%"],
            size: "100%",
            preventOverlap: !1,
            coolDown: .99,
            minRadius: 10,
            maxRadius: 20,
            ratioScaling: !1,
            large: !1,
            useWorker: !1,
            steps: 1,
            scaling: 1,
            gravity: 1,
            symbol: "circle",
            symbolSize: 0,
            linkSymbol: null,
            linkSymbolSize: [10, 15],
            draggable: !0,
            clickable: !0,
            roam: !1,
            itemStyle: {
                normal: {
                    label: {show: !1, position: "inside"},
                    nodeStyle: {brushType: "both", borderColor: "#5182ab", borderWidth: 1},
                    linkStyle: {color: "#5182ab", width: 1, type: "line"}
                }, emphasis: {label: {show: !1}, nodeStyle: {}, linkStyle: {opacity: 0}}
            }
        },
        chord: {
            clickable: !0,
            radius: ["65%", "75%"],
            center: ["50%", "50%"],
            padding: 2,
            sort: "none",
            sortSub: "none",
            startAngle: 90,
            clockWise: !0,
            ribbonType: !0,
            minRadius: 10,
            maxRadius: 20,
            symbol: "circle",
            showScale: !1,
            showScaleText: !1,
            itemStyle: {
                normal: {
                    borderWidth: 0,
                    borderColor: "#000",
                    label: {show: !0, rotate: !1, distance: 5},
                    chordStyle: {width: 1, color: "black", borderWidth: 1, borderColor: "#999", opacity: .5}
                },
                emphasis: {
                    borderWidth: 0,
                    borderColor: "#000",
                    chordStyle: {width: 1, color: "black", borderWidth: 1, borderColor: "#999"}
                }
            }
        },
        gauge: {
            center: ["50%", "50%"],
            legendHoverLink: !0,
            radius: "75%",
            startAngle: 225,
            endAngle: -45,
            min: 0,
            max: 100,
            precision: 0,
            splitNumber: 10,
            axisLine: {show: !0, lineStyle: {color: [[.2, "#228b22"], [.8, "#48b"], [1, "#ff4500"]], width: 30}},
            axisTick: {show: !0, splitNumber: 5, length: 8, lineStyle: {color: "#eee", width: 1, type: "solid"}},
            axisLabel: {show: !0, textStyle: {color: "auto"}},
            splitLine: {show: !0, length: 30, lineStyle: {color: "#eee", width: 2, type: "solid"}},
            pointer: {show: !0, length: "80%", width: 8, color: "auto"},
            title: {show: !0, offsetCenter: [0, "-40%"], textStyle: {color: "#333", fontSize: 15}},
            detail: {
                show: !0,
                backgroundColor: "rgba(0,0,0,0)",
                borderWidth: 0,
                borderColor: "#ccc",
                width: 100,
                height: 40,
                offsetCenter: [0, "40%"],
                textStyle: {color: "auto", fontSize: 30}
            }
        },
        funnel: {
            clickable: !0,
            legendHoverLink: !0,
            x: 80,
            y: 60,
            x2: 80,
            y2: 60,
            min: 0,
            max: 100,
            minSize: "0%",
            maxSize: "100%",
            sort: "descending",
            gap: 0,
            funnelAlign: "center",
            itemStyle: {
                normal: {
                    borderColor: "#fff",
                    borderWidth: 1,
                    label: {show: !0, position: "outer"},
                    labelLine: {show: !0, length: 10, lineStyle: {width: 1, type: "solid"}}
                }, emphasis: {borderColor: "rgba(0,0,0,0)", borderWidth: 1, label: {show: !0}, labelLine: {show: !0}}
            }
        },
        eventRiver: {
            clickable: !0,
            legendHoverLink: !0,
            itemStyle: {
                normal: {
                    borderColor: "rgba(0,0,0,0)",
                    borderWidth: 1,
                    label: {show: !0, position: "inside", formatter: "{b}"}
                }, emphasis: {borderColor: "rgba(0,0,0,0)", borderWidth: 1, label: {show: !0}}
            }
        },
        island: {r: 15, calculateStep: .1},
        markPoint: {
            clickable: !0,
            symbol: "pin",
            symbolSize: 10,
            large: !1,
            effect: {show: !1, loop: !0, period: 15, scaleSize: 2},
            itemStyle: {normal: {borderWidth: 2, label: {show: !0, position: "inside"}}, emphasis: {label: {show: !0}}}
        },
        markLine: {
            clickable: !0,
            symbol: ["circle", "arrow"],
            symbolSize: [2, 4],
            large: !1,
            effect: {show: !1, loop: !0, period: 15, scaleSize: 2},
            itemStyle: {
                normal: {borderWidth: 1.5, label: {show: !0, position: "end"}, lineStyle: {type: "dashed"}},
                emphasis: {label: {show: !1}, lineStyle: {}}
            }
        },
        textStyle: {
            decoration: "none",
            fontFamily: "Arial, Verdana, sans-serif",
            fontFamily2: "微软雅黑",
            fontSize: 12,
            fontStyle: "normal",
            fontWeight: "normal"
        },
        EVENT: {
            REFRESH: "refresh",
            RESTORE: "restore",
            RESIZE: "resize",
            CLICK: "click",
            DBLCLICK: "dblclick",
            HOVER: "hover",
            MOUSEOUT: "mouseout",
            DATA_CHANGED: "dataChanged",
            DATA_ZOOM: "dataZoom",
            DATA_RANGE: "dataRange",
            DATA_RANGE_HOVERLINK: "dataRangeHoverLink",
            LEGEND_SELECTED: "legendSelected",
            LEGEND_HOVERLINK: "legendHoverLink",
            MAP_SELECTED: "mapSelected",
            PIE_SELECTED: "pieSelected",
            MAGIC_TYPE_CHANGED: "magicTypeChanged",
            DATA_VIEW_CHANGED: "dataViewChanged",
            TIMELINE_CHANGED: "timelineChanged",
            MAP_ROAM: "mapRoam",
            FORCE_LAYOUT_END: "forceLayoutEnd",
            TOOLTIP_HOVER: "tooltipHover",
            TOOLTIP_IN_GRID: "tooltipInGrid",
            TOOLTIP_OUT_GRID: "tooltipOutGrid",
            ROAMCONTROLLER: "roamController"
        },
        DRAG_ENABLE_TIME: 120,
        EFFECT_ZLEVEL: 7,
        symbolList: ["circle", "rectangle", "triangle", "diamond", "emptyCircle", "emptyRectangle", "emptyTriangle", "emptyDiamond"],
        loadingText: "Loading...",
        calculable: !1,
        calculableColor: "rgba(255,165,0,0.6)",
        calculableHolderColor: "#ccc",
        nameConnector: " & ",
        valueConnector: ": ",
        animation: !0,
        addDataAnimation: !0,
        animationThreshold: 2e3,
        animationDuration: 2e3,
        animationEasing: "ExponentialOut"
    };
    return t
}), define("zrender/tool/util", ["require", "../dep/excanvas"], function (t) {
    function e(t) {
        if ("object" == typeof t && null !== t) {
            var i = t;
            if (t instanceof Array) {
                i = [];
                for (var o = 0, n = t.length; n > o; o++)i[o] = e(t[o])
            } else if (!g[Object.prototype.toString.call(t)]) {
                i = {};
                for (var r in t)t.hasOwnProperty(r) && (i[r] = e(t[r]))
            }
            return i
        }
        return t
    }

    function i(t, e, i, n) {
        e.hasOwnProperty(i) && ("object" != typeof t[i] || g[Object.prototype.toString.call(t[i])] ? !n && i in t || (t[i] = e[i]) : o(t[i], e[i], n))
    }

    function o(t, e, o) {
        for (var n in e)i(t, e, n, o);
        return t
    }

    function n() {
        if (!d)if (t("../dep/excanvas"), window.G_vmlCanvasManager) {
            var e = document.createElement("div");
            e.style.position = "absolute", e.style.top = "-1000px", document.body.appendChild(e), d = G_vmlCanvasManager.initElement(e).getContext("2d")
        } else d = document.createElement("canvas").getContext("2d");
        return d
    }

    function r() {
        return u || (c = document.createElement("canvas"), p = c.width, f = c.height, u = c.getContext("2d")), u
    }

    function s(t, e) {
        var i, o = 100;
        t + m > p && (p = t + m + o, c.width = p, i = !0), e + _ > f && (f = e + _ + o, c.height = f, i = !0), -m > t && (m = Math.ceil(-t / o) * o, p += m, c.width = p, i = !0), -_ > e && (_ = Math.ceil(-e / o) * o, f += _, c.height = f, i = !0), i && u.translate(m, _)
    }

    function a() {
        return {x: m, y: _}
    }

    function h(t, e) {
        if (t.indexOf)return t.indexOf(e);
        for (var i = 0, o = t.length; o > i; i++)if (t[i] === e)return i;
        return -1
    }

    function l(t, e) {
        function i() {
        }

        var o = t.prototype;
        i.prototype = e.prototype, t.prototype = new i;
        for (var n in o)t.prototype[n] = o[n];
        t.constructor = t
    }

    var d, c, u, p, f, g = {
        "[object Function]": 1,
        "[object RegExp]": 1,
        "[object Date]": 1,
        "[object Error]": 1,
        "[object CanvasGradient]": 1
    }, m = 0, _ = 0;
    return {
        inherits: l,
        clone: e,
        merge: o,
        getContext: n,
        getPixelContext: r,
        getPixelOffset: a,
        adjustCanvasSize: s,
        indexOf: h
    }
}), define("zrender/tool/event", ["require", "../mixin/Eventful"], function (t) {
    "use strict";
    function e(t) {
        return "undefined" != typeof t.zrenderX && t.zrenderX || "undefined" != typeof t.offsetX && t.offsetX || "undefined" != typeof t.layerX && t.layerX || "undefined" != typeof t.clientX && t.clientX
    }

    function i(t) {
        return "undefined" != typeof t.zrenderY && t.zrenderY || "undefined" != typeof t.offsetY && t.offsetY || "undefined" != typeof t.layerY && t.layerY || "undefined" != typeof t.clientY && t.clientY
    }

    function o(t) {
        return "undefined" != typeof t.zrenderDelta && t.zrenderDelta || "undefined" != typeof t.wheelDelta && t.wheelDelta || "undefined" != typeof t.detail && -t.detail
    }

    var n = t("../mixin/Eventful"), r = "function" == typeof window.addEventListener ? function (t) {
        t.preventDefault(), t.stopPropagation(), t.cancelBubble = !0
    } : function (t) {
        t.returnValue = !1, t.cancelBubble = !0
    };
    return {getX: e, getY: i, getDelta: o, stop: r, Dispatcher: n}
}), define("zrender/tool/env", [], function () {
    function t(t) {
        var e = this.os = {}, i = this.browser = {}, o = t.match(/Web[kK]it[\/]{0,1}([\d.]+)/), n = t.match(/(Android);?[\s\/]+([\d.]+)?/), r = t.match(/(iPad).*OS\s([\d_]+)/), s = t.match(/(iPod)(.*OS\s([\d_]+))?/), a = !r && t.match(/(iPhone\sOS)\s([\d_]+)/), h = t.match(/(webOS|hpwOS)[\s\/]([\d.]+)/), l = h && t.match(/TouchPad/), d = t.match(/Kindle\/([\d.]+)/), c = t.match(/Silk\/([\d._]+)/), u = t.match(/(BlackBerry).*Version\/([\d.]+)/), p = t.match(/(BB10).*Version\/([\d.]+)/), f = t.match(/(RIM\sTablet\sOS)\s([\d.]+)/), g = t.match(/PlayBook/), m = t.match(/Chrome\/([\d.]+)/) || t.match(/CriOS\/([\d.]+)/), _ = t.match(/Firefox\/([\d.]+)/), y = t.match(/MSIE ([\d.]+)/), v = o && t.match(/Mobile\//) && !m, x = t.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/) && !m, y = t.match(/MSIE\s([\d.]+)/);
        return (i.webkit = !!o) && (i.version = o[1]), n && (e.android = !0, e.version = n[2]), a && !s && (e.ios = e.iphone = !0, e.version = a[2].replace(/_/g, ".")), r && (e.ios = e.ipad = !0, e.version = r[2].replace(/_/g, ".")), s && (e.ios = e.ipod = !0, e.version = s[3] ? s[3].replace(/_/g, ".") : null), h && (e.webos = !0, e.version = h[2]), l && (e.touchpad = !0), u && (e.blackberry = !0, e.version = u[2]), p && (e.bb10 = !0, e.version = p[2]), f && (e.rimtabletos = !0, e.version = f[2]), g && (i.playbook = !0), d && (e.kindle = !0, e.version = d[1]), c && (i.silk = !0, i.version = c[1]), !c && e.android && t.match(/Kindle Fire/) && (i.silk = !0), m && (i.chrome = !0, i.version = m[1]), _ && (i.firefox = !0, i.version = _[1]), y && (i.ie = !0, i.version = y[1]), v && (t.match(/Safari/) || e.ios) && (i.safari = !0), x && (i.webview = !0), y && (i.ie = !0, i.version = y[1]), e.tablet = !!(r || g || n && !t.match(/Mobile/) || _ && t.match(/Tablet/) || y && !t.match(/Phone/) && t.match(/Touch/)), e.phone = !(e.tablet || e.ipod || !(n || a || h || u || p || m && t.match(/Android/) || m && t.match(/CriOS\/([\d.]+)/) || _ && t.match(/Mobile/) || y && t.match(/Touch/))), {
            browser: i,
            os: e,
            canvasSupported: document.createElement("canvas").getContext ? !0 : !1
        }
    }

    return t(navigator.userAgent)
}), define("zrender", ["zrender/zrender"], function (t) {
    return t
}), define("zrender/zrender", ["require", "./dep/excanvas", "./tool/util", "./tool/log", "./tool/guid", "./Handler", "./Painter", "./Storage", "./animation/Animation", "./tool/env"], function (t) {
    function e(t) {
        return function () {
            for (var e = t.animatingElements, i = 0, o = e.length; o > i; i++)t.storage.mod(e[i].id);
            (e.length || t._needsRefreshNextFrame) && t.refresh()
        }
    }

    t("./dep/excanvas");
    var i = t("./tool/util"), o = t("./tool/log"), n = t("./tool/guid"), r = t("./Handler"), s = t("./Painter"), a = t("./Storage"), h = t("./animation/Animation"), l = {}, d = {};
    d.version = "2.0.6", d.init = function (t) {
        var e = new c(n(), t);
        return l[e.id] = e, e
    }, d.dispose = function (t) {
        if (t)t.dispose(); else {
            for (var e in l)l[e].dispose();
            l = {}
        }
        return d
    }, d.getInstance = function (t) {
        return l[t]
    }, d.delInstance = function (t) {
        return delete l[t], d
    };
    var c = function (i, o) {
        this.id = i, this.env = t("./tool/env"), this.storage = new a, this.painter = new s(o, this.storage), this.handler = new r(o, this.storage, this.painter), this.animatingElements = [], this.animation = new h({stage: {update: e(this)}}), this.animation.start();
        var n = this;
        this.painter.refreshNextFrame = function () {
            n.refreshNextFrame()
        }, this._needsRefreshNextFrame = !1
    };
    return c.prototype.getId = function () {
        return this.id
    }, c.prototype.addShape = function (t) {
        return this.storage.addRoot(t), this
    }, c.prototype.addGroup = function (t) {
        return this.storage.addRoot(t), this
    }, c.prototype.delShape = function (t) {
        return this.storage.delRoot(t), this
    }, c.prototype.delGroup = function (t) {
        return this.storage.delRoot(t), this
    }, c.prototype.modShape = function (t, e) {
        return this.storage.mod(t, e), this
    }, c.prototype.modGroup = function (t, e) {
        return this.storage.mod(t, e), this
    }, c.prototype.modLayer = function (t, e) {
        return this.painter.modLayer(t, e), this
    }, c.prototype.addHoverShape = function (t) {
        return this.storage.addHover(t), this
    }, c.prototype.render = function (t) {
        return this.painter.render(t), this._needsRefreshNextFrame = !1, this
    }, c.prototype.refresh = function (t) {
        return this.painter.refresh(t), this._needsRefreshNextFrame = !1, this
    }, c.prototype.refreshNextFrame = function () {
        return this._needsRefreshNextFrame = !0, this
    }, c.prototype.refreshHover = function (t) {
        return this.painter.refreshHover(t), this
    }, c.prototype.refreshShapes = function (t, e) {
        return this.painter.refreshShapes(t, e), this
    }, c.prototype.resize = function () {
        return this.painter.resize(), this
    }, c.prototype.animate = function (t, e, n) {
        if ("string" == typeof t && (t = this.storage.get(t)), t) {
            var r;
            if (e) {
                for (var s = e.split("."), a = t, h = 0, l = s.length; l > h; h++)a && (a = a[s[h]]);
                a && (r = a)
            } else r = t;
            if (!r)return void o('Property "' + e + '" is not existed in element ' + t.id);
            var d = this.animatingElements;
            return "undefined" == typeof t.__aniCount && (t.__aniCount = 0), 0 === t.__aniCount && d.push(t), t.__aniCount++, this.animation.animate(r, {loop: n}).done(function () {
                if (t.__aniCount--, 0 === t.__aniCount) {
                    var e = i.indexOf(d, t);
                    d.splice(e, 1)
                }
            })
        }
        o("Element not existed")
    }, c.prototype.clearAnimation = function () {
        this.animation.clear()
    }, c.prototype.showLoading = function (t) {
        return this.painter.showLoading(t), this
    }, c.prototype.hideLoading = function () {
        return this.painter.hideLoading(), this
    }, c.prototype.getWidth = function () {
        return this.painter.getWidth()
    }, c.prototype.getHeight = function () {
        return this.painter.getHeight()
    }, c.prototype.toDataURL = function (t, e, i) {
        return this.painter.toDataURL(t, e, i)
    }, c.prototype.shapeToImage = function (t, e, i) {
        var o = n();
        return this.painter.shapeToImage(o, t, e, i)
    }, c.prototype.on = function (t, e) {
        return this.handler.on(t, e), this
    }, c.prototype.un = function (t, e) {
        return this.handler.un(t, e), this
    }, c.prototype.trigger = function (t, e) {
        return this.handler.trigger(t, e), this
    }, c.prototype.clear = function () {
        return this.storage.delRoot(), this.painter.clear(), this
    }, c.prototype.dispose = function () {
        this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.animatingElements = this.storage = this.painter = this.handler = null, d.delInstance(this.id)
    }, d
}), define("zrender/config", [], function () {
    var t = {
        EVENT: {
            RESIZE: "resize",
            CLICK: "click",
            DBLCLICK: "dblclick",
            MOUSEWHEEL: "mousewheel",
            MOUSEMOVE: "mousemove",
            MOUSEOVER: "mouseover",
            MOUSEOUT: "mouseout",
            MOUSEDOWN: "mousedown",
            MOUSEUP: "mouseup",
            GLOBALOUT: "globalout",
            DRAGSTART: "dragstart",
            DRAGEND: "dragend",
            DRAGENTER: "dragenter",
            DRAGOVER: "dragover",
            DRAGLEAVE: "dragleave",
            DROP: "drop",
            touchClickDelay: 300
        }, catchBrushException: !1, debugMode: 0
    };
    return t
}), define("echarts/chart/island", ["require", "../component/base", "./base", "zrender/shape/Circle", "../config", "../util/ecData", "zrender/tool/util", "zrender/tool/event", "zrender/tool/color", "../util/accMath", "../chart"], function (t) {
    function e(t, e, n, r, a) {
        i.call(this, t, e, n, {}, a), o.call(this), this._nameConnector, this._valueConnector, this._zrHeight = this.zr.getHeight(), this._zrWidth = this.zr.getWidth();
        var l = this;
        l.shapeHandler.onmousewheel = function (t) {
            var e = t.target, i = t.event, o = h.getDelta(i);
            o = o > 0 ? -1 : 1, e.style.r -= o, e.style.r = e.style.r < 5 ? 5 : e.style.r;
            var n = s.get(e, "value"), r = n * l.option.island.calculateStep;
            n = r > 1 ? Math.round(n - r * o) : (n - r * o).toFixed(2) - 0;
            var a = s.get(e, "name");
            e.style.text = a + ":" + n, s.set(e, "value", n), s.set(e, "name", a), l.zr.modShape(e.id), l.zr.refresh(), h.stop(i)
        }
    }

    var i = t("../component/base"), o = t("./base"), n = t("zrender/shape/Circle"), r = t("../config"), s = t("../util/ecData"), a = t("zrender/tool/util"), h = t("zrender/tool/event");
    return e.prototype = {
        type: r.CHART_TYPE_ISLAND, _combine: function (e, i) {
            var o = t("zrender/tool/color"), n = t("../util/accMath"), r = n.accAdd(s.get(e, "value"), s.get(i, "value")), a = s.get(e, "name") + this._nameConnector + s.get(i, "name");
            e.style.text = a + this._valueConnector + r, s.set(e, "value", r), s.set(e, "name", a), e.style.r = this.option.island.r, e.style.color = o.mix(e.style.color, i.style.color)
        }, refresh: function (t) {
            t && (t.island = this.reformOption(t.island), this.option = t, this._nameConnector = this.option.nameConnector, this._valueConnector = this.option.valueConnector)
        }, getOption: function () {
            return this.option
        }, resize: function () {
            var t = this.zr.getWidth(), e = this.zr.getHeight(), i = t / (this._zrWidth || t), o = e / (this._zrHeight || e);
            if (1 !== i || 1 !== o) {
                this._zrWidth = t, this._zrHeight = e;
                for (var n = 0, r = this.shapeList.length; r > n; n++)this.zr.modShape(this.shapeList[n].id, {
                    style: {
                        x: Math.round(this.shapeList[n].style.x * i),
                        y: Math.round(this.shapeList[n].style.y * o)
                    }
                })
            }
        }, add: function (t) {
            var e = s.get(t, "name"), i = s.get(t, "value"), o = null != s.get(t, "series") ? s.get(t, "series").name : "", r = this.getFont(this.option.island.textStyle), a = {
                zlevel: this._zlevelBase,
                style: {
                    x: t.style.x,
                    y: t.style.y,
                    r: this.option.island.r,
                    color: t.style.color || t.style.strokeColor,
                    text: e + this._valueConnector + i,
                    textFont: r
                },
                draggable: !0,
                hoverable: !0,
                onmousewheel: this.shapeHandler.onmousewheel,
                _type: "island"
            };
            "#fff" === a.style.color && (a.style.color = t.style.strokeColor), this.setCalculable(a), a.dragEnableTime = 0, s.pack(a, {name: o}, -1, i, -1, e), a = new n(a), this.shapeList.push(a), this.zr.addShape(a)
        }, del: function (t) {
            this.zr.delShape(t.id);
            for (var e = [], i = 0, o = this.shapeList.length; o > i; i++)this.shapeList[i].id != t.id && e.push(this.shapeList[i]);
            this.shapeList = e
        }, ondrop: function (t, e) {
            if (this.isDrop && t.target) {
                var i = t.target, o = t.dragged;
                this._combine(i, o), this.zr.modShape(i.id), e.dragIn = !0, this.isDrop = !1
            }
        }, ondragend: function (t, e) {
            var i = t.target;
            this.isDragend ? e.dragIn && (this.del(i), e.needRefresh = !0) : e.dragIn || (i.style.x = h.getX(t.event), i.style.y = h.getY(t.event), this.add(i), e.needRefresh = !0), this.isDragend = !1
        }
    }, a.inherits(e, o), a.inherits(e, i), t("../chart").define("island", e), e
}), define("echarts/component/toolbox", ["require", "./base", "zrender/shape/Line", "zrender/shape/Image", "zrender/shape/Rectangle", "../util/shape/Icon", "../config", "zrender/tool/util", "zrender/config", "zrender/tool/event", "./dataView", "../component"], function (t) {
    function e(t, e, o, n, r) {
        i.call(this, t, e, o, n, r), this.dom = r.dom, this._magicType = {}, this._magicMap = {}, this._isSilence = !1, this._iconList, this._iconShapeMap = {}, this._featureTitle = {}, this._featureIcon = {}, this._featureColor = {}, this._featureOption = {}, this._enableColor = "red", this._disableColor = "#ccc", this._markShapeList = [];
        var s = this;
        s._onMark = function (t) {
            s.__onMark(t)
        }, s._onMarkUndo = function (t) {
            s.__onMarkUndo(t)
        }, s._onMarkClear = function (t) {
            s.__onMarkClear(t)
        }, s._onDataZoom = function (t) {
            s.__onDataZoom(t)
        }, s._onDataZoomReset = function (t) {
            s.__onDataZoomReset(t)
        }, s._onDataView = function (t) {
            s.__onDataView(t)
        }, s._onRestore = function (t) {
            s.__onRestore(t)
        }, s._onSaveAsImage = function (t) {
            s.__onSaveAsImage(t)
        }, s._onMagicType = function (t) {
            s.__onMagicType(t)
        }, s._onCustomHandler = function (t) {
            s.__onCustomHandler(t)
        }, s._onmousemove = function (t) {
            return s.__onmousemove(t)
        }, s._onmousedown = function (t) {
            return s.__onmousedown(t)
        }, s._onmouseup = function (t) {
            return s.__onmouseup(t)
        }, s._onclick = function (t) {
            return s.__onclick(t)
        }
    }

    var i = t("./base"), o = t("zrender/shape/Line"), n = t("zrender/shape/Image"), r = t("zrender/shape/Rectangle"), s = t("../util/shape/Icon"), a = t("../config"), h = t("zrender/tool/util"), l = t("zrender/config"), d = t("zrender/tool/event"), c = "stack", u = "tiled";
    return e.prototype = {
        type: a.COMPONENT_TYPE_TOOLBOX, _buildShape: function () {
            this._iconList = [];
            var t = this.option.toolbox;
            this._enableColor = t.effectiveColor, this._disableColor = t.disableColor;
            var e = t.feature, i = [];
            for (var o in e)if (e[o].show)switch (o) {
                case"mark":
                    i.push({key: o, name: "mark"}), i.push({key: o, name: "markUndo"}), i.push({
                        key: o,
                        name: "markClear"
                    });
                    break;
                case"magicType":
                    for (var n = 0, r = e[o].type.length; r > n; n++)e[o].title[e[o].type[n] + "Chart"] = e[o].title[e[o].type[n]], e[o].option && (e[o].option[e[o].type[n] + "Chart"] = e[o].option[e[o].type[n]]), i.push({
                        key: o,
                        name: e[o].type[n] + "Chart"
                    });
                    break;
                case"dataZoom":
                    i.push({key: o, name: "dataZoom"}), i.push({key: o, name: "dataZoomReset"});
                    break;
                case"saveAsImage":
                    this.canvasSupported && i.push({key: o, name: "saveAsImage"});
                    break;
                default:
                    i.push({key: o, name: o})
            }
            if (i.length > 0) {
                for (var s, o, n = 0, r = i.length; r > n; n++)s = i[n].name, o = i[n].key, this._iconList.push(s), this._featureTitle[s] = e[o].title[s] || e[o].title, e[o].icon && (this._featureIcon[s] = e[o].icon[s] || e[o].icon), e[o].color && (this._featureColor[s] = e[o].color[s] || e[o].color), e[o].option && (this._featureOption[s] = e[o].option[s] || e[o].option);
                this._itemGroupLocation = this._getItemGroupLocation(), this._buildBackground(), this._buildItem();
                for (var n = 0, r = this.shapeList.length; r > n; n++)this.zr.addShape(this.shapeList[n]);
                this._iconShapeMap.mark && (this._iconDisable(this._iconShapeMap.markUndo), this._iconDisable(this._iconShapeMap.markClear)), this._iconShapeMap.dataZoomReset && 0 === this._zoomQueue.length && this._iconDisable(this._iconShapeMap.dataZoomReset)
            }
        }, _buildItem: function () {
            var e, i, o, r, a = this.option.toolbox, h = this._iconList.length, l = this._itemGroupLocation.x, d = this._itemGroupLocation.y, c = a.itemSize, u = a.itemGap, p = a.color instanceof Array ? a.color : [a.color], f = this.getFont(a.textStyle);
            "horizontal" === a.orient ? (i = this._itemGroupLocation.y / this.zr.getHeight() < .5 ? "bottom" : "top", o = this._itemGroupLocation.x / this.zr.getWidth() < .5 ? "left" : "right", r = this._itemGroupLocation.y / this.zr.getHeight() < .5 ? "top" : "bottom") : i = this._itemGroupLocation.x / this.zr.getWidth() < .5 ? "right" : "left", this._iconShapeMap = {};
            for (var g = this, m = 0; h > m; m++) {
                switch (e = {
                    type: "icon",
                    zlevel: this._zlevelBase,
                    style: {
                        x: l,
                        y: d,
                        width: c,
                        height: c,
                        iconType: this._iconList[m],
                        lineWidth: 1,
                        strokeColor: this._featureColor[this._iconList[m]] || p[m % p.length],
                        brushType: "stroke"
                    },
                    highlightStyle: {
                        lineWidth: 1,
                        text: a.showTitle ? this._featureTitle[this._iconList[m]] : void 0,
                        textFont: f,
                        textPosition: i,
                        strokeColor: this._featureColor[this._iconList[m]] || p[m % p.length]
                    },
                    hoverable: !0,
                    clickable: !0
                }, this._featureIcon[this._iconList[m]] && (e.style.image = this._featureIcon[this._iconList[m]].replace(new RegExp("^image:\\/\\/"), ""), e.style.opacity = .8, e.highlightStyle.opacity = 1, e.type = "image"), "horizontal" === a.orient && (0 === m && "left" === o && (e.highlightStyle.textPosition = "specific", e.highlightStyle.textAlign = o, e.highlightStyle.textBaseline = r, e.highlightStyle.textX = l, e.highlightStyle.textY = "top" === r ? d + c + 10 : d - 10), m === h - 1 && "right" === o && (e.highlightStyle.textPosition = "specific", e.highlightStyle.textAlign = o, e.highlightStyle.textBaseline = r, e.highlightStyle.textX = l + c, e.highlightStyle.textY = "top" === r ? d + c + 10 : d - 10)), this._iconList[m]) {
                    case"mark":
                        e.onclick = g._onMark;
                        break;
                    case"markUndo":
                        e.onclick = g._onMarkUndo;
                        break;
                    case"markClear":
                        e.onclick = g._onMarkClear;
                        break;
                    case"dataZoom":
                        e.onclick = g._onDataZoom;
                        break;
                    case"dataZoomReset":
                        e.onclick = g._onDataZoomReset;
                        break;
                    case"dataView":
                        if (!this._dataView) {
                            var _ = t("./dataView");
                            this._dataView = new _(this.ecTheme, this.messageCenter, this.zr, this.option, this.myChart)
                        }
                        e.onclick = g._onDataView;
                        break;
                    case"restore":
                        e.onclick = g._onRestore;
                        break;
                    case"saveAsImage":
                        e.onclick = g._onSaveAsImage;
                        break;
                    default:
                        this._iconList[m].match("Chart") ? (e._name = this._iconList[m].replace("Chart", ""), e.onclick = g._onMagicType) : e.onclick = g._onCustomHandler
                }
                "icon" === e.type ? e = new s(e) : "image" === e.type && (e = new n(e)), this.shapeList.push(e), this._iconShapeMap[this._iconList[m]] = e, "horizontal" === a.orient ? l += c + u : d += c + u
            }
        }, _buildBackground: function () {
            var t = this.option.toolbox, e = this.reformCssArray(this.option.toolbox.padding);
            this.shapeList.push(new r({
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {
                    x: this._itemGroupLocation.x - e[3],
                    y: this._itemGroupLocation.y - e[0],
                    width: this._itemGroupLocation.width + e[3] + e[1],
                    height: this._itemGroupLocation.height + e[0] + e[2],
                    brushType: 0 === t.borderWidth ? "fill" : "both",
                    color: t.backgroundColor,
                    strokeColor: t.borderColor,
                    lineWidth: t.borderWidth
                }
            }))
        }, _getItemGroupLocation: function () {
            var t = this.option.toolbox, e = this.reformCssArray(this.option.toolbox.padding), i = this._iconList.length, o = t.itemGap, n = t.itemSize, r = 0, s = 0;
            "horizontal" === t.orient ? (r = (n + o) * i - o, s = n) : (s = (n + o) * i - o, r = n);
            var a, h = this.zr.getWidth();
            switch (t.x) {
                case"center":
                    a = Math.floor((h - r) / 2);
                    break;
                case"left":
                    a = e[3] + t.borderWidth;
                    break;
                case"right":
                    a = h - r - e[1] - t.borderWidth;
                    break;
                default:
                    a = t.x - 0, a = isNaN(a) ? 0 : a
            }
            var l, d = this.zr.getHeight();
            switch (t.y) {
                case"top":
                    l = e[0] + t.borderWidth;
                    break;
                case"bottom":
                    l = d - s - e[2] - t.borderWidth;
                    break;
                case"center":
                    l = Math.floor((d - s) / 2);
                    break;
                default:
                    l = t.y - 0, l = isNaN(l) ? 0 : l
            }
            return {x: a, y: l, width: r, height: s}
        }, __onmousemove: function (t) {
            this._marking && (this._markShape.style.xEnd = d.getX(t.event), this._markShape.style.yEnd = d.getY(t.event), this.zr.addHoverShape(this._markShape)), this._zooming && (this._zoomShape.style.width = d.getX(t.event) - this._zoomShape.style.x, this._zoomShape.style.height = d.getY(t.event) - this._zoomShape.style.y, this.zr.addHoverShape(this._zoomShape), this.dom.style.cursor = "crosshair"), this._zoomStart && "pointer" != this.dom.style.cursor && "move" != this.dom.style.cursor && (this.dom.style.cursor = "crosshair")
        }, __onmousedown: function (t) {
            if (!t.target) {
                this._zooming = !0;
                var e = d.getX(t.event), i = d.getY(t.event), o = this.option.dataZoom || {};
                return this._zoomShape = new r({
                    zlevel: this._zlevelBase,
                    style: {x: e, y: i, width: 1, height: 1, brushType: "both"},
                    highlightStyle: {
                        lineWidth: 2,
                        color: o.fillerColor || a.dataZoom.fillerColor,
                        strokeColor: o.handleColor || a.dataZoom.handleColor,
                        brushType: "both"
                    }
                }), this.zr.addHoverShape(this._zoomShape), !0
            }
        }, __onmouseup: function () {
            if (!this._zoomShape || Math.abs(this._zoomShape.style.width) < 10 || Math.abs(this._zoomShape.style.height) < 10)return this._zooming = !1, !0;
            if (this._zooming && this.component.dataZoom) {
                this._zooming = !1;
                var t = this.component.dataZoom.rectZoom(this._zoomShape.style);
                t && (this._zoomQueue.push({
                    start: t.start,
                    end: t.end,
                    start2: t.start2,
                    end2: t.end2
                }), this._iconEnable(this._iconShapeMap.dataZoomReset), this.zr.refresh())
            }
            return !0
        }, __onclick: function (t) {
            if (!t.target)if (this._marking)this._marking = !1, this._markShapeList.push(this._markShape), this._iconEnable(this._iconShapeMap.markUndo), this._iconEnable(this._iconShapeMap.markClear), this.zr.addShape(this._markShape), this.zr.refresh(); else if (this._markStart) {
                this._marking = !0;
                var e = d.getX(t.event), i = d.getY(t.event);
                this._markShape = new o({
                    zlevel: this._zlevelBase,
                    style: {
                        xStart: e,
                        yStart: i,
                        xEnd: e,
                        yEnd: i,
                        lineWidth: this.query(this.option, "toolbox.feature.mark.lineStyle.width"),
                        strokeColor: this.query(this.option, "toolbox.feature.mark.lineStyle.color"),
                        lineType: this.query(this.option, "toolbox.feature.mark.lineStyle.type")
                    }
                }), this.zr.addHoverShape(this._markShape)
            }
        }, __onMark: function (t) {
            var e = t.target;
            if (this._marking || this._markStart)this._resetMark(), this.zr.refresh(); else {
                this._resetZoom(), this.zr.modShape(e.id, {style: {strokeColor: this._enableColor}}), this.zr.refresh(), this._markStart = !0;
                var i = this;
                setTimeout(function () {
                    i.zr && i.zr.on(l.EVENT.CLICK, i._onclick) && i.zr.on(l.EVENT.MOUSEMOVE, i._onmousemove)
                }, 10)
            }
            return !0
        }, __onMarkUndo: function () {
            if (this._marking)this._marking = !1; else {
                var t = this._markShapeList.length;
                if (t >= 1) {
                    var e = this._markShapeList[t - 1];
                    this.zr.delShape(e.id), this.zr.refresh(), this._markShapeList.pop(), 1 === t && (this._iconDisable(this._iconShapeMap.markUndo), this._iconDisable(this._iconShapeMap.markClear))
                }
            }
            return !0
        }, __onMarkClear: function () {
            this._marking && (this._marking = !1);
            var t = this._markShapeList.length;
            if (t > 0) {
                for (; t--;)this.zr.delShape(this._markShapeList.pop().id);
                this._iconDisable(this._iconShapeMap.markUndo), this._iconDisable(this._iconShapeMap.markClear), this.zr.refresh()
            }
            return !0
        }, __onDataZoom: function (t) {
            var e = t.target;
            if (this._zooming || this._zoomStart)this._resetZoom(), this.zr.refresh(), this.dom.style.cursor = "default"; else {
                this._resetMark(), this.zr.modShape(e.id, {style: {strokeColor: this._enableColor}}), this.zr.refresh(), this._zoomStart = !0;
                var i = this;
                setTimeout(function () {
                    i.zr && i.zr.on(l.EVENT.MOUSEDOWN, i._onmousedown) && i.zr.on(l.EVENT.MOUSEUP, i._onmouseup) && i.zr.on(l.EVENT.MOUSEMOVE, i._onmousemove)
                }, 10), this.dom.style.cursor = "crosshair"
            }
            return !0
        }, __onDataZoomReset: function () {
            return this._zooming && (this._zooming = !1), this._zoomQueue.pop(), this._zoomQueue.length > 0 ? this.component.dataZoom.absoluteZoom(this._zoomQueue[this._zoomQueue.length - 1]) : (this.component.dataZoom.rectZoom(), this._iconDisable(this._iconShapeMap.dataZoomReset), this.zr.refresh()), !0
        }, _resetMark: function () {
            this._marking = !1, this._markStart && (this._markStart = !1, this._iconShapeMap.mark && this.zr.modShape(this._iconShapeMap.mark.id, {style: {strokeColor: this._iconShapeMap.mark.highlightStyle.strokeColor}}), this.zr.un(l.EVENT.CLICK, this._onclick), this.zr.un(l.EVENT.MOUSEMOVE, this._onmousemove))
        }, _resetZoom: function () {
            this._zooming = !1, this._zoomStart && (this._zoomStart = !1, this._iconShapeMap.dataZoom && this.zr.modShape(this._iconShapeMap.dataZoom.id, {style: {strokeColor: this._iconShapeMap.dataZoom.highlightStyle.strokeColor}}), this.zr.un(l.EVENT.MOUSEDOWN, this._onmousedown), this.zr.un(l.EVENT.MOUSEUP, this._onmouseup), this.zr.un(l.EVENT.MOUSEMOVE, this._onmousemove))
        }, _iconDisable: function (t) {
            "image" != t.type ? this.zr.modShape(t.id, {
                hoverable: !1,
                clickable: !1,
                style: {strokeColor: this._disableColor}
            }) : this.zr.modShape(t.id, {hoverable: !1, clickable: !1, style: {opacity: .3}})
        }, _iconEnable: function (t) {
            "image" != t.type ? this.zr.modShape(t.id, {
                hoverable: !0,
                clickable: !0,
                style: {strokeColor: t.highlightStyle.strokeColor}
            }) : this.zr.modShape(t.id, {hoverable: !0, clickable: !0, style: {opacity: .8}})
        }, __onDataView: function () {
            return this._dataView.show(this.option), !0
        }, __onRestore: function () {
            return this._resetMark(), this._resetZoom(), this.messageCenter.dispatch(a.EVENT.RESTORE, null, null, this.myChart), !0
        }, __onSaveAsImage: function () {
            var t = this.option.toolbox.feature.saveAsImage, e = t.type || "png";
            "png" != e && "jpeg" != e && (e = "png");
            var i;
            i = this.myChart.isConnected() ? this.myChart.getConnectedDataURL(e) : this.zr.toDataURL("image/" + e, this.option.backgroundColor && "rgba(0,0,0,0)" === this.option.backgroundColor.replace(" ", "") ? "#fff" : this.option.backgroundColor);
            var o = document.createElement("div");
            o.id = "__echarts_download_wrap__", o.style.cssText = "position:fixed;z-index:99999;display:block;top:0;left:0;background-color:rgba(33,33,33,0.5);text-align:center;width:100%;height:100%;line-height:" + document.documentElement.clientHeight + "px;";
            var n = document.createElement("a");
            n.href = i, n.setAttribute("download", (t.name ? t.name : this.option.title && (this.option.title.text || this.option.title.subtext) ? this.option.title.text || this.option.title.subtext : "ECharts") + "." + e), n.innerHTML = '<img style="vertical-align:middle" src="' + i + '" title="' + (window.attachEvent && -1 === navigator.userAgent.indexOf("Opera") ? "右键->图片另存为" : t.lang ? t.lang[0] : "点击保存") + '"/>', o.appendChild(n), document.body.appendChild(o), n = null, o = null, setTimeout(function () {
                var t = document.getElementById("__echarts_download_wrap__");
                t && (t.onclick = function () {
                    var t = document.getElementById("__echarts_download_wrap__");
                    t.onclick = null, t.innerHTML = "", document.body.removeChild(t), t = null
                }, t = null)
            }, 500)
        }, __onMagicType: function (t) {
            this._resetMark();
            var e = t.target._name;
            return this._magicType[e] || (this._magicType[e] = !0, e === a.CHART_TYPE_LINE ? this._magicType[a.CHART_TYPE_BAR] = !1 : e === a.CHART_TYPE_BAR && (this._magicType[a.CHART_TYPE_LINE] = !1), e === a.CHART_TYPE_PIE ? this._magicType[a.CHART_TYPE_FUNNEL] = !1 : e === a.CHART_TYPE_FUNNEL && (this._magicType[a.CHART_TYPE_PIE] = !1), e === a.CHART_TYPE_FORCE ? this._magicType[a.CHART_TYPE_CHORD] = !1 : e === a.CHART_TYPE_CHORD && (this._magicType[a.CHART_TYPE_FORCE] = !1), e === c ? this._magicType[u] = !1 : e === u && (this._magicType[c] = !1), this.messageCenter.dispatch(a.EVENT.MAGIC_TYPE_CHANGED, t.event, {magicType: this._magicType}, this.myChart)), !0
        }, setMagicType: function (t) {
            this._resetMark(), this._magicType = t, !this._isSilence && this.messageCenter.dispatch(a.EVENT.MAGIC_TYPE_CHANGED, null, {magicType: this._magicType}, this.myChart)
        }, __onCustomHandler: function (t) {
            var e = t.target.style.iconType, i = this.option.toolbox.feature[e].onclick;
            "function" == typeof i && i.call(this, this.option)
        }, reset: function (t, e) {
            if (e && this.clear(), this.query(t, "toolbox.show") && this.query(t, "toolbox.feature.magicType.show")) {
                var i = t.toolbox.feature.magicType.type, o = i.length;
                for (this._magicMap = {}; o--;)this._magicMap[i[o]] = !0;
                o = t.series.length;
                for (var n, r; o--;)n = t.series[o].type, this._magicMap[n] && (r = t.xAxis instanceof Array ? t.xAxis[t.series[o].xAxisIndex || 0] : t.xAxis, r && "category" === (r.type || "category") && (r.__boundaryGap = null != r.boundaryGap ? r.boundaryGap : !0), r = t.yAxis instanceof Array ? t.yAxis[t.series[o].yAxisIndex || 0] : t.yAxis, r && "category" === r.type && (r.__boundaryGap = null != r.boundaryGap ? r.boundaryGap : !0), t.series[o].__type = n, t.series[o].__itemStyle = h.clone(t.series[o].itemStyle || {})), (this._magicMap[c] || this._magicMap[u]) && (t.series[o].__stack = t.series[o].stack)
            }
            this._magicType = e ? {} : this._magicType || {};
            for (var s in this._magicType)if (this._magicType[s]) {
                this.option = t, this.getMagicOption();
                break
            }
            var a = t.dataZoom;
            if (a && a.show) {
                var l = null != a.start && a.start >= 0 && a.start <= 100 ? a.start : 0, d = null != a.end && a.end >= 0 && a.end <= 100 ? a.end : 100;
                l > d && (l += d, d = l - d, l -= d), this._zoomQueue = [{start: l, end: d, start2: 0, end2: 100}]
            } else this._zoomQueue = []
        }, getMagicOption: function () {
            var t, e;
            if (this._magicType[a.CHART_TYPE_LINE] || this._magicType[a.CHART_TYPE_BAR]) {
                for (var i = this._magicType[a.CHART_TYPE_LINE] ? !1 : !0, o = 0, n = this.option.series.length; n > o; o++)e = this.option.series[o].type, (e == a.CHART_TYPE_LINE || e == a.CHART_TYPE_BAR) && (t = this.option.xAxis instanceof Array ? this.option.xAxis[this.option.series[o].xAxisIndex || 0] : this.option.xAxis, t && "category" === (t.type || "category") && (t.boundaryGap = i ? !0 : t.__boundaryGap), t = this.option.yAxis instanceof Array ? this.option.yAxis[this.option.series[o].yAxisIndex || 0] : this.option.yAxis, t && "category" === t.type && (t.boundaryGap = i ? !0 : t.__boundaryGap));
                this._defaultMagic(a.CHART_TYPE_LINE, a.CHART_TYPE_BAR)
            }
            if (this._defaultMagic(a.CHART_TYPE_CHORD, a.CHART_TYPE_FORCE), this._defaultMagic(a.CHART_TYPE_PIE, a.CHART_TYPE_FUNNEL), this._magicType[c] || this._magicType[u])for (var o = 0, n = this.option.series.length; n > o; o++)this._magicType[c] ? (this.option.series[o].stack = "_ECHARTS_STACK_KENER_2014_", e = c) : this._magicType[u] && (this.option.series[o].stack = null, e = u), this._featureOption[e + "Chart"] && h.merge(this.option.series[o], this._featureOption[e + "Chart"] || {}, !0);
            return this.option
        }, _defaultMagic: function (t, e) {
            if (this._magicType[t] || this._magicType[e])for (var i = 0, o = this.option.series.length; o > i; i++) {
                var n = this.option.series[i].type;
                (n == t || n == e) && (this.option.series[i].type = this._magicType[t] ? t : e, this.option.series[i].itemStyle = h.clone(this.option.series[i].__itemStyle), n = this.option.series[i].type, this._featureOption[n + "Chart"] && h.merge(this.option.series[i], this._featureOption[n + "Chart"] || {}, !0))
            }
        }, silence: function (t) {
            this._isSilence = t
        }, resize: function () {
            this._resetMark(), this.clear(), this.option && this.option.toolbox && this.option.toolbox.show && this._buildShape(), this._dataView && this._dataView.resize()
        }, hideDataView: function () {
            this._dataView && this._dataView.hide()
        }, clear: function (t) {
            this.zr && (this.zr.delShape(this.shapeList), this.shapeList = [], t || (this.zr.delShape(this._markShapeList), this._markShapeList = []))
        }, onbeforDispose: function () {
            this._dataView && (this._dataView.dispose(), this._dataView = null), this._markShapeList = null
        }, refresh: function (t) {
            t && (this._resetMark(), this._resetZoom(), t.toolbox = this.reformOption(t.toolbox), this.option = t, this.clear(!0), t.toolbox.show && this._buildShape(), this.hideDataView())
        }
    }, h.inherits(e, i), t("../component").define("toolbox", e), e
}), define("echarts/component", [], function () {
    var t = {}, e = {};
    return t.define = function (i, o) {
        return e[i] = o, t
    }, t.get = function (t) {
        return e[t]
    }, t
}), define("echarts/component/title", ["require", "./base", "zrender/shape/Text", "zrender/shape/Rectangle", "../config", "zrender/tool/util", "zrender/tool/area", "zrender/tool/color", "../component"], function (t) {
    function e(t, e, o, n, r) {
        i.call(this, t, e, o, n, r), this.refresh(n)
    }

    var i = t("./base"), o = t("zrender/shape/Text"), n = t("zrender/shape/Rectangle"), r = t("../config"), s = t("zrender/tool/util"), a = t("zrender/tool/area"), h = t("zrender/tool/color");
    return e.prototype = {
        type: r.COMPONENT_TYPE_TITLE, _buildShape: function () {
            this._itemGroupLocation = this._getItemGroupLocation(), this._buildBackground(), this._buildItem();
            for (var t = 0, e = this.shapeList.length; e > t; t++)this.zr.addShape(this.shapeList[t])
        }, _buildItem: function () {
            var t = this.titleOption.text, e = this.titleOption.link, i = this.titleOption.target, n = this.titleOption.subtext, r = this.titleOption.sublink, s = this.titleOption.subtarget, a = this.getFont(this.titleOption.textStyle), l = this.getFont(this.titleOption.subtextStyle), d = this._itemGroupLocation.x, c = this._itemGroupLocation.y, u = this._itemGroupLocation.width, p = this._itemGroupLocation.height, f = {
                zlevel: this._zlevelBase,
                style: {y: c, color: this.titleOption.textStyle.color, text: t, textFont: a, textBaseline: "top"},
                highlightStyle: {color: h.lift(this.titleOption.textStyle.color, 1), brushType: "fill"},
                hoverable: !1
            };
            e && (f.hoverable = !0, f.clickable = !0, f.onclick = function () {
                i && "self" == i ? window.location = e : window.open(e)
            });
            var g = {
                zlevel: this._zlevelBase,
                style: {
                    y: c + p,
                    color: this.titleOption.subtextStyle.color,
                    text: n,
                    textFont: l,
                    textBaseline: "bottom"
                },
                highlightStyle: {color: h.lift(this.titleOption.subtextStyle.color, 1), brushType: "fill"},
                hoverable: !1
            };
            switch (r && (g.hoverable = !0, g.clickable = !0, g.onclick = function () {
                s && "self" == s ? window.location = r : window.open(r)
            }), this.titleOption.x) {
                case"center":
                    f.style.x = g.style.x = d + u / 2, f.style.textAlign = g.style.textAlign = "center";
                    break;
                case"left":
                    f.style.x = g.style.x = d, f.style.textAlign = g.style.textAlign = "left";
                    break;
                case"right":
                    f.style.x = g.style.x = d + u, f.style.textAlign = g.style.textAlign = "right";
                    break;
                default:
                    d = this.titleOption.x - 0, d = isNaN(d) ? 0 : d, f.style.x = g.style.x = d
            }
            this.titleOption.textAlign && (f.style.textAlign = g.style.textAlign = this.titleOption.textAlign), this.shapeList.push(new o(f)), "" !== n && this.shapeList.push(new o(g))
        }, _buildBackground: function () {
            var t = this.reformCssArray(this.titleOption.padding);
            this.shapeList.push(new n({
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {
                    x: this._itemGroupLocation.x - t[3],
                    y: this._itemGroupLocation.y - t[0],
                    width: this._itemGroupLocation.width + t[3] + t[1],
                    height: this._itemGroupLocation.height + t[0] + t[2],
                    brushType: 0 === this.titleOption.borderWidth ? "fill" : "both",
                    color: this.titleOption.backgroundColor,
                    strokeColor: this.titleOption.borderColor,
                    lineWidth: this.titleOption.borderWidth
                }
            }))
        }, _getItemGroupLocation: function () {
            var t, e = this.reformCssArray(this.titleOption.padding), i = this.titleOption.text, o = this.titleOption.subtext, n = this.getFont(this.titleOption.textStyle), r = this.getFont(this.titleOption.subtextStyle), s = Math.max(a.getTextWidth(i, n), a.getTextWidth(o, r)), h = a.getTextHeight(i, n) + ("" === o ? 0 : this.titleOption.itemGap + a.getTextHeight(o, r)), l = this.zr.getWidth();
            switch (this.titleOption.x) {
                case"center":
                    t = Math.floor((l - s) / 2);
                    break;
                case"left":
                    t = e[3] + this.titleOption.borderWidth;
                    break;
                case"right":
                    t = l - s - e[1] - this.titleOption.borderWidth;
                    break;
                default:
                    t = this.titleOption.x - 0, t = isNaN(t) ? 0 : t
            }
            var d, c = this.zr.getHeight();
            switch (this.titleOption.y) {
                case"top":
                    d = e[0] + this.titleOption.borderWidth;
                    break;
                case"bottom":
                    d = c - h - e[2] - this.titleOption.borderWidth;
                    break;
                case"center":
                    d = Math.floor((c - h) / 2);
                    break;
                default:
                    d = this.titleOption.y - 0, d = isNaN(d) ? 0 : d
            }
            return {x: t, y: d, width: s, height: h}
        }, refresh: function (t) {
            t && (this.option = t, this.option.title = this.reformOption(this.option.title), this.titleOption = this.option.title, this.titleOption.textStyle = s.merge(this.titleOption.textStyle, this.ecTheme.textStyle), this.titleOption.subtextStyle = s.merge(this.titleOption.subtextStyle, this.ecTheme.textStyle)), this.clear(), this._buildShape()
        }
    }, s.inherits(e, i), t("../component").define("title", e), e
}), define("echarts/component/tooltip", ["require", "./base", "../util/shape/Cross", "zrender/shape/Line", "zrender/shape/Rectangle", "../config", "../util/ecData", "zrender/config", "zrender/tool/event", "zrender/tool/area", "zrender/tool/color", "zrender/tool/util", "zrender/shape/Base", "../component"], function (t) {
    function e(t, e, r, s, a) {
        i.call(this, t, e, r, s, a), this.dom = a.dom;
        var h = this;
        h._onmousemove = function (t) {
            return h.__onmousemove(t)
        }, h._onglobalout = function (t) {
            return h.__onglobalout(t)
        }, this.zr.on(l.EVENT.MOUSEMOVE, h._onmousemove), this.zr.on(l.EVENT.GLOBALOUT, h._onglobalout), h._hide = function (t) {
            return h.__hide(t)
        }, h._tryShow = function (t) {
            return h.__tryShow(t)
        }, h._refixed = function (t) {
            return h.__refixed(t)
        }, h._setContent = function (t, e) {
            return h.__setContent(t, e)
        }, this._tDom = this._tDom || document.createElement("div"), this._tDom.onselectstart = function () {
            return !1
        }, this._tDom.onmouseover = function () {
            h._mousein = !0
        }, this._tDom.onmouseout = function () {
            h._mousein = !1
        }, this._tDom.style.position = "absolute", this.hasAppend = !1, this._axisLineShape && this.zr.delShape(this._axisLineShape.id), this._axisLineShape = new n({
            zlevel: this._zlevelBase,
            invisible: !0,
            hoverable: !1
        }), this.shapeList.push(this._axisLineShape), this.zr.addShape(this._axisLineShape), this._axisShadowShape && this.zr.delShape(this._axisShadowShape.id), this._axisShadowShape = new n({
            zlevel: 1,
            invisible: !0,
            hoverable: !1
        }), this.shapeList.push(this._axisShadowShape), this.zr.addShape(this._axisShadowShape), this._axisCrossShape && this.zr.delShape(this._axisCrossShape.id), this._axisCrossShape = new o({
            zlevel: this._zlevelBase,
            invisible: !0,
            hoverable: !1
        }), this.shapeList.push(this._axisCrossShape), this.zr.addShape(this._axisCrossShape), this.showing = !1, this.refresh(s)
    }

    var i = t("./base"), o = t("../util/shape/Cross"), n = t("zrender/shape/Line"), r = t("zrender/shape/Rectangle"), s = new r({}), a = t("../config"), h = t("../util/ecData"), l = t("zrender/config"), d = t("zrender/tool/event"), c = t("zrender/tool/area"), u = t("zrender/tool/color"), p = t("zrender/tool/util"), f = t("zrender/shape/Base");
    return e.prototype = {
        type: a.COMPONENT_TYPE_TOOLTIP,
        _gCssText: "position:absolute;display:block;border-style:solid;white-space:nowrap;",
        _style: function (t) {
            if (!t)return "";
            var e = [];
            if (t.transitionDuration) {
                var i = "left " + t.transitionDuration + "s,top " + t.transitionDuration + "s";
                e.push("transition:" + i), e.push("-moz-transition:" + i), e.push("-webkit-transition:" + i), e.push("-o-transition:" + i)
            }
            t.backgroundColor && (e.push("background-Color:" + u.toHex(t.backgroundColor)), e.push("filter:alpha(opacity=70)"), e.push("background-Color:" + t.backgroundColor)), null != t.borderWidth && e.push("border-width:" + t.borderWidth + "px"), null != t.borderColor && e.push("border-color:" + t.borderColor), null != t.borderRadius && (e.push("border-radius:" + t.borderRadius + "px"), e.push("-moz-border-radius:" + t.borderRadius + "px"), e.push("-webkit-border-radius:" + t.borderRadius + "px"), e.push("-o-border-radius:" + t.borderRadius + "px"));
            var o = t.textStyle;
            o && (o.color && e.push("color:" + o.color), o.decoration && e.push("text-decoration:" + o.decoration), o.align && e.push("text-align:" + o.align), o.fontFamily && e.push("font-family:" + o.fontFamily), o.fontSize && e.push("font-size:" + o.fontSize + "px"), o.fontSize && e.push("line-height:" + Math.round(3 * o.fontSize / 2) + "px"), o.fontStyle && e.push("font-style:" + o.fontStyle), o.fontWeight && e.push("font-weight:" + o.fontWeight));
            var n = t.padding;
            return null != n && (n = this.reformCssArray(n), e.push("padding:" + n[0] + "px " + n[1] + "px " + n[2] + "px " + n[3] + "px")), e = e.join(";") + ";"
        },
        __hide: function () {
            this._lastDataIndex = -1, this._lastSeriesIndex = -1, this._lastItemTriggerId = -1, this._tDom && (this._tDom.style.display = "none");
            var t = !1;
            this._axisLineShape.invisible || (this._axisLineShape.invisible = !0, this.zr.modShape(this._axisLineShape.id), t = !0), this._axisShadowShape.invisible || (this._axisShadowShape.invisible = !0, this.zr.modShape(this._axisShadowShape.id), t = !0), this._axisCrossShape.invisible || (this._axisCrossShape.invisible = !0, this.zr.modShape(this._axisCrossShape.id), t = !0), this._lastTipShape && this._lastTipShape.tipShape.length > 0 && (this.zr.delShape(this._lastTipShape.tipShape), this._lastTipShape = !1, this.shapeList.length = 2), t && this.zr.refresh(), this.showing = !1
        },
        _show: function (t, e, i, o) {
            var n = this._tDom.offsetHeight, r = this._tDom.offsetWidth;
            t && ("function" == typeof t && (t = t([e, i])), t instanceof Array && (e = t[0], i = t[1])), e + r > this._zrWidth && (e -= r + 40), i + n > this._zrHeight && (i -= n - 20), 20 > i && (i = 0), this._tDom.style.cssText = this._gCssText + this._defaultCssText + (o ? o : "") + "left:" + e + "px;top:" + i + "px;", (10 > n || 10 > r) && setTimeout(this._refixed, 20), this.showing = !0
        },
        __refixed: function () {
            if (this._tDom) {
                var t = "", e = this._tDom.offsetHeight, i = this._tDom.offsetWidth;
                this._tDom.offsetLeft + i > this._zrWidth && (t += "left:" + (this._zrWidth - i - 20) + "px;"), this._tDom.offsetTop + e > this._zrHeight && (t += "top:" + (this._zrHeight - e - 10) + "px;"), "" !== t && (this._tDom.style.cssText += t)
            }
        },
        __tryShow: function () {
            var t, e;
            if (this._curTarget) {
                if ("island" === this._curTarget._type && this.option.tooltip.show)return void this._showItemTrigger();
                var i = h.get(this._curTarget, "series"), o = h.get(this._curTarget, "data");
                t = this.deepQuery([o, i, this.option], "tooltip.show"), null != i && null != o && t ? (e = this.deepQuery([o, i, this.option], "tooltip.trigger"), "axis" === e ? this._showAxisTrigger(i.xAxisIndex, i.yAxisIndex, h.get(this._curTarget, "dataIndex")) : this._showItemTrigger()) : (clearTimeout(this._hidingTicket), clearTimeout(this._showingTicket), this._hidingTicket = setTimeout(this._hide, this._hideDelay))
            } else this._findPolarTrigger() || this._findAxisTrigger()
        },
        _findAxisTrigger: function () {
            if (!this.component.xAxis || !this.component.yAxis)return void(this._hidingTicket = setTimeout(this._hide, this._hideDelay));
            for (var t, e, i = this.option.series, o = 0, n = i.length; n > o; o++)if ("axis" === this.deepQuery([i[o], this.option], "tooltip.trigger"))return t = i[o].xAxisIndex || 0, e = i[o].yAxisIndex || 0, this.component.xAxis.getAxis(t) && this.component.xAxis.getAxis(t).type === a.COMPONENT_TYPE_AXIS_CATEGORY ? void this._showAxisTrigger(t, e, this._getNearestDataIndex("x", this.component.xAxis.getAxis(t))) : this.component.yAxis.getAxis(e) && this.component.yAxis.getAxis(e).type === a.COMPONENT_TYPE_AXIS_CATEGORY ? void this._showAxisTrigger(t, e, this._getNearestDataIndex("y", this.component.yAxis.getAxis(e))) : void this._showAxisTrigger(t, e, -1);
            "cross" === this.option.tooltip.axisPointer.type && this._showAxisTrigger(-1, -1, -1)
        },
        _findPolarTrigger: function () {
            if (!this.component.polar)return !1;
            var t, e = d.getX(this._event), i = d.getY(this._event), o = this.component.polar.getNearestIndex([e, i]);
            return o ? (t = o.valueIndex, o = o.polarIndex) : o = -1, -1 != o ? this._showPolarTrigger(o, t) : !1
        },
        _getNearestDataIndex: function (t, e) {
            var i = -1, o = d.getX(this._event), n = d.getY(this._event);
            if ("x" === t) {
                for (var r, s, a = this.component.grid.getXend(), h = e.getCoordByIndex(i); a > h && (s = h, o >= h);)r = h, h = e.getCoordByIndex(++i);
                return 0 >= i ? i = 0 : s - o >= o - r ? i -= 1 : null == e.getNameByIndex(i) && (i -= 1), i
            }
            for (var l, c, u = this.component.grid.getY(), h = e.getCoordByIndex(i); h > u && (l = h, h >= n);)c = h, h = e.getCoordByIndex(++i);
            return 0 >= i ? i = 0 : n - l >= c - n ? i -= 1 : null == e.getNameByIndex(i) && (i -= 1), i
        },
        _showAxisTrigger: function (t, e, i) {
            if (!this._event.connectTrigger && this.messageCenter.dispatch(a.EVENT.TOOLTIP_IN_GRID, this._event, null, this.myChart), null == this.component.xAxis || null == this.component.yAxis || null == t || null == e)return clearTimeout(this._hidingTicket), clearTimeout(this._showingTicket), void(this._hidingTicket = setTimeout(this._hide, this._hideDelay));
            var o, n, r, s, h = this.option.series, l = [], c = [], u = "";
            if ("axis" === this.option.tooltip.trigger) {
                if (!this.option.tooltip.show)return;
                n = this.option.tooltip.formatter, r = this.option.tooltip.position
            }
            var p, f, g = -1 != t && this.component.xAxis.getAxis(t).type === a.COMPONENT_TYPE_AXIS_CATEGORY ? "xAxis" : -1 != e && this.component.yAxis.getAxis(e).type === a.COMPONENT_TYPE_AXIS_CATEGORY ? "yAxis" : !1;
            if (g) {
                var m = "xAxis" == g ? t : e;
                o = this.component[g].getAxis(m);
                for (var _ = 0, y = h.length; y > _; _++)this._isSelected(h[_].name) && h[_][g + "Index"] === m && "axis" === this.deepQuery([h[_], this.option], "tooltip.trigger") && (s = this.query(h[_], "tooltip.showContent") || s, n = this.query(h[_], "tooltip.formatter") || n, r = this.query(h[_], "tooltip.position") || r, u += this._style(this.query(h[_], "tooltip")), null != h[_].stack && "xAxis" == g ? (l.unshift(h[_]), c.unshift(_)) : (l.push(h[_]), c.push(_)));
                this.messageCenter.dispatch(a.EVENT.TOOLTIP_HOVER, this._event, {
                    seriesIndex: c,
                    dataIndex: i
                }, this.myChart);
                var v;
                "xAxis" == g ? (p = this.subPixelOptimize(o.getCoordByIndex(i), this._axisLineWidth), f = d.getY(this._event), v = [p, this.component.grid.getY(), p, this.component.grid.getYend()]) : (p = d.getX(this._event), f = this.subPixelOptimize(o.getCoordByIndex(i), this._axisLineWidth), v = [this.component.grid.getX(), f, this.component.grid.getXend(), f]), this._styleAxisPointer(l, v[0], v[1], v[2], v[3], o.getGap(), p, f)
            } else p = d.getX(this._event), f = d.getY(this._event), this._styleAxisPointer(h, this.component.grid.getX(), f, this.component.grid.getXend(), f, 0, p, f), i >= 0 ? this._showItemTrigger(!0) : (clearTimeout(this._hidingTicket), clearTimeout(this._showingTicket), this._tDom.style.display = "none");
            if (l.length > 0) {
                if (this._lastDataIndex != i || this._lastSeriesIndex != c[0]) {
                    this._lastDataIndex = i, this._lastSeriesIndex = c[0];
                    var x, b;
                    if ("function" == typeof n) {
                        for (var T = [], _ = 0, y = l.length; y > _; _++)x = l[_].data[i], b = null != x ? null != x.value ? x.value : x : "-", T.push({
                            seriesIndex: c[_],
                            seriesName: l[_].name || "",
                            series: l[_],
                            dataIndex: i,
                            data: x,
                            name: o.getNameByIndex(i),
                            value: b,
                            0: l[_].name || "",
                            1: o.getNameByIndex(i),
                            2: b,
                            3: x
                        });
                        this._curTicket = "axis:" + i, this._tDom.innerHTML = n.call(this.myChart, T, this._curTicket, this._setContent)
                    } else if ("string" == typeof n) {
                        this._curTicket = 0 / 0, n = n.replace("{a}", "{a0}").replace("{b}", "{b0}").replace("{c}", "{c0}");
                        for (var _ = 0, y = l.length; y > _; _++)n = n.replace("{a" + _ + "}", this._encodeHTML(l[_].name || "")), n = n.replace("{b" + _ + "}", this._encodeHTML(o.getNameByIndex(i))), x = l[_].data[i], x = null != x ? null != x.value ? x.value : x : "-", n = n.replace("{c" + _ + "}", x instanceof Array ? x : this.numAddCommas(x));
                        this._tDom.innerHTML = n
                    } else {
                        this._curTicket = 0 / 0, n = this._encodeHTML(o.getNameByIndex(i));
                        for (var _ = 0, y = l.length; y > _; _++)n += "<br/>" + this._encodeHTML(l[_].name || "") + " : ", x = l[_].data[i], x = null != x ? null != x.value ? x.value : x : "-", n += x instanceof Array ? x : this.numAddCommas(x);
                        this._tDom.innerHTML = n
                    }
                }
                if (s === !1 || !this.option.tooltip.showContent)return;
                this.hasAppend || (this._tDom.style.left = this._zrWidth / 2 + "px", this._tDom.style.top = this._zrHeight / 2 + "px", this.dom.firstChild.appendChild(this._tDom), this.hasAppend = !0), this._show(r, p + 10, f + 10, u)
            }
        },
        _showPolarTrigger: function (t, e) {
            if (null == this.component.polar || null == t || null == e || 0 > e)return !1;
            var i, o, n, r = this.option.series, s = [], a = [], h = "";
            if ("axis" === this.option.tooltip.trigger) {
                if (!this.option.tooltip.show)return !1;
                i = this.option.tooltip.formatter, o = this.option.tooltip.position
            }
            for (var l = this.option.polar[t].indicator[e].text, c = 0, u = r.length; u > c; c++)this._isSelected(r[c].name) && r[c].polarIndex === t && "axis" === this.deepQuery([r[c], this.option], "tooltip.trigger") && (n = this.query(r[c], "tooltip.showContent") || n, i = this.query(r[c], "tooltip.formatter") || i, o = this.query(r[c], "tooltip.position") || o, h += this._style(this.query(r[c], "tooltip")), s.push(r[c]), a.push(c));
            if (s.length > 0) {
                for (var p, f, g, m = [], c = 0, u = s.length; u > c; c++) {
                    p = s[c].data;
                    for (var _ = 0, y = p.length; y > _; _++)f = p[_], this._isSelected(f.name) && (f = null != f ? f : {
                        name: "",
                        value: {dataIndex: "-"}
                    }, g = null != f.value[e].value ? f.value[e].value : f.value[e], m.push({
                        seriesIndex: a[c],
                        seriesName: s[c].name || "",
                        series: s[c],
                        dataIndex: e,
                        data: f,
                        name: f.name,
                        indicator: l,
                        value: g,
                        0: s[c].name || "",
                        1: f.name,
                        2: g,
                        3: l
                    }))
                }
                if (m.length <= 0)return;
                if (this._lastDataIndex != e || this._lastSeriesIndex != a[0])if (this._lastDataIndex = e, this._lastSeriesIndex = a[0], "function" == typeof i)this._curTicket = "axis:" + e, this._tDom.innerHTML = i.call(this.myChart, m, this._curTicket, this._setContent); else if ("string" == typeof i) {
                    i = i.replace("{a}", "{a0}").replace("{b}", "{b0}").replace("{c}", "{c0}").replace("{d}", "{d0}");
                    for (var c = 0, u = m.length; u > c; c++)i = i.replace("{a" + c + "}", this._encodeHTML(m[c].seriesName)), i = i.replace("{b" + c + "}", this._encodeHTML(m[c].name)), i = i.replace("{c" + c + "}", this.numAddCommas(m[c].value)), i = i.replace("{d" + c + "}", this._encodeHTML(m[c].indicator));
                    this._tDom.innerHTML = i
                } else {
                    i = this._encodeHTML(m[0].name) + "<br/>" + this._encodeHTML(m[0].indicator) + " : " + this.numAddCommas(m[0].value);
                    for (var c = 1, u = m.length; u > c; c++)i += "<br/>" + this._encodeHTML(m[c].name) + "<br/>", i += this._encodeHTML(m[c].indicator) + " : " + this.numAddCommas(m[c].value);
                    this._tDom.innerHTML = i
                }
                if (n === !1 || !this.option.tooltip.showContent)return;
                return this.hasAppend || (this._tDom.style.left = this._zrWidth / 2 + "px", this._tDom.style.top = this._zrHeight / 2 + "px", this.dom.firstChild.appendChild(this._tDom), this.hasAppend = !0), this._show(o, d.getX(this._event), d.getY(this._event), h), !0
            }
        },
        _showItemTrigger: function (t) {
            if (this._curTarget) {
                var e, i, o, n = h.get(this._curTarget, "series"), r = h.get(this._curTarget, "seriesIndex"), s = h.get(this._curTarget, "data"), l = h.get(this._curTarget, "dataIndex"), c = h.get(this._curTarget, "name"), u = h.get(this._curTarget, "value"), p = h.get(this._curTarget, "special"), f = h.get(this._curTarget, "special2"), g = "";
                if ("island" != this._curTarget._type) {
                    var m = t ? "axis" : "item";
                    this.option.tooltip.trigger === m && (e = this.option.tooltip.formatter, i = this.option.tooltip.position), this.query(n, "tooltip.trigger") === m && (o = this.query(n, "tooltip.showContent") || o, e = this.query(n, "tooltip.formatter") || e, i = this.query(n, "tooltip.position") || i, g += this._style(this.query(n, "tooltip"))), o = this.query(s, "tooltip.showContent") || o, e = this.query(s, "tooltip.formatter") || e, i = this.query(s, "tooltip.position") || i, g += this._style(this.query(s, "tooltip"))
                } else this._lastItemTriggerId = 0 / 0, o = this.deepQuery([s, n, this.option], "tooltip.showContent"), e = this.deepQuery([s, n, this.option], "tooltip.islandFormatter"), i = this.deepQuery([s, n, this.option], "tooltip.islandPosition");
                this._lastItemTriggerId !== this._curTarget.id && (this._lastItemTriggerId = this._curTarget.id, "function" == typeof e ? (this._curTicket = (n.name || "") + ":" + l, this._tDom.innerHTML = e.call(this.myChart, {
                    seriesIndex: r,
                    seriesName: n.name || "",
                    series: n,
                    dataIndex: l,
                    data: s,
                    name: c,
                    value: u,
                    percent: p,
                    indicator: p,
                    value2: f,
                    indicator2: f,
                    0: n.name || "",
                    1: c,
                    2: u,
                    3: p,
                    4: f,
                    5: s,
                    6: r,
                    7: l
                }, this._curTicket, this._setContent)) : "string" == typeof e ? (this._curTicket = 0 / 0, e = e.replace("{a}", "{a0}").replace("{b}", "{b0}").replace("{c}", "{c0}"), e = e.replace("{a0}", this._encodeHTML(n.name || "")).replace("{b0}", this._encodeHTML(c)).replace("{c0}", u instanceof Array ? u : this.numAddCommas(u)), e = e.replace("{d}", "{d0}").replace("{d0}", p || ""), e = e.replace("{e}", "{e0}").replace("{e0}", h.get(this._curTarget, "special2") || ""), this._tDom.innerHTML = e) : (this._curTicket = 0 / 0, this._tDom.innerHTML = n.type === a.CHART_TYPE_RADAR && p ? this._itemFormatter.radar.call(this, n, c, u, p) : n.type === a.CHART_TYPE_EVENTRIVER ? this._itemFormatter.eventRiver.call(this, n, c, u, s) : "" + (null != n.name ? this._encodeHTML(n.name) + "<br/>" : "") + ("" === c ? "" : this._encodeHTML(c) + " : ") + (u instanceof Array ? u : this.numAddCommas(u)))), this._axisLineShape.invisible && this._axisShadowShape.invisible || (this._axisLineShape.invisible = !0, this.zr.modShape(this._axisLineShape.id), this._axisShadowShape.invisible = !0, this.zr.modShape(this._axisShadowShape.id), this.zr.refresh()), o !== !1 && this.option.tooltip.showContent && (this.hasAppend || (this._tDom.style.left = this._zrWidth / 2 + "px", this._tDom.style.top = this._zrHeight / 2 + "px", this.dom.firstChild.appendChild(this._tDom), this.hasAppend = !0), this._show(i, d.getX(this._event) + 20, d.getY(this._event) - 20, g))
            }
        },
        _itemFormatter: {
            radar: function (t, e, i, o) {
                var n = "";
                n += this._encodeHTML("" === e ? t.name || "" : e), n += "" === n ? "" : "<br />";
                for (var r = 0; r < o.length; r++)n += this._encodeHTML(o[r].text) + " : " + this.numAddCommas(i[r]) + "<br />";
                return n
            }, chord: function (t, e, i, o, n) {
                if (null == n)return this._encodeHTML(e) + " (" + this.numAddCommas(i) + ")";
                var r = this._encodeHTML(e), s = this._encodeHTML(o);
                return "" + (null != t.name ? this._encodeHTML(t.name) + "<br/>" : "") + r + " -> " + s + " (" + this.numAddCommas(i) + ")<br />" + s + " -> " + r + " (" + this.numAddCommas(n) + ")"
            }, eventRiver: function (t, e, i, o) {
                var n = "";
                n += this._encodeHTML("" === t.name ? "" : t.name + " : "), n += this._encodeHTML(e), n += "" === n ? "" : "<br />", o = o.evolution;
                for (var r = 0, s = o.length; s > r; r++)n += '<div style="padding-top:5px;">', o[r].detail && (o[r].detail.img && (n += '<img src="' + o[r].detail.img + '" style="float:left;width:40px;height:40px;">'), n += '<div style="margin-left:45px;">' + o[r].time + "<br/>", n += '<a href="' + o[r].detail.link + '" target="_blank">', n += o[r].detail.text + "</a></div>", n += "</div>");
                return n
            }
        },
        _styleAxisPointer: function (t, e, i, o, n, r, s, a) {
            if (t.length > 0) {
                var h, l, d = this.option.tooltip.axisPointer, c = d.type, u = {line: {}, cross: {}, shadow: {}};
                for (var p in u)u[p].color = d[p + "Style"].color, u[p].width = d[p + "Style"].width, u[p].type = d[p + "Style"].type;
                for (var f = 0, g = t.length; g > f; f++)"axis" === this.deepQuery([t[f], this.option], "tooltip.trigger") && (h = t[f], l = this.query(h, "tooltip.axisPointer.type"), c = l || c, l && (u[l].color = this.query(h, "tooltip.axisPointer." + l + "Style.color") || u[l].color, u[l].width = this.query(h, "tooltip.axisPointer." + l + "Style.width") || u[l].width, u[l].type = this.query(h, "tooltip.axisPointer." + l + "Style.type") || u[l].type));
                "line" === c ? (this._axisLineShape.style = {
                    xStart: e,
                    yStart: i,
                    xEnd: o,
                    yEnd: n,
                    strokeColor: u.line.color,
                    lineWidth: u.line.width,
                    lineType: u.line.type
                }, this._axisLineShape.invisible = !1, this.zr.modShape(this._axisLineShape.id)) : "cross" === c ? (this._axisCrossShape.style = {
                    brushType: "stroke",
                    rect: this.component.grid.getArea(),
                    x: s,
                    y: a,
                    text: ("( " + this.component.xAxis.getAxis(0).getValueFromCoord(s) + " , " + this.component.yAxis.getAxis(0).getValueFromCoord(a) + " )").replace("  , ", " ").replace(" ,  ", " "),
                    textPosition: "specific",
                    strokeColor: u.cross.color,
                    lineWidth: u.cross.width,
                    lineType: u.cross.type
                }, this.component.grid.getXend() - s > 100 ? (this._axisCrossShape.style.textAlign = "left", this._axisCrossShape.style.textX = s + 10) : (this._axisCrossShape.style.textAlign = "right", this._axisCrossShape.style.textX = s - 10), a - this.component.grid.getY() > 50 ? (this._axisCrossShape.style.textBaseline = "bottom", this._axisCrossShape.style.textY = a - 10) : (this._axisCrossShape.style.textBaseline = "top", this._axisCrossShape.style.textY = a + 10), this._axisCrossShape.invisible = !1, this.zr.modShape(this._axisCrossShape.id)) : "shadow" === c && ((null == u.shadow.width || "auto" === u.shadow.width || isNaN(u.shadow.width)) && (u.shadow.width = r), e === o ? Math.abs(this.component.grid.getX() - e) < 2 ? (u.shadow.width /= 2, e = o += u.shadow.width / 2) : Math.abs(this.component.grid.getXend() - e) < 2 && (u.shadow.width /= 2, e = o -= u.shadow.width / 2) : i === n && (Math.abs(this.component.grid.getY() - i) < 2 ? (u.shadow.width /= 2, i = n += u.shadow.width / 2) : Math.abs(this.component.grid.getYend() - i) < 2 && (u.shadow.width /= 2, i = n -= u.shadow.width / 2)), this._axisShadowShape.style = {
                    xStart: e,
                    yStart: i,
                    xEnd: o,
                    yEnd: n,
                    strokeColor: u.shadow.color,
                    lineWidth: u.shadow.width
                }, this._axisShadowShape.invisible = !1, this.zr.modShape(this._axisShadowShape.id)), this.zr.refresh()
            }
        },
        __onmousemove: function (t) {
            if (clearTimeout(this._hidingTicket), clearTimeout(this._showingTicket), !this._mousein || !this._enterable) {
                var e = t.target, i = d.getX(t.event), o = d.getY(t.event);
                if (e) {
                    this._curTarget = e, this._event = t.event, this._event.zrenderX = i, this._event.zrenderY = o;
                    var n;
                    if (this._needAxisTrigger && this.component.polar && -1 != (n = this.component.polar.isInside([i, o])))for (var r = this.option.series, h = 0, l = r.length; l > h; h++)if (r[h].polarIndex === n && "axis" === this.deepQuery([r[h], this.option], "tooltip.trigger")) {
                        this._curTarget = null;
                        break
                    }
                    this._showingTicket = setTimeout(this._tryShow, this._showDelay)
                } else this._curTarget = !1, this._event = t.event, this._event.zrenderX = i, this._event.zrenderY = o, this._needAxisTrigger && this.component.grid && c.isInside(s, this.component.grid.getArea(), i, o) ? this._showingTicket = setTimeout(this._tryShow, this._showDelay) : this._needAxisTrigger && this.component.polar && -1 != this.component.polar.isInside([i, o]) ? this._showingTicket = setTimeout(this._tryShow, this._showDelay) : (!this._event.connectTrigger && this.messageCenter.dispatch(a.EVENT.TOOLTIP_OUT_GRID, this._event, null, this.myChart), this._hidingTicket = setTimeout(this._hide, this._hideDelay))
            }
        },
        __onglobalout: function () {
            clearTimeout(this._hidingTicket), clearTimeout(this._showingTicket), this._hidingTicket = setTimeout(this._hide, this._hideDelay)
        },
        __setContent: function (t, e) {
            this._tDom && (t === this._curTicket && (this._tDom.innerHTML = e), setTimeout(this._refixed, 20))
        },
        ontooltipHover: function (t, e) {
            if (!this._lastTipShape || this._lastTipShape && this._lastTipShape.dataIndex != t.dataIndex) {
                this._lastTipShape && this._lastTipShape.tipShape.length > 0 && (this.zr.delShape(this._lastTipShape.tipShape), this.shapeList.length = 2);
                for (var i = 0, o = e.length; o > i; i++)e[i].zlevel = this._zlevelBase, e[i].style = f.prototype.getHighlightStyle(e[i].style, e[i].highlightStyle), e[i].draggable = !1, e[i].hoverable = !1, e[i].clickable = !1, e[i].ondragend = null, e[i].ondragover = null, e[i].ondrop = null, this.shapeList.push(e[i]), this.zr.addShape(e[i]);
                this._lastTipShape = {dataIndex: t.dataIndex, tipShape: e}
            }
        },
        ondragend: function () {
            this._hide()
        },
        onlegendSelected: function (t) {
            this._selectedMap = t.selected
        },
        _setSelectedMap: function () {
            this._selectedMap = this.component.legend ? p.clone(this.component.legend.getSelectedMap()) : {}
        },
        _isSelected: function (t) {
            return null != this._selectedMap[t] ? this._selectedMap[t] : !0
        },
        showTip: function (t) {
            if (t) {
                var e, i = this.option.series;
                if (null != t.seriesIndex)e = t.seriesIndex; else for (var o = t.seriesName, n = 0, r = i.length; r > n; n++)if (i[n].name === o) {
                    e = n;
                    break
                }
                var s = i[e];
                if (null != s) {
                    var d = this.myChart.chart[s.type], c = "axis" === this.deepQuery([s, this.option], "tooltip.trigger");
                    if (d)if (c) {
                        var u = t.dataIndex;
                        switch (d.type) {
                            case a.CHART_TYPE_LINE:
                            case a.CHART_TYPE_BAR:
                            case a.CHART_TYPE_K:
                                if (null == this.component.xAxis || null == this.component.yAxis || s.data.length <= u)return;
                                var p = s.xAxisIndex || 0, f = s.yAxisIndex || 0;
                                this._event = this.component.xAxis.getAxis(p).type === a.COMPONENT_TYPE_AXIS_CATEGORY ? {
                                    zrenderX: this.component.xAxis.getAxis(p).getCoordByIndex(u),
                                    zrenderY: this.component.grid.getY() + (this.component.grid.getYend() - this.component.grid.getY()) / 4
                                } : {
                                    zrenderX: this.component.grid.getX() + (this.component.grid.getXend() - this.component.grid.getX()) / 4,
                                    zrenderY: this.component.yAxis.getAxis(f).getCoordByIndex(u)
                                }, this._showAxisTrigger(p, f, u);
                                break;
                            case a.CHART_TYPE_RADAR:
                                if (null == this.component.polar || s.data[0].value.length <= u)return;
                                var g = s.polarIndex || 0, m = this.component.polar.getVector(g, u, "max");
                                this._event = {zrenderX: m[0], zrenderY: m[1]}, this._showPolarTrigger(g, u)
                        }
                    } else {
                        var _, y, v = d.shapeList;
                        switch (d.type) {
                            case a.CHART_TYPE_LINE:
                            case a.CHART_TYPE_BAR:
                            case a.CHART_TYPE_K:
                            case a.CHART_TYPE_SCATTER:
                                for (var u = t.dataIndex, n = 0, r = v.length; r > n; n++)if (h.get(v[n], "seriesIndex") == e && h.get(v[n], "dataIndex") == u) {
                                    this._curTarget = v[n], _ = v[n].style.x, y = d.type != a.CHART_TYPE_K ? v[n].style.y : v[n].style.y[0];
                                    break
                                }
                                break;
                            case a.CHART_TYPE_RADAR:
                                for (var u = t.dataIndex, n = 0, r = v.length; r > n; n++)if ("polygon" === v[n].type && h.get(v[n], "seriesIndex") == e && h.get(v[n], "dataIndex") == u) {
                                    this._curTarget = v[n];
                                    var m = this.component.polar.getCenter(s.polarIndex || 0);
                                    _ = m[0], y = m[1];
                                    break
                                }
                                break;
                            case a.CHART_TYPE_PIE:
                                for (var x = t.name, n = 0, r = v.length; r > n; n++)if ("sector" === v[n].type && h.get(v[n], "seriesIndex") == e && h.get(v[n], "name") == x) {
                                    this._curTarget = v[n];
                                    var b = this._curTarget.style, T = (b.startAngle + b.endAngle) / 2 * Math.PI / 180;
                                    _ = this._curTarget.style.x + Math.cos(T) * b.r / 1.5, y = this._curTarget.style.y - Math.sin(T) * b.r / 1.5;
                                    break
                                }
                                break;
                            case a.CHART_TYPE_MAP:
                                for (var x = t.name, S = s.mapType, n = 0, r = v.length; r > n; n++)if ("text" === v[n].type && v[n]._mapType === S && v[n].style._name === x) {
                                    this._curTarget = v[n], _ = this._curTarget.style.x + this._curTarget.position[0], y = this._curTarget.style.y + this._curTarget.position[1];
                                    break
                                }
                                break;
                            case a.CHART_TYPE_CHORD:
                                for (var x = t.name, n = 0, r = v.length; r > n; n++)if ("sector" === v[n].type && h.get(v[n], "name") == x) {
                                    this._curTarget = v[n];
                                    var b = this._curTarget.style, T = (b.startAngle + b.endAngle) / 2 * Math.PI / 180;
                                    return _ = this._curTarget.style.x + Math.cos(T) * (b.r - 2), y = this._curTarget.style.y - Math.sin(T) * (b.r - 2), void this.zr.trigger(l.EVENT.MOUSEMOVE, {
                                        zrenderX: _,
                                        zrenderY: y
                                    })
                                }
                                break;
                            case a.CHART_TYPE_FORCE:
                                for (var x = t.name, n = 0, r = v.length; r > n; n++)if ("circle" === v[n].type && h.get(v[n], "name") == x) {
                                    this._curTarget = v[n], _ = this._curTarget.position[0], y = this._curTarget.position[1];
                                    break
                                }
                        }
                        null != _ && null != y && (this._event = {
                            zrenderX: _,
                            zrenderY: y
                        }, this.zr.addHoverShape(this._curTarget), this.zr.refreshHover(), this._showItemTrigger())
                    }
                }
            }
        },
        hideTip: function () {
            this._hide()
        },
        refresh: function (t) {
            if (this._zrHeight = this.zr.getHeight(), this._zrWidth = this.zr.getWidth(), this._lastTipShape && this._lastTipShape.tipShape.length > 0 && this.zr.delShape(this._lastTipShape.tipShape), this._lastTipShape = !1, this.shapeList.length = 2, this._lastDataIndex = -1, this._lastSeriesIndex = -1, this._lastItemTriggerId = -1, t) {
                this.option = t, this.option.tooltip = this.reformOption(this.option.tooltip), this.option.tooltip.textStyle = p.merge(this.option.tooltip.textStyle, this.ecTheme.textStyle), this._needAxisTrigger = !1, "axis" === this.option.tooltip.trigger && (this._needAxisTrigger = !0);
                for (var e = this.option.series, i = 0, o = e.length; o > i; i++)if ("axis" === this.query(e[i], "tooltip.trigger")) {
                    this._needAxisTrigger = !0;
                    break
                }
                this._showDelay = this.option.tooltip.showDelay, this._hideDelay = this.option.tooltip.hideDelay, this._defaultCssText = this._style(this.option.tooltip), this._setSelectedMap(), this._axisLineWidth = this.option.tooltip.axisPointer.lineStyle.width, this._enterable = this.option.tooltip.enterable
            }
            if (this.showing) {
                var n = this;
                setTimeout(function () {
                    n.zr.trigger(l.EVENT.MOUSEMOVE, n.zr.handler._event)
                }, 50)
            }
        },
        onbeforDispose: function () {
            this._lastTipShape && this._lastTipShape.tipShape.length > 0 && this.zr.delShape(this._lastTipShape.tipShape), clearTimeout(this._hidingTicket), clearTimeout(this._showingTicket), this.zr.un(l.EVENT.MOUSEMOVE, this._onmousemove), this.zr.un(l.EVENT.GLOBALOUT, this._onglobalout), this.hasAppend && this.dom.firstChild.removeChild(this._tDom), this._tDom = null
        },
        _encodeHTML: function (t) {
            return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
        }
    }, p.inherits(e, i), t("../component").define("tooltip", e), e
}), define("echarts/component/legend", ["require", "./base", "zrender/shape/Text", "zrender/shape/Rectangle", "zrender/shape/Sector", "../util/shape/Icon", "../util/shape/Candle", "../config", "zrender/tool/util", "zrender/tool/area", "../component"], function (t) {
    function e(t, e, o, n, r) {
        if (!this.query(n, "legend.data"))return void console.error("option.legend.data has not been defined.");
        i.call(this, t, e, o, n, r);
        var s = this;
        s._legendSelected = function (t) {
            s.__legendSelected(t)
        }, s._dispatchHoverLink = function (t) {
            return s.__dispatchHoverLink(t)
        }, this._colorIndex = 0, this._colorMap = {}, this._selectedMap = {}, this._hasDataMap = {}, this.refresh(n)
    }

    var i = t("./base"), o = t("zrender/shape/Text"), n = t("zrender/shape/Rectangle"), r = t("zrender/shape/Sector"), s = t("../util/shape/Icon"), a = t("../util/shape/Candle"), h = t("../config"), l = t("zrender/tool/util"), d = t("zrender/tool/area");
    e.prototype = {
        type: h.COMPONENT_TYPE_LEGEND, _buildShape: function () {
            if (this.legendOption.show) {
                this._itemGroupLocation = this._getItemGroupLocation(), this._buildBackground(), this._buildItem();
                for (var t = 0, e = this.shapeList.length; e > t; t++)this.zr.addShape(this.shapeList[t])
            }
        }, _buildItem: function () {
            var t, e, i, n, r, a, h, c, u = this.legendOption.data, p = u.length, f = this.legendOption.textStyle, g = this.zr.getWidth(), m = this.zr.getHeight(), _ = this._itemGroupLocation.x, y = this._itemGroupLocation.y, v = this.legendOption.itemWidth, x = this.legendOption.itemHeight, b = this.legendOption.itemGap;
            "vertical" === this.legendOption.orient && "right" === this.legendOption.x && (_ = this._itemGroupLocation.x + this._itemGroupLocation.width - v);
            for (var T = 0; p > T; T++)r = l.merge(u[T].textStyle || {}, f), a = this.getFont(r), t = this._getName(u[T]), h = this._getFormatterName(t), "" !== t ? (e = u[T].icon || this._getSomethingByName(t).type, c = this.getColor(t), "horizontal" === this.legendOption.orient ? 200 > g - _ && v + 5 + d.getTextWidth(h, a) + (T === p - 1 || "" === u[T + 1] ? 0 : b) >= g - _ && (_ = this._itemGroupLocation.x, y += x + b) : 200 > m - y && x + (T === p - 1 || "" === u[T + 1] ? 0 : b) >= m - y && ("right" === this.legendOption.x ? _ -= this._itemGroupLocation.maxWidth + b : _ += this._itemGroupLocation.maxWidth + b, y = this._itemGroupLocation.y), i = this._getItemShapeByType(_, y, v, x, this._selectedMap[t] && this._hasDataMap[t] ? c : "#ccc", e, c), i._name = t, i = new s(i), n = {
                zlevel: this._zlevelBase,
                style: {
                    x: _ + v + 5,
                    y: y + x / 2,
                    color: this._selectedMap[t] ? "auto" === r.color ? c : r.color : "#ccc",
                    text: h,
                    textFont: a,
                    textBaseline: "middle"
                },
                highlightStyle: {color: c, brushType: "fill"},
                hoverable: !!this.legendOption.selectedMode,
                clickable: !!this.legendOption.selectedMode
            }, "vertical" === this.legendOption.orient && "right" === this.legendOption.x && (n.style.x -= v + 10, n.style.textAlign = "right"), n._name = t, n = new o(n), this.legendOption.selectedMode && (i.onclick = n.onclick = this._legendSelected, i.onmouseover = n.onmouseover = this._dispatchHoverLink, i.hoverConnect = n.id, n.hoverConnect = i.id), this.shapeList.push(i), this.shapeList.push(n), "horizontal" === this.legendOption.orient ? _ += v + 5 + d.getTextWidth(h, a) + b : y += x + b) : "horizontal" === this.legendOption.orient ? (_ = this._itemGroupLocation.x, y += x + b) : ("right" === this.legendOption.x ? _ -= this._itemGroupLocation.maxWidth + b : _ += this._itemGroupLocation.maxWidth + b, y = this._itemGroupLocation.y);
            "horizontal" === this.legendOption.orient && "center" === this.legendOption.x && y != this._itemGroupLocation.y && this._mLineOptimize()
        }, _getName: function (t) {
            return "undefined" != typeof t.name ? t.name : t
        }, _getFormatterName: function (t) {
            var e, i = this.legendOption.formatter;
            return e = "function" == typeof i ? i.call(this.myChart, t) : "string" == typeof i ? i.replace("{name}", t) : t
        }, _getFormatterNameFromData: function (t) {
            var e = this._getName(t);
            return this._getFormatterName(e)
        }, _mLineOptimize: function () {
            for (var t = [], e = this._itemGroupLocation.x, i = 2, o = this.shapeList.length; o > i; i++)this.shapeList[i].style.x === e ? t.push((this._itemGroupLocation.width - (this.shapeList[i - 1].style.x + d.getTextWidth(this.shapeList[i - 1].style.text, this.shapeList[i - 1].style.textFont) - e)) / 2) : i === o - 1 && t.push((this._itemGroupLocation.width - (this.shapeList[i].style.x + d.getTextWidth(this.shapeList[i].style.text, this.shapeList[i].style.textFont) - e)) / 2);
            for (var n = -1, i = 1, o = this.shapeList.length; o > i; i++)this.shapeList[i].style.x === e && n++, 0 !== t[n] && (this.shapeList[i].style.x += t[n])
        }, _buildBackground: function () {
            var t = this.reformCssArray(this.legendOption.padding);
            this.shapeList.push(new n({
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {
                    x: this._itemGroupLocation.x - t[3],
                    y: this._itemGroupLocation.y - t[0],
                    width: this._itemGroupLocation.width + t[3] + t[1],
                    height: this._itemGroupLocation.height + t[0] + t[2],
                    brushType: 0 === this.legendOption.borderWidth ? "fill" : "both",
                    color: this.legendOption.backgroundColor,
                    strokeColor: this.legendOption.borderColor,
                    lineWidth: this.legendOption.borderWidth
                }
            }))
        }, _getItemGroupLocation: function () {
            var t = this.legendOption.data, e = t.length, i = this.legendOption.itemGap, o = this.legendOption.itemWidth + 5, n = this.legendOption.itemHeight, r = this.legendOption.textStyle, s = this.getFont(r), a = 0, h = 0, c = this.reformCssArray(this.legendOption.padding), u = this.zr.getWidth() - c[1] - c[3], p = this.zr.getHeight() - c[0] - c[2], f = 0, g = 0;
            if ("horizontal" === this.legendOption.orient) {
                h = n;
                for (var m = 0; e > m; m++)"" !== this._getName(t[m]) ? f += o + d.getTextWidth(this._getFormatterNameFromData(t[m]), t[m].textStyle ? this.getFont(l.merge(t[m].textStyle || {}, r)) : s) + i : (f -= i, f > u ? (a = u, h += n + i) : a = Math.max(a, f), h += n + i, f = 0);
                h = Math.max(h, n), f -= i, f > u ? (a = u, h += n + i) : a = Math.max(a, f)
            } else {
                for (var m = 0; e > m; m++)g = Math.max(g, d.getTextWidth(this._getFormatterNameFromData(t[m]), t[m].textStyle ? this.getFont(l.merge(t[m].textStyle || {}, r)) : s));
                g += o, a = g;
                for (var m = 0; e > m; m++)"" !== this._getName(t[m]) ? f += n + i : (f -= i, f > p ? (h = p, a += g + i) : h = Math.max(h, f), a += g + i, f = 0);
                a = Math.max(a, g), f -= i, f > p ? (h = p, a += g + i) : h = Math.max(h, f)
            }
            u = this.zr.getWidth(), p = this.zr.getHeight();
            var _;
            switch (this.legendOption.x) {
                case"center":
                    _ = Math.floor((u - a) / 2);
                    break;
                case"left":
                    _ = c[3] + this.legendOption.borderWidth;
                    break;
                case"right":
                    _ = u - a - c[1] - c[3] - 2 * this.legendOption.borderWidth;
                    break;
                default:
                    _ = this.parsePercent(this.legendOption.x, u)
            }
            var y;
            switch (this.legendOption.y) {
                case"top":
                    y = c[0] + this.legendOption.borderWidth;
                    break;
                case"bottom":
                    y = p - h - c[0] - c[2] - 2 * this.legendOption.borderWidth;
                    break;
                case"center":
                    y = Math.floor((p - h) / 2);
                    break;
                default:
                    y = this.parsePercent(this.legendOption.y, p)
            }
            return {x: _, y: y, width: a, height: h, maxWidth: g}
        }, _getSomethingByName: function (t) {
            for (var e, i = this.option.series, o = 0, n = i.length; n > o; o++) {
                if (i[o].name === t)return {type: i[o].type, series: i[o], seriesIndex: o, data: null, dataIndex: -1};
                if (i[o].type === h.CHART_TYPE_PIE || i[o].type === h.CHART_TYPE_RADAR || i[o].type === h.CHART_TYPE_CHORD || i[o].type === h.CHART_TYPE_FORCE || i[o].type === h.CHART_TYPE_FUNNEL) {
                    e = i[o].categories || i[o].data || i[o].nodes;
                    for (var r = 0, s = e.length; s > r; r++)if (e[r].name === t)return {
                        type: i[o].type,
                        series: i[o],
                        seriesIndex: o,
                        data: e[r],
                        dataIndex: r
                    }
                }
            }
            return {type: "bar", series: null, seriesIndex: -1, data: null, dataIndex: -1}
        }, _getItemShapeByType: function (t, e, i, o, n, r, s) {
            var a, h = "#ccc" === n ? s : n, l = {
                zlevel: this._zlevelBase,
                style: {
                    iconType: "legendicon" + r,
                    x: t,
                    y: e,
                    width: i,
                    height: o,
                    color: n,
                    strokeColor: n,
                    lineWidth: 2
                },
                highlightStyle: {color: h, strokeColor: h, lineWidth: 1},
                hoverable: this.legendOption.selectedMode,
                clickable: this.legendOption.selectedMode
            };
            if (r.match("image")) {
                var a = r.replace(new RegExp("^image:\\/\\/"), "");
                r = "image"
            }
            switch (r) {
                case"line":
                    l.style.brushType = "stroke", l.highlightStyle.lineWidth = 3;
                    break;
                case"radar":
                case"scatter":
                    l.highlightStyle.lineWidth = 3;
                    break;
                case"k":
                    l.style.brushType = "both", l.highlightStyle.lineWidth = 3, l.highlightStyle.color = l.style.color = this.query(this.ecTheme, "k.itemStyle.normal.color") || "#fff", l.style.strokeColor = "#ccc" != n ? this.query(this.ecTheme, "k.itemStyle.normal.lineStyle.color") || "#ff3200" : n;
                    break;
                case"image":
                    l.style.iconType = "image", l.style.image = a, "#ccc" === n && (l.style.opacity = .5)
            }
            return l
        }, __legendSelected: function (t) {
            var e = t.target._name;
            if ("single" === this.legendOption.selectedMode)for (var i in this._selectedMap)this._selectedMap[i] = !1;
            this._selectedMap[e] = !this._selectedMap[e], this.messageCenter.dispatch(h.EVENT.LEGEND_SELECTED, t.event, {
                selected: this._selectedMap,
                target: e
            }, this.myChart)
        }, __dispatchHoverLink: function (t) {
            this.messageCenter.dispatch(h.EVENT.LEGEND_HOVERLINK, t.event, {target: t.target._name}, this.myChart)
        }, refresh: function (t) {
            if (t) {
                this.option = t || this.option, this.option.legend = this.reformOption(this.option.legend), this.legendOption = this.option.legend;
                var e, i, o, n, r = this.legendOption.data || [];
                if (this.legendOption.selected)for (var s in this.legendOption.selected)this._selectedMap[s] = "undefined" != typeof this._selectedMap[s] ? this._selectedMap[s] : this.legendOption.selected[s];
                for (var a = 0, l = r.length; l > a; a++)e = this._getName(r[a]), "" !== e && (i = this._getSomethingByName(e), i.series ? (this._hasDataMap[e] = !0, n = !i.data || i.type !== h.CHART_TYPE_PIE && i.type !== h.CHART_TYPE_FORCE && i.type !== h.CHART_TYPE_FUNNEL ? [i.series] : [i.data, i.series], o = this.getItemStyleColor(this.deepQuery(n, "itemStyle.normal.color"), i.seriesIndex, i.dataIndex, i.data), o && i.type != h.CHART_TYPE_K && this.setColor(e, o), this._selectedMap[e] = null != this._selectedMap[e] ? this._selectedMap[e] : !0) : this._hasDataMap[e] = !1)
            }
            this.clear(), this._buildShape()
        }, getRelatedAmount: function (t) {
            for (var e, i = 0, o = this.option.series, n = 0, r = o.length; r > n; n++)if (o[n].name === t && i++, o[n].type === h.CHART_TYPE_PIE || o[n].type === h.CHART_TYPE_RADAR || o[n].type === h.CHART_TYPE_CHORD || o[n].type === h.CHART_TYPE_FORCE || o[n].type === h.CHART_TYPE_FUNNEL) {
                e = o[n].type != h.CHART_TYPE_FORCE ? o[n].data : o[n].categories;
                for (var s = 0, a = e.length; a > s; s++)e[s].name === t && "-" != e[s].value && i++
            }
            return i
        }, setColor: function (t, e) {
            this._colorMap[t] = e
        }, getColor: function (t) {
            return this._colorMap[t] || (this._colorMap[t] = this.zr.getColor(this._colorIndex++)), this._colorMap[t]
        }, hasColor: function (t) {
            return this._colorMap[t] ? this._colorMap[t] : !1
        }, add: function (t, e) {
            for (var i = this.legendOption.data, o = 0, n = i.length; n > o; o++)if (this._getName(i[o]) === t)return;
            this.legendOption.data.push(t), this.setColor(t, e), this._selectedMap[t] = !0, this._hasDataMap[t] = !0
        }, del: function (t) {
            for (var e = this.legendOption.data, i = 0, o = e.length; o > i; i++)if (this._getName(e[i]) === t)return this.legendOption.data.splice(i, 1)
        }, getItemShape: function (t) {
            if (null != t)for (var e, i = 0, o = this.shapeList.length; o > i; i++)if (e = this.shapeList[i], e._name === t && "text" != e.type)return e
        }, setItemShape: function (t, e) {
            for (var i, o = 0, n = this.shapeList.length; n > o; o++)i = this.shapeList[o], i._name === t && "text" != i.type && (this._selectedMap[t] || (e.style.color = "#ccc", e.style.strokeColor = "#ccc"), this.zr.modShape(i.id, e))
        }, isSelected: function (t) {
            return "undefined" != typeof this._selectedMap[t] ? this._selectedMap[t] : !0
        }, getSelectedMap: function () {
            return this._selectedMap
        }, setSelected: function (t, e) {
            if ("single" === this.legendOption.selectedMode)for (var i in this._selectedMap)this._selectedMap[i] = !1;
            this._selectedMap[t] = e, this.messageCenter.dispatch(h.EVENT.LEGEND_SELECTED, null, {
                selected: this._selectedMap,
                target: t
            }, this.myChart)
        }, onlegendSelected: function (t, e) {
            var i = t.selected;
            for (var o in i)this._selectedMap[o] != i[o] && (e.needRefresh = !0), this._selectedMap[o] = i[o]
        }
    };
    var c = {
        line: function (t, e) {
            var i = e.height / 2;
            t.moveTo(e.x, e.y + i), t.lineTo(e.x + e.width, e.y + i)
        }, pie: function (t, e) {
            var i = e.x, o = e.y, n = e.width, s = e.height;
            r.prototype.buildPath(t, {x: i + n / 2, y: o + s + 2, r: s + 2, r0: 6, startAngle: 45, endAngle: 135})
        }, eventRiver: function (t, e) {
            var i = e.x, o = e.y, n = e.width, r = e.height;
            t.moveTo(i, o + r), t.bezierCurveTo(i + n, o + r, i, o + 4, i + n, o + 4), t.lineTo(i + n, o), t.bezierCurveTo(i, o, i + n, o + r - 4, i, o + r - 4), t.lineTo(i, o + r)
        }, k: function (t, e) {
            var i = e.x, o = e.y, n = e.width, r = e.height;
            a.prototype.buildPath(t, {x: i + n / 2, y: [o + 1, o + 1, o + r - 6, o + r], width: n - 6})
        }, bar: function (t, e) {
            var i = e.x, o = e.y + 1, n = e.width, r = e.height - 2, s = 3;
            t.moveTo(i + s, o), t.lineTo(i + n - s, o), t.quadraticCurveTo(i + n, o, i + n, o + s), t.lineTo(i + n, o + r - s), t.quadraticCurveTo(i + n, o + r, i + n - s, o + r), t.lineTo(i + s, o + r), t.quadraticCurveTo(i, o + r, i, o + r - s), t.lineTo(i, o + s), t.quadraticCurveTo(i, o, i + s, o)
        }, force: function (t, e) {
            s.prototype.iconLibrary.circle(t, e)
        }, radar: function (t, e) {
            var i = 6, o = e.x + e.width / 2, n = e.y + e.height / 2, r = e.height / 2, s = 2 * Math.PI / i, a = -Math.PI / 2, h = o + r * Math.cos(a), l = n + r * Math.sin(a);
            t.moveTo(h, l), a += s;
            for (var d = 0, c = i - 1; c > d; d++)t.lineTo(o + r * Math.cos(a), n + r * Math.sin(a)), a += s;
            t.lineTo(h, l)
        }
    };
    c.chord = c.pie, c.map = c.bar;
    for (var u in c)s.prototype.iconLibrary["legendicon" + u] = c[u];
    return l.inherits(e, i), t("../component").define("legend", e), e
}), define("echarts/util/ecData", [], function () {
    function t(t, e, i, o, n, r, s, a) {
        var h;
        return "undefined" != typeof o && (h = null == o.value ? o : o.value), t._echartsData = {
            _series: e,
            _seriesIndex: i,
            _data: o,
            _dataIndex: n,
            _name: r,
            _value: h,
            _special: s,
            _special2: a
        }, t._echartsData
    }

    function e(t, e) {
        var i = t._echartsData;
        if (!e)return i;
        switch (e) {
            case"series":
            case"seriesIndex":
            case"data":
            case"dataIndex":
            case"name":
            case"value":
            case"special":
            case"special2":
                return i && i["_" + e]
        }
        return null
    }

    function i(t, e, i) {
        switch (t._echartsData = t._echartsData || {}, e) {
            case"series":
            case"seriesIndex":
            case"data":
            case"dataIndex":
            case"name":
            case"value":
            case"special":
            case"special2":
                t._echartsData["_" + e] = i
        }
    }

    function o(t, e) {
        e._echartsData = {
            _series: t._echartsData._series,
            _seriesIndex: t._echartsData._seriesIndex,
            _data: t._echartsData._data,
            _dataIndex: t._echartsData._dataIndex,
            _name: t._echartsData._name,
            _value: t._echartsData._value,
            _special: t._echartsData._special,
            _special2: t._echartsData._special2
        }
    }

    return {pack: t, set: i, get: e, clone: o}
}), define("echarts/chart", [], function () {
    var t = {}, e = {};
    return t.define = function (i, o) {
        return e[i] = o, t
    }, t.get = function (t) {
        return e[t]
    }, t
}), define("zrender/tool/color", ["require", "../tool/util"], function (t) {
    function e(t) {
        W = t
    }

    function i() {
        W = q
    }

    function o(t, e) {
        return t = 0 | t, e = e || W, e[t % e.length]
    }

    function n(t) {
        G = t
    }

    function r() {
        X = G
    }

    function s() {
        return G
    }

    function a(t, e, i, o, n, r, s) {
        B || (B = Y.getContext());
        for (var a = B.createRadialGradient(t, e, i, o, n, r), h = 0, l = s.length; l > h; h++)a.addColorStop(s[h][0], s[h][1]);
        return a.__nonRecursion = !0, a
    }

    function h(t, e, i, o, n) {
        B || (B = Y.getContext());
        for (var r = B.createLinearGradient(t, e, i, o), s = 0, a = n.length; a > s; s++)r.addColorStop(n[s][0], n[s][1]);
        return r.__nonRecursion = !0, r
    }

    function l(t, e, i) {
        t = f(t), e = f(e), t = M(t), e = M(e);
        for (var o = [], n = (e[0] - t[0]) / i, r = (e[1] - t[1]) / i, s = (e[2] - t[2]) / i, a = (e[3] - t[3]) / i, h = 0, l = t[0], d = t[1], u = t[2], p = t[3]; i > h; h++)o[h] = c([I(Math.floor(l), [0, 255]), I(Math.floor(d), [0, 255]), I(Math.floor(u), [0, 255]), p.toFixed(4) - 0], "rgba"), l += n, d += r, u += s, p += a;
        return l = e[0], d = e[1], u = e[2], p = e[3], o[h] = c([l, d, u, p], "rgba"), o
    }

    function d(t, e) {
        var i = [], o = t.length;
        if (void 0 === e && (e = 20), 1 === o)i = l(t[0], t[0], e); else if (o > 1)for (var n = 0, r = o - 1; r > n; n++) {
            var s = l(t[n], t[n + 1], e);
            r - 1 > n && s.pop(), i = i.concat(s)
        }
        return i
    }

    function c(t, e) {
        if (e = e || "rgb", t && (3 === t.length || 4 === t.length)) {
            if (t = O(t, function (t) {
                    return t > 1 ? Math.ceil(t) : t
                }), e.indexOf("hex") > -1)return "#" + ((1 << 24) + (t[0] << 16) + (t[1] << 8) + +t[2]).toString(16).slice(1);
            if (e.indexOf("hs") > -1) {
                var i = O(t.slice(1, 3), function (t) {
                    return t + "%"
                });
                t[1] = i[0], t[2] = i[1]
            }
            return e.indexOf("a") > -1 ? (3 === t.length && t.push(1), t[3] = I(t[3], [0, 1]), e + "(" + t.slice(0, 4).join(",") + ")") : e + "(" + t.slice(0, 3).join(",") + ")"
        }
    }

    function u(t) {
        t = C(t), t.indexOf("rgba") < 0 && (t = f(t));
        var e = [], i = 0;
        return t.replace(/[\d.]+/g, function (t) {
            t = 3 > i ? 0 | t : +t, e[i++] = t
        }), e
    }

    function p(t, e) {
        if (!P(t))return t;
        var i = M(t), o = i[3];
        return "undefined" == typeof o && (o = 1), t.indexOf("hsb") > -1 ? i = R(i) : t.indexOf("hsl") > -1 && (i = D(i)), e.indexOf("hsb") > -1 || e.indexOf("hsv") > -1 ? i = N(i) : e.indexOf("hsl") > -1 && (i = F(i)), i[3] = o, c(i, e)
    }

    function f(t) {
        return p(t, "rgba")
    }

    function g(t) {
        return p(t, "rgb")
    }

    function m(t) {
        return p(t, "hex")
    }

    function _(t) {
        return p(t, "hsva")
    }

    function y(t) {
        return p(t, "hsv")
    }

    function v(t) {
        return p(t, "hsba")
    }

    function x(t) {
        return p(t, "hsb")
    }

    function b(t) {
        return p(t, "hsla")
    }

    function T(t) {
        return p(t, "hsl")
    }

    function S(t) {
        for (var e in U)if (m(U[e]) === m(t))return e;
        return null
    }

    function C(t) {
        return String(t).replace(/\s+/g, "")
    }

    function z(t) {
        if (U[t] && (t = U[t]), t = C(t), t = t.replace(/hsv/i, "hsb"), /^#[\da-f]{3}$/i.test(t)) {
            t = parseInt(t.slice(1), 16);
            var e = (3840 & t) << 8, i = (240 & t) << 4, o = 15 & t;
            t = "#" + ((1 << 24) + (e << 4) + e + (i << 4) + i + (o << 4) + o).toString(16).slice(1)
        }
        return t
    }

    function w(t, e) {
        if (!P(t))return t;
        var i = e > 0 ? 1 : -1;
        "undefined" == typeof e && (e = 0), e = Math.abs(e) > 1 ? 1 : Math.abs(e), t = g(t);
        for (var o = M(t), n = 0; 3 > n; n++)o[n] = 1 === i ? o[n] * (1 - e) | 0 : (255 - o[n]) * e + o[n] | 0;
        return "rgb(" + o.join(",") + ")"
    }

    function E(t) {
        if (!P(t))return t;
        var e = M(f(t));
        return e = O(e, function (t) {
            return 255 - t
        }), c(e, "rgb")
    }

    function A(t, e, i) {
        if (!P(t) || !P(e))return t;
        "undefined" == typeof i && (i = .5), i = 1 - I(i, [0, 1]);
        for (var o = 2 * i - 1, n = M(f(t)), r = M(f(e)), s = n[3] - r[3], a = ((o * s === -1 ? o : (o + s) / (1 + o * s)) + 1) / 2, h = 1 - a, l = [], d = 0; 3 > d; d++)l[d] = n[d] * a + r[d] * h;
        var u = n[3] * i + r[3] * (1 - i);
        return u = Math.max(0, Math.min(1, u)), 1 === n[3] && 1 === r[3] ? c(l, "rgb") : (l[3] = u, c(l, "rgba"))
    }

    function L() {
        return "#" + (Math.random().toString(16) + "0000").slice(2, 8)
    }

    function M(t) {
        t = z(t);
        var e = t.match(V);
        if (null === e)throw new Error("The color format error");
        var i, o, n, r = [];
        if (e[2])i = e[2].replace("#", "").split(""), n = [i[0] + i[1], i[2] + i[3], i[4] + i[5]], r = O(n, function (t) {
            return I(parseInt(t, 16), [0, 255])
        }); else if (e[4]) {
            var s = e[4].split(",");
            o = s[3], n = s.slice(0, 3), r = O(n, function (t) {
                return t = Math.floor(t.indexOf("%") > 0 ? 2.55 * parseInt(t, 0) : t), I(t, [0, 255])
            }), "undefined" != typeof o && r.push(I(parseFloat(o), [0, 1]))
        } else if (e[5] || e[6]) {
            var a = (e[5] || e[6]).split(","), h = parseInt(a[0], 0) / 360, l = a[1], d = a[2];
            o = a[3], r = O([l, d], function (t) {
                return I(parseFloat(t) / 100, [0, 1])
            }), r.unshift(h), "undefined" != typeof o && r.push(I(parseFloat(o), [0, 1]))
        }
        return r
    }

    function k(t, e) {
        if (!P(t))return t;
        null === e && (e = 1);
        var i = M(f(t));
        return i[3] = I(Number(e).toFixed(4), [0, 1]), c(i, "rgba")
    }

    function O(t, e) {
        if ("function" != typeof e)throw new TypeError;
        for (var i = t ? t.length : 0, o = 0; i > o; o++)t[o] = e(t[o]);
        return t
    }

    function I(t, e) {
        return t <= e[0] ? t = e[0] : t >= e[1] && (t = e[1]), t
    }

    function P(t) {
        return t instanceof Array || "string" == typeof t
    }

    function R(t) {
        var e, i, o, n = t[0], r = t[1], s = t[2];
        if (0 === r)e = 255 * s, i = 255 * s, o = 255 * s; else {
            var a = 6 * n;
            6 === a && (a = 0);
            var h = 0 | a, l = s * (1 - r), d = s * (1 - r * (a - h)), c = s * (1 - r * (1 - (a - h))), u = 0, p = 0, f = 0;
            0 === h ? (u = s, p = c, f = l) : 1 === h ? (u = d, p = s, f = l) : 2 === h ? (u = l, p = s, f = c) : 3 === h ? (u = l, p = d, f = s) : 4 === h ? (u = c, p = l, f = s) : (u = s, p = l, f = d), e = 255 * u, i = 255 * p, o = 255 * f
        }
        return [e, i, o]
    }

    function D(t) {
        var e, i, o, n = t[0], r = t[1], s = t[2];
        if (0 === r)e = 255 * s, i = 255 * s, o = 255 * s; else {
            var a;
            a = .5 > s ? s * (1 + r) : s + r - r * s;
            var h = 2 * s - a;
            e = 255 * H(h, a, n + 1 / 3), i = 255 * H(h, a, n), o = 255 * H(h, a, n - 1 / 3)
        }
        return [e, i, o]
    }

    function H(t, e, i) {
        return 0 > i && (i += 1), i > 1 && (i -= 1), 1 > 6 * i ? t + 6 * (e - t) * i : 1 > 2 * i ? e : 2 > 3 * i ? t + (e - t) * (2 / 3 - i) * 6 : t
    }

    function N(t) {
        var e, i, o = t[0] / 255, n = t[1] / 255, r = t[2] / 255, s = Math.min(o, n, r), a = Math.max(o, n, r), h = a - s, l = a;
        if (0 === h)e = 0, i = 0; else {
            i = h / a;
            var d = ((a - o) / 6 + h / 2) / h, c = ((a - n) / 6 + h / 2) / h, u = ((a - r) / 6 + h / 2) / h;
            o === a ? e = u - c : n === a ? e = 1 / 3 + d - u : r === a && (e = 2 / 3 + c - d), 0 > e && (e += 1), e > 1 && (e -= 1)
        }
        return e = 360 * e, i = 100 * i, l = 100 * l, [e, i, l]
    }

    function F(t) {
        var e, i, o = t[0] / 255, n = t[1] / 255, r = t[2] / 255, s = Math.min(o, n, r), a = Math.max(o, n, r), h = a - s, l = (a + s) / 2;
        if (0 === h)e = 0, i = 0; else {
            i = .5 > l ? h / (a + s) : h / (2 - a - s);
            var d = ((a - o) / 6 + h / 2) / h, c = ((a - n) / 6 + h / 2) / h, u = ((a - r) / 6 + h / 2) / h;
            o === a ? e = u - c : n === a ? e = 1 / 3 + d - u : r === a && (e = 2 / 3 + c - d), 0 > e && (e += 1), e > 1 && (e -= 1)
        }
        return e = 360 * e, i = 100 * i, l = 100 * l, [e, i, l]
    }

    var B, Y = t("../tool/util"), W = ["#ff9277", " #dddd00", " #ffc877", " #bbe3ff", " #d5ffbb", "#bbbbff", " #ddb000", " #b0dd00", " #e2bbff", " #ffbbe3", "#ff7777", " #ff9900", " #83dd00", " #77e3ff", " #778fff", "#c877ff", " #ff77ab", " #ff6600", " #aa8800", " #77c7ff", "#ad77ff", " #ff77ff", " #dd0083", " #777700", " #00aa00", "#0088aa", " #8400dd", " #aa0088", " #dd0000", " #772e00"], q = W, G = "rgba(255,255,0,0.5)", X = G, V = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i, U = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#0ff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000",
        blanchedalmond: "#ffebcd",
        blue: "#00f",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#0ff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgrey: "#a9a9a9",
        darkgreen: "#006400",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#f0f",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        grey: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgrey: "#d3d3d3",
        lightgreen: "#90ee90",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#789",
        lightslategrey: "#789",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#0f0",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#f0f",
        maroon: "#800000",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370d8",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#d87093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        red: "#f00",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#fff",
        whitesmoke: "#f5f5f5",
        yellow: "#ff0",
        yellowgreen: "#9acd32"
    };
    return {
        customPalette: e,
        resetPalette: i,
        getColor: o,
        getHighlightColor: s,
        customHighlight: n,
        resetHighlight: r,
        getRadialGradient: a,
        getLinearGradient: h,
        getGradientColors: d,
        getStepColors: l,
        reverse: E,
        mix: A,
        lift: w,
        trim: C,
        random: L,
        toRGB: g,
        toRGBA: f,
        toHex: m,
        toHSL: T,
        toHSLA: b,
        toHSB: x,
        toHSBA: v,
        toHSV: y,
        toHSVA: _,
        toName: S,
        toColor: c,
        toArray: u,
        alpha: k,
        getData: M
    }
}), define("echarts/component/timeline", ["require", "./base", "zrender/shape/Rectangle", "../util/shape/Icon", "../util/shape/Chain", "../config", "zrender/tool/util", "zrender/tool/area", "zrender/tool/event", "../component"], function (t) {
    function e(t, e, i, n, r) {
        o.call(this, t, e, i, n, r);
        var s = this;
        if (s._onclick = function (t) {
                return s.__onclick(t)
            }, s._ondrift = function (t, e) {
                return s.__ondrift(this, t, e)
            }, s._ondragend = function () {
                return s.__ondragend()
            }, s._setCurrentOption = function () {
                var t = s.timelineOption;
                s.currentIndex %= t.data.length;
                var e = s.options[s.currentIndex] || {};
                s.myChart.setOption(e, t.notMerge), s.messageCenter.dispatch(a.EVENT.TIMELINE_CHANGED, null, {
                    currentIndex: s.currentIndex,
                    data: null != t.data[s.currentIndex].name ? t.data[s.currentIndex].name : t.data[s.currentIndex]
                }, s.myChart)
            }, s._onFrame = function () {
                s._setCurrentOption(), s._syncHandleShape(), s.timelineOption.autoPlay && (s.playTicket = setTimeout(function () {
                    return s.currentIndex += 1, !s.timelineOption.loop && s.currentIndex >= s.timelineOption.data.length ? (s.currentIndex = s.timelineOption.data.length - 1, void s.stop()) : void s._onFrame()
                }, s.timelineOption.playInterval))
            }, this.setTheme(!1), this.options = this.option.options, this.currentIndex = this.timelineOption.currentIndex % this.timelineOption.data.length, this.timelineOption.notMerge || 0 === this.currentIndex || (this.options[this.currentIndex] = h.merge(this.options[this.currentIndex], this.options[0])), this.timelineOption.show && (this._buildShape(), this._syncHandleShape()), this._setCurrentOption(), this.timelineOption.autoPlay) {
            var s = this;
            this.playTicket = setTimeout(function () {
                s.play()
            }, this.ecTheme.animationDuration)
        }
    }

    function i(t, e) {
        var i = 2, o = e.x + i, n = e.y + i + 2, s = e.width - i, a = e.height - i, h = e.symbol;
        if ("last" === h)t.moveTo(o + s - 2, n + a / 3), t.lineTo(o + s - 2, n), t.lineTo(o + 2, n + a / 2), t.lineTo(o + s - 2, n + a), t.lineTo(o + s - 2, n + a / 3 * 2), t.moveTo(o, n), t.lineTo(o, n); else if ("next" === h)t.moveTo(o + 2, n + a / 3), t.lineTo(o + 2, n), t.lineTo(o + s - 2, n + a / 2), t.lineTo(o + 2, n + a), t.lineTo(o + 2, n + a / 3 * 2), t.moveTo(o, n), t.lineTo(o, n); else if ("play" === h)if ("stop" === e.status)t.moveTo(o + 2, n), t.lineTo(o + s - 2, n + a / 2), t.lineTo(o + 2, n + a), t.lineTo(o + 2, n); else {
            var l = "both" === e.brushType ? 2 : 3;
            t.rect(o + 2, n, l, a), t.rect(o + s - l - 2, n, l, a)
        } else if (h.match("image")) {
            var d = "";
            d = h.replace(new RegExp("^image:\\/\\/"), ""), (h = r.prototype.iconLibrary.image)(t, {
                x: o,
                y: n,
                width: s,
                height: a,
                image: d
            })
        }
    }

    var o = t("./base"), n = t("zrender/shape/Rectangle"), r = t("../util/shape/Icon"), s = t("../util/shape/Chain"), a = t("../config"), h = t("zrender/tool/util"), l = t("zrender/tool/area"), d = t("zrender/tool/event");
    return e.prototype = {
        type: a.COMPONENT_TYPE_TIMELINE, _buildShape: function () {
            if (this._location = this._getLocation(), this._buildBackground(), this._buildControl(), this._chainPoint = this._getChainPoint(), this.timelineOption.label.show)for (var t = this._getInterval(), e = 0, i = this._chainPoint.length; i > e; e += t)this._chainPoint[e].showLabel = !0;
            this._buildChain(), this._buildHandle();
            for (var e = 0, o = this.shapeList.length; o > e; e++)this.zr.addShape(this.shapeList[e])
        }, _getLocation: function () {
            var t, e = this.timelineOption, i = this.reformCssArray(this.timelineOption.padding), o = this.zr.getWidth(), n = this.parsePercent(e.x, o), r = this.parsePercent(e.x2, o);
            null == e.width ? (t = o - n - r, r = o - r) : (t = this.parsePercent(e.width, o), r = n + t);
            var s, a, h = this.zr.getHeight(), l = this.parsePercent(e.height, h);
            return null != e.y ? (s = this.parsePercent(e.y, h), a = s + l) : (a = h - this.parsePercent(e.y2, h), s = a - l), {
                x: n + i[3],
                y: s + i[0],
                x2: r - i[1],
                y2: a - i[2],
                width: t - i[1] - i[3],
                height: l - i[0] - i[2]
            }
        }, _getReformedLabel: function (t) {
            var e = this.timelineOption, i = null != e.data[t].name ? e.data[t].name : e.data[t], o = e.data[t].formatter || e.label.formatter;
            return o && ("function" == typeof o ? i = o.call(this.myChart, i) : "string" == typeof o && (i = o.replace("{value}", i))), i
        }, _getInterval: function () {
            var t = this._chainPoint, e = this.timelineOption, i = e.label.interval;
            if ("auto" === i) {
                var o = e.label.textStyle.fontSize, n = e.data, r = e.data.length;
                if (r > 3) {
                    var s, a, h = !1;
                    for (i = 0; !h && r > i;) {
                        i++, h = !0;
                        for (var d = i; r > d; d += i) {
                            if (s = t[d].x - t[d - i].x, 0 !== e.label.rotate)a = o; else if (n[d].textStyle)a = l.getTextWidth(t[d].name, t[d].textFont); else {
                                var c = t[d].name + "", u = (c.match(/\w/g) || "").length, p = c.length - u;
                                a = u * o * 2 / 3 + p * o
                            }
                            if (a > s) {
                                h = !1;
                                break
                            }
                        }
                    }
                } else i = 1
            } else i = i - 0 + 1;
            return i
        }, _getChainPoint: function () {
            function t(t) {
                return null != l[t].name ? l[t].name : l[t] + ""
            }

            var e, i = this.timelineOption, o = i.symbol.toLowerCase(), n = i.symbolSize, r = i.label.rotate, s = i.label.textStyle, a = this.getFont(s), l = i.data, d = this._location.x, c = this._location.y + this._location.height / 4 * 3, u = this._location.x2 - this._location.x, p = l.length, f = [];
            if (p > 1) {
                var g = u / p;
                if (g = g > 50 ? 50 : 20 > g ? 5 : g, u -= 2 * g, "number" === i.type)for (var m = 0; p > m; m++)f.push(d + g + u / (p - 1) * m); else {
                    f[0] = new Date(t(0).replace(/-/g, "/")), f[p - 1] = new Date(t(p - 1).replace(/-/g, "/")) - f[0];
                    for (var m = 1; p > m; m++)f[m] = d + g + u * (new Date(t(m).replace(/-/g, "/")) - f[0]) / f[p - 1];
                    f[0] = d + g
                }
            } else f.push(d + u / 2);
            for (var _, y, v, x, b, T = [], m = 0; p > m; m++)d = f[m], _ = l[m].symbol && l[m].symbol.toLowerCase() || o, _.match("empty") ? (_ = _.replace("empty", ""), v = !0) : v = !1, _.match("star") && (y = _.replace("star", "") - 0 || 5, _ = "star"), e = l[m].textStyle ? h.merge(l[m].textStyle || {}, s) : s, x = e.align || "center", r ? (x = r > 0 ? "right" : "left", b = [r * Math.PI / 180, d, c - 5]) : b = !1, T.push({
                x: d,
                n: y,
                isEmpty: v,
                symbol: _,
                symbolSize: l[m].symbolSize || n,
                color: l[m].color,
                borderColor: l[m].borderColor,
                borderWidth: l[m].borderWidth,
                name: this._getReformedLabel(m),
                textColor: e.color,
                textAlign: x,
                textBaseline: e.baseline || "middle",
                textX: d,
                textY: c - (r ? 5 : 0),
                textFont: l[m].textStyle ? this.getFont(e) : a,
                rotation: b,
                showLabel: !1
            });
            return T
        }, _buildBackground: function () {
            var t = this.timelineOption, e = this.reformCssArray(this.timelineOption.padding), i = this._location.width, o = this._location.height;
            (0 !== t.borderWidth || "rgba(0,0,0,0)" != t.backgroundColor.replace(/\s/g, "")) && this.shapeList.push(new n({
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {
                    x: this._location.x - e[3],
                    y: this._location.y - e[0],
                    width: i + e[1] + e[3],
                    height: o + e[0] + e[2],
                    brushType: 0 === t.borderWidth ? "fill" : "both",
                    color: t.backgroundColor,
                    strokeColor: t.borderColor,
                    lineWidth: t.borderWidth
                }
            }))
        }, _buildControl: function () {
            var t = this, e = this.timelineOption, i = e.lineStyle, o = e.controlStyle;
            if ("none" !== e.controlPosition) {
                var n, s = 15, a = 5;
                "left" === e.controlPosition ? (n = this._location.x, this._location.x += 3 * (s + a)) : (n = this._location.x2 - (3 * (s + a) - a), this._location.x2 -= 3 * (s + a));
                var l = this._location.y, d = {
                    zlevel: this._zlevelBase + 1,
                    style: {
                        iconType: "timelineControl",
                        symbol: "last",
                        x: n,
                        y: l,
                        width: s,
                        height: s,
                        brushType: "stroke",
                        color: o.normal.color,
                        strokeColor: o.normal.color,
                        lineWidth: i.width
                    },
                    highlightStyle: {color: o.emphasis.color, strokeColor: o.emphasis.color, lineWidth: i.width + 1},
                    clickable: !0
                };
                this._ctrLastShape = new r(d), this._ctrLastShape.onclick = function () {
                    t.last()
                }, this.shapeList.push(this._ctrLastShape), n += s + a, this._ctrPlayShape = new r(h.clone(d)), this._ctrPlayShape.style.brushType = "fill", this._ctrPlayShape.style.symbol = "play", this._ctrPlayShape.style.status = this.timelineOption.autoPlay ? "playing" : "stop", this._ctrPlayShape.style.x = n, this._ctrPlayShape.onclick = function () {
                    "stop" === t._ctrPlayShape.style.status ? t.play() : t.stop()
                }, this.shapeList.push(this._ctrPlayShape), n += s + a, this._ctrNextShape = new r(h.clone(d)), this._ctrNextShape.style.symbol = "next", this._ctrNextShape.style.x = n, this._ctrNextShape.onclick = function () {
                    t.next()
                }, this.shapeList.push(this._ctrNextShape)
            }
        }, _buildChain: function () {
            var t = this.timelineOption, e = t.lineStyle;
            this._timelineShae = {
                zlevel: this._zlevelBase,
                style: {
                    x: this._location.x,
                    y: this.subPixelOptimize(this._location.y, e.width),
                    width: this._location.x2 - this._location.x,
                    height: this._location.height,
                    chainPoint: this._chainPoint,
                    brushType: "both",
                    strokeColor: e.color,
                    lineWidth: e.width,
                    lineType: e.type
                },
                hoverable: !1,
                clickable: !0,
                onclick: this._onclick
            }, this._timelineShae = new s(this._timelineShae), this.shapeList.push(this._timelineShae)
        }, _buildHandle: function () {
            var t = this._chainPoint[this.currentIndex], e = t.symbolSize + 1;
            e = 5 > e ? 5 : e, this._handleShape = {
                zlevel: this._zlevelBase + 1,
                hoverable: !1,
                draggable: !0,
                style: {
                    iconType: "diamond",
                    n: t.n,
                    x: t.x - e,
                    y: this._location.y + this._location.height / 4 - e,
                    width: 2 * e,
                    height: 2 * e,
                    brushType: "both",
                    textPosition: "specific",
                    textX: t.x,
                    textY: this._location.y - this._location.height / 4,
                    textAlign: "center",
                    textBaseline: "middle"
                },
                highlightStyle: {},
                ondrift: this._ondrift,
                ondragend: this._ondragend
            }, this._handleShape = new r(this._handleShape), this.shapeList.push(this._handleShape)
        }, _syncHandleShape: function () {
            if (this.timelineOption.show) {
                var t = this.timelineOption, e = t.checkpointStyle, i = this._chainPoint[this.currentIndex];
                this._handleShape.style.text = e.label.show ? i.name : "", this._handleShape.style.textFont = i.textFont, this._handleShape.style.n = i.n, "auto" === e.symbol ? this._handleShape.style.iconType = "none" != i.symbol ? i.symbol : "diamond" : (this._handleShape.style.iconType = e.symbol, e.symbol.match("star") && (this._handleShape.style.n = e.symbol.replace("star", "") - 0 || 5, this._handleShape.style.iconType = "star"));
                var o;
                "auto" === e.symbolSize ? (o = i.symbolSize + 2, o = 5 > o ? 5 : o) : o = e.symbolSize - 0, this._handleShape.style.color = "auto" === e.color ? i.color ? i.color : t.controlStyle.emphasis.color : e.color, this._handleShape.style.textColor = "auto" === e.label.textStyle.color ? this._handleShape.style.color : e.label.textStyle.color, this._handleShape.highlightStyle.strokeColor = this._handleShape.style.strokeColor = "auto" === e.borderColor ? i.borderColor ? i.borderColor : "#fff" : e.borderColor, this._handleShape.style.lineWidth = "auto" === e.borderWidth ? i.borderWidth ? i.borderWidth : 0 : e.borderWidth - 0, this._handleShape.highlightStyle.lineWidth = this._handleShape.style.lineWidth + 1, this.zr.animate(this._handleShape.id, "style").when(500, {
                    x: i.x - o,
                    textX: i.x,
                    y: this._location.y + this._location.height / 4 - o,
                    width: 2 * o,
                    height: 2 * o
                }).start("ExponentialOut")
            }
        }, _findChainIndex: function (t) {
            var e = this._chainPoint, i = e.length;
            if (t <= e[0].x)return 0;
            if (t >= e[i - 1].x)return i - 1;
            for (var o = 0; i - 1 > o; o++)if (t >= e[o].x && t <= e[o + 1].x)return Math.abs(t - e[o].x) < Math.abs(t - e[o + 1].x) ? o : o + 1
        }, __onclick: function (t) {
            var e = d.getX(t.event), i = this._findChainIndex(e);
            return i === this.currentIndex ? !0 : (this.currentIndex = i, this.timelineOption.autoPlay && this.stop(), clearTimeout(this.playTicket), void this._onFrame())
        }, __ondrift: function (t, e) {
            this.timelineOption.autoPlay && this.stop();
            var i, o = this._chainPoint, n = o.length;
            t.style.x + e <= o[0].x - o[0].symbolSize ? (t.style.x = o[0].x - o[0].symbolSize, i = 0) : t.style.x + e >= o[n - 1].x - o[n - 1].symbolSize ? (t.style.x = o[n - 1].x - o[n - 1].symbolSize, i = n - 1) : (t.style.x += e, i = this._findChainIndex(t.style.x));
            var r = o[i], s = r.symbolSize + 2;
            if (t.style.iconType = r.symbol, t.style.n = r.n, t.style.textX = t.style.x + s / 2, t.style.y = this._location.y + this._location.height / 4 - s, t.style.width = 2 * s, t.style.height = 2 * s, t.style.text = r.name, i === this.currentIndex)return !0;
            if (this.currentIndex = i, this.timelineOption.realtime) {
                clearTimeout(this.playTicket);
                var a = this;
                this.playTicket = setTimeout(function () {
                    a._setCurrentOption()
                }, 200)
            }
            return !0
        }, __ondragend: function () {
            this.isDragend = !0
        }, ondragend: function (t, e) {
            this.isDragend && t.target && (!this.timelineOption.realtime && this._setCurrentOption(), e.dragOut = !0, e.dragIn = !0, e.needRefresh = !1, this.isDragend = !1, this._syncHandleShape())
        }, last: function () {
            return this.timelineOption.autoPlay && this.stop(), this.currentIndex -= 1, this.currentIndex < 0 && (this.currentIndex = this.timelineOption.data.length - 1), this._onFrame(), this.currentIndex
        }, next: function () {
            return this.timelineOption.autoPlay && this.stop(), this.currentIndex += 1, this.currentIndex >= this.timelineOption.data.length && (this.currentIndex = 0), this._onFrame(), this.currentIndex
        }, play: function (t, e) {
            return this._ctrPlayShape && "playing" != this._ctrPlayShape.style.status && (this._ctrPlayShape.style.status = "playing", this.zr.modShape(this._ctrPlayShape.id), this.zr.refresh()), this.timelineOption.autoPlay = null != e ? e : !0, this.timelineOption.autoPlay || clearTimeout(this.playTicket), this.currentIndex = null != t ? t : this.currentIndex + 1, this.currentIndex >= this.timelineOption.data.length && (this.currentIndex = 0), this._onFrame(), this.currentIndex
        }, stop: function () {
            return this._ctrPlayShape && "stop" != this._ctrPlayShape.style.status && (this._ctrPlayShape.style.status = "stop", this.zr.modShape(this._ctrPlayShape.id), this.zr.refresh()), this.timelineOption.autoPlay = !1, clearTimeout(this.playTicket), this.currentIndex
        }, resize: function () {
            this.timelineOption.show && (this.clear(), this._buildShape(), this._syncHandleShape())
        }, setTheme: function (t) {
            this.timelineOption = this.reformOption(h.clone(this.option.timeline)), this.timelineOption.label.textStyle = h.merge(this.timelineOption.label.textStyle || {}, this.ecTheme.textStyle), this.timelineOption.checkpointStyle.label.textStyle = h.merge(this.timelineOption.checkpointStyle.label.textStyle || {}, this.ecTheme.textStyle), this.myChart.canvasSupported || (this.timelineOption.realtime = !1), this.timelineOption.show && t && (this.clear(), this._buildShape(), this._syncHandleShape())
        }, onbeforDispose: function () {
            clearTimeout(this.playTicket)
        }
    }, r.prototype.iconLibrary.timelineControl = i, h.inherits(e, o), t("../component").define("timeline", e), e
}), define("zrender/shape/Image", ["require", "./Base", "../tool/util"], function (t) {
    var e = t("./Base"), i = function (t) {
        e.call(this, t)
    };
    return i.prototype = {
        type: "image", brush: function (t, e, i) {
            var o = this.style || {};
            e && (o = this.getHighlightStyle(o, this.highlightStyle || {}));
            var n = o.image, r = this;
            if (this._imageCache || (this._imageCache = {}), "string" == typeof n) {
                var s = n;
                this._imageCache[s] ? n = this._imageCache[s] : (n = new Image, n.onload = function () {
                    n.onload = null, r.modSelf(), i()
                }, n.src = s, this._imageCache[s] = n)
            }
            if (n) {
                if ("IMG" == n.nodeName.toUpperCase())if (window.ActiveXObject) {
                    if ("complete" != n.readyState)return
                } else if (!n.complete)return;
                var a = o.width || n.width, h = o.height || n.height, l = o.x, d = o.y;
                if (!n.width || !n.height)return;
                if (t.save(), this.doClip(t), this.setContext(t, o), this.setTransform(t), o.sWidth && o.sHeight) {
                    var c = o.sx || 0, u = o.sy || 0;
                    t.drawImage(n, c, u, o.sWidth, o.sHeight, l, d, a, h)
                } else if (o.sx && o.sy) {
                    var c = o.sx, u = o.sy, p = a - c, f = h - u;
                    t.drawImage(n, c, u, p, f, l, d, a, h)
                } else t.drawImage(n, l, d, a, h);
                o.width || (o.width = a), o.height || (o.height = h), this.style.width || (this.style.width = a), this.style.height || (this.style.height = h), this.drawText(t, o, this.style), t.restore()
            }
        }, getRect: function (t) {
            return {x: t.x, y: t.y, width: t.width, height: t.height}
        }, clearCache: function () {
            this._imageCache = {}
        }
    }, t("../tool/util").inherits(i, e), i
}), define("zrender/loadingEffect/Bar", ["require", "./Base", "../tool/util", "../tool/color", "../shape/Rectangle"], function (t) {
    function e(t) {
        i.call(this, t)
    }

    var i = t("./Base"), o = t("../tool/util"), n = t("../tool/color"), r = t("../shape/Rectangle");
    return o.inherits(e, i), e.prototype._start = function (t, e) {
        var i = o.merge(this.options, {
            textStyle: {color: "#888"},
            backgroundColor: "rgba(250, 250, 250, 0.8)",
            effectOption: {
                x: 0,
                y: this.canvasHeight / 2 - 30,
                width: this.canvasWidth,
                height: 5,
                brushType: "fill",
                timeInterval: 100
            }
        }), s = this.createTextShape(i.textStyle), a = this.createBackgroundShape(i.backgroundColor), h = i.effectOption, l = new r({highlightStyle: o.clone(h)});
        return l.highlightStyle.color = h.color || n.getLinearGradient(h.x, h.y, h.x + h.width, h.y + h.height, [[0, "#ff6400"], [.5, "#ffe100"], [1, "#b1ff00"]]), null != i.progress ? (t(a), l.highlightStyle.width = this.adjust(i.progress, [0, 1]) * i.effectOption.width, t(l), t(s), void e()) : (l.highlightStyle.width = 0, setInterval(function () {
            t(a), l.highlightStyle.width < h.width ? l.highlightStyle.width += 8 : l.highlightStyle.width = 0, t(l), t(s), e()
        }, h.timeInterval))
    }, e
}), define("zrender/loadingEffect/Bubble", ["require", "./Base", "../tool/util", "../tool/color", "../shape/Circle"], function (t) {
    function e(t) {
        i.call(this, t)
    }

    var i = t("./Base"), o = t("../tool/util"), n = t("../tool/color"), r = t("../shape/Circle");
    return o.inherits(e, i), e.prototype._start = function (t, e) {
        for (var i = o.merge(this.options, {
            textStyle: {color: "#888"},
            backgroundColor: "rgba(250, 250, 250, 0.8)",
            effect: {n: 50, lineWidth: 2, brushType: "stroke", color: "random", timeInterval: 100}
        }), s = this.createTextShape(i.textStyle), a = this.createBackgroundShape(i.backgroundColor), h = i.effect, l = h.n, d = h.brushType, c = h.lineWidth, u = [], p = this.canvasWidth, f = this.canvasHeight, g = 0; l > g; g++) {
            var m = "random" == h.color ? n.alpha(n.random(), .3) : h.color;
            u[g] = new r({
                highlightStyle: {
                    x: Math.ceil(Math.random() * p),
                    y: Math.ceil(Math.random() * f),
                    r: Math.ceil(40 * Math.random()),
                    brushType: d,
                    color: m,
                    strokeColor: m,
                    lineWidth: c
                }, animationY: Math.ceil(20 * Math.random())
            })
        }
        return setInterval(function () {
            t(a);
            for (var i = 0; l > i; i++) {
                var o = u[i].highlightStyle;
                o.y - u[i].animationY + o.r <= 0 && (u[i].highlightStyle.y = f + o.r, u[i].highlightStyle.x = Math.ceil(Math.random() * p)), u[i].highlightStyle.y -= u[i].animationY, t(u[i])
            }
            t(s), e()
        }, h.timeInterval)
    }, e
}), define("zrender/loadingEffect/DynamicLine", ["require", "./Base", "../tool/util", "../tool/color", "../shape/Line"], function (t) {
    function e(t) {
        i.call(this, t)
    }

    var i = t("./Base"), o = t("../tool/util"), n = t("../tool/color"), r = t("../shape/Line");
    return o.inherits(e, i), e.prototype._start = function (t, e) {
        for (var i = o.merge(this.options, {
            textStyle: {color: "#fff"},
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            effectOption: {n: 30, lineWidth: 1, color: "random", timeInterval: 100}
        }), s = this.createTextShape(i.textStyle), a = this.createBackgroundShape(i.backgroundColor), h = i.effectOption, l = h.n, d = h.lineWidth, c = [], u = this.canvasWidth, p = this.canvasHeight, f = 0; l > f; f++) {
            var g = -Math.ceil(1e3 * Math.random()), m = Math.ceil(400 * Math.random()), _ = Math.ceil(Math.random() * p), y = "random" == h.color ? n.random() : h.color;
            c[f] = new r({
                highlightStyle: {xStart: g, yStart: _, xEnd: g + m, yEnd: _, strokeColor: y, lineWidth: d},
                animationX: Math.ceil(100 * Math.random()),
                len: m
            })
        }
        return setInterval(function () {
            t(a);
            for (var i = 0; l > i; i++) {
                var o = c[i].highlightStyle;
                o.xStart >= u && (c[i].len = Math.ceil(400 * Math.random()), o.xStart = -400, o.xEnd = -400 + c[i].len, o.yStart = Math.ceil(Math.random() * p), o.yEnd = o.yStart), o.xStart += c[i].animationX, o.xEnd += c[i].animationX, t(c[i])
            }
            t(s), e()
        }, h.timeInterval)
    }, e
}), define("zrender/loadingEffect/Ring", ["require", "./Base", "../tool/util", "../tool/color", "../shape/Ring", "../shape/Sector"], function (t) {
    function e(t) {
        i.call(this, t)
    }

    var i = t("./Base"), o = t("../tool/util"), n = t("../tool/color"), r = t("../shape/Ring"), s = t("../shape/Sector");
    return o.inherits(e, i), e.prototype._start = function (t, e) {
        var i = o.merge(this.options, {
            textStyle: {color: "#07a"},
            backgroundColor: "rgba(250, 250, 250, 0.8)",
            effect: {
                x: this.canvasWidth / 2,
                y: this.canvasHeight / 2,
                r0: 60,
                r: 100,
                color: "#bbdcff",
                brushType: "fill",
                textPosition: "inside",
                textFont: "normal 30px verdana",
                textColor: "rgba(30, 144, 255, 0.6)",
                timeInterval: 100
            }
        }), a = i.effect, h = i.textStyle;
        null == h.x && (h.x = a.x), null == h.y && (h.y = a.y + (a.r0 + a.r) / 2 - 5);
        for (var l = this.createTextShape(i.textStyle), d = this.createBackgroundShape(i.backgroundColor), c = a.x, u = a.y, p = a.r0 + 6, f = a.r - 6, g = a.color, m = n.lift(g, .1), _ = new r({highlightStyle: o.clone(a)}), y = [], v = n.getGradientColors(["#ff6400", "#ffe100", "#97ff00"], 25), x = 15, b = 240, T = 0; 16 > T; T++)y.push(new s({
            highlightStyle: {
                x: c,
                y: u,
                r0: p,
                r: f,
                startAngle: b - x,
                endAngle: b,
                brushType: "fill",
                color: m
            },
            _color: n.getLinearGradient(c + p * Math.cos(b, !0), u - p * Math.sin(b, !0), c + p * Math.cos(b - x, !0), u - p * Math.sin(b - x, !0), [[0, v[2 * T]], [1, v[2 * T + 1]]])
        })), b -= x;
        b = 360;
        for (var T = 0; 4 > T; T++)y.push(new s({
            highlightStyle: {
                x: c,
                y: u,
                r0: p,
                r: f,
                startAngle: b - x,
                endAngle: b,
                brushType: "fill",
                color: m
            },
            _color: n.getLinearGradient(c + p * Math.cos(b, !0), u - p * Math.sin(b, !0), c + p * Math.cos(b - x, !0), u - p * Math.sin(b - x, !0), [[0, v[2 * T + 32]], [1, v[2 * T + 33]]])
        })), b -= x;
        var S = 0;
        if (null != i.progress) {
            t(d), S = 100 * this.adjust(i.progress, [0, 1]).toFixed(2) / 5, _.highlightStyle.text = 5 * S + "%", t(_);
            for (var T = 0; 20 > T; T++)y[T].highlightStyle.color = S > T ? y[T]._color : m, t(y[T]);
            return t(l), void e()
        }
        return setInterval(function () {
            t(d), S += S >= 20 ? -20 : 1, t(_);
            for (var i = 0; 20 > i; i++)y[i].highlightStyle.color = S > i ? y[i]._color : m, t(y[i]);
            t(l), e()
        }, a.timeInterval)
    }, e
}), define("zrender/loadingEffect/Spin", ["require", "./Base", "../tool/util", "../tool/color", "../tool/area", "../shape/Sector"], function (t) {
    function e(t) {
        i.call(this, t)
    }

    var i = t("./Base"), o = t("../tool/util"), n = t("../tool/color"), r = t("../tool/area"), s = t("../shape/Sector");
    return o.inherits(e, i), e.prototype._start = function (t, e) {
        var i = o.merge(this.options, {
            textStyle: {color: "#fff", textAlign: "start"},
            backgroundColor: "rgba(0, 0, 0, 0.8)"
        }), a = this.createTextShape(i.textStyle), h = 10, l = r.getTextWidth(a.highlightStyle.text, a.highlightStyle.textFont), d = r.getTextHeight(a.highlightStyle.text, a.highlightStyle.textFont), c = o.merge(this.options.effect || {}, {
            r0: 9,
            r: 15,
            n: 18,
            color: "#fff",
            timeInterval: 100
        }), u = this.getLocation(this.options.textStyle, l + h + 2 * c.r, Math.max(2 * c.r, d));
        c.x = u.x + c.r, c.y = a.highlightStyle.y = u.y + u.height / 2, a.highlightStyle.x = c.x + c.r + h;
        for (var p = this.createBackgroundShape(i.backgroundColor), f = c.n, g = c.x, m = c.y, _ = c.r0, y = c.r, v = c.color, x = [], b = Math.round(180 / f), T = 0; f > T; T++)x[T] = new s({
            highlightStyle: {
                x: g,
                y: m,
                r0: _,
                r: y,
                startAngle: b * T * 2,
                endAngle: b * T * 2 + b,
                color: n.alpha(v, (T + 1) / f),
                brushType: "fill"
            }
        });
        var S = [0, g, m];
        return setInterval(function () {
            t(p), S[0] -= .3;
            for (var i = 0; f > i; i++)x[i].rotation = S, t(x[i]);
            t(a), e()
        }, c.timeInterval)
    }, e
}), define("zrender/loadingEffect/Whirling", ["require", "./Base", "../tool/util", "../tool/area", "../shape/Ring", "../shape/Droplet", "../shape/Circle"], function (t) {
    function e(t) {
        i.call(this, t)
    }

    var i = t("./Base"), o = t("../tool/util"), n = t("../tool/area"), r = t("../shape/Ring"), s = t("../shape/Droplet"), a = t("../shape/Circle");
    return o.inherits(e, i), e.prototype._start = function (t, e) {
        var i = o.merge(this.options, {
            textStyle: {color: "#888", textAlign: "start"},
            backgroundColor: "rgba(250, 250, 250, 0.8)"
        }), h = this.createTextShape(i.textStyle), l = 10, d = n.getTextWidth(h.highlightStyle.text, h.highlightStyle.textFont), c = n.getTextHeight(h.highlightStyle.text, h.highlightStyle.textFont), u = o.merge(this.options.effect || {}, {
            r: 18,
            colorIn: "#fff",
            colorOut: "#555",
            colorWhirl: "#6cf",
            timeInterval: 50
        }), p = this.getLocation(this.options.textStyle, d + l + 2 * u.r, Math.max(2 * u.r, c));
        u.x = p.x + u.r, u.y = h.highlightStyle.y = p.y + p.height / 2, h.highlightStyle.x = u.x + u.r + l;
        var f = this.createBackgroundShape(i.backgroundColor), g = new s({
            highlightStyle: {
                a: Math.round(u.r / 2),
                b: Math.round(u.r - u.r / 6),
                brushType: "fill",
                color: u.colorWhirl
            }
        }), m = new a({
            highlightStyle: {
                r: Math.round(u.r / 6),
                brushType: "fill",
                color: u.colorIn
            }
        }), _ = new r({
            highlightStyle: {
                r0: Math.round(u.r - u.r / 3),
                r: u.r,
                brushType: "fill",
                color: u.colorOut
            }
        }), y = [0, u.x, u.y];
        return g.highlightStyle.x = m.highlightStyle.x = _.highlightStyle.x = y[1], g.highlightStyle.y = m.highlightStyle.y = _.highlightStyle.y = y[2], setInterval(function () {
            t(f), t(_), y[0] -= .3, g.rotation = y, t(g), t(m), t(h), e()
        }, u.timeInterval)
    }, e
}), define("echarts/theme/default", [], function () {
    var t = {};
    return t
}), define("zrender/dep/excanvas", ["require"], function () {
    return document.createElement("canvas").getContext ? G_vmlCanvasManager = !1 : !function () {
        function t() {
            return this.context_ || (this.context_ = new x(this))
        }

        function e(t, e) {
            var i = B.call(arguments, 2);
            return function () {
                return t.apply(e, i.concat(B.call(arguments)))
            }
        }

        function i(t) {
            return String(t).replace(/&/g, "&amp;").replace(/"/g, "&quot;")
        }

        function o(t, e, i) {
            t.namespaces[e] || t.namespaces.add(e, i, "#default#VML")
        }

        function n(t) {
            if (o(t, "g_vml_", "urn:schemas-microsoft-com:vml"), o(t, "g_o_", "urn:schemas-microsoft-com:office:office"), !t.styleSheets.ex_canvas_) {
                var e = t.createStyleSheet();
                e.owningElement.id = "ex_canvas_", e.cssText = "canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}"
            }
        }

        function r(t) {
            var e = t.srcElement;
            switch (t.propertyName) {
                case"width":
                    e.getContext().clearRect(), e.style.width = e.attributes.width.nodeValue + "px", e.firstChild.style.width = e.clientWidth + "px";
                    break;
                case"height":
                    e.getContext().clearRect(), e.style.height = e.attributes.height.nodeValue + "px", e.firstChild.style.height = e.clientHeight + "px"
            }
        }

        function s(t) {
            var e = t.srcElement;
            e.firstChild && (e.firstChild.style.width = e.clientWidth + "px", e.firstChild.style.height = e.clientHeight + "px")
        }

        function a() {
            return [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
        }

        function h(t, e) {
            for (var i = a(), o = 0; 3 > o; o++)for (var n = 0; 3 > n; n++) {
                for (var r = 0, s = 0; 3 > s; s++)r += t[o][s] * e[s][n];
                i[o][n] = r
            }
            return i
        }

        function l(t, e) {
            e.fillStyle = t.fillStyle, e.lineCap = t.lineCap, e.lineJoin = t.lineJoin, e.lineWidth = t.lineWidth, e.miterLimit = t.miterLimit, e.shadowBlur = t.shadowBlur, e.shadowColor = t.shadowColor, e.shadowOffsetX = t.shadowOffsetX, e.shadowOffsetY = t.shadowOffsetY, e.strokeStyle = t.strokeStyle, e.globalAlpha = t.globalAlpha, e.font = t.font, e.textAlign = t.textAlign, e.textBaseline = t.textBaseline, e.scaleX_ = t.scaleX_, e.scaleY_ = t.scaleY_, e.lineScale_ = t.lineScale_
        }

        function d(t) {
            var e = t.indexOf("(", 3), i = t.indexOf(")", e + 1), o = t.substring(e + 1, i).split(",");
            return (4 != o.length || "a" != t.charAt(3)) && (o[3] = 1), o
        }

        function c(t) {
            return parseFloat(t) / 100
        }

        function u(t, e, i) {
            return Math.min(i, Math.max(e, t))
        }

        function p(t) {
            var e, i, o, n, r, s;
            if (n = parseFloat(t[0]) / 360 % 360, 0 > n && n++, r = u(c(t[1]), 0, 1), s = u(c(t[2]), 0, 1), 0 == r)e = i = o = s; else {
                var a = .5 > s ? s * (1 + r) : s + r - s * r, h = 2 * s - a;
                e = f(h, a, n + 1 / 3), i = f(h, a, n), o = f(h, a, n - 1 / 3)
            }
            return "#" + W[Math.floor(255 * e)] + W[Math.floor(255 * i)] + W[Math.floor(255 * o)]
        }

        function f(t, e, i) {
            return 0 > i && i++, i > 1 && i--, 1 > 6 * i ? t + 6 * (e - t) * i : 1 > 2 * i ? e : 2 > 3 * i ? t + (e - t) * (2 / 3 - i) * 6 : t
        }

        function g(t) {
            if (t in V)return V[t];
            var e, i = 1;
            if (t = String(t), "#" == t.charAt(0))e = t; else if (/^rgb/.test(t)) {
                for (var o, n = d(t), e = "#", r = 0; 3 > r; r++)o = -1 != n[r].indexOf("%") ? Math.floor(255 * c(n[r])) : +n[r], e += W[u(o, 0, 255)];
                i = +n[3]
            } else if (/^hsl/.test(t)) {
                var n = d(t);
                e = p(n), i = n[3]
            } else e = X[t] || t;
            return V[t] = {color: e, alpha: i}
        }

        function m(t) {
            if (Z[t])return Z[t];
            var e, i = document.createElement("div"), o = i.style;
            try {
                o.font = t, e = o.fontFamily.split(",")[0]
            } catch (n) {
            }
            return Z[t] = {
                style: o.fontStyle || U.style,
                variant: o.fontVariant || U.variant,
                weight: o.fontWeight || U.weight,
                size: o.fontSize || U.size,
                family: e || U.family
            }
        }

        function _(t, e) {
            var i = {};
            for (var o in t)i[o] = t[o];
            var n = parseFloat(e.currentStyle.fontSize), r = parseFloat(t.size);
            return i.size = "number" == typeof t.size ? t.size : -1 != t.size.indexOf("px") ? r : -1 != t.size.indexOf("em") ? n * r : -1 != t.size.indexOf("%") ? n / 100 * r : -1 != t.size.indexOf("pt") ? r / .75 : n, i
        }

        function y(t) {
            return t.style + " " + t.variant + " " + t.weight + " " + t.size + "px '" + t.family + "'"
        }

        function v(t) {
            return Q[t] || "square"
        }

        function x(t) {
            this.m_ = a(), this.mStack_ = [], this.aStack_ = [], this.currentPath_ = [], this.strokeStyle = "#000", this.fillStyle = "#000", this.lineWidth = 1, this.lineJoin = "miter", this.lineCap = "butt", this.miterLimit = 1 * N, this.globalAlpha = 1, this.font = "12px 微软雅黑", this.textAlign = "left", this.textBaseline = "alphabetic", this.canvas = t;
            var e = "width:" + t.clientWidth + "px;height:" + t.clientHeight + "px;overflow:hidden;position:absolute", i = t.ownerDocument.createElement("div");
            i.style.cssText = e, t.appendChild(i);
            var o = i.cloneNode(!1);
            o.style.backgroundColor = "#fff", o.style.filter = "alpha(opacity=0)", t.appendChild(o), this.element_ = i, this.scaleX_ = 1, this.scaleY_ = 1, this.lineScale_ = 1
        }

        function b(t, e, i, o) {
            t.currentPath_.push({
                type: "bezierCurveTo",
                cp1x: e.x,
                cp1y: e.y,
                cp2x: i.x,
                cp2y: i.y,
                x: o.x,
                y: o.y
            }), t.currentX_ = o.x, t.currentY_ = o.y
        }

        function T(t, e) {
            var i = g(t.strokeStyle), o = i.color, n = i.alpha * t.globalAlpha, r = t.lineScale_ * t.lineWidth;
            1 > r && (n *= r), e.push("<g_vml_:stroke", ' opacity="', n, '"', ' joinstyle="', t.lineJoin, '"', ' miterlimit="', t.miterLimit, '"', ' endcap="', v(t.lineCap), '"', ' weight="', r, 'px"', ' color="', o, '" />')
        }

        function S(t, e, i, o) {
            var n = t.fillStyle, r = t.scaleX_, s = t.scaleY_, a = o.x - i.x, h = o.y - i.y;
            if (n instanceof E) {
                var l = 0, d = {x: 0, y: 0}, c = 0, u = 1;
                if ("gradient" == n.type_) {
                    var p = n.x0_ / r, f = n.y0_ / s, m = n.x1_ / r, _ = n.y1_ / s, y = C(t, p, f), v = C(t, m, _), x = v.x - y.x, b = v.y - y.y;
                    l = 180 * Math.atan2(x, b) / Math.PI, 0 > l && (l += 360), 1e-6 > l && (l = 0)
                } else {
                    var y = C(t, n.x0_, n.y0_);
                    d = {x: (y.x - i.x) / a, y: (y.y - i.y) / h}, a /= r * N, h /= s * N;
                    var T = O.max(a, h);
                    c = 2 * n.r0_ / T, u = 2 * n.r1_ / T - c
                }
                var S = n.colors_;
                S.sort(function (t, e) {
                    return t.offset - e.offset
                });
                for (var z = S.length, w = S[0].color, L = S[z - 1].color, M = S[0].alpha * t.globalAlpha, k = S[z - 1].alpha * t.globalAlpha, I = [], P = 0; z > P; P++) {
                    var R = S[P];
                    I.push(R.offset * u + c + " " + R.color)
                }
                e.push('<g_vml_:fill type="', n.type_, '"', ' method="none" focus="100%"', ' color="', w, '"', ' color2="', L, '"', ' colors="', I.join(","), '"', ' opacity="', k, '"', ' g_o_:opacity2="', M, '"', ' angle="', l, '"', ' focusposition="', d.x, ",", d.y, '" />')
            } else if (n instanceof A) {
                if (a && h) {
                    var D = -i.x, H = -i.y;
                    e.push("<g_vml_:fill", ' position="', D / a * r * r, ",", H / h * s * s, '"', ' type="tile"', ' src="', n.src_, '" />')
                }
            } else {
                var F = g(t.fillStyle), B = F.color, Y = F.alpha * t.globalAlpha;
                e.push('<g_vml_:fill color="', B, '" opacity="', Y, '" />')
            }
        }

        function C(t, e, i) {
            var o = t.m_;
            return {x: N * (e * o[0][0] + i * o[1][0] + o[2][0]) - F, y: N * (e * o[0][1] + i * o[1][1] + o[2][1]) - F}
        }

        function z(t) {
            return isFinite(t[0][0]) && isFinite(t[0][1]) && isFinite(t[1][0]) && isFinite(t[1][1]) && isFinite(t[2][0]) && isFinite(t[2][1])
        }

        function w(t, e, i) {
            if (z(e) && (t.m_ = e, t.scaleX_ = Math.sqrt(e[0][0] * e[0][0] + e[0][1] * e[0][1]), t.scaleY_ = Math.sqrt(e[1][0] * e[1][0] + e[1][1] * e[1][1]), i)) {
                var o = e[0][0] * e[1][1] - e[0][1] * e[1][0];
                t.lineScale_ = H(D(o))
            }
        }

        function E(t) {
            this.type_ = t, this.x0_ = 0, this.y0_ = 0, this.r0_ = 0, this.x1_ = 0, this.y1_ = 0, this.r1_ = 0, this.colors_ = []
        }

        function A(t, e) {
            switch (M(t), e) {
                case"repeat":
                case null:
                case"":
                    this.repetition_ = "repeat";
                    break;
                case"repeat-x":
                case"repeat-y":
                case"no-repeat":
                    this.repetition_ = e;
                    break;
                default:
                    L("SYNTAX_ERR")
            }
            this.src_ = t.src, this.width_ = t.width, this.height_ = t.height
        }

        function L(t) {
            throw new k(t)
        }

        function M(t) {
            t && 1 == t.nodeType && "IMG" == t.tagName || L("TYPE_MISMATCH_ERR"), "complete" != t.readyState && L("INVALID_STATE_ERR")
        }

        function k(t) {
            this.code = this[t], this.message = t + ": DOM Exception " + this.code
        }

        var O = Math, I = O.round, P = O.sin, R = O.cos, D = O.abs, H = O.sqrt, N = 10, F = N / 2, B = (+navigator.userAgent.match(/MSIE ([\d.]+)?/)[1], Array.prototype.slice);
        n(document);
        var Y = {
            init: function (t) {
                var i = t || document;
                i.createElement("canvas"), i.attachEvent("onreadystatechange", e(this.init_, this, i))
            }, init_: function (t) {
                for (var e = t.getElementsByTagName("canvas"), i = 0; i < e.length; i++)this.initElement(e[i])
            }, initElement: function (e) {
                if (!e.getContext) {
                    e.getContext = t, n(e.ownerDocument), e.innerHTML = "", e.attachEvent("onpropertychange", r), e.attachEvent("onresize", s);
                    var i = e.attributes;
                    i.width && i.width.specified ? e.style.width = i.width.nodeValue + "px" : e.width = e.clientWidth, i.height && i.height.specified ? e.style.height = i.height.nodeValue + "px" : e.height = e.clientHeight
                }
                return e
            }
        };
        Y.init();
        for (var W = [], q = 0; 16 > q; q++)for (var G = 0; 16 > G; G++)W[16 * q + G] = q.toString(16) + G.toString(16);
        var X = {
            aliceblue: "#F0F8FF",
            antiquewhite: "#FAEBD7",
            aquamarine: "#7FFFD4",
            azure: "#F0FFFF",
            beige: "#F5F5DC",
            bisque: "#FFE4C4",
            black: "#000000",
            blanchedalmond: "#FFEBCD",
            blueviolet: "#8A2BE2",
            brown: "#A52A2A",
            burlywood: "#DEB887",
            cadetblue: "#5F9EA0",
            chartreuse: "#7FFF00",
            chocolate: "#D2691E",
            coral: "#FF7F50",
            cornflowerblue: "#6495ED",
            cornsilk: "#FFF8DC",
            crimson: "#DC143C",
            cyan: "#00FFFF",
            darkblue: "#00008B",
            darkcyan: "#008B8B",
            darkgoldenrod: "#B8860B",
            darkgray: "#A9A9A9",
            darkgreen: "#006400",
            darkgrey: "#A9A9A9",
            darkkhaki: "#BDB76B",
            darkmagenta: "#8B008B",
            darkolivegreen: "#556B2F",
            darkorange: "#FF8C00",
            darkorchid: "#9932CC",
            darkred: "#8B0000",
            darksalmon: "#E9967A",
            darkseagreen: "#8FBC8F",
            darkslateblue: "#483D8B",
            darkslategray: "#2F4F4F",
            darkslategrey: "#2F4F4F",
            darkturquoise: "#00CED1",
            darkviolet: "#9400D3",
            deeppink: "#FF1493",
            deepskyblue: "#00BFFF",
            dimgray: "#696969",
            dimgrey: "#696969",
            dodgerblue: "#1E90FF",
            firebrick: "#B22222",
            floralwhite: "#FFFAF0",
            forestgreen: "#228B22",
            gainsboro: "#DCDCDC",
            ghostwhite: "#F8F8FF",
            gold: "#FFD700",
            goldenrod: "#DAA520",
            grey: "#808080",
            greenyellow: "#ADFF2F",
            honeydew: "#F0FFF0",
            hotpink: "#FF69B4",
            indianred: "#CD5C5C",
            indigo: "#4B0082",
            ivory: "#FFFFF0",
            khaki: "#F0E68C",
            lavender: "#E6E6FA",
            lavenderblush: "#FFF0F5",
            lawngreen: "#7CFC00",
            lemonchiffon: "#FFFACD",
            lightblue: "#ADD8E6",
            lightcoral: "#F08080",
            lightcyan: "#E0FFFF",
            lightgoldenrodyellow: "#FAFAD2",
            lightgreen: "#90EE90",
            lightgrey: "#D3D3D3",
            lightpink: "#FFB6C1",
            lightsalmon: "#FFA07A",
            lightseagreen: "#20B2AA",
            lightskyblue: "#87CEFA",
            lightslategray: "#778899",
            lightslategrey: "#778899",
            lightsteelblue: "#B0C4DE",
            lightyellow: "#FFFFE0",
            limegreen: "#32CD32",
            linen: "#FAF0E6",
            magenta: "#FF00FF",
            mediumaquamarine: "#66CDAA",
            mediumblue: "#0000CD",
            mediumorchid: "#BA55D3",
            mediumpurple: "#9370DB",
            mediumseagreen: "#3CB371",
            mediumslateblue: "#7B68EE",
            mediumspringgreen: "#00FA9A",
            mediumturquoise: "#48D1CC",
            mediumvioletred: "#C71585",
            midnightblue: "#191970",
            mintcream: "#F5FFFA",
            mistyrose: "#FFE4E1",
            moccasin: "#FFE4B5",
            navajowhite: "#FFDEAD",
            oldlace: "#FDF5E6",
            olivedrab: "#6B8E23",
            orange: "#FFA500",
            orangered: "#FF4500",
            orchid: "#DA70D6",
            palegoldenrod: "#EEE8AA",
            palegreen: "#98FB98",
            paleturquoise: "#AFEEEE",
            palevioletred: "#DB7093",
            papayawhip: "#FFEFD5",
            peachpuff: "#FFDAB9",
            peru: "#CD853F",
            pink: "#FFC0CB",
            plum: "#DDA0DD",
            powderblue: "#B0E0E6",
            rosybrown: "#BC8F8F",
            royalblue: "#4169E1",
            saddlebrown: "#8B4513",
            salmon: "#FA8072",
            sandybrown: "#F4A460",
            seagreen: "#2E8B57",
            seashell: "#FFF5EE",
            sienna: "#A0522D",
            skyblue: "#87CEEB",
            slateblue: "#6A5ACD",
            slategray: "#708090",
            slategrey: "#708090",
            snow: "#FFFAFA",
            springgreen: "#00FF7F",
            steelblue: "#4682B4",
            tan: "#D2B48C",
            thistle: "#D8BFD8",
            tomato: "#FF6347",
            turquoise: "#40E0D0",
            violet: "#EE82EE",
            wheat: "#F5DEB3",
            whitesmoke: "#F5F5F5",
            yellowgreen: "#9ACD32"
        }, V = {}, U = {
            style: "normal",
            variant: "normal",
            weight: "normal",
            size: 12,
            family: "微软雅黑"
        }, Z = {}, Q = {butt: "flat", round: "round"}, j = x.prototype;
        j.clearRect = function () {
            this.textMeasureEl_ && (this.textMeasureEl_.removeNode(!0), this.textMeasureEl_ = null), this.element_.innerHTML = ""
        }, j.beginPath = function () {
            this.currentPath_ = []
        }, j.moveTo = function (t, e) {
            var i = C(this, t, e);
            this.currentPath_.push({type: "moveTo", x: i.x, y: i.y}), this.currentX_ = i.x, this.currentY_ = i.y
        }, j.lineTo = function (t, e) {
            var i = C(this, t, e);
            this.currentPath_.push({type: "lineTo", x: i.x, y: i.y}), this.currentX_ = i.x, this.currentY_ = i.y
        }, j.bezierCurveTo = function (t, e, i, o, n, r) {
            var s = C(this, n, r), a = C(this, t, e), h = C(this, i, o);
            b(this, a, h, s)
        }, j.quadraticCurveTo = function (t, e, i, o) {
            var n = C(this, t, e), r = C(this, i, o), s = {
                x: this.currentX_ + 2 / 3 * (n.x - this.currentX_),
                y: this.currentY_ + 2 / 3 * (n.y - this.currentY_)
            }, a = {x: s.x + (r.x - this.currentX_) / 3, y: s.y + (r.y - this.currentY_) / 3};
            b(this, s, a, r)
        }, j.arc = function (t, e, i, o, n, r) {
            i *= N;
            var s = r ? "at" : "wa", a = t + R(o) * i - F, h = e + P(o) * i - F, l = t + R(n) * i - F, d = e + P(n) * i - F;
            a != l || r || (a += .125);
            var c = C(this, t, e), u = C(this, a, h), p = C(this, l, d);
            this.currentPath_.push({type: s, x: c.x, y: c.y, radius: i, xStart: u.x, yStart: u.y, xEnd: p.x, yEnd: p.y})
        }, j.rect = function (t, e, i, o) {
            this.moveTo(t, e), this.lineTo(t + i, e), this.lineTo(t + i, e + o), this.lineTo(t, e + o), this.closePath()
        }, j.strokeRect = function (t, e, i, o) {
            var n = this.currentPath_;
            this.beginPath(), this.moveTo(t, e), this.lineTo(t + i, e), this.lineTo(t + i, e + o), this.lineTo(t, e + o), this.closePath(), this.stroke(), this.currentPath_ = n
        }, j.fillRect = function (t, e, i, o) {
            var n = this.currentPath_;
            this.beginPath(), this.moveTo(t, e), this.lineTo(t + i, e), this.lineTo(t + i, e + o), this.lineTo(t, e + o), this.closePath(), this.fill(), this.currentPath_ = n
        }, j.createLinearGradient = function (t, e, i, o) {
            var n = new E("gradient");
            return n.x0_ = t, n.y0_ = e, n.x1_ = i, n.y1_ = o, n
        }, j.createRadialGradient = function (t, e, i, o, n, r) {
            var s = new E("gradientradial");
            return s.x0_ = t, s.y0_ = e, s.r0_ = i, s.x1_ = o, s.y1_ = n, s.r1_ = r, s
        }, j.drawImage = function (t) {
            var e, i, o, n, r, s, a, h, l = t.runtimeStyle.width, d = t.runtimeStyle.height;
            t.runtimeStyle.width = "auto", t.runtimeStyle.height = "auto";
            var c = t.width, u = t.height;
            if (t.runtimeStyle.width = l, t.runtimeStyle.height = d, 3 == arguments.length)e = arguments[1], i = arguments[2], r = s = 0, a = o = c, h = n = u; else if (5 == arguments.length)e = arguments[1], i = arguments[2], o = arguments[3], n = arguments[4], r = s = 0, a = c, h = u; else {
                if (9 != arguments.length)throw Error("Invalid number of arguments");
                r = arguments[1], s = arguments[2], a = arguments[3], h = arguments[4], e = arguments[5], i = arguments[6], o = arguments[7], n = arguments[8]
            }
            var p = C(this, e, i), f = [], g = 10, m = 10, _ = v = 1;
            if (f.push(" <g_vml_:group", ' coordsize="', N * g, ",", N * m, '"', ' coordorigin="0,0"', ' style="width:', g, "px;height:", m, "px;position:absolute;"), 1 != this.m_[0][0] || this.m_[0][1] || 1 != this.m_[1][1] || this.m_[1][0]) {
                var y = [], _ = this.scaleX_, v = this.scaleY_;
                y.push("M11=", this.m_[0][0] / _, ",", "M12=", this.m_[1][0] / v, ",", "M21=", this.m_[0][1] / _, ",", "M22=", this.m_[1][1] / v, ",", "Dx=", I(p.x / N), ",", "Dy=", I(p.y / N), "");
                var x = p, b = C(this, e + o, i), T = C(this, e, i + n), S = C(this, e + o, i + n);
                x.x = O.max(x.x, b.x, T.x, S.x), x.y = O.max(x.y, b.y, T.y, S.y), f.push("padding:0 ", I(x.x / N), "px ", I(x.y / N), "px 0;filter:progid:DXImageTransform.Microsoft.Matrix(", y.join(""), ", SizingMethod='clip');")
            } else f.push("top:", I(p.y / N), "px;left:", I(p.x / N), "px;");
            f.push(' ">'), (r || s) && f.push('<div style="overflow: hidden; width:', Math.ceil((o + r * o / a) * _), "px;", " height:", Math.ceil((n + s * n / h) * v), "px;", " filter:progid:DxImageTransform.Microsoft.Matrix(Dx=", -r * o / a * _, ",Dy=", -s * n / h * v, ');">'), f.push('<div style="width:', Math.round(_ * c * o / a), "px;", " height:", Math.round(v * u * n / h), "px;", " filter:"), this.globalAlpha < 1 && f.push(" progid:DXImageTransform.Microsoft.Alpha(opacity=" + 100 * this.globalAlpha + ")"), f.push(" progid:DXImageTransform.Microsoft.AlphaImageLoader(src=", t.src, ',sizingMethod=scale)">'), (r || s) && f.push("</div>"), f.push("</div></div>"), this.element_.insertAdjacentHTML("BeforeEnd", f.join(""))
        }, j.stroke = function (t) {
            var e = [], i = 10, o = 10;
            e.push("<g_vml_:shape", ' filled="', !!t, '"', ' style="position:absolute;width:', i, "px;height:", o, 'px;"', ' coordorigin="0,0"', ' coordsize="', N * i, ",", N * o, '"', ' stroked="', !t, '"', ' path="');
            for (var n = {x: null, y: null}, r = {x: null, y: null}, s = 0; s < this.currentPath_.length; s++) {
                var a, h = this.currentPath_[s];
                switch (h.type) {
                    case"moveTo":
                        a = h, e.push(" m ", I(h.x), ",", I(h.y));
                        break;
                    case"lineTo":
                        e.push(" l ", I(h.x), ",", I(h.y));
                        break;
                    case"close":
                        e.push(" x "), h = null;
                        break;
                    case"bezierCurveTo":
                        e.push(" c ", I(h.cp1x), ",", I(h.cp1y), ",", I(h.cp2x), ",", I(h.cp2y), ",", I(h.x), ",", I(h.y));
                        break;
                    case"at":
                    case"wa":
                        e.push(" ", h.type, " ", I(h.x - this.scaleX_ * h.radius), ",", I(h.y - this.scaleY_ * h.radius), " ", I(h.x + this.scaleX_ * h.radius), ",", I(h.y + this.scaleY_ * h.radius), " ", I(h.xStart), ",", I(h.yStart), " ", I(h.xEnd), ",", I(h.yEnd))
                }
                h && ((null == n.x || h.x < n.x) && (n.x = h.x), (null == r.x || h.x > r.x) && (r.x = h.x), (null == n.y || h.y < n.y) && (n.y = h.y), (null == r.y || h.y > r.y) && (r.y = h.y))
            }
            e.push(' ">'), t ? S(this, e, n, r) : T(this, e), e.push("</g_vml_:shape>"), this.element_.insertAdjacentHTML("beforeEnd", e.join(""))
        }, j.fill = function () {
            this.stroke(!0)
        }, j.closePath = function () {
            this.currentPath_.push({type: "close"})
        }, j.save = function () {
            var t = {};
            l(this, t), this.aStack_.push(t), this.mStack_.push(this.m_), this.m_ = h(a(), this.m_)
        }, j.restore = function () {
            this.aStack_.length && (l(this.aStack_.pop(), this), this.m_ = this.mStack_.pop())
        }, j.translate = function (t, e) {
            var i = [[1, 0, 0], [0, 1, 0], [t, e, 1]];
            w(this, h(i, this.m_), !1)
        }, j.rotate = function (t) {
            var e = R(t), i = P(t), o = [[e, i, 0], [-i, e, 0], [0, 0, 1]];
            w(this, h(o, this.m_), !1)
        }, j.scale = function (t, e) {
            var i = [[t, 0, 0], [0, e, 0], [0, 0, 1]];
            w(this, h(i, this.m_), !0)
        }, j.transform = function (t, e, i, o, n, r) {
            var s = [[t, e, 0], [i, o, 0], [n, r, 1]];
            w(this, h(s, this.m_), !0)
        }, j.setTransform = function (t, e, i, o, n, r) {
            var s = [[t, e, 0], [i, o, 0], [n, r, 1]];
            w(this, s, !0)
        }, j.drawText_ = function (t, e, o, n, r) {
            var s = this.m_, a = 1e3, h = 0, l = a, d = {
                x: 0,
                y: 0
            }, c = [], u = _(m(this.font), this.element_), p = y(u), f = this.element_.currentStyle, g = this.textAlign.toLowerCase();
            switch (g) {
                case"left":
                case"center":
                case"right":
                    break;
                case"end":
                    g = "ltr" == f.direction ? "right" : "left";
                    break;
                case"start":
                    g = "rtl" == f.direction ? "right" : "left";
                    break;
                default:
                    g = "left"
            }
            switch (this.textBaseline) {
                case"hanging":
                case"top":
                    d.y = u.size / 1.75;
                    break;
                case"middle":
                    break;
                default:
                case null:
                case"alphabetic":
                case"ideographic":
                case"bottom":
                    d.y = -u.size / 2.25
            }
            switch (g) {
                case"right":
                    h = a, l = .05;
                    break;
                case"center":
                    h = l = a / 2
            }
            var v = C(this, e + d.x, o + d.y);
            c.push('<g_vml_:line from="', -h, ' 0" to="', l, ' 0.05" ', ' coordsize="100 100" coordorigin="0 0"', ' filled="', !r, '" stroked="', !!r, '" style="position:absolute;width:1px;height:1px;">'), r ? T(this, c) : S(this, c, {
                x: -h,
                y: 0
            }, {x: l, y: u.size});
            var x = s[0][0].toFixed(3) + "," + s[1][0].toFixed(3) + "," + s[0][1].toFixed(3) + "," + s[1][1].toFixed(3) + ",0,0", b = I(v.x / N) + "," + I(v.y / N);
            c.push('<g_vml_:skew on="t" matrix="', x, '" ', ' offset="', b, '" origin="', h, ' 0" />', '<g_vml_:path textpathok="true" />', '<g_vml_:textpath on="true" string="', i(t), '" style="v-text-align:', g, ";font:", i(p), '" /></g_vml_:line>'), this.element_.insertAdjacentHTML("beforeEnd", c.join(""))
        }, j.fillText = function (t, e, i, o) {
            this.drawText_(t, e, i, o, !1)
        }, j.strokeText = function (t, e, i, o) {
            this.drawText_(t, e, i, o, !0)
        }, j.measureText = function (t) {
            if (!this.textMeasureEl_) {
                var e = '<span style="position:absolute;top:-20000px;left:0;padding:0;margin:0;border:none;white-space:pre;"></span>';
                this.element_.insertAdjacentHTML("beforeEnd", e), this.textMeasureEl_ = this.element_.lastChild
            }
            var i = this.element_.ownerDocument;
            this.textMeasureEl_.innerHTML = "";
            try {
                this.textMeasureEl_.style.font = this.font
            } catch (o) {
            }
            return this.textMeasureEl_.appendChild(i.createTextNode(t)), {width: this.textMeasureEl_.offsetWidth}
        }, j.clip = function () {
        }, j.arcTo = function () {
        }, j.createPattern = function (t, e) {
            return new A(t, e)
        }, E.prototype.addColorStop = function (t, e) {
            e = g(e), this.colors_.push({offset: t, color: e.color, alpha: e.alpha})
        };
        var K = k.prototype = new Error;
        K.INDEX_SIZE_ERR = 1, K.DOMSTRING_SIZE_ERR = 2, K.HIERARCHY_REQUEST_ERR = 3, K.WRONG_DOCUMENT_ERR = 4, K.INVALID_CHARACTER_ERR = 5, K.NO_DATA_ALLOWED_ERR = 6, K.NO_MODIFICATION_ALLOWED_ERR = 7, K.NOT_FOUND_ERR = 8, K.NOT_SUPPORTED_ERR = 9, K.INUSE_ATTRIBUTE_ERR = 10, K.INVALID_STATE_ERR = 11, K.SYNTAX_ERR = 12, K.INVALID_MODIFICATION_ERR = 13, K.NAMESPACE_ERR = 14, K.INVALID_ACCESS_ERR = 15, K.VALIDATION_ERR = 16, K.TYPE_MISMATCH_ERR = 17, G_vmlCanvasManager = Y, CanvasRenderingContext2D = x, CanvasGradient = E, CanvasPattern = A, DOMException = k
    }(), G_vmlCanvasManager
}), define("zrender/mixin/Eventful", ["require"], function () {
    var t = function () {
        this._handlers = {}
    };
    return t.prototype.one = function (t, e, i) {
        var o = this._handlers;
        return e && t ? (o[t] || (o[t] = []), o[t].push({h: e, one: !0, ctx: i || this}), this) : this
    }, t.prototype.bind = function (t, e, i) {
        var o = this._handlers;
        return e && t ? (o[t] || (o[t] = []), o[t].push({h: e, one: !1, ctx: i || this}), this) : this
    }, t.prototype.unbind = function (t, e) {
        var i = this._handlers;
        if (!t)return this._handlers = {}, this;
        if (e) {
            if (i[t]) {
                for (var o = [], n = 0, r = i[t].length; r > n; n++)i[t][n].h != e && o.push(i[t][n]);
                i[t] = o
            }
            i[t] && 0 === i[t].length && delete i[t]
        } else delete i[t];
        return this
    }, t.prototype.dispatch = function (t) {
        if (this._handlers[t]) {
            var e = arguments, i = e.length;
            i > 3 && (e = Array.prototype.slice.call(e, 1));
            for (var o = this._handlers[t], n = o.length, r = 0; n > r;) {
                switch (i) {
                    case 1:
                        o[r].h.call(o[r].ctx);
                        break;
                    case 2:
                        o[r].h.call(o[r].ctx, e[1]);
                        break;
                    case 3:
                        o[r].h.call(o[r].ctx, e[1], e[2]);
                        break;
                    default:
                        o[r].h.apply(o[r].ctx, e)
                }
                o[r].one ? (o.splice(r, 1), n--) : r++
            }
        }
        return this
    }, t.prototype.dispatchWithContext = function (t) {
        if (this._handlers[t]) {
            var e = arguments, i = e.length;
            i > 4 && (e = Array.prototype.slice.call(e, 1, e.length - 1));
            for (var o = e[e.length - 1], n = this._handlers[t], r = n.length, s = 0; r > s;) {
                switch (i) {
                    case 1:
                        n[s].h.call(o);
                        break;
                    case 2:
                        n[s].h.call(o, e[1]);
                        break;
                    case 3:
                        n[s].h.call(o, e[1], e[2]);
                        break;
                    default:
                        n[s].h.apply(o, e)
                }
                n[s].one ? (n.splice(s, 1), r--) : s++
            }
        }
        return this
    }, t
}), define("zrender/tool/log", ["require", "../config"], function (t) {
    var e = t("../config");
    return function () {
        if (0 !== e.debugMode)if (1 == e.debugMode)for (var t in arguments)throw new Error(arguments[t]); else if (e.debugMode > 1)for (var t in arguments)console.log(arguments[t])
    }
}), define("zrender/tool/guid", [], function () {
    var t = 2311;
    return function () {
        return "zrender__" + t++
    }
}), define("zrender/Handler", ["require", "./config", "./tool/env", "./tool/event", "./tool/util", "./tool/vector", "./tool/matrix", "./mixin/Eventful"], function (t) {
    "use strict";
    function e(t, e) {
        return function (i) {
            return t.call(e, i)
        }
    }

    function i(t, e) {
        return function (i, o, n) {
            return t.call(e, i, o, n)
        }
    }

    function o(t) {
        for (var i = p.length; i--;) {
            var o = p[i];
            t["_" + o + "Handler"] = e(f[o], t)
        }
    }

    function n(t, e, i) {
        if (this._draggingTarget && this._draggingTarget.id == t.id || t.isSilent())return !1;
        var o = this._event;
        if (t.isCover(e, i)) {
            t.hoverable && this.storage.addHover(t);
            for (var n = t.parent; n;) {
                if (n.clipShape && !n.clipShape.isCover(this._mouseX, this._mouseY))return !1;
                n = n.parent
            }
            return this._lastHover != t && (this._processOutShape(o), this._processDragLeave(o), this._lastHover = t, this._processDragEnter(o)), this._processOverShape(o), this._processDragOver(o), this._hasfound = 1, !0
        }
        return !1
    }

    var r = t("./config"), s = t("./tool/env"), a = t("./tool/event"), h = t("./tool/util"), l = t("./tool/vector"), d = t("./tool/matrix"), c = r.EVENT, u = t("./mixin/Eventful"), p = ["resize", "click", "dblclick", "mousewheel", "mousemove", "mouseout", "mouseup", "mousedown", "touchstart", "touchend", "touchmove"], f = {
        resize: function (t) {
            t = t || window.event, this._lastHover = null, this._isMouseDown = 0, this.dispatch(c.RESIZE, t)
        }, click: function (t) {
            t = this._zrenderEventFixed(t);
            var e = this._lastHover;
            (e && e.clickable || !e) && this._clickThreshold < 5 && this._dispatchAgency(e, c.CLICK, t), this._mousemoveHandler(t)
        }, dblclick: function (t) {
            t = t || window.event, t = this._zrenderEventFixed(t);
            var e = this._lastHover;
            (e && e.clickable || !e) && this._clickThreshold < 5 && this._dispatchAgency(e, c.DBLCLICK, t), this._mousemoveHandler(t)
        }, mousewheel: function (t) {
            t = this._zrenderEventFixed(t);
            var e = t.wheelDelta || -t.detail, i = e > 0 ? 1.1 : 1 / 1.1, o = this.painter.getLayers(), n = !1;
            for (var r in o)if ("hover" !== r) {
                var s = o[r], h = s.position;
                if (s.zoomable) {
                    s.__zoom = s.__zoom || 1;
                    var l = s.__zoom;
                    l *= i, l = Math.max(Math.min(s.maxZoom, l), s.minZoom), i = l / s.__zoom, s.__zoom = l, h[0] -= (this._mouseX - h[0]) * (i - 1), h[1] -= (this._mouseY - h[1]) * (i - 1), s.scale[0] *= i, s.scale[1] *= i, s.dirty = !0, n = !0, a.stop(t)
                }
            }
            n && this.painter.refresh(), this._dispatchAgency(this._lastHover, c.MOUSEWHEEL, t), this._mousemoveHandler(t)
        }, mousemove: function (t) {
            if (!this.painter.isLoading()) {
                this._clickThreshold++, t = this._zrenderEventFixed(t), this._lastX = this._mouseX, this._lastY = this._mouseY, this._mouseX = a.getX(t), this._mouseY = a.getY(t);
                var e = this._mouseX - this._lastX, i = this._mouseY - this._lastY;
                this._processDragStart(t), this._hasfound = 0, this._event = t, this._iterateAndFindHover(), this._hasfound || ((!this._draggingTarget || this._lastHover && this._lastHover != this._draggingTarget) && (this._processOutShape(t), this._processDragLeave(t)), this._lastHover = null, this.storage.delHover(), this.painter.clearHover());
                var o = "default";
                if (this._draggingTarget)this.storage.drift(this._draggingTarget.id, e, i), this._draggingTarget.modSelf(), this.storage.addHover(this._draggingTarget); else if (this._isMouseDown) {
                    var n = this.painter.getLayers(), r = !1;
                    for (var s in n)if ("hover" !== s) {
                        var h = n[s];
                        h.panable && (o = "move", h.position[0] += e, h.position[1] += i, r = !0, h.dirty = !0)
                    }
                    r && this.painter.refresh()
                }
                this._draggingTarget || this._hasfound && this._lastHover.draggable ? o = "move" : this._hasfound && this._lastHover.clickable && (o = "pointer"), this.root.style.cursor = o, this._dispatchAgency(this._lastHover, c.MOUSEMOVE, t), (this._draggingTarget || this._hasfound || this.storage.hasHoverShape()) && this.painter.refreshHover()
            }
        }, mouseout: function (t) {
            t = this._zrenderEventFixed(t);
            var e = t.toElement || t.relatedTarget;
            if (e != this.root)for (; e && 9 != e.nodeType;) {
                if (e == this.root)return void this._mousemoveHandler(t);
                e = e.parentNode
            }
            t.zrenderX = this._lastX, t.zrenderY = this._lastY, this.root.style.cursor = "default", this._isMouseDown = 0, this._processOutShape(t), this._processDrop(t), this._processDragEnd(t), this.painter.isLoading() || this.painter.refreshHover(), this.dispatch(c.GLOBALOUT, t)
        }, mousedown: function (t) {
            return this._clickThreshold = 0, 2 == this._lastDownButton ? (this._lastDownButton = t.button, void(this._mouseDownTarget = null)) : (this._lastMouseDownMoment = new Date, t = this._zrenderEventFixed(t), this._isMouseDown = 1, this._mouseDownTarget = this._lastHover, this._dispatchAgency(this._lastHover, c.MOUSEDOWN, t), void(this._lastDownButton = t.button))
        }, mouseup: function (t) {
            t = this._zrenderEventFixed(t), this.root.style.cursor = "default", this._isMouseDown = 0, this._clickThreshold = 0, this._mouseDownTarget = null, this._dispatchAgency(this._lastHover, c.MOUSEUP, t), this._processDrop(t), this._processDragEnd(t)
        }, touchstart: function (t) {
            t = this._zrenderEventFixed(t, !0), this._lastTouchMoment = new Date, this._mobildFindFixed(t), this._mousedownHandler(t)
        }, touchmove: function (t) {
            t = this._zrenderEventFixed(t, !0), this._mousemoveHandler(t), this._isDragging && a.stop(t)
        }, touchend: function (t) {
            t = this._zrenderEventFixed(t, !0), this._mouseupHandler(t);
            var e = new Date;
            e - this._lastTouchMoment < c.touchClickDelay && (this._mobildFindFixed(t), this._clickHandler(t), e - this._lastClickMoment < c.touchClickDelay / 2 && (this._dblclickHandler(t), this._lastHover && this._lastHover.clickable && a.stop(t)), this._lastClickMoment = e), this.painter.clearHover()
        }
    }, g = function (t, e, r) {
        u.call(this), this.root = t, this.storage = e, this.painter = r, this._lastX = this._lastY = this._mouseX = this._mouseY = 0, this._findHover = i(n, this), this._domHover = r.getDomHover(), o(this), window.addEventListener ? (window.addEventListener("resize", this._resizeHandler), s.os.tablet || s.os.phone ? (t.addEventListener("touchstart", this._touchstartHandler), t.addEventListener("touchmove", this._touchmoveHandler), t.addEventListener("touchend", this._touchendHandler)) : (t.addEventListener("click", this._clickHandler), t.addEventListener("dblclick", this._dblclickHandler), t.addEventListener("mousewheel", this._mousewheelHandler), t.addEventListener("mousemove", this._mousemoveHandler), t.addEventListener("mousedown", this._mousedownHandler), t.addEventListener("mouseup", this._mouseupHandler)), t.addEventListener("DOMMouseScroll", this._mousewheelHandler), t.addEventListener("mouseout", this._mouseoutHandler)) : (window.attachEvent("onresize", this._resizeHandler), t.attachEvent("onclick", this._clickHandler), t.ondblclick = this._dblclickHandler, t.attachEvent("onmousewheel", this._mousewheelHandler), t.attachEvent("onmousemove", this._mousemoveHandler), t.attachEvent("onmouseout", this._mouseoutHandler), t.attachEvent("onmousedown", this._mousedownHandler), t.attachEvent("onmouseup", this._mouseupHandler))
    };
    g.prototype.on = function (t, e) {
        return this.bind(t, e), this
    }, g.prototype.un = function (t, e) {
        return this.unbind(t, e), this
    }, g.prototype.trigger = function (t, e) {
        switch (t) {
            case c.RESIZE:
            case c.CLICK:
            case c.DBLCLICK:
            case c.MOUSEWHEEL:
            case c.MOUSEMOVE:
            case c.MOUSEDOWN:
            case c.MOUSEUP:
            case c.MOUSEOUT:
                this["_" + t + "Handler"](e)
        }
    }, g.prototype.dispose = function () {
        var t = this.root;
        window.removeEventListener ? (window.removeEventListener("resize", this._resizeHandler), s.os.tablet || s.os.phone ? (t.removeEventListener("touchstart", this._touchstartHandler), t.removeEventListener("touchmove", this._touchmoveHandler), t.removeEventListener("touchend", this._touchendHandler)) : (t.removeEventListener("click", this._clickHandler), t.removeEventListener("dblclick", this._dblclickHandler), t.removeEventListener("mousewheel", this._mousewheelHandler), t.removeEventListener("mousemove", this._mousemoveHandler), t.removeEventListener("mousedown", this._mousedownHandler), t.removeEventListener("mouseup", this._mouseupHandler)), t.removeEventListener("DOMMouseScroll", this._mousewheelHandler), t.removeEventListener("mouseout", this._mouseoutHandler)) : (window.detachEvent("onresize", this._resizeHandler), t.detachEvent("onclick", this._clickHandler), t.detachEvent("dblclick", this._dblclickHandler), t.detachEvent("onmousewheel", this._mousewheelHandler), t.detachEvent("onmousemove", this._mousemoveHandler), t.detachEvent("onmouseout", this._mouseoutHandler), t.detachEvent("onmousedown", this._mousedownHandler), t.detachEvent("onmouseup", this._mouseupHandler)), this.root = this._domHover = this.storage = this.painter = null, this.un()
    }, g.prototype._processDragStart = function (t) {
        var e = this._lastHover;
        if (this._isMouseDown && e && e.draggable && !this._draggingTarget && this._mouseDownTarget == e) {
            if (e.dragEnableTime && new Date - this._lastMouseDownMoment < e.dragEnableTime)return;
            var i = e;
            this._draggingTarget = i, this._isDragging = 1, i.invisible = !0, this.storage.mod(i.id), this._dispatchAgency(i, c.DRAGSTART, t), this.painter.refresh()
        }
    }, g.prototype._processDragEnter = function (t) {
        this._draggingTarget && this._dispatchAgency(this._lastHover, c.DRAGENTER, t, this._draggingTarget)
    }, g.prototype._processDragOver = function (t) {
        this._draggingTarget && this._dispatchAgency(this._lastHover, c.DRAGOVER, t, this._draggingTarget)
    }, g.prototype._processDragLeave = function (t) {
        this._draggingTarget && this._dispatchAgency(this._lastHover, c.DRAGLEAVE, t, this._draggingTarget)
    }, g.prototype._processDrop = function (t) {
        this._draggingTarget && (this._draggingTarget.invisible = !1, this.storage.mod(this._draggingTarget.id), this.painter.refresh(), this._dispatchAgency(this._lastHover, c.DROP, t, this._draggingTarget))
    }, g.prototype._processDragEnd = function (t) {
        this._draggingTarget && (this._dispatchAgency(this._draggingTarget, c.DRAGEND, t), this._lastHover = null), this._isDragging = 0, this._draggingTarget = null
    }, g.prototype._processOverShape = function (t) {
        this._dispatchAgency(this._lastHover, c.MOUSEOVER, t)
    }, g.prototype._processOutShape = function (t) {
        this._dispatchAgency(this._lastHover, c.MOUSEOUT, t)
    }, g.prototype._dispatchAgency = function (t, e, i, o) {
        var n = "on" + e, r = {type: e, event: i, target: t, cancelBubble: !1}, s = t;
        for (o && (r.dragged = o); s && (s[n] && (r.cancelBubble = s[n](r)), s.dispatch(e, r), s = s.parent, !r.cancelBubble););
        t ? r.cancelBubble || this.dispatch(e, r) : o || this.dispatch(e, {type: e, event: i})
    }, g.prototype._iterateAndFindHover = function () {
        var t = d.create();
        return function () {
            for (var e, i, o = this.storage.getShapeList(), n = [0, 0], r = o.length - 1; r >= 0; r--) {
                var s = o[r];
                if (e !== s.zlevel && (i = this.painter.getLayer(s.zlevel, i), n[0] = this._mouseX, n[1] = this._mouseY, i.needTransform && (d.invert(t, i.transform), l.applyTransform(n, n, t))), this._findHover(s, n[0], n[1]))break
            }
        }
    }();
    var m = [{x: 10}, {x: -20}, {x: 10, y: 10}, {y: -20}];
    return g.prototype._mobildFindFixed = function (t) {
        this._lastHover = null, this._mouseX = t.zrenderX, this._mouseY = t.zrenderY, this._event = t, this._iterateAndFindHover();
        for (var e = 0; !this._lastHover && e < m.length; e++) {
            var i = m[e];
            i.x && (this._mouseX += i.x), i.y && (this._mouseX += i.y), this._iterateAndFindHover()
        }
        this._lastHover && (t.zrenderX = this._mouseX, t.zrenderY = this._mouseY)
    }, g.prototype._zrenderEventFixed = function (t, e) {
        if (t.zrenderFixed)return t;
        if (e) {
            var i = "touchend" != t.type ? t.targetTouches[0] : t.changedTouches[0];
            if (i) {
                var o = this.root.getBoundingClientRect();
                t.zrenderX = i.clientX - o.left, t.zrenderY = i.clientY - o.top
            }
        } else {
            t = t || window.event;
            var n = t.toElement || t.relatedTarget || t.srcElement || t.target;
            n && n != this._domHover && (t.zrenderX = ("undefined" != typeof t.offsetX ? t.offsetX : t.layerX) + n.offsetLeft, t.zrenderY = ("undefined" != typeof t.offsetY ? t.offsetY : t.layerY) + n.offsetTop)
        }
        return t.zrenderFixed = 1, t
    }, h.merge(g.prototype, u.prototype, !0), g
}), define("zrender/Painter", ["require", "./config", "./tool/util", "./tool/log", "./tool/matrix", "./loadingEffect/Base", "./mixin/Transformable", "./shape/Image"], function (t) {
    "use strict";
    function e() {
        return !1
    }

    function i() {
    }

    function o(t, e, i) {
        var o = document.createElement(e), n = i._width, r = i._height;
        return o.style.position = "absolute", o.style.left = 0, o.style.top = 0, o.style.width = n + "px", o.style.height = r + "px", o.setAttribute("width", n * d), o.setAttribute("height", r * d), o.setAttribute("data-zr-dom-id", t), o
    }

    var n = t("./config"), r = t("./tool/util"), s = t("./tool/log"), a = t("./tool/matrix"), h = t("./loadingEffect/Base"), l = t("./mixin/Transformable"), d = window.devicePixelRatio || 1;
    d = Math.max(d, 1);
    var c = window.G_vmlCanvasManager, u = function (t, i) {
        this.root = t, this.storage = i, t.innerHTML = "", this._width = this._getWidth(), this._height = this._getHeight();
        var n = document.createElement("div");
        this._domRoot = n, n.style.position = "relative", n.style.overflow = "hidden", n.style.width = this._width + "px", n.style.height = this._height + "px", t.appendChild(n), this._layers = {}, this._zlevelList = [], this._layerConfig = {}, this._loadingEffect = new h({}), this.shapeToImage = this._createShapeToImageProcessor(), this._bgDom = o("bg", "div", this), n.appendChild(this._bgDom), this._bgDom.onselectstart = e, this._bgDom.style["-webkit-user-select"] = "none", this._bgDom.style["user-select"] = "none", this._bgDom.style["-webkit-touch-callout"] = "none";
        var r = new p("_zrender_hover_", this);
        this._layers.hover = r, n.appendChild(r.dom), r.initContext(), r.dom.onselectstart = e, r.dom.style["-webkit-user-select"] = "none", r.dom.style["user-select"] = "none", r.dom.style["-webkit-touch-callout"] = "none", this.refreshNextFrame = null
    };
    u.prototype.render = function (t) {
        return this.isLoading() && this.hideLoading(), this.refresh(t, !0), this
    }, u.prototype.refresh = function (t, e) {
        var i = this.storage.getShapeList(!0);
        return this._paintList(i, e), "function" == typeof t && t(), this
    }, u.prototype._paintList = function (t, e) {
        "undefined" == typeof e && (e = !1), this._updateLayerStatus(t);
        var i, o, r;
        for (var h in this._layers)"hover" !== h && (this._layers[h].unusedCount++, this._layers[h].updateTransform());
        for (var l = [], d = 0, u = t.length; u > d; d++) {
            var p = t[d];
            if (o !== p.zlevel && (i && (i.needTransform && r.restore(), r.flush && r.flush()), i = this.getLayer(p.zlevel), r = i.ctx, o = p.zlevel, i.unusedCount = 0, (i.dirty || e) && i.clear(), i.needTransform && (r.save(), i.setTransform(r))), p.__startClip && !c) {
                var f = p.__startClip;
                if (r.save(), f.needTransform) {
                    var g = f.transform;
                    a.invert(l, g), r.transform(g[0], g[1], g[2], g[3], g[4], g[5])
                }
                if (r.beginPath(), f.buildPath(r, f.style), r.clip(), f.needTransform) {
                    var g = l;
                    r.transform(g[0], g[1], g[2], g[3], g[4], g[5])
                }
            }
            if ((i.dirty || e) && !p.invisible && (!p.onbrush || p.onbrush && !p.onbrush(r, !1)))if (n.catchBrushException)try {
                p.brush(r, !1, this.refreshNextFrame)
            } catch (m) {
                s(m, "brush error of " + p.type, p)
            } else p.brush(r, !1, this.refreshNextFrame);
            p.__stopClip && !c && r.restore(), p.__dirty = !1
        }
        i && (i.needTransform && r.restore(), r.flush && r.flush());
        for (var h in this._layers)if ("hover" !== h) {
            var _ = this._layers[h];
            _.dirty = !1, 1 == _.unusedCount && _.clear()
        }
    }, u.prototype.getLayer = function (t) {
        var e = this._layers[t];
        if (!e) {
            var i = this._zlevelList.length, o = null, n = -1;
            if (i > 0 && t > this._zlevelList[0]) {
                for (n = 0; i - 1 > n && !(this._zlevelList[n] < t && this._zlevelList[n + 1] > t); n++);
                o = this._layers[this._zlevelList[n]]
            }
            this._zlevelList.splice(n + 1, 0, t), e = new p(t, this);
            var s = o ? o.dom : this._bgDom;
            s.nextSibling ? s.parentNode.insertBefore(e.dom, s.nextSibling) : s.parentNode.appendChild(e.dom), e.initContext(), this._layers[t] = e, this._layerConfig[t] && r.merge(e, this._layerConfig[t], !0), e.updateTransform()
        }
        return e
    }, u.prototype.getLayers = function () {
        return this._layers
    }, u.prototype._updateLayerStatus = function (t) {
        var e = this._layers, i = {};
        for (var o in e)"hover" !== o && (i[o] = e[o].elCount, e[o].elCount = 0);
        for (var n = 0, r = t.length; r > n; n++) {
            var s = t[n], a = s.zlevel, h = e[a];
            if (h) {
                if (h.elCount++, h.dirty)continue;
                h.dirty = s.__dirty
            }
        }
        for (var o in e)"hover" !== o && i[o] !== e[o].elCount && (e[o].dirty = !0)
    }, u.prototype.refreshShapes = function (t, e) {
        for (var i = 0, o = t.length; o > i; i++) {
            var n = t[i];
            n.modSelf()
        }
        return this.refresh(e), this
    }, u.prototype.setLoadingEffect = function (t) {
        return this._loadingEffect = t, this
    }, u.prototype.clear = function () {
        for (var t in this._layers)"hover" != t && this._layers[t].clear();
        return this
    }, u.prototype.modLayer = function (t, e) {
        if (e) {
            this._layerConfig[t] ? r.merge(this._layerConfig[t], e, !0) : this._layerConfig[t] = e;
            var i = this._layers[t];
            i && r.merge(i, this._layerConfig[t], !0)
        }
    }, u.prototype.delLayer = function (t) {
        var e = this._layers[t];
        e && (this.modLayer(t, {
            position: e.position,
            rotation: e.rotation,
            scale: e.scale
        }), e.dom.parentNode.removeChild(e.dom), delete this._layers[t], this._zlevelList.splice(r.indexOf(this._zlevelList, t), 1))
    }, u.prototype.refreshHover = function () {
        this.clearHover();
        for (var t = this.storage.getHoverShapes(!0), e = 0, i = t.length; i > e; e++)this._brushHover(t[e]);
        var o = this._layers.hover.ctx;
        return o.flush && o.flush(), this.storage.delHover(), this
    }, u.prototype.clearHover = function () {
        var t = this._layers.hover;
        return t && t.clear(), this
    }, u.prototype.showLoading = function (t) {
        return this._loadingEffect && this._loadingEffect.stop(), t && this.setLoadingEffect(t), this._loadingEffect.start(this), this.loading = !0, this
    }, u.prototype.hideLoading = function () {
        return this._loadingEffect.stop(), this.clearHover(), this.loading = !1, this
    }, u.prototype.isLoading = function () {
        return this.loading
    }, u.prototype.resize = function () {
        var t = this._domRoot;
        t.style.display = "none";
        var e = this._getWidth(), i = this._getHeight();
        if (t.style.display = "", this._width != e || i != this._height) {
            this._width = e, this._height = i, t.style.width = e + "px", t.style.height = i + "px";
            for (var o in this._layers)this._layers[o].resize(e, i);
            this.refresh(null, !0)
        }
        return this
    }, u.prototype.clearLayer = function (t) {
        var e = this._layers[t];
        e && e.clear()
    }, u.prototype.dispose = function () {
        this.isLoading() && this.hideLoading(), this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null
    }, u.prototype.getDomHover = function () {
        return this._layers.hover.dom
    }, u.prototype.toDataURL = function (t, e, i) {
        if (c)return null;
        var r = o("image", "canvas", this);
        this._bgDom.appendChild(r);
        var a = r.getContext("2d");
        1 != d && a.scale(d, d), a.fillStyle = e || "#fff", a.rect(0, 0, this._width * d, this._height * d), a.fill();
        var h = this;
        this.storage.iterShape(function (t) {
            if (!t.invisible && (!t.onbrush || t.onbrush && !t.onbrush(a, !1)))if (n.catchBrushException)try {
                t.brush(a, !1, h.refreshNextFrame)
            } catch (e) {
                s(e, "brush error of " + t.type, t)
            } else t.brush(a, !1, h.refreshNextFrame)
        }, {normal: "up", update: !0});
        var l = r.toDataURL(t, i);
        return a = null, this._bgDom.removeChild(r), l
    }, u.prototype.getWidth = function () {
        return this._width
    }, u.prototype.getHeight = function () {
        return this._height
    }, u.prototype._getWidth = function () {
        var t = this.root, e = t.currentStyle || document.defaultView.getComputedStyle(t);
        return ((t.clientWidth || parseInt(e.width, 10)) - parseInt(e.paddingLeft, 10) - parseInt(e.paddingRight, 10)).toFixed(0) - 0
    }, u.prototype._getHeight = function () {
        var t = this.root, e = t.currentStyle || document.defaultView.getComputedStyle(t);
        return ((t.clientHeight || parseInt(e.height, 10)) - parseInt(e.paddingTop, 10) - parseInt(e.paddingBottom, 10)).toFixed(0) - 0
    }, u.prototype._brushHover = function (t) {
        var e = this._layers.hover.ctx;
        if (!t.onbrush || t.onbrush && !t.onbrush(e, !0)) {
            var i = this.getLayer(t.zlevel);
            if (i.needTransform && (e.save(), i.setTransform(e)), n.catchBrushException)try {
                t.brush(e, !0, this.refreshNextFrame)
            } catch (o) {
                s(o, "hoverBrush error of " + t.type, t)
            } else t.brush(e, !0, this.refreshNextFrame);
            i.needTransform && e.restore()
        }
    }, u.prototype._shapeToImage = function (e, i, o, n, r) {
        var s = document.createElement("canvas"), a = s.getContext("2d"), r = window.devicePixelRatio || 1;
        s.style.width = o + "px", s.style.height = n + "px", s.setAttribute("width", o * r), s.setAttribute("height", n * r), a.clearRect(0, 0, o * r, n * r);
        var h = {position: i.position, rotation: i.rotation, scale: i.scale};
        i.position = [0, 0, 0], i.rotation = 0, i.scale = [1, 1], i && i.brush(a, !1);
        var l = t("./shape/Image"), d = new l({id: e, style: {x: 0, y: 0, image: s}});
        return null != h.position && (d.position = i.position = h.position), null != h.rotation && (d.rotation = i.rotation = h.rotation), null != h.scale && (d.scale = i.scale = h.scale), d
    }, u.prototype._createShapeToImageProcessor = function () {
        if (c)return i;
        var t = this;
        return function (e, i, o, n) {
            return t._shapeToImage(e, i, o, n, d)
        }
    };
    var p = function (t, i) {
        this.dom = o(t, "canvas", i), this.dom.onselectstart = e, this.dom.style["-webkit-user-select"] = "none", this.dom.style["user-select"] = "none", this.dom.style["-webkit-touch-callout"] = "none", c && c.initElement(this.dom), this.domBack = null, this.ctxBack = null, this.painter = i, this.unusedCount = 0, this.config = null, this.dirty = !0, this.elCount = 0, this.clearColor = 0, this.motionBlur = !1, this.lastFrameAlpha = .7, this.zoomable = !1, this.panable = !1, this.maxZoom = 1 / 0, this.minZoom = 0, l.call(this)
    };
    return p.prototype.initContext = function () {
        this.ctx = this.dom.getContext("2d"), 1 != d && this.ctx.scale(d, d)
    }, p.prototype.createBackBuffer = function () {
        c || (this.domBack = o("back-" + this.id, "canvas", this.painter), this.ctxBack = this.domBack.getContext("2d"), 1 != d && this.ctxBack.scale(d, d))
    }, p.prototype.resize = function (t, e) {
        this.dom.style.width = t + "px", this.dom.style.height = e + "px", this.dom.setAttribute("width", t * d), this.dom.setAttribute("height", e * d), 1 != d && this.ctx.scale(d, d), this.domBack && (this.domBack.setAttribute("width", t * d), this.domBack.setAttribute("height", e * d), 1 != d && this.ctxBack.scale(d, d))
    }, p.prototype.clear = function () {
        var t = this.dom, e = this.ctx, i = t.width, o = t.height, n = this.clearColor && !c, r = this.motionBlur && !c, s = this.lastFrameAlpha;
        if (r && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(t, 0, 0, i / d, o / d)), n ? (e.save(), e.fillStyle = this.config.clearColor, e.fillRect(0, 0, i / d, o / d), e.restore()) : e.clearRect(0, 0, i / d, o / d), r) {
            var a = this.domBack;
            e.save(), e.globalAlpha = s, e.drawImage(a, 0, 0, i / d, o / d), e.restore()
        }
    }, r.merge(p.prototype, l.prototype), u
}), define("zrender/Storage", ["require", "./tool/util", "./Group"], function (t) {
    "use strict";
    function e(t, e) {
        return t.zlevel == e.zlevel ? t.z == e.z ? t.__renderidx - e.__renderidx : t.z - e.z : t.zlevel - e.zlevel
    }

    var i = t("./tool/util"), o = t("./Group"), n = {hover: !1, normal: "down", update: !1}, r = function () {
        this._elements = {}, this._hoverElements = [], this._roots = [], this._shapeList = [], this._shapeListOffset = 0
    };
    return r.prototype.iterShape = function (t, e) {
        if (e || (e = n), e.hover)for (var i = 0, o = this._hoverElements.length; o > i; i++) {
            var r = this._hoverElements[i];
            if (r.updateTransform(), t(r))return this
        }
        switch (e.update && this.updateShapeList(), e.normal) {
            case"down":
                for (var o = this._shapeList.length; o--;)if (t(this._shapeList[o]))return this;
                break;
            default:
                for (var i = 0, o = this._shapeList.length; o > i; i++)if (t(this._shapeList[i]))return this
        }
        return this
    }, r.prototype.getHoverShapes = function (t) {
        for (var i = [], o = 0, n = this._hoverElements.length; n > o; o++) {
            i.push(this._hoverElements[o]);
            var r = this._hoverElements[o].hoverConnect;
            if (r) {
                var s;
                r = r instanceof Array ? r : [r];
                for (var a = 0, h = r.length; h > a; a++)s = r[a].id ? r[a] : this.get(r[a]), s && i.push(s)
            }
        }
        if (i.sort(e), t)for (var o = 0, n = i.length; n > o; o++)i[o].updateTransform();
        return i
    }, r.prototype.getShapeList = function (t) {
        return t && this.updateShapeList(), this._shapeList
    }, r.prototype.updateShapeList = function () {
        this._shapeListOffset = 0;
        for (var t = 0, i = this._roots.length; i > t; t++) {
            var o = this._roots[t];
            this._updateAndAddShape(o)
        }
        this._shapeList.length = this._shapeListOffset;
        for (var t = 0, i = this._shapeList.length; i > t; t++)this._shapeList[t].__renderidx = t;
        this._shapeList.sort(e)
    }, r.prototype._updateAndAddShape = function (t, e) {
        if (!t.ignore)if (t.updateTransform(), "group" == t.type) {
            t.clipShape && (t.clipShape.parent = t, t.clipShape.updateTransform(), e ? (e = e.slice(), e.push(t.clipShape)) : e = [t.clipShape]);
            for (var i = 0; i < t._children.length; i++) {
                var o = t._children[i];
                o.__dirty = t.__dirty || o.__dirty, this._updateAndAddShape(o, e)
            }
            t.__dirty = !1
        } else t.__clipShapes = e, this._shapeList[this._shapeListOffset++] = t
    }, r.prototype.mod = function (t, e) {
        var o = this._elements[t];
        if (o && (o.modSelf(), e))if (e.parent || e._storage || e.__startClip) {
            var n = {};
            for (var r in e)"parent" != r && "_storage" != r && "__startClip" != r && e.hasOwnProperty(r) && (n[r] = e[r]);
            i.merge(o, n, !0)
        } else i.merge(o, e, !0);
        return this
    }, r.prototype.drift = function (t, e, i) {
        var o = this._elements[t];
        return o && (o.needTransform = !0, "horizontal" === o.draggable ? i = 0 : "vertical" === o.draggable && (e = 0), (!o.ondrift || o.ondrift && !o.ondrift(e, i)) && o.drift(e, i)), this
    }, r.prototype.addHover = function (t) {
        return t.updateNeedTransform(), this._hoverElements.push(t), this
    }, r.prototype.delHover = function () {
        return this._hoverElements = [], this
    }, r.prototype.hasHoverShape = function () {
        return this._hoverElements.length > 0
    }, r.prototype.addRoot = function (t) {
        t instanceof o && t.addChildrenToStorage(this), this.addToMap(t), this._roots.push(t)
    }, r.prototype.delRoot = function (t) {
        if ("undefined" == typeof t) {
            for (var e = 0; e < this._roots.length; e++) {
                var n = this._roots[e];
                n instanceof o && n.delChildrenFromStorage(this)
            }
            return this._elements = {}, this._hoverElements = [], this._roots = [], this._shapeList = [], void(this._shapeListOffset = 0)
        }
        if (t instanceof Array)for (var e = 0, r = t.length; r > e; e++)this.delRoot(t[e]); else {
            var s;
            s = "string" == typeof t ? this._elements[t] : t;
            var a = i.indexOf(this._roots, s);
            a >= 0 && (this.delFromMap(s.id), this._roots.splice(a, 1), s instanceof o && s.delChildrenFromStorage(this))
        }
    }, r.prototype.addToMap = function (t) {
        return t instanceof o && (t._storage = this), t.modSelf(), this._elements[t.id] = t, this
    }, r.prototype.get = function (t) {
        return this._elements[t]
    }, r.prototype.delFromMap = function (t) {
        var e = this._elements[t];
        return e && (delete this._elements[t], e instanceof o && (e._storage = null)), this
    }, r.prototype.dispose = function () {
        this._elements = this._renderList = this._roots = this._hoverElements = null
    }, r
}), define("zrender/animation/Animation", ["require", "./Clip", "../tool/color", "../tool/util", "../tool/event"], function (t) {
    "use strict";
    function e(t, e) {
        return t[e]
    }

    function i(t, e, i) {
        t[e] = i
    }

    function o(t, e, i) {
        return (e - t) * i + t
    }

    function n(t, e, i, n, r) {
        var s = t.length;
        if (1 == r)for (var a = 0; s > a; a++)n[a] = o(t[a], e[a], i); else for (var h = t[0].length, a = 0; s > a; a++)for (var l = 0; h > l; l++)n[a][l] = o(t[a][l], e[a][l], i)
    }

    function r(t) {
        switch (typeof t) {
            case"undefined":
            case"string":
                return !1
        }
        return "undefined" != typeof t.length
    }

    function s(t, e, i, o, n, r, s, h, l) {
        var d = t.length;
        if (1 == l)for (var c = 0; d > c; c++)h[c] = a(t[c], e[c], i[c], o[c], n, r, s); else for (var u = t[0].length, c = 0; d > c; c++)for (var p = 0; u > p; p++)h[c][p] = a(t[c][p], e[c][p], i[c][p], o[c][p], n, r, s)
    }

    function a(t, e, i, o, n, r, s) {
        var a = .5 * (i - t), h = .5 * (o - e);
        return (2 * (e - i) + a + h) * s + (-3 * (e - i) - 2 * a - h) * r + a * n + e
    }

    function h(t) {
        if (r(t)) {
            var e = t.length;
            if (r(t[0])) {
                for (var i = [], o = 0; e > o; o++)i.push(g.call(t[o]));
                return i
            }
            return g.call(t)
        }
        return t
    }

    function l(t) {
        return t[0] = Math.floor(t[0]), t[1] = Math.floor(t[1]), t[2] = Math.floor(t[2]), "rgba(" + t.join(",") + ")"
    }

    var d = t("./Clip"), c = t("../tool/color"), u = t("../tool/util"), p = t("../tool/event").Dispatcher, f = window.requestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (t) {
            setTimeout(t, 16)
        }, g = Array.prototype.slice, m = function (t) {
        t = t || {}, this.stage = t.stage || {}, this.onframe = t.onframe || function () {
        }, this._clips = [], this._running = !1, this._time = 0, p.call(this)
    };
    m.prototype = {
        add: function (t) {
            this._clips.push(t)
        }, remove: function (t) {
            var e = u.indexOf(this._clips, t);
            e >= 0 && this._clips.splice(e, 1)
        }, _update: function () {
            for (var t = (new Date).getTime(), e = t - this._time, i = this._clips, o = i.length, n = [], r = [], s = 0; o > s; s++) {
                var a = i[s], h = a.step(t);
                h && (n.push(h), r.push(a))
            }
            this.stage.update && this.stage.update();
            for (var s = 0; o > s;)i[s]._needsRemove ? (i[s] = i[o - 1], i.pop(), o--) : s++;
            o = n.length;
            for (var s = 0; o > s; s++)r[s].fire(n[s]);
            this._time = t, this.onframe(e), this.dispatch("frame", e)
        }, start: function () {
            function t() {
                e._running && (e._update(), f(t))
            }

            var e = this;
            this._running = !0, this._time = (new Date).getTime(), f(t)
        }, stop: function () {
            this._running = !1
        }, clear: function () {
            this._clips = []
        }, animate: function (t, e) {
            e = e || {};
            var i = new _(t, e.loop, e.getter, e.setter);
            return i.animation = this, i
        }, constructor: m
    }, u.merge(m.prototype, p.prototype, !0);
    var _ = function (t, o, n, r) {
        this._tracks = {}, this._target = t, this._loop = o || !1, this._getter = n || e, this._setter = r || i, this._clipCount = 0, this._delay = 0, this._doneList = [], this._onframeList = [], this._clipList = []
    };
    return _.prototype = {
        when: function (t, e) {
            for (var i in e)this._tracks[i] || (this._tracks[i] = [], 0 !== t && this._tracks[i].push({
                time: 0,
                value: h(this._getter(this._target, i))
            })), this._tracks[i].push({time: parseInt(t, 10), value: e[i]});
            return this
        }, during: function (t) {
            return this._onframeList.push(t), this
        }, start: function (t) {
            var e = this, i = this._setter, h = this._getter, u = "spline" === t, p = function () {
                if (e._clipCount--, 0 === e._clipCount) {
                    e._tracks = {};
                    for (var t = e._doneList.length, i = 0; t > i; i++)e._doneList[i].call(e)
                }
            }, f = function (f, g) {
                var m = f.length;
                if (m) {
                    var _ = f[0].value, y = r(_), v = !1, x = y && r(_[0]) ? 2 : 1;
                    f.sort(function (t, e) {
                        return t.time - e.time
                    });
                    var b;
                    if (m) {
                        b = f[m - 1].time;
                        for (var T = [], S = [], C = 0; m > C; C++) {
                            T.push(f[C].time / b);
                            var z = f[C].value;
                            "string" == typeof z && (z = c.toArray(z), 0 === z.length && (z[0] = z[1] = z[2] = 0, z[3] = 1), v = !0), S.push(z)
                        }
                        var w, C, E, A, L, M, k, O = 0, I = 0;
                        if (v)var P = [0, 0, 0, 0];
                        var R = function (t, r) {
                            if (I > r) {
                                for (w = Math.min(O + 1, m - 1), C = w; C >= 0 && !(T[C] <= r); C--);
                                C = Math.min(C, m - 2)
                            } else {
                                for (C = O; m > C && !(T[C] > r); C++);
                                C = Math.min(C - 1, m - 2)
                            }
                            O = C, I = r;
                            var d = T[C + 1] - T[C];
                            if (0 !== d) {
                                if (E = (r - T[C]) / d, u)if (L = S[C], A = S[0 === C ? C : C - 1], M = S[C > m - 2 ? m - 1 : C + 1], k = S[C > m - 3 ? m - 1 : C + 2], y)s(A, L, M, k, E, E * E, E * E * E, h(t, g), x); else {
                                    var c;
                                    v ? (c = s(A, L, M, k, E, E * E, E * E * E, P, 1), c = l(P)) : c = a(A, L, M, k, E, E * E, E * E * E), i(t, g, c)
                                } else if (y)n(S[C], S[C + 1], E, h(t, g), x); else {
                                    var c;
                                    v ? (n(S[C], S[C + 1], E, P, 1), c = l(P)) : c = o(S[C], S[C + 1], E), i(t, g, c)
                                }
                                for (C = 0; C < e._onframeList.length; C++)e._onframeList[C](t, r)
                            }
                        }, D = new d({
                            target: e._target,
                            life: b,
                            loop: e._loop,
                            delay: e._delay,
                            onframe: R,
                            ondestroy: p
                        });
                        t && "spline" !== t && (D.easing = t), e._clipList.push(D), e._clipCount++, e.animation.add(D)
                    }
                }
            };
            for (var g in this._tracks)f(this._tracks[g], g);
            return this
        }, stop: function () {
            for (var t = 0; t < this._clipList.length; t++) {
                var e = this._clipList[t];
                this.animation.remove(e)
            }
            this._clipList = []
        }, delay: function (t) {
            return this._delay = t, this
        }, done: function (t) {
            return t && this._doneList.push(t), this
        }
    }, m
}), define("zrender/tool/vector", [], function () {
    var t = "undefined" == typeof Float32Array ? Array : Float32Array, e = {
        create: function (e, i) {
            var o = new t(2);
            return o[0] = e || 0, o[1] = i || 0, o
        }, copy: function (t, e) {
            return t[0] = e[0], t[1] = e[1], t
        }, set: function (t, e, i) {
            return t[0] = e, t[1] = i, t
        }, add: function (t, e, i) {
            return t[0] = e[0] + i[0], t[1] = e[1] + i[1], t
        }, scaleAndAdd: function (t, e, i, o) {
            return t[0] = e[0] + i[0] * o, t[1] = e[1] + i[1] * o, t
        }, sub: function (t, e, i) {
            return t[0] = e[0] - i[0], t[1] = e[1] - i[1], t
        }, len: function (t) {
            return Math.sqrt(this.lenSquare(t))
        }, lenSquare: function (t) {
            return t[0] * t[0] + t[1] * t[1]
        }, mul: function (t, e, i) {
            return t[0] = e[0] * i[0], t[1] = e[1] * i[1], t
        }, div: function (t, e, i) {
            return t[0] = e[0] / i[0], t[1] = e[1] / i[1], t
        }, dot: function (t, e) {
            return t[0] * e[0] + t[1] * e[1]
        }, scale: function (t, e, i) {
            return t[0] = e[0] * i, t[1] = e[1] * i, t
        }, normalize: function (t, i) {
            var o = e.len(i);
            return 0 === o ? (t[0] = 0, t[1] = 0) : (t[0] = i[0] / o, t[1] = i[1] / o), t
        }, distance: function (t, e) {
            return Math.sqrt((t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]))
        }, distanceSquare: function (t, e) {
            return (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1])
        }, negate: function (t, e) {
            return t[0] = -e[0], t[1] = -e[1], t
        }, lerp: function (t, e, i, o) {
            return t[0] = e[0] + o * (i[0] - e[0]), t[1] = e[1] + o * (i[1] - e[1]), t
        }, applyTransform: function (t, e, i) {
            var o = e[0], n = e[1];
            return t[0] = i[0] * o + i[2] * n + i[4], t[1] = i[1] * o + i[3] * n + i[5], t
        }, min: function (t, e, i) {
            return t[0] = Math.min(e[0], i[0]), t[1] = Math.min(e[1], i[1]), t
        }, max: function (t, e, i) {
            return t[0] = Math.max(e[0], i[0]), t[1] = Math.max(e[1], i[1]), t
        }
    };
    return e.length = e.len, e.lengthSquare = e.lenSquare, e.dist = e.distance, e.distSquare = e.distanceSquare, e
}), define("zrender/tool/matrix", [], function () {
    var t = "undefined" == typeof Float32Array ? Array : Float32Array, e = {
        create: function () {
            var i = new t(6);
            return e.identity(i), i
        }, identity: function (t) {
            return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t
        }, copy: function (t, e) {
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t
        }, mul: function (t, e, i) {
            return t[0] = e[0] * i[0] + e[2] * i[1], t[1] = e[1] * i[0] + e[3] * i[1], t[2] = e[0] * i[2] + e[2] * i[3], t[3] = e[1] * i[2] + e[3] * i[3], t[4] = e[0] * i[4] + e[2] * i[5] + e[4], t[5] = e[1] * i[4] + e[3] * i[5] + e[5], t
        }, translate: function (t, e, i) {
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4] + i[0], t[5] = e[5] + i[1], t
        }, rotate: function (t, e, i) {
            var o = e[0], n = e[2], r = e[4], s = e[1], a = e[3], h = e[5], l = Math.sin(i), d = Math.cos(i);
            return t[0] = o * d + s * l, t[1] = -o * l + s * d, t[2] = n * d + a * l, t[3] = -n * l + d * a, t[4] = d * r + l * h, t[5] = d * h - l * r, t
        }, scale: function (t, e, i) {
            var o = i[0], n = i[1];
            return t[0] = e[0] * o, t[1] = e[1] * n, t[2] = e[2] * o, t[3] = e[3] * n, t[4] = e[4] * o, t[5] = e[5] * n, t
        }, invert: function (t, e) {
            var i = e[0], o = e[2], n = e[4], r = e[1], s = e[3], a = e[5], h = i * s - r * o;
            return h ? (h = 1 / h, t[0] = s * h, t[1] = -r * h, t[2] = -o * h, t[3] = i * h, t[4] = (o * a - s * n) * h, t[5] = (r * n - i * a) * h, t) : null
        }, mulVector: function (t, e, i) {
            var o = e[0], n = e[2], r = e[4], s = e[1], a = e[3], h = e[5];
            return t[0] = i[0] * o + i[1] * n + r, t[1] = i[0] * s + i[1] * a + h, t
        }
    };
    return e
}), define("zrender/loadingEffect/Base", ["require", "../tool/util", "../shape/Text", "../shape/Rectangle"], function (t) {
    function e(t) {
        this.setOptions(t)
    }

    var i = t("../tool/util"), o = t("../shape/Text"), n = t("../shape/Rectangle"), r = "Loading...", s = "normal 16px Arial";
    return e.prototype.createTextShape = function (t) {
        return new o({
            highlightStyle: i.merge({
                x: this.canvasWidth / 2,
                y: this.canvasHeight / 2,
                text: r,
                textAlign: "center",
                textBaseline: "middle",
                textFont: s,
                color: "#333",
                brushType: "fill"
            }, t, !0)
        })
    }, e.prototype.createBackgroundShape = function (t) {
        return new n({
            highlightStyle: {
                x: 0,
                y: 0,
                width: this.canvasWidth,
                height: this.canvasHeight,
                brushType: "fill",
                color: t
            }
        })
    }, e.prototype.start = function (t) {
        function e(e) {
            t.storage.addHover(e)
        }

        function i() {
            t.refreshHover()
        }

        this.canvasWidth = t._width, this.canvasHeight = t._height, this.loadingTimer = this._start(e, i)
    }, e.prototype._start = function () {
        return setInterval(function () {
        }, 1e4)
    }, e.prototype.stop = function () {
        clearInterval(this.loadingTimer)
    }, e.prototype.setOptions = function (t) {
        this.options = t || {}
    }, e.prototype.adjust = function (t, e) {
        return t <= e[0] ? t = e[0] : t >= e[1] && (t = e[1]), t
    }, e.prototype.getLocation = function (t, e, i) {
        var o = null != t.x ? t.x : "center";
        switch (o) {
            case"center":
                o = Math.floor((this.canvasWidth - e) / 2);
                break;
            case"left":
                o = 0;
                break;
            case"right":
                o = this.canvasWidth - e
        }
        var n = null != t.y ? t.y : "center";
        switch (n) {
            case"center":
                n = Math.floor((this.canvasHeight - i) / 2);
                break;
            case"top":
                n = 0;
                break;
            case"bottom":
                n = this.canvasHeight - i
        }
        return {x: o, y: n, width: e, height: i}
    }, e
}), define("zrender/mixin/Transformable", ["require", "../tool/matrix", "../tool/vector"], function (t) {
    "use strict";
    function e(t) {
        return t > -s && s > t
    }

    function i(t) {
        return t > s || -s > t
    }

    var o = t("../tool/matrix"), n = t("../tool/vector"), r = [0, 0], s = 5e-5, a = function () {
        this.position || (this.position = [0, 0]), "undefined" == typeof this.rotation && (this.rotation = [0, 0, 0]), this.scale || (this.scale = [1, 1, 0, 0]), this.needLocalTransform = !1, this.needTransform = !1
    };
    return a.prototype = {
        constructor: a, updateNeedTransform: function () {
            this.needLocalTransform = i(this.rotation[0]) || i(this.position[0]) || i(this.position[1]) || i(this.scale[0] - 1) || i(this.scale[1] - 1)
        }, updateTransform: function () {
            if (this.updateNeedTransform(), this.needTransform = this.parent ? this.needLocalTransform || this.parent.needTransform : this.needLocalTransform, this.needTransform) {
                var t = this.transform || o.create();
                if (o.identity(t), this.needLocalTransform) {
                    if (i(this.scale[0]) || i(this.scale[1])) {
                        r[0] = -this.scale[2] || 0, r[1] = -this.scale[3] || 0;
                        var e = i(r[0]) || i(r[1]);
                        e && o.translate(t, t, r), o.scale(t, t, this.scale), e && (r[0] = -r[0], r[1] = -r[1], o.translate(t, t, r))
                    }
                    if (this.rotation instanceof Array) {
                        if (0 !== this.rotation[0]) {
                            r[0] = -this.rotation[1] || 0, r[1] = -this.rotation[2] || 0;
                            var e = i(r[0]) || i(r[1]);
                            e && o.translate(t, t, r), o.rotate(t, t, this.rotation[0]), e && (r[0] = -r[0], r[1] = -r[1], o.translate(t, t, r))
                        }
                    } else 0 !== this.rotation && o.rotate(t, t, this.rotation);
                    (i(this.position[0]) || i(this.position[1])) && o.translate(t, t, this.position)
                }
                this.transform = t, this.parent && this.parent.needTransform && (this.needLocalTransform ? o.mul(this.transform, this.parent.transform, this.transform) : o.copy(this.transform, this.parent.transform))
            }
        }, setTransform: function (t) {
            if (this.needTransform) {
                var e = this.transform;
                t.transform(e[0], e[1], e[2], e[3], e[4], e[5])
            }
        }, lookAt: function () {
            var t = n.create();
            return function (i) {
                this.transform || (this.transform = o.create());
                var r = this.transform;
                n.sub(t, i, this.position), e(t[0]) && e(t[1]) || (n.normalize(t, t), r[2] = t[0] * this.scale[1], r[3] = t[1] * this.scale[1], r[0] = t[1] * this.scale[0], r[1] = -t[0] * this.scale[0], r[4] = this.position[0], r[5] = this.position[1], this.decomposeTransform())
            }
        }(), decomposeTransform: function () {
            if (this.transform) {
                var t = this.transform, e = t[0] * t[0] + t[1] * t[1], o = this.position, n = this.scale, r = this.rotation;
                i(e - 1) && (e = Math.sqrt(e));
                var s = t[2] * t[2] + t[3] * t[3];
                i(s - 1) && (s = Math.sqrt(s)), o[0] = t[4], o[1] = t[5], n[0] = e, n[1] = s, n[2] = n[3] = 0, r[0] = Math.atan2(-t[1] / s, t[0] / e), r[1] = r[2] = 0
            }
        }
    }, a
}), define("zrender/shape/Text", ["require", "../tool/area", "./Base", "../tool/util"], function (t) {
    var e = t("../tool/area"), i = t("./Base"), o = function (t) {
        i.call(this, t)
    };
    return o.prototype = {
        type: "text", brush: function (t, i) {
            var o = this.style;
            if (i && (o = this.getHighlightStyle(o, this.highlightStyle || {})), "undefined" != typeof o.text && o.text !== !1) {
                t.save(), this.doClip(t), this.setContext(t, o), this.setTransform(t), o.textFont && (t.font = o.textFont), t.textAlign = o.textAlign || "start", t.textBaseline = o.textBaseline || "middle";
                var n, r = (o.text + "").split("\n"), s = e.getTextHeight("国", o.textFont), a = this.getRect(o), h = o.x;
                n = "top" == o.textBaseline ? a.y : "bottom" == o.textBaseline ? a.y + s : a.y + s / 2;
                for (var l = 0, d = r.length; d > l; l++) {
                    if (o.maxWidth)switch (o.brushType) {
                        case"fill":
                            t.fillText(r[l], h, n, o.maxWidth);
                            break;
                        case"stroke":
                            t.strokeText(r[l], h, n, o.maxWidth);
                            break;
                        case"both":
                            t.fillText(r[l], h, n, o.maxWidth), t.strokeText(r[l], h, n, o.maxWidth);
                            break;
                        default:
                            t.fillText(r[l], h, n, o.maxWidth)
                    } else switch (o.brushType) {
                        case"fill":
                            t.fillText(r[l], h, n);
                            break;
                        case"stroke":
                            t.strokeText(r[l], h, n);
                            break;
                        case"both":
                            t.fillText(r[l], h, n), t.strokeText(r[l], h, n);
                            break;
                        default:
                            t.fillText(r[l], h, n)
                    }
                    n += s
                }
                t.restore()
            }
        }, getRect: function (t) {
            if (t.__rect)return t.__rect;
            var i = e.getTextWidth(t.text, t.textFont), o = e.getTextHeight(t.text, t.textFont), n = t.x;
            "end" == t.textAlign || "right" == t.textAlign ? n -= i : "center" == t.textAlign && (n -= i / 2);
            var r;
            return r = "top" == t.textBaseline ? t.y : "bottom" == t.textBaseline ? t.y - o : t.y - o / 2, t.__rect = {
                x: n,
                y: r,
                width: i,
                height: o
            }, t.__rect
        }
    }, t("../tool/util").inherits(o, i), o
}), define("zrender/shape/Rectangle", ["require", "./Base", "../tool/util"], function (t) {
    var e = t("./Base"), i = function (t) {
        e.call(this, t)
    };
    return i.prototype = {
        type: "rectangle", _buildRadiusPath: function (t, e) {
            var i, o, n, r, s = e.x, a = e.y, h = e.width, l = e.height, d = e.radius;
            "number" == typeof d ? i = o = n = r = d : d instanceof Array ? 1 === d.length ? i = o = n = r = d[0] : 2 === d.length ? (i = n = d[0], o = r = d[1]) : 3 === d.length ? (i = d[0], o = r = d[1], n = d[2]) : (i = d[0], o = d[1], n = d[2], r = d[3]) : i = o = n = r = 0;
            var c;
            i + o > h && (c = i + o, i *= h / c, o *= h / c), n + r > h && (c = n + r, n *= h / c, r *= h / c), o + n > l && (c = o + n, o *= l / c, n *= l / c), i + r > l && (c = i + r, i *= l / c, r *= l / c), t.moveTo(s + i, a), t.lineTo(s + h - o, a), 0 !== o && t.quadraticCurveTo(s + h, a, s + h, a + o), t.lineTo(s + h, a + l - n), 0 !== n && t.quadraticCurveTo(s + h, a + l, s + h - n, a + l), t.lineTo(s + r, a + l), 0 !== r && t.quadraticCurveTo(s, a + l, s, a + l - r), t.lineTo(s, a + i), 0 !== i && t.quadraticCurveTo(s, a, s + i, a)
        }, buildPath: function (t, e) {
            e.radius ? this._buildRadiusPath(t, e) : (t.moveTo(e.x, e.y), t.lineTo(e.x + e.width, e.y), t.lineTo(e.x + e.width, e.y + e.height), t.lineTo(e.x, e.y + e.height), t.lineTo(e.x, e.y)), t.closePath()
        }, getRect: function (t) {
            if (t.__rect)return t.__rect;
            var e;
            return e = "stroke" == t.brushType || "fill" == t.brushType ? t.lineWidth || 1 : 0, t.__rect = {
                x: Math.round(t.x - e / 2),
                y: Math.round(t.y - e / 2),
                width: t.width + e,
                height: t.height + e
            }, t.__rect
        }
    }, t("../tool/util").inherits(i, e), i
}), define("zrender/tool/area", ["require", "./util", "./curve"], function (t) {
    "use strict";
    function e(t) {
        return t %= O, 0 > t && (t += O), t
    }

    function i(t, e, i, r) {
        if (!e || !t)return !1;
        var s = t.type;
        C = C || z.getContext();
        var a = o(t, e, i, r);
        if ("undefined" != typeof a)return a;
        if (t.buildPath && C.isPointInPath)return n(t, C, e, i, r);
        switch (s) {
            case"ellipse":
                return !0;
            case"trochoid":
                var h = "out" == e.location ? e.r1 + e.r2 + e.d : e.r1 - e.r2 + e.d;
                return p(e, i, r, h);
            case"rose":
                return p(e, i, r, e.maxr);
            default:
                return !1
        }
    }

    function o(t, e, i, o) {
        var n = t.type;
        switch (n) {
            case"bezier-curve":
                return "undefined" == typeof e.cpX2 ? h(e.xStart, e.yStart, e.cpX1, e.cpY1, e.xEnd, e.yEnd, e.lineWidth, i, o) : a(e.xStart, e.yStart, e.cpX1, e.cpY1, e.cpX2, e.cpY2, e.xEnd, e.yEnd, e.lineWidth, i, o);
            case"line":
                return s(e.xStart, e.yStart, e.xEnd, e.yEnd, e.lineWidth, i, o);
            case"broken-line":
                return d(e.pointList, e.lineWidth, i, o);
            case"ring":
                return c(e.x, e.y, e.r0, e.r, i, o);
            case"circle":
                return p(e.x, e.y, e.r, i, o);
            case"sector":
                var r = e.startAngle * Math.PI / 180, l = e.endAngle * Math.PI / 180;
                return e.clockWise || (r = -r, l = -l), f(e.x, e.y, e.r0, e.r, r, l, !e.clockWise, i, o);
            case"path":
                return b(e.pathArray, Math.max(e.lineWidth, 5), e.brushType, i, o);
            case"polygon":
            case"star":
            case"isogon":
                return g(e.pointList, i, o);
            case"text":
                var m = e.__rect || t.getRect(e);
                return u(m.x, m.y, m.width, m.height, i, o);
            case"rectangle":
            case"image":
                return u(e.x, e.y, e.width, e.height, i, o)
        }
    }

    function n(t, e, i, o, n) {
        return e.beginPath(), t.buildPath(e, i), e.closePath(), e.isPointInPath(o, n)
    }

    function r(t, e, o, n) {
        return !i(t, e, o, n)
    }

    function s(t, e, i, o, n, r, s) {
        if (0 === n)return !1;
        var a = Math.max(n, 5), h = 0, l = t;
        if (s > e + a && s > o + a || e - a > s && o - a > s || r > t + a && r > i + a || t - a > r && i - a > r)return !1;
        if (t === i)return Math.abs(r - t) <= a / 2;
        h = (e - o) / (t - i), l = (t * o - i * e) / (t - i);
        var d = h * r - s + l, c = d * d / (h * h + 1);
        return a / 2 * a / 2 >= c
    }

    function a(t, e, i, o, n, r, s, a, h, l, d) {
        if (0 === h)return !1;
        var c = Math.max(h, 5);
        if (d > e + c && d > o + c && d > r + c && d > a + c || e - c > d && o - c > d && r - c > d && a - c > d || l > t + c && l > i + c && l > n + c && l > s + c || t - c > l && i - c > l && n - c > l && s - c > l)return !1;
        var u = w.cubicProjectPoint(t, e, i, o, n, r, s, a, l, d, null);
        return c / 2 >= u
    }

    function h(t, e, i, o, n, r, s, a, h) {
        if (0 === s)return !1;
        var l = Math.max(s, 5);
        if (h > e + l && h > o + l && h > r + l || e - l > h && o - l > h && r - l > h || a > t + l && a > i + l && a > n + l || t - l > a && i - l > a && n - l > a)return !1;
        var d = w.quadraticProjectPoint(t, e, i, o, n, r, a, h, null);
        return l / 2 >= d
    }

    function l(t, i, o, n, r, s, a, h, l) {
        if (0 === a)return !1;
        var d = Math.max(a, 5);
        h -= t, l -= i;
        var c = Math.sqrt(h * h + l * l);
        if (c - d > o || o > c + d)return !1;
        if (Math.abs(n - r) >= O)return !0;
        if (s) {
            var u = n;
            n = e(r), r = e(u)
        } else n = e(n), r = e(r);
        n > r && (r += O);
        var p = Math.atan2(l, h);
        return 0 > p && (p += O), p >= n && r >= p || p + O >= n && r >= p + O
    }

    function d(t, e, i, o) {
        for (var e = Math.max(e, 10), n = 0, r = t.length - 1; r > n; n++) {
            var a = t[n][0], h = t[n][1], l = t[n + 1][0], d = t[n + 1][1];
            if (s(a, h, l, d, e, i, o))return !0
        }
        return !1
    }

    function c(t, e, i, o, n, r) {
        var s = (n - t) * (n - t) + (r - e) * (r - e);
        return o * o > s && s > i * i
    }

    function u(t, e, i, o, n, r) {
        return n >= t && t + i >= n && r >= e && e + o >= r
    }

    function p(t, e, i, o, n) {
        return i * i > (o - t) * (o - t) + (n - e) * (n - e)
    }

    function f(t, e, i, o, n, r, s, a, h) {
        return l(t, e, (i + o) / 2, n, r, s, o - i, a, h)
    }

    function g(t, e, i) {
        for (var o = t.length, n = 0, r = 0, s = o - 1; o > r; r++) {
            var a = t[s][0], h = t[s][1], l = t[r][0], d = t[r][1];
            n += m(a, h, l, d, e, i), s = r
        }
        return 0 !== n
    }

    function m(t, e, i, o, n, r) {
        if (r > e && r > o || e > r && o > r)return 0;
        if (o == e)return 0;
        var s = e > o ? 1 : -1, a = (r - e) / (o - e), h = a * (i - t) + t;
        return h > n ? s : 0
    }

    function _() {
        var t = P[0];
        P[0] = P[1], P[1] = t
    }

    function y(t, e, i, o, n, r, s, a, h, l) {
        if (l > e && l > o && l > r && l > a || e > l && o > l && r > l && a > l)return 0;
        var d = w.cubicRootAt(e, o, r, a, l, I);
        if (0 === d)return 0;
        for (var c, u, p = 0, f = -1, g = 0; d > g; g++) {
            var m = I[g], y = w.cubicAt(t, i, n, s, m);
            h > y || (0 > f && (f = w.cubicExtrema(e, o, r, a, P), P[1] < P[0] && f > 1 && _(), c = w.cubicAt(e, o, r, a, P[0]), f > 1 && (u = w.cubicAt(e, o, r, a, P[1]))), p += 2 == f ? m < P[0] ? e > c ? 1 : -1 : m < P[1] ? c > u ? 1 : -1 : u > a ? 1 : -1 : m < P[0] ? e > c ? 1 : -1 : c > a ? 1 : -1)
        }
        return p
    }

    function v(t, e, i, o, n, r, s, a) {
        if (a > e && a > o && a > r || e > a && o > a && r > a)return 0;
        var h = w.quadraticRootAt(e, o, r, a, I);
        if (0 === h)return 0;
        var l = w.quadraticExtremum(e, o, r);
        if (l >= 0 && 1 >= l) {
            for (var d = 0, c = w.quadraticAt(e, o, r, l), u = 0; h > u; u++) {
                var p = w.quadraticAt(t, i, n, I[u]);
                p > s || (d += I[u] < l ? e > c ? 1 : -1 : c > r ? 1 : -1)
            }
            return d
        }
        var p = w.quadraticAt(t, i, n, I[0]);
        return p > s ? 0 : e > r ? 1 : -1
    }

    function x(t, i, o, n, r, s, a, h) {
        if (h -= i, h > o || -o > h)return 0;
        var l = Math.sqrt(o * o - h * h);
        if (I[0] = -l, I[1] = l, Math.abs(n - r) >= O) {
            n = 0, r = O;
            var d = s ? 1 : -1;
            return a >= I[0] + t && a <= I[1] + t ? d : 0
        }
        if (s) {
            var l = n;
            n = e(r), r = e(l)
        } else n = e(n), r = e(r);
        n > r && (r += O);
        for (var c = 0, u = 0; 2 > u; u++) {
            var p = I[u];
            if (p + t > a) {
                var f = Math.atan2(h, p), d = s ? 1 : -1;
                0 > f && (f = O + f), (f >= n && r >= f || f + O >= n && r >= f + O) && (f > Math.PI / 2 && f < 1.5 * Math.PI && (d = -d), c += d)
            }
        }
        return c
    }

    function b(t, e, i, o, n) {
        var r = 0, d = 0, c = 0, u = 0, p = 0, f = !0, g = !0;
        i = i || "fill";
        for (var _ = "stroke" === i || "both" === i, b = "fill" === i || "both" === i, T = 0; T < t.length; T++) {
            var S = t[T], C = S.points;
            if (f || "M" === S.command) {
                if (T > 0 && (b && (r += m(d, c, u, p, o, n)), 0 !== r))return !0;
                u = C[C.length - 2], p = C[C.length - 1], f = !1, g && "A" !== S.command && (g = !1, d = u, c = p)
            }
            switch (S.command) {
                case"M":
                    d = C[0], c = C[1];
                    break;
                case"L":
                    if (_ && s(d, c, C[0], C[1], e, o, n))return !0;
                    b && (r += m(d, c, C[0], C[1], o, n)), d = C[0], c = C[1];
                    break;
                case"C":
                    if (_ && a(d, c, C[0], C[1], C[2], C[3], C[4], C[5], e, o, n))return !0;
                    b && (r += y(d, c, C[0], C[1], C[2], C[3], C[4], C[5], o, n)), d = C[4], c = C[5];
                    break;
                case"Q":
                    if (_ && h(d, c, C[0], C[1], C[2], C[3], e, o, n))return !0;
                    b && (r += v(d, c, C[0], C[1], C[2], C[3], o, n)), d = C[2], c = C[3];
                    break;
                case"A":
                    var z = C[0], w = C[1], E = C[2], A = C[3], L = C[4], M = C[5], k = Math.cos(L) * E + z, O = Math.sin(L) * A + w;
                    g ? (g = !1, u = k, p = O) : r += m(d, c, k, O);
                    var I = (o - z) * A / E + z;
                    if (_ && l(z, w, A, L, L + M, 1 - C[7], e, I, n))return !0;
                    b && (r += x(z, w, A, L, L + M, 1 - C[7], I, n)), d = Math.cos(L + M) * E + z, c = Math.sin(L + M) * A + w;
                    break;
                case"z":
                    if (_ && s(d, c, u, p, e, o, n))return !0;
                    f = !0
            }
        }
        return b && (r += m(d, c, u, p, o, n)), 0 !== r
    }

    function T(t, e) {
        var i = t + ":" + e;
        if (E[i])return E[i];
        C = C || z.getContext(), C.save(), e && (C.font = e), t = (t + "").split("\n");
        for (var o = 0, n = 0, r = t.length; r > n; n++)o = Math.max(C.measureText(t[n]).width, o);
        return C.restore(), E[i] = o, ++L > k && (L = 0, E = {}), o
    }

    function S(t, e) {
        var i = t + ":" + e;
        if (A[i])return A[i];
        C = C || z.getContext(), C.save(), e && (C.font = e), t = (t + "").split("\n");
        var o = (C.measureText("国").width + 2) * t.length;
        return C.restore(), A[i] = o, ++M > k && (M = 0, A = {}), o
    }

    var C, z = t("./util"), w = t("./curve"), E = {}, A = {}, L = 0, M = 0, k = 5e3, O = 2 * Math.PI, I = [-1, -1, -1], P = [-1, -1];
    return {
        isInside: i,
        isOutside: r,
        getTextWidth: T,
        getTextHeight: S,
        isInsidePath: b,
        isInsidePolygon: g,
        isInsideSector: f,
        isInsideCircle: p,
        isInsideLine: s,
        isInsideRect: u,
        isInsideBrokenLine: d,
        isInsideCubicStroke: a,
        isInsideQuadraticStroke: h
    }
}), define("zrender/shape/Base", ["require", "../tool/matrix", "../tool/guid", "../tool/util", "../tool/log", "../mixin/Transformable", "../mixin/Eventful", "../tool/area", "../tool/color"], function (t) {
    function e(e, o, n, r, s, a, h) {
        s && (e.font = s), e.textAlign = a, e.textBaseline = h;
        var l = i(o, n, r, s, a, h);
        o = (o + "").split("\n");
        var d = t("../tool/area").getTextHeight("国", s);
        switch (h) {
            case"top":
                r = l.y;
                break;
            case"bottom":
                r = l.y + d;
                break;
            default:
                r = l.y + d / 2
        }
        for (var c = 0, u = o.length; u > c; c++)e.fillText(o[c], n, r), r += d
    }

    function i(e, i, o, n, r, s) {
        var a = t("../tool/area"), h = a.getTextWidth(e, n), l = a.getTextHeight("国", n);
        switch (e = (e + "").split("\n"), r) {
            case"end":
            case"right":
                i -= h;
                break;
            case"center":
                i -= h / 2
        }
        switch (s) {
            case"top":
                break;
            case"bottom":
                o -= l * e.length;
                break;
            default:
                o -= l * e.length / 2
        }
        return {x: i, y: o, width: h, height: l * e.length}
    }

    var o = window.G_vmlCanvasManager, n = t("../tool/matrix"), r = t("../tool/guid"), s = t("../tool/util"), a = t("../tool/log"), h = t("../mixin/Transformable"), l = t("../mixin/Eventful"), d = function (t) {
        t = t || {}, this.id = t.id || r();
        for (var e in t)this[e] = t[e];
        this.style = this.style || {}, this.highlightStyle = this.highlightStyle || null, this.parent = null, this.__dirty = !0, this.__clipShapes = [], h.call(this), l.call(this)
    };
    d.prototype.invisible = !1, d.prototype.ignore = !1, d.prototype.zlevel = 0, d.prototype.draggable = !1, d.prototype.clickable = !1, d.prototype.hoverable = !0, d.prototype.z = 0, d.prototype.brush = function (t, e) {
        var i = this.beforeBrush(t, e);
        switch (t.beginPath(), this.buildPath(t, i), i.brushType) {
            case"both":
                t.fill();
            case"stroke":
                i.lineWidth > 0 && t.stroke();
                break;
            default:
                t.fill()
        }
        this.drawText(t, i, this.style), this.afterBrush(t)
    }, d.prototype.beforeBrush = function (t, e) {
        var i = this.style;
        return this.brushTypeOnly && (i.brushType = this.brushTypeOnly), e && (i = this.getHighlightStyle(i, this.highlightStyle || {}, this.brushTypeOnly)), "stroke" == this.brushTypeOnly && (i.strokeColor = i.strokeColor || i.color), t.save(), this.doClip(t), this.setContext(t, i), this.setTransform(t), i
    }, d.prototype.afterBrush = function (t) {
        t.restore()
    };
    var c = [["color", "fillStyle"], ["strokeColor", "strokeStyle"], ["opacity", "globalAlpha"], ["lineCap", "lineCap"], ["lineJoin", "lineJoin"], ["miterLimit", "miterLimit"], ["lineWidth", "lineWidth"], ["shadowBlur", "shadowBlur"], ["shadowColor", "shadowColor"], ["shadowOffsetX", "shadowOffsetX"], ["shadowOffsetY", "shadowOffsetY"]];
    d.prototype.setContext = function (t, e) {
        for (var i = 0, o = c.length; o > i; i++) {
            var n = c[i][0], r = e[n], s = c[i][1];
            "undefined" != typeof r && (t[s] = r)
        }
    };
    var u = n.create();
    return d.prototype.doClip = function (t) {
        if (this.__clipShapes && !o)for (var e = 0; e < this.__clipShapes.length; e++) {
            var i = this.__clipShapes[e];
            if (i.needTransform) {
                var r = i.transform;
                n.invert(u, r), t.transform(r[0], r[1], r[2], r[3], r[4], r[5])
            }
            if (t.beginPath(), i.buildPath(t, i.style), t.clip(), i.needTransform) {
                var r = u;
                t.transform(r[0], r[1], r[2], r[3], r[4], r[5])
            }
        }
    }, d.prototype.getHighlightStyle = function (e, i, o) {
        var n = {};
        for (var r in e)n[r] = e[r];
        var s = t("../tool/color"), a = s.getHighlightColor();
        "stroke" != e.brushType ? (n.strokeColor = a, n.lineWidth = (e.lineWidth || 1) + this.getHighlightZoom(), n.brushType = "both") : "stroke" != o ? (n.strokeColor = a, n.lineWidth = (e.lineWidth || 1) + this.getHighlightZoom()) : n.strokeColor = i.strokeColor || s.mix(e.strokeColor, s.toRGB(a));
        for (var r in i)"undefined" != typeof i[r] && (n[r] = i[r]);
        return n
    }, d.prototype.getHighlightZoom = function () {
        return "text" != this.type ? 6 : 2
    }, d.prototype.drift = function (t, e) {
        this.position[0] += t, this.position[1] += e
    }, d.prototype.getTansform = function () {
        var t = [];
        return function (e, i) {
            var o = [e, i];
            return this.needTransform && this.transform && (n.invert(t, this.transform), n.mulVector(o, t, [e, i, 1]), e == o[0] && i == o[1] && this.updateNeedTransform()), o
        }
    }(), d.prototype.buildPath = function () {
        a("buildPath not implemented in " + this.type)
    }, d.prototype.getRect = function () {
        a("getRect not implemented in " + this.type)
    }, d.prototype.isCover = function (e, i) {
        var o = this.getTansform(e, i);
        e = o[0], i = o[1];
        var n = this.style.__rect;
        return n || (n = this.style.__rect = this.getRect(this.style)), e >= n.x && e <= n.x + n.width && i >= n.y && i <= n.y + n.height ? t("../tool/area").isInside(this, this.style, e, i) : !1
    }, d.prototype.drawText = function (t, i, o) {
        if ("undefined" != typeof i.text && i.text !== !1) {
            var n = i.textColor || i.color || i.strokeColor;
            t.fillStyle = n;
            var r, s, a, h, l = 10, d = i.textPosition || this.textPosition || "top";
            switch (d) {
                case"inside":
                case"top":
                case"bottom":
                case"left":
                case"right":
                    if (this.getRect) {
                        var c = (o || i).__rect || this.getRect(o || i);
                        switch (d) {
                            case"inside":
                                a = c.x + c.width / 2, h = c.y + c.height / 2, r = "center", s = "middle", "stroke" != i.brushType && n == i.color && (t.fillStyle = "#fff");
                                break;
                            case"left":
                                a = c.x - l, h = c.y + c.height / 2, r = "end", s = "middle";
                                break;
                            case"right":
                                a = c.x + c.width + l, h = c.y + c.height / 2, r = "start", s = "middle";
                                break;
                            case"top":
                                a = c.x + c.width / 2, h = c.y - l, r = "center", s = "bottom";
                                break;
                            case"bottom":
                                a = c.x + c.width / 2, h = c.y + c.height + l, r = "center", s = "top"
                        }
                    }
                    break;
                case"start":
                case"end":
                    var u, p, f, g;
                    if ("undefined" != typeof i.pointList) {
                        var m = i.pointList;
                        if (m.length < 2)return;
                        var _ = m.length;
                        switch (d) {
                            case"start":
                                u = m[0][0], p = m[1][0], f = m[0][1], g = m[1][1];
                                break;
                            case"end":
                                u = m[_ - 2][0], p = m[_ - 1][0], f = m[_ - 2][1], g = m[_ - 1][1]
                        }
                    } else u = i.xStart || 0, p = i.xEnd || 0, f = i.yStart || 0, g = i.yEnd || 0;
                    switch (d) {
                        case"start":
                            r = p > u ? "end" : "start", s = g > f ? "bottom" : "top", a = u, h = f;
                            break;
                        case"end":
                            r = p > u ? "start" : "end", s = g > f ? "top" : "bottom", a = p, h = g
                    }
                    l -= 4, u != p ? a -= "end" == r ? l : -l : r = "center", f != g ? h -= "bottom" == s ? l : -l : s = "middle";
                    break;
                case"specific":
                    a = i.textX || 0, h = i.textY || 0, r = "start", s = "middle"
            }
            null != a && null != h && e(t, i.text, a, h, i.textFont, i.textAlign || r, i.textBaseline || s)
        }
    }, d.prototype.modSelf = function () {
        this.__dirty = !0, this.style && (this.style.__rect = null), this.highlightStyle && (this.highlightStyle.__rect = null)
    }, d.prototype.isSilent = function () {
        return !(this.hoverable || this.draggable || this.clickable || this.onmousemove || this.onmouseover || this.onmouseout || this.onmousedown || this.onmouseup || this.onclick || this.ondragenter || this.ondragover || this.ondragleave || this.ondrop)
    }, s.merge(d.prototype, h.prototype, !0), s.merge(d.prototype, l.prototype, !0), d
}), define("zrender/tool/curve", ["require", "./vector"], function (t) {
    function e(t) {
        return t > -g && g > t
    }

    function i(t) {
        return t > g || -g > t
    }

    function o(t, e, i, o, n) {
        var r = 1 - n;
        return r * r * (r * t + 3 * n * e) + n * n * (n * o + 3 * r * i)
    }

    function n(t, e, i, o, n) {
        var r = 1 - n;
        return 3 * (((e - t) * r + 2 * (i - e) * n) * r + (o - i) * n * n)
    }

    function r(t, i, o, n, r, s) {
        var a = n + 3 * (i - o) - t, h = 3 * (o - 2 * i + t), l = 3 * (i - t), d = t - r, c = h * h - 3 * a * l, u = h * l - 9 * a * d, p = l * l - 3 * h * d, f = 0;
        if (e(c) && e(u))if (e(h))s[0] = 0; else {
            var g = -l / h;
            g >= 0 && 1 >= g && (s[f++] = g)
        } else {
            var y = u * u - 4 * c * p;
            if (e(y)) {
                var v = u / c, g = -h / a + v, x = -v / 2;
                g >= 0 && 1 >= g && (s[f++] = g), x >= 0 && 1 >= x && (s[f++] = x)
            } else if (y > 0) {
                var b = Math.sqrt(y), T = c * h + 1.5 * a * (-u + b), S = c * h + 1.5 * a * (-u - b);
                T = 0 > T ? -Math.pow(-T, _) : Math.pow(T, _), S = 0 > S ? -Math.pow(-S, _) : Math.pow(S, _);
                var g = (-h - (T + S)) / (3 * a);
                g >= 0 && 1 >= g && (s[f++] = g)
            } else {
                var C = (2 * c * h - 3 * a * u) / (2 * Math.sqrt(c * c * c)), z = Math.acos(C) / 3, w = Math.sqrt(c), E = Math.cos(z), g = (-h - 2 * w * E) / (3 * a), x = (-h + w * (E + m * Math.sin(z))) / (3 * a), A = (-h + w * (E - m * Math.sin(z))) / (3 * a);
                g >= 0 && 1 >= g && (s[f++] = g), x >= 0 && 1 >= x && (s[f++] = x), A >= 0 && 1 >= A && (s[f++] = A)
            }
        }
        return f
    }

    function s(t, o, n, r, s) {
        var a = 6 * n - 12 * o + 6 * t, h = 9 * o + 3 * r - 3 * t - 9 * n, l = 3 * o - 3 * t, d = 0;
        if (e(h)) {
            if (i(a)) {
                var c = -l / a;
                c >= 0 && 1 >= c && (s[d++] = c)
            }
        } else {
            var u = a * a - 4 * h * l;
            if (e(u))s[0] = -a / (2 * h); else if (u > 0) {
                var p = Math.sqrt(u), c = (-a + p) / (2 * h), f = (-a - p) / (2 * h);
                c >= 0 && 1 >= c && (s[d++] = c), f >= 0 && 1 >= f && (s[d++] = f)
            }
        }
        return d
    }

    function a(t, e, i, o, n, r) {
        var s = (e - t) * n + t, a = (i - e) * n + e, h = (o - i) * n + i, l = (a - s) * n + s, d = (h - a) * n + a, c = (d - l) * n + l;
        r[0] = t, r[1] = s, r[2] = l, r[3] = c, r[4] = c, r[5] = d, r[6] = h, r[7] = o
    }

    function h(t, e, i, n, r, s, a, h, l, d, c) {
        var u, p = .005, m = 1 / 0;
        y[0] = l, y[1] = d;
        for (var _ = 0; 1 > _; _ += .05) {
            v[0] = o(t, i, r, a, _), v[1] = o(e, n, s, h, _);
            var b = f.distSquare(y, v);
            m > b && (u = _, m = b)
        }
        m = 1 / 0;
        for (var T = 0; 32 > T && !(g > p); T++) {
            var S = u - p, C = u + p;
            v[0] = o(t, i, r, a, S), v[1] = o(e, n, s, h, S);
            var b = f.distSquare(v, y);
            if (S >= 0 && m > b)u = S, m = b; else {
                x[0] = o(t, i, r, a, C), x[1] = o(e, n, s, h, C);
                var z = f.distSquare(x, y);
                1 >= C && m > z ? (u = C, m = z) : p *= .5
            }
        }
        return c && (c[0] = o(t, i, r, a, u), c[1] = o(e, n, s, h, u)), Math.sqrt(m)
    }

    function l(t, e, i, o) {
        var n = 1 - o;
        return n * (n * t + 2 * o * e) + o * o * i
    }

    function d(t, e, i, o) {
        return 2 * ((1 - o) * (e - t) + o * (i - e))
    }

    function c(t, o, n, r, s) {
        var a = t - 2 * o + n, h = 2 * (o - t), l = t - r, d = 0;
        if (e(a)) {
            if (i(h)) {
                var c = -l / h;
                c >= 0 && 1 >= c && (s[d++] = c)
            }
        } else {
            var u = h * h - 4 * a * l;
            if (e(u)) {
                var c = -h / (2 * a);
                c >= 0 && 1 >= c && (s[d++] = c)
            } else if (u > 0) {
                var p = Math.sqrt(u), c = (-h + p) / (2 * a), f = (-h - p) / (2 * a);
                c >= 0 && 1 >= c && (s[d++] = c), f >= 0 && 1 >= f && (s[d++] = f)
            }
        }
        return d
    }

    function u(t, e, i) {
        var o = t + i - 2 * e;
        return 0 === o ? .5 : (t - e) / o
    }

    function p(t, e, i, o, n, r, s, a, h) {
        var d, c = .005, u = 1 / 0;
        y[0] = s, y[1] = a;
        for (var p = 0; 1 > p; p += .05) {
            v[0] = l(t, i, n, p), v[1] = l(e, o, r, p);
            var m = f.distSquare(y, v);
            u > m && (d = p, u = m)
        }
        u = 1 / 0;
        for (var _ = 0; 32 > _ && !(g > c); _++) {
            var b = d - c, T = d + c;
            v[0] = l(t, i, n, b), v[1] = l(e, o, r, b);
            var m = f.distSquare(v, y);
            if (b >= 0 && u > m)d = b, u = m; else {
                x[0] = l(t, i, n, T), x[1] = l(e, o, r, T);
                var S = f.distSquare(x, y);
                1 >= T && u > S ? (d = T, u = S) : c *= .5
            }
        }
        return h && (h[0] = l(t, i, n, d), h[1] = l(e, o, r, d)), Math.sqrt(u)
    }

    var f = t("./vector"), g = 1e-4, m = Math.sqrt(3), _ = 1 / 3, y = f.create(), v = f.create(), x = f.create();
    return {
        cubicAt: o,
        cubicDerivativeAt: n,
        cubicRootAt: r,
        cubicExtrema: s,
        cubicSubdivide: a,
        cubicProjectPoint: h,
        quadraticAt: l,
        quadraticDerivativeAt: d,
        quadraticRootAt: c,
        quadraticExtremum: u,
        quadraticProjectPoint: p
    }
}), define("zrender/Group", ["require", "./tool/guid", "./tool/util", "./mixin/Transformable", "./mixin/Eventful"], function (t) {
    var e = t("./tool/guid"), i = t("./tool/util"), o = t("./mixin/Transformable"), n = t("./mixin/Eventful"), r = function (t) {
        t = t || {}, this.id = t.id || e();
        for (var i in t)this[i] = t[i];
        this.type = "group", this.clipShape = null, this._children = [], this._storage = null, this.__dirty = !0, o.call(this), n.call(this)
    };
    return r.prototype.ignore = !1, r.prototype.children = function () {
        return this._children.slice()
    }, r.prototype.childAt = function (t) {
        return this._children[t]
    }, r.prototype.addChild = function (t) {
        t != this && t.parent != this && (t.parent && t.parent.removeChild(t), this._children.push(t), t.parent = this, this._storage && this._storage !== t._storage && (this._storage.addToMap(t), t instanceof r && t.addChildrenToStorage(this._storage)))
    }, r.prototype.removeChild = function (t) {
        var e = i.indexOf(this._children, t);
        this._children.splice(e, 1), t.parent = null, this._storage && (this._storage.delFromMap(t.id), t instanceof r && t.delChildrenFromStorage(this._storage))
    }, r.prototype.eachChild = function (t, e) {
        for (var i = !!e, o = 0; o < this._children.length; o++) {
            var n = this._children[o];
            i ? t.call(e, n) : t(n)
        }
    }, r.prototype.traverse = function (t, e) {
        for (var i = !!e, o = 0; o < this._children.length; o++) {
            var n = this._children[o];
            i ? t.call(e, n) : t(n), "group" === n.type && n.traverse(t, e)
        }
    }, r.prototype.addChildrenToStorage = function (t) {
        for (var e = 0; e < this._children.length; e++) {
            var i = this._children[e];
            t.addToMap(i), "group" === i.type && i.addChildrenToStorage(t)
        }
    }, r.prototype.delChildrenFromStorage = function (t) {
        for (var e = 0; e < this._children.length; e++) {
            var i = this._children[e];
            t.delFromMap(i.id), "group" === i.type && i.delChildrenFromStorage(t)
        }
    }, r.prototype.modSelf = function () {
        this.__dirty = !0
    }, i.merge(r.prototype, o.prototype, !0), i.merge(r.prototype, n.prototype, !0), r
}), define("zrender/animation/Clip", ["require", "./easing"], function (t) {
    function e(t) {
        this._targetPool = t.target || {}, this._targetPool instanceof Array || (this._targetPool = [this._targetPool]), this._life = t.life || 1e3, this._delay = t.delay || 0, this._startTime = (new Date).getTime() + this._delay, this._endTime = this._startTime + 1e3 * this._life, this.loop = "undefined" == typeof t.loop ? !1 : t.loop, this.gap = t.gap || 0, this.easing = t.easing || "Linear", this.onframe = t.onframe, this.ondestroy = t.ondestroy, this.onrestart = t.onrestart
    }

    var i = t("./easing");
    return e.prototype = {
        step: function (t) {
            var e = (t - this._startTime) / this._life;
            if (!(0 > e)) {
                e = Math.min(e, 1);
                var o = "string" == typeof this.easing ? i[this.easing] : this.easing, n = "function" == typeof o ? o(e) : e;
                return this.fire("frame", n), 1 == e ? this.loop ? (this.restart(), "restart") : (this._needsRemove = !0, "destroy") : null
            }
        }, restart: function () {
            var t = (new Date).getTime(), e = (t - this._startTime) % this._life;
            this._startTime = (new Date).getTime() - e + this.gap, this._needsRemove = !1
        }, fire: function (t, e) {
            for (var i = 0, o = this._targetPool.length; o > i; i++)this["on" + t] && this["on" + t](this._targetPool[i], e)
        }, constructor: e
    }, e
}), define("zrender/animation/easing", [], function () {
    var t = {
        Linear: function (t) {
            return t
        }, QuadraticIn: function (t) {
            return t * t
        }, QuadraticOut: function (t) {
            return t * (2 - t)
        }, QuadraticInOut: function (t) {
            return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
        }, CubicIn: function (t) {
            return t * t * t
        }, CubicOut: function (t) {
            return --t * t * t + 1
        }, CubicInOut: function (t) {
            return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
        }, QuarticIn: function (t) {
            return t * t * t * t
        }, QuarticOut: function (t) {
            return 1 - --t * t * t * t
        }, QuarticInOut: function (t) {
            return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
        }, QuinticIn: function (t) {
            return t * t * t * t * t
        }, QuinticOut: function (t) {
            return --t * t * t * t * t + 1
        }, QuinticInOut: function (t) {
            return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
        }, SinusoidalIn: function (t) {
            return 1 - Math.cos(t * Math.PI / 2)
        }, SinusoidalOut: function (t) {
            return Math.sin(t * Math.PI / 2)
        }, SinusoidalInOut: function (t) {
            return .5 * (1 - Math.cos(Math.PI * t))
        }, ExponentialIn: function (t) {
            return 0 === t ? 0 : Math.pow(1024, t - 1)
        }, ExponentialOut: function (t) {
            return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
        }, ExponentialInOut: function (t) {
            return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (-Math.pow(2, -10 * (t - 1)) + 2)
        }, CircularIn: function (t) {
            return 1 - Math.sqrt(1 - t * t)
        }, CircularOut: function (t) {
            return Math.sqrt(1 - --t * t)
        }, CircularInOut: function (t) {
            return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
        }, ElasticIn: function (t) {
            var e, i = .1, o = .4;
            return 0 === t ? 0 : 1 === t ? 1 : (!i || 1 > i ? (i = 1, e = o / 4) : e = o * Math.asin(1 / i) / (2 * Math.PI), -(i * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / o)))
        }, ElasticOut: function (t) {
            var e, i = .1, o = .4;
            return 0 === t ? 0 : 1 === t ? 1 : (!i || 1 > i ? (i = 1, e = o / 4) : e = o * Math.asin(1 / i) / (2 * Math.PI), i * Math.pow(2, -10 * t) * Math.sin(2 * (t - e) * Math.PI / o) + 1)
        }, ElasticInOut: function (t) {
            var e, i = .1, o = .4;
            return 0 === t ? 0 : 1 === t ? 1 : (!i || 1 > i ? (i = 1, e = o / 4) : e = o * Math.asin(1 / i) / (2 * Math.PI), (t *= 2) < 1 ? -.5 * i * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / o) : i * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / o) * .5 + 1)
        }, BackIn: function (t) {
            var e = 1.70158;
            return t * t * ((e + 1) * t - e)
        }, BackOut: function (t) {
            var e = 1.70158;
            return --t * t * ((e + 1) * t + e) + 1
        }, BackInOut: function (t) {
            var e = 2.5949095;
            return (t *= 2) < 1 ? .5 * t * t * ((e + 1) * t - e) : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2)
        }, BounceIn: function (e) {
            return 1 - t.BounceOut(1 - e)
        }, BounceOut: function (t) {
            return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
        }, BounceInOut: function (e) {
            return .5 > e ? .5 * t.BounceIn(2 * e) : .5 * t.BounceOut(2 * e - 1) + .5
        }
    };
    return t
}), define("echarts/component/base", ["require", "../config", "../util/ecData", "../util/ecQuery", "../util/number", "zrender/tool/util", "zrender/tool/env"], function (t) {
    function e(t, e, n, r, s) {
        this.ecTheme = t, this.messageCenter = e, this.zr = n, this.option = r, this.series = r.series, this.myChart = s, this.component = s.component, this._zlevelBase = this.getZlevelBase(), this.shapeList = [], this.effectList = [];
        var a = this;
        a._onlegendhoverlink = function (t) {
            if (a.legendHoverLink)for (var e, n = t.target, r = a.shapeList.length - 1; r >= 0; r--)e = a.type == i.CHART_TYPE_PIE || a.type == i.CHART_TYPE_FUNNEL ? o.get(a.shapeList[r], "name") : (o.get(a.shapeList[r], "series") || {}).name, e != n || a.shapeList[r].invisible || a.zr.addHoverShape(a.shapeList[r])
        }, e && e.bind(i.EVENT.LEGEND_HOVERLINK, this._onlegendhoverlink)
    }

    var i = t("../config"), o = t("../util/ecData"), n = t("../util/ecQuery"), r = t("../util/number"), s = t("zrender/tool/util");
    return e.prototype = {
        canvasSupported: t("zrender/tool/env").canvasSupported,
        getZlevelBase: function (t) {
            switch (t = t || this.type + "") {
                case i.COMPONENT_TYPE_GRID:
                case i.COMPONENT_TYPE_AXIS_CATEGORY:
                case i.COMPONENT_TYPE_AXIS_VALUE:
                case i.COMPONENT_TYPE_POLAR:
                    return 0;
                case i.CHART_TYPE_LINE:
                case i.CHART_TYPE_BAR:
                case i.CHART_TYPE_SCATTER:
                case i.CHART_TYPE_PIE:
                case i.CHART_TYPE_RADAR:
                case i.CHART_TYPE_MAP:
                case i.CHART_TYPE_K:
                case i.CHART_TYPE_CHORD:
                case i.CHART_TYPE_GUAGE:
                case i.CHART_TYPE_FUNNEL:
                case i.CHART_TYPE_EVENTRIVER:
                    return 2;
                case i.COMPONENT_TYPE_LEGEND:
                case i.COMPONENT_TYPE_DATARANGE:
                case i.COMPONENT_TYPE_DATAZOOM:
                case i.COMPONENT_TYPE_TIMELINE:
                case i.COMPONENT_TYPE_ROAMCONTROLLER:
                    return 4;
                case i.CHART_TYPE_ISLAND:
                    return 5;
                case i.COMPONENT_TYPE_TOOLBOX:
                case i.COMPONENT_TYPE_TITLE:
                    return 6;
                case i.COMPONENT_TYPE_TOOLTIP:
                    return 8;
                default:
                    return 0
            }
        },
        reformOption: function (t) {
            return s.merge(t || {}, s.clone(this.ecTheme[this.type] || {}))
        },
        reformCssArray: function (t) {
            if (!(t instanceof Array))return [t, t, t, t];
            switch (t.length + "") {
                case"4":
                    return t;
                case"3":
                    return [t[0], t[1], t[2], t[1]];
                case"2":
                    return [t[0], t[1], t[0], t[1]];
                case"1":
                    return [t[0], t[0], t[0], t[0]];
                case"0":
                    return [0, 0, 0, 0]
            }
        },
        getShapeById: function (t) {
            for (var e = 0, i = this.shapeList.length; i > e; e++)if (this.shapeList[e].id === t)return this.shapeList[e];
            return null
        },
        getFont: function (t) {
            var e = s.merge(s.clone(t) || {}, this.ecTheme.textStyle);
            return e.fontStyle + " " + e.fontWeight + " " + e.fontSize + "px " + e.fontFamily
        },
        getItemStyleColor: function (t, e, i, o) {
            return "function" == typeof t ? t.call(this.myChart, {
                seriesIndex: e,
                series: this.series[e],
                dataIndex: i,
                data: o
            }) : t
        },
        subPixelOptimize: function (t, e) {
            return t = e % 2 === 1 ? Math.floor(t) + .5 : Math.round(t)
        },
        resize: function () {
            this.refresh && this.refresh(), this.clearEffectShape && this.clearEffectShape(!0);
            var t = this;
            setTimeout(function () {
                t.animationEffect && t.animationEffect()
            }, 200)
        },
        clear: function () {
            this.clearEffectShape && this.clearEffectShape(), this.zr && this.zr.delShape(this.shapeList), this.shapeList = []
        },
        dispose: function () {
            this.onbeforDispose && this.onbeforDispose(), this.clear(), this.shapeList = null, this.effectList = null, this.messageCenter && this.messageCenter.unbind(i.EVENT.LEGEND_HOVERLINK, this._onlegendhoverlink), this.onafterDispose && this.onafterDispose()
        },
        query: n.query,
        deepQuery: n.deepQuery,
        deepMerge: n.deepMerge,
        parsePercent: r.parsePercent,
        parseCenter: r.parseCenter,
        parseRadius: r.parseRadius,
        numAddCommas: r.addCommas
    }, e
}), define("echarts/chart/base", ["require", "zrender/shape/Image", "../util/shape/Icon", "../util/shape/MarkLine", "../util/shape/Symbol", "../config", "../util/ecData", "../util/ecAnimation", "../util/ecEffect", "../util/accMath", "zrender/tool/util", "zrender/tool/area"], function (t) {
    function e() {
        var t = this;
        this.selectedMap = {}, this.lastShapeList = [], this.shapeHandler = {
            onclick: function () {
                t.isClick = !0
            }, ondragover: function (e) {
                var i = e.target;
                i.highlightStyle = i.highlightStyle || {};
                var o = i.highlightStyle, n = o.brushTyep, r = o.strokeColor, s = o.lineWidth;
                o.brushType = "stroke", o.strokeColor = t.ecTheme.calculableColor, o.lineWidth = "icon" === i.type ? 30 : 10, t.zr.addHoverShape(i), setTimeout(function () {
                    i.highlightStyle && (i.highlightStyle.brushType = n, i.highlightStyle.strokeColor = r, i.highlightStyle.lineWidth = s)
                }, 20)
            }, ondrop: function (e) {
                null != a.get(e.dragged, "data") && (t.isDrop = !0)
            }, ondragend: function () {
                t.isDragend = !0
            }
        }
    }

    var i = t("zrender/shape/Image"), o = t("../util/shape/Icon"), n = t("../util/shape/MarkLine"), r = t("../util/shape/Symbol"), s = t("../config"), a = t("../util/ecData"), h = t("../util/ecAnimation"), l = t("../util/ecEffect"), d = t("../util/accMath"), c = t("zrender/tool/util"), u = t("zrender/tool/area");
    return e.prototype = {
        setCalculable: function (t) {
            return t.dragEnableTime = this.ecTheme.DRAG_ENABLE_TIME, t.ondragover = this.shapeHandler.ondragover, t.ondragend = this.shapeHandler.ondragend, t.ondrop = this.shapeHandler.ondrop, t
        }, ondrop: function (t, e) {
            if (this.isDrop && t.target && !e.dragIn) {
                var i, o = t.target, n = t.dragged, r = a.get(o, "seriesIndex"), h = a.get(o, "dataIndex"), l = this.series, c = this.component.legend;
                if (-1 === h) {
                    if (a.get(n, "seriesIndex") == r)return e.dragOut = e.dragIn = e.needRefresh = !0, void(this.isDrop = !1);
                    i = {
                        value: a.get(n, "value"),
                        name: a.get(n, "name")
                    }, this.type === s.CHART_TYPE_PIE && i.value < 0 && (i.value = 0);
                    for (var u = !1, p = l[r].data, f = 0, g = p.length; g > f; f++)p[f].name === i.name && "-" === p[f].value && (l[r].data[f].value = i.value, u = !0);
                    !u && l[r].data.push(i), c && c.add(i.name, n.style.color || n.style.strokeColor)
                } else i = this.option.series[r].data[h] || "-", null != i.value ? (this.option.series[r].data[h].value = "-" != i.value ? d.accAdd(this.option.series[r].data[h].value, a.get(n, "value")) : a.get(n, "value"), (this.type === s.CHART_TYPE_FUNNEL || this.type === s.CHART_TYPE_PIE) && (c && 1 === c.getRelatedAmount(i.name) && this.component.legend.del(i.name), i.name += this.option.nameConnector + a.get(n, "name"), c && c.add(i.name, n.style.color || n.style.strokeColor))) : this.option.series[r].data[h] = "-" != i ? d.accAdd(this.option.series[r].data[h], a.get(n, "value")) : a.get(n, "value");
                e.dragIn = e.dragIn || !0, this.isDrop = !1;
                var m = this;
                setTimeout(function () {
                    m.zr.trigger("mousemove", t.event)
                }, 300)
            }
        }, ondragend: function (t, e) {
            if (this.isDragend && t.target && !e.dragOut) {
                var i = t.target, o = a.get(i, "seriesIndex"), n = a.get(i, "dataIndex"), r = this.series;
                if (null != r[o].data[n].value) {
                    r[o].data[n].value = "-";
                    var s = r[o].data[n].name;
                    this.component.legend && 0 === this.component.legend.getRelatedAmount(s) && this.component.legend.del(s)
                } else r[o].data[n] = "-";
                e.dragOut = !0, e.needRefresh = !0, this.isDragend = !1
            }
        }, onlegendSelected: function (t, e) {
            var i = t.selected;
            for (var o in this.selectedMap)this.selectedMap[o] != i[o] && (e.needRefresh = !0), this.selectedMap[o] = i[o]
        }, _bulidPosition: function () {
            this._symbol = this.option.symbolList, this._sIndex2ShapeMap = {}, this._sIndex2ColorMap = {}, this.selectedMap = {}, this.xMarkMap = {};
            for (var t, e, i, o, n = this.series, r = {
                top: [],
                bottom: [],
                left: [],
                right: [],
                other: []
            }, a = 0, h = n.length; h > a; a++)n[a].type === this.type && (n[a] = this.reformOption(n[a]), this.legendHoverLink = n[a].legendHoverLink || this.legendHoverLink, t = n[a].xAxisIndex, e = n[a].yAxisIndex, i = this.component.xAxis.getAxis(t), o = this.component.yAxis.getAxis(e), i.type === s.COMPONENT_TYPE_AXIS_CATEGORY ? r[i.getPosition()].push(a) : o.type === s.COMPONENT_TYPE_AXIS_CATEGORY ? r[o.getPosition()].push(a) : r.other.push(a));
            for (var l in r)r[l].length > 0 && this._buildSinglePosition(l, r[l]);
            this.addShapeList()
        }, _buildSinglePosition: function (t, e) {
            var i = this._mapData(e), o = i.locationMap, n = i.maxDataLength;
            if (0 !== n && 0 !== o.length) {
                switch (t) {
                    case"bottom":
                    case"top":
                        this._buildHorizontal(e, n, o, this.xMarkMap);
                        break;
                    case"left":
                    case"right":
                        this._buildVertical(e, n, o, this.xMarkMap);
                        break;
                    case"other":
                        this._buildOther(e, n, o, this.xMarkMap)
                }
                for (var r = 0, s = e.length; s > r; r++)this.buildMark(e[r])
            }
        }, _mapData: function (t) {
            for (var e, i, o, n, r = this.series, a = 0, h = {}, l = "__kener__stack__", d = this.component.legend, c = [], u = 0, p = 0, f = t.length; f > p; p++)e = r[t[p]], o = e.name, this._sIndex2ShapeMap[t[p]] = this._sIndex2ShapeMap[t[p]] || this.query(e, "symbol") || this._symbol[p % this._symbol.length], d ? (this.selectedMap[o] = d.isSelected(o), this._sIndex2ColorMap[t[p]] = d.getColor(o), n = d.getItemShape(o), n && (this.type == s.CHART_TYPE_LINE ? (n.style.iconType = "legendLineIcon", n.style.symbol = this._sIndex2ShapeMap[t[p]]) : e.itemStyle.normal.barBorderWidth > 0 && (n.style.x += 1, n.style.y += 1, n.style.width -= 2, n.style.height -= 2, n.style.strokeColor = n.highlightStyle.strokeColor = e.itemStyle.normal.barBorderColor, n.highlightStyle.lineWidth = 3, n.style.brushType = "both"), d.setItemShape(o, n))) : (this.selectedMap[o] = !0, this._sIndex2ColorMap[t[p]] = this.zr.getColor(t[p])), this.selectedMap[o] && (i = e.stack || l + t[p], null == h[i] ? (h[i] = a, c[a] = [t[p]], a++) : c[h[i]].push(t[p])), u = Math.max(u, e.data.length);
            return {locationMap: c, maxDataLength: u}
        }, _calculMarkMapXY: function (t, e, i) {
            for (var o = this.series, n = 0, r = e.length; r > n; n++)for (var s = 0, a = e[n].length; a > s; s++) {
                var h = e[n][s], l = "xy" == i ? 0 : "";
                if ("-1" != i.indexOf("x")) {
                    t[h]["counter" + l] > 0 && (t[h]["average" + l] = (t[h]["sum" + l] / t[h]["counter" + l]).toFixed(2) - 0);
                    var d = this.component.xAxis.getAxis(o[h].xAxisIndex || 0).getCoord(t[h]["average" + l]);
                    t[h]["averageLine" + l] = [[d, this.component.grid.getYend()], [d, this.component.grid.getY()]], t[h]["minLine" + l] = [[t[h]["minX" + l], this.component.grid.getYend()], [t[h]["minX" + l], this.component.grid.getY()]], t[h]["maxLine" + l] = [[t[h]["maxX" + l], this.component.grid.getYend()], [t[h]["maxX" + l], this.component.grid.getY()]], t[h].isHorizontal = !1
                }
                if (l = "xy" == i ? 1 : "", "-1" != i.indexOf("y")) {
                    t[h]["counter" + l] > 0 && (t[h]["average" + l] = (t[h]["sum" + l] / t[h]["counter" + l]).toFixed(2) - 0);
                    var c = this.component.yAxis.getAxis(o[h].yAxisIndex || 0).getCoord(t[h]["average" + l]);
                    t[h]["averageLine" + l] = [[this.component.grid.getX(), c], [this.component.grid.getXend(), c]], t[h]["minLine" + l] = [[this.component.grid.getX(), t[h]["minY" + l]], [this.component.grid.getXend(), t[h]["minY" + l]]], t[h]["maxLine" + l] = [[this.component.grid.getX(), t[h]["maxY" + l]], [this.component.grid.getXend(), t[h]["maxY" + l]]], t[h].isHorizontal = !0
                }
            }
        }, addLabel: function (t, e, i, o, n) {
            var r = [i, e], s = this.deepMerge(r, "itemStyle.normal.label"), a = this.deepMerge(r, "itemStyle.emphasis.label"), h = s.textStyle || {}, l = a.textStyle || {};
            return s.show && (t.style.text = this._getLabelText(e, i, o, "normal"), t.style.textPosition = null == s.position ? "horizontal" === n ? "right" : "top" : s.position, t.style.textColor = h.color, t.style.textFont = this.getFont(h)), a.show && (t.highlightStyle.text = this._getLabelText(e, i, o, "emphasis"), t.highlightStyle.textPosition = s.show ? t.style.textPosition : null == a.position ? "horizontal" === n ? "right" : "top" : a.position, t.highlightStyle.textColor = l.color, t.highlightStyle.textFont = this.getFont(l)), t
        }, _getLabelText: function (t, e, i, o) {
            var n = this.deepQuery([e, t], "itemStyle." + o + ".label.formatter");
            n || "emphasis" !== o || (n = this.deepQuery([e, t], "itemStyle.normal.label.formatter"));
            var r = null != e ? null != e.value ? e.value : e : "-";
            return n ? "function" == typeof n ? n.call(this.myChart, t.name, i, r) : "string" == typeof n ? (n = n.replace("{a}", "{a0}").replace("{b}", "{b0}").replace("{c}", "{c0}"), n = n.replace("{a0}", t.name).replace("{b0}", i).replace("{c0}", this.numAddCommas(r))) : void 0 : this.numAddCommas(r)
        }, buildMark: function (t) {
            var e = this.series[t];
            this.selectedMap[e.name] && (e.markPoint && this._buildMarkPoint(t), e.markLine && this._buildMarkLine(t))
        }, _buildMarkPoint: function (t) {
            for (var e, i, o = (this.markAttachStyle || {})[t], n = this.series[t], r = this.getZlevelBase(), a = c.clone(n.markPoint), h = 0, l = a.data.length; l > h; h++)e = a.data[h], i = this.getMarkCoord(t, e), a.data[h].x = null != e.x ? e.x : i[0], a.data[h].y = null != e.y ? e.y : i[1], !e.type || "max" !== e.type && "min" !== e.type || (a.data[h].value = i[3], a.data[h].name = e.name || e.type, a.data[h].symbolSize = a.data[h].symbolSize || u.getTextWidth(i[3], this.getFont()) / 2 + 5);
            for (var d = this._markPoint(t, a), h = 0, l = d.length; l > h; h++) {
                d[h].zlevel = r + 1;
                for (var p in o)d[h][p] = c.clone(o[p]);
                this.shapeList.push(d[h])
            }
            if (this.type === s.CHART_TYPE_FORCE || this.type === s.CHART_TYPE_CHORD)for (var h = 0, l = d.length; l > h; h++)this.zr.addShape(d[h])
        }, _buildMarkLine: function (t) {
            for (var e, i, o = (this.markAttachStyle || {})[t], n = this.series[t], r = this.getZlevelBase(), a = c.clone(n.markLine), h = 0, l = a.data.length; l > h; h++)e = a.data[h], !e.type || "max" !== e.type && "min" !== e.type && "average" !== e.type ? i = [this.getMarkCoord(t, e[0]), this.getMarkCoord(t, e[1])] : (i = this.getMarkCoord(t, e), a.data[h] = [c.clone(e), {}], a.data[h][0].name = e.name || e.type, a.data[h][0].value = i[3], i = i[2], e = [{}, {}]), null != i && null != i[0] && null != i[1] && (a.data[h][0].x = null != e[0].x ? e[0].x : i[0][0], a.data[h][0].y = null != e[0].y ? e[0].y : i[0][1], a.data[h][1].x = null != e[1].x ? e[1].x : i[1][0], a.data[h][1].y = null != e[1].y ? e[1].y : i[1][1]);
            for (var d = this._markLine(t, a), h = 0, l = d.length; l > h; h++) {
                d[h].zlevel = r + 1;
                for (var u in o)d[h][u] = c.clone(o[u]);
                this.shapeList.push(d[h])
            }
            if (this.type === s.CHART_TYPE_FORCE || this.type === s.CHART_TYPE_CHORD)for (var h = 0, l = d.length; l > h; h++)this.zr.addShape(d[h])
        }, _markPoint: function (t, e) {
            var i = this.series[t], o = this.component;
            c.merge(e, this.ecTheme.markPoint), e.name = i.name;
            var n, r, h, l, d, u, p, f = [], g = e.data, m = o.dataRange, _ = o.legend, y = this.zr.getWidth(), v = this.zr.getHeight();
            if (e.large)n = this.getLargeMarkPoingShape(t, e), n._mark = "largePoint", n && f.push(n); else for (var x = 0, b = g.length; b > x; x++)null != g[x].x && null != g[x].y && (h = null != g[x] && null != g[x].value ? g[x].value : "", _ && (r = _.getColor(i.name)), m && (r = isNaN(h) ? r : m.getColor(h), l = [g[x], e], d = this.deepQuery(l, "itemStyle.normal.color") || r, u = this.deepQuery(l, "itemStyle.emphasis.color") || d, null == d && null == u) || (r = null == r ? this.zr.getColor(t) : r, g[x].tooltip = g[x].tooltip || e.tooltip || {trigger: "item"}, g[x].name = null != g[x].name ? g[x].name : "", g[x].value = h, n = this.getSymbolShape(e, t, g[x], x, g[x].name, this.parsePercent(g[x].x, y), this.parsePercent(g[x].y, v), "pin", r, "rgba(0,0,0,0)", "horizontal"), n._mark = "point", p = this.deepMerge([g[x], e], "effect"), p.show && (n.effect = p), i.type === s.CHART_TYPE_MAP && (n._geo = this.getMarkGeo(g[x])), a.pack(n, i, t, g[x], x, g[x].name, h), f.push(n)));
            return f
        }, _markLine: function (t, e) {
            var i = this.series[t], o = this.component;
            c.merge(e, this.ecTheme.markLine), e.symbol = e.symbol instanceof Array ? e.symbol.length > 1 ? e.symbol : [e.symbol[0], e.symbol[0]] : [e.symbol, e.symbol], e.symbolSize = e.symbolSize instanceof Array ? e.symbolSize.length > 1 ? e.symbolSize : [e.symbolSize[0], e.symbolSize[0]] : [e.symbolSize, e.symbolSize], e.symbolRotate = e.symbolRotate instanceof Array ? e.symbolRotate.length > 1 ? e.symbolRotate : [e.symbolRotate[0], e.symbolRotate[0]] : [e.symbolRotate, e.symbolRotate], e.name = i.name;
            for (var n, r, h, l, d, u, p, f, g = [], m = e.data, _ = o.dataRange, y = o.legend, v = this.zr.getWidth(), x = this.zr.getHeight(), b = 0, T = m.length; T > b; b++)null != m[b][0].x && null != m[b][0].y && null != m[b][1].x && null != m[b][1].y && (r = y ? y.getColor(i.name) : this.zr.getColor(t), f = this.deepMerge(m[b]), h = null != f && null != f.value ? f.value : "", _ && (r = isNaN(h) ? r : _.getColor(h), l = [f, e], d = this.deepQuery(l, "itemStyle.normal.color") || r, u = this.deepQuery(l, "itemStyle.emphasis.color") || d, null == d && null == u) || (m[b][0].tooltip = f.tooltip || {trigger: "item"}, m[b][0].name = null != m[b][0].name ? m[b][0].name : "", m[b][1].name = null != m[b][1].name ? m[b][1].name : "", m[b][0].value = null != m[b][0].value ? m[b][0].value : "", n = this.getLineMarkShape(e, t, m[b], b, this.parsePercent(m[b][0].x, v), this.parsePercent(m[b][0].y, x), this.parsePercent(m[b][1].x, v), this.parsePercent(m[b][1].y, x), r), n._mark = "line", p = this.deepMerge([f, e], "effect"), p.show && (n.effect = p), i.type === s.CHART_TYPE_MAP && (n._geo = [this.getMarkGeo(m[b][0]), this.getMarkGeo(m[b][1])]), a.pack(n, i, t, m[b][0], b, m[b][0].name + ("" !== m[b][1].name ? " > " + m[b][1].name : ""), h), g.push(n)));
            return g
        }, getMarkCoord: function () {
            return [0, 0]
        }, getSymbolShape: function (t, e, n, r, s, h, l, d, c, u, p) {
            var f = [n, t], g = null != n ? null != n.value ? n.value : n : "-";
            d = this.deepQuery(f, "symbol") || d;
            var m = this.deepQuery(f, "symbolSize");
            m = "function" == typeof m ? m(g) : m;
            var _ = this.deepQuery(f, "symbolRotate"), y = this.deepMerge(f, "itemStyle.normal"), v = this.deepMerge(f, "itemStyle.emphasis"), x = null != y.borderWidth ? y.borderWidth : y.lineStyle && y.lineStyle.width;
            null == x && (x = d.match("empty") ? 2 : 0);
            var b = null != v.borderWidth ? v.borderWidth : v.lineStyle && v.lineStyle.width;
            null == b && (b = x + 2);
            var T = new o({
                style: {
                    iconType: d.replace("empty", "").toLowerCase(),
                    x: h - m,
                    y: l - m,
                    width: 2 * m,
                    height: 2 * m,
                    brushType: "both",
                    color: d.match("empty") ? u : this.getItemStyleColor(y.color, e, r, n) || c,
                    strokeColor: y.borderColor || this.getItemStyleColor(y.color, e, r, n) || c,
                    lineWidth: x
                },
                highlightStyle: {
                    color: d.match("empty") ? u : this.getItemStyleColor(v.color, e, r, n),
                    strokeColor: v.borderColor || y.borderColor || this.getItemStyleColor(y.color, e, r, n) || c,
                    lineWidth: b
                },
                clickable: this.deepQuery(f, "clickable")
            });
            return d.match("image") && (T.style.image = d.replace(new RegExp("^image:\\/\\/"), ""), T = new i({
                style: T.style,
                highlightStyle: T.highlightStyle,
                clickable: this.deepQuery(f, "clickable")
            })), null != _ && (T.rotation = [_ * Math.PI / 180, h, l]), d.match("star") && (T.style.iconType = "star", T.style.n = d.replace("empty", "").replace("star", "") - 0 || 5), "none" === d && (T.invisible = !0, T.hoverable = !1), T = this.addLabel(T, t, n, s, p), d.match("empty") && (null == T.style.textColor && (T.style.textColor = T.style.strokeColor), null == T.highlightStyle.textColor && (T.highlightStyle.textColor = T.highlightStyle.strokeColor)), a.pack(T, t, e, n, r, s), T._x = h, T._y = l, T._dataIndex = r, T._seriesIndex = e, T
        }, getLineMarkShape: function (t, e, i, o, r, s, a, h, l) {
            var d = null != i[0] ? null != i[0].value ? i[0].value : i[0] : "-", c = null != i[1] ? null != i[1].value ? i[1].value : i[1] : "-", u = [this.query(i[0], "symbol") || t.symbol[0], this.query(i[1], "symbol") || t.symbol[1]], p = [this.query(i[0], "symbolSize") || t.symbolSize[0], this.query(i[1], "symbolSize") || t.symbolSize[1]];
            p[0] = "function" == typeof p[0] ? p[0](d) : p[0], p[1] = "function" == typeof p[1] ? p[1](c) : p[1];
            var f = [this.query(i[0], "symbolRotate") || t.symbolRotate[0], this.query(i[1], "symbolRotate") || t.symbolRotate[1]], g = [i[0], t], m = this.deepMerge(g, "itemStyle.normal");
            m.color = this.getItemStyleColor(m.color, e, o, i);
            var _ = this.deepMerge(g, "itemStyle.emphasis");
            _.color = this.getItemStyleColor(_.color, e, o, i);
            var y = m.lineStyle, v = _.lineStyle, x = y.width;
            null == x && (x = m.borderWidth);
            var b = v.width;
            null == b && (b = null != _.borderWidth ? _.borderWidth : x + 2);
            var T = new n({
                style: {
                    smooth: t.smooth ? "spline" : !1,
                    symbol: u,
                    symbolSize: p,
                    symbolRotate: f,
                    xStart: r,
                    yStart: s,
                    xEnd: a,
                    yEnd: h,
                    brushType: "both",
                    lineType: y.type,
                    shadowColor: y.shadowColor || y.color || m.borderColor || m.color || l,
                    shadowBlur: y.shadowBlur,
                    shadowOffsetX: y.shadowOffsetX,
                    shadowOffsetY: y.shadowOffsetY,
                    color: m.color || l,
                    strokeColor: y.color || m.borderColor || m.color || l,
                    lineWidth: x,
                    symbolBorderColor: m.borderColor || m.color || l,
                    symbolBorder: m.borderWidth
                },
                highlightStyle: {
                    shadowColor: v.shadowColor,
                    shadowBlur: v.shadowBlur,
                    shadowOffsetX: v.shadowOffsetX,
                    shadowOffsetY: v.shadowOffsetY,
                    color: _.color || m.color || l,
                    strokeColor: v.color || y.color || _.borderColor || m.borderColor || _.color || m.color || l,
                    lineWidth: b,
                    symbolBorderColor: _.borderColor || m.borderColor || _.color || m.color || l,
                    symbolBorder: null == _.borderWidth ? m.borderWidth + 2 : _.borderWidth
                },
                clickable: this.deepQuery(g, "clickable")
            });
            return T = this.addLabel(T, t, i[0], i[0].name + " : " + i[1].name), T._x = a, T._y = h, T
        }, getLargeMarkPoingShape: function (t, e) {
            var i, o, n, s, a, h, l = this.series[t], d = this.component, c = e.data, u = d.dataRange, p = d.legend, f = [c[0], e];
            if (p && (o = p.getColor(l.name)), !u || (n = null != c[0] ? null != c[0].value ? c[0].value : c[0] : "-", o = isNaN(n) ? o : u.getColor(n), s = this.deepQuery(f, "itemStyle.normal.color") || o, a = this.deepQuery(f, "itemStyle.emphasis.color") || s, null != s || null != a)) {
                o = this.deepMerge(f, "itemStyle.normal").color || o;
                var g = this.deepQuery(f, "symbol") || "circle";
                g = g.replace("empty", "").replace(/\d/g, ""), h = this.deepMerge([c[0], e], "effect");
                var m = window.devicePixelRatio || 1;
                return i = new r({
                    style: {
                        pointList: c,
                        color: o,
                        strokeColor: o,
                        shadowColor: h.shadowColor || o,
                        shadowBlur: (null != h.shadowBlur ? h.shadowBlur : 8) * m,
                        size: this.deepQuery(f, "symbolSize"),
                        iconType: g,
                        brushType: "fill",
                        lineWidth: 1
                    }, draggable: !1, hoverable: !1
                }), h.show && (i.effect = h), i
            }
        }, backupShapeList: function () {
            this.shapeList && this.shapeList.length > 0 ? (this.lastShapeList = this.shapeList, this.shapeList = []) : this.lastShapeList = []
        }, addShapeList: function () {
            var t, e, i = this.option.animationThreshold / (this.canvasSupported ? 2 : 4), o = this.lastShapeList, n = this.shapeList, r = o.length > 0 ? 500 : this.query(this.option, "animationDuration"), a = this.query(this.option, "animationEasing"), h = {}, l = {};
            if (this.option.animation && !this.option.renderAsImage && n.length < i && !this.motionlessOnce) {
                for (var d = 0, c = o.length; c > d; d++)e = this._getAnimationKey(o[d]), e.match("undefined") ? this.zr.delShape(o[d].id) : (e += o[d].type, h[e] = o[d]);
                for (var d = 0, c = n.length; c > d; d++)e = this._getAnimationKey(n[d]), e.match("undefined") ? this.zr.addShape(n[d]) : (e += n[d].type, l[e] = n[d]);
                for (e in h)l[e] || this.zr.delShape(h[e].id);
                for (e in l)h[e] ? (this.zr.delShape(h[e].id), this._animateMod(h[e], l[e], r, a)) : (t = this.type != s.CHART_TYPE_LINE && this.type != s.CHART_TYPE_RADAR || 0 === e.indexOf("icon") ? 0 : r / 2, this._animateMod(!1, l[e], r, a, t));
                this.zr.refresh(), this.animationEffect()
            } else {
                this.motionlessOnce = !1, this.zr.delShape(o);
                for (var d = 0, c = n.length; c > d; d++)this.zr.addShape(n[d])
            }
        }, _getAnimationKey: function (t) {
            return this.type != s.CHART_TYPE_MAP ? a.get(t, "seriesIndex") + "_" + a.get(t, "dataIndex") + (t._mark ? t._mark : "") + (this.type === s.CHART_TYPE_RADAR ? a.get(t, "special") : "") : a.get(t, "seriesIndex") + "_" + a.get(t, "dataIndex") + (t._mark ? t._mark : "undefined")
        }, _animateMod: function (t, e, i, o, n) {
            switch (e.type) {
                case"broken-line":
                case"half-smooth-polygon":
                    h.pointList(this.zr, t, e, i, o);
                    break;
                case"rectangle":
                    h.rectangle(this.zr, t, e, i, o);
                    break;
                case"icon":
                    h.icon(this.zr, t, e, i, o, n);
                    break;
                case"candle":
                    i > 500 ? h.candle(this.zr, t, e, i, o) : this.zr.addShape(e);
                    break;
                case"ring":
                case"sector":
                case"circle":
                    i > 500 ? h.ring(this.zr, t, e, i + (a.get(e, "dataIndex") || 0) % 20 * 100, o) : "sector" === e.type ? h.sector(this.zr, t, e, i, o) : this.zr.addShape(e);
                    break;
                case"text":
                    h.text(this.zr, t, e, i, o);
                    break;
                case"polygon":
                    i > 500 ? h.polygon(this.zr, t, e, i, o) : h.pointList(this.zr, t, e, i, o);
                    break;
                case"ribbon":
                    h.ribbon(this.zr, t, e, i, o);
                    break;
                case"gauge-pointer":
                    h.gaugePointer(this.zr, t, e, i, o);
                    break;
                case"mark-line":
                    h.markline(this.zr, t, e, i, o);
                    break;
                case"bezier-curve":
                case"line":
                    h.line(this.zr, t, e, i, o);
                    break;
                default:
                    this.zr.addShape(e)
            }
        }, animationMark: function (t, e, i) {
            for (var o = i || this.shapeList, n = 0, r = o.length; r > n; n++)o[n]._mark && this._animateMod(!1, o[n], t, e);
            this.animationEffect(i)
        }, animationEffect: function (t) {
            !t && this.clearEffectShape();
            var e = t || this.shapeList;
            if (null != e) {
                var i = s.EFFECT_ZLEVEL;
                this.canvasSupported && this.zr.modLayer(i, {motionBlur: !0, lastFrameAlpha: .95});
                for (var o, n = 0, r = e.length; r > n; n++)o = e[n], o._mark && o.effect && o.effect.show && l[o._mark] && (l[o._mark](this.zr, this.effectList, o, i), this.effectList[this.effectList.length - 1]._mark = o._mark)
            }
        }, clearEffectShape: function (t) {
            this.zr && this.effectList && this.effectList.length > 0 && (t && this.zr.modLayer(s.EFFECT_ZLEVEL, {motionBlur: !1}), this.zr.delShape(this.effectList)), this.effectList = []
        }, addMark: function (t, e, i) {
            var o = this.series[t];
            if (this.selectedMap[o.name]) {
                var n = 500, r = this.query(this.option, "animationEasing"), s = o[i].data, a = this.shapeList.length;
                if (o[i].data = e.data, this["_build" + i.replace("m", "M")](t), this.option.animation && !this.option.renderAsImage)this.animationMark(n, r, this.shapeList.slice(a)); else {
                    for (var h = a, l = this.shapeList.length; l > h; h++)this.zr.addShape(this.shapeList[h]);
                    this.zr.refresh()
                }
                o[i].data = s
            }
        }, delMark: function (t, e, i) {
            i = i.replace("mark", "").replace("large", "").toLowerCase();
            var o = this.series[t];
            if (this.selectedMap[o.name]) {
                for (var n = !1, r = [this.shapeList, this.effectList], s = 2; s--;)for (var h = 0, l = r[s].length; l > h; h++)if (r[s][h]._mark == i && a.get(r[s][h], "seriesIndex") == t && a.get(r[s][h], "name") == e) {
                    this.zr.delShape(r[s][h].id), r[s].splice(h, 1), n = !0;
                    break
                }
                n && this.zr.refresh()
            }
        }
    }, e
}), define("zrender/shape/Circle", ["require", "./Base", "../tool/util"], function (t) {
    "use strict";
    var e = t("./Base"), i = function (t) {
        e.call(this, t)
    };
    return i.prototype = {
        type: "circle", buildPath: function (t, e) {
            t.arc(e.x, e.y, e.r, 0, 2 * Math.PI, !0)
        }, getRect: function (t) {
            if (t.__rect)return t.__rect;
            var e;
            return e = "stroke" == t.brushType || "fill" == t.brushType ? t.lineWidth || 1 : 0, t.__rect = {
                x: Math.round(t.x - t.r - e / 2),
                y: Math.round(t.y - t.r - e / 2),
                width: 2 * t.r + e,
                height: 2 * t.r + e
            }, t.__rect
        }
    }, t("../tool/util").inherits(i, e), i
}), define("echarts/util/accMath", [], function () {
    function t(t, e) {
        var i = t.toString(), o = e.toString(), n = 0;
        try {
            n = o.split(".")[1].length
        } catch (r) {
        }
        try {
            n -= i.split(".")[1].length
        } catch (r) {
        }
        return (i.replace(".", "") - 0) / (o.replace(".", "") - 0) * Math.pow(10, n)
    }

    function e(t, e) {
        var i = t.toString(), o = e.toString(), n = 0;
        try {
            n += i.split(".")[1].length
        } catch (r) {
        }
        try {
            n += o.split(".")[1].length
        } catch (r) {
        }
        return (i.replace(".", "") - 0) * (o.replace(".", "") - 0) / Math.pow(10, n)
    }

    function i(t, e) {
        var i = 0, o = 0;
        try {
            i = t.toString().split(".")[1].length
        } catch (n) {
        }
        try {
            o = e.toString().split(".")[1].length
        } catch (n) {
        }
        var r = Math.pow(10, Math.max(i, o));
        return (Math.round(t * r) + Math.round(e * r)) / r
    }

    function o(t, e) {
        return i(t, -e)
    }

    return {accDiv: t, accMul: e, accAdd: i, accSub: o}
}), define("echarts/util/ecQuery", ["require", "zrender/tool/util"], function (t) {
    function e(t, e) {
        if ("undefined" != typeof t) {
            if (!e)return t;
            e = e.split(".");
            for (var i = e.length, o = 0; i > o;) {
                if (t = t[e[o]], "undefined" == typeof t)return;
                o++
            }
            return t
        }
    }

    function i(t, i) {
        for (var o, n = 0, r = t.length; r > n; n++)if (o = e(t[n], i), "undefined" != typeof o)return o
    }

    function o(t, i) {
        for (var o, r = t.length; r--;) {
            var s = e(t[r], i);
            "undefined" != typeof s && ("undefined" == typeof o ? o = n.clone(s) : n.merge(o, s, !0))
        }
        return o
    }

    var n = t("zrender/tool/util");
    return {query: e, deepQuery: i, deepMerge: o}
}), define("echarts/util/number", [], function () {
    function t(t) {
        return t.replace(/^\s+/, "").replace(/\s+$/, "")
    }

    function e(e, i) {
        return "string" == typeof e ? t(e).match(/%$/) ? parseFloat(e) / 100 * i : parseFloat(e) : e
    }

    function i(t, i) {
        return [e(i[0], t.getWidth()), e(i[1], t.getHeight())]
    }

    function o(t, i) {
        i instanceof Array || (i = [0, i]);
        var o = Math.min(t.getWidth(), t.getHeight()) / 2;
        return [e(i[0], o), e(i[1], o)]
    }

    function n(t) {
        return isNaN(t) ? "-" : (t = (t + "").split("."), t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : ""))
    }

    return {parsePercent: e, parseCenter: i, parseRadius: o, addCommas: n}
}), define("echarts/util/shape/Icon", ["require", "zrender/tool/util", "zrender/shape/Star", "zrender/shape/Heart", "zrender/shape/Droplet", "zrender/shape/Image", "zrender/shape/Base"], function (t) {
    function e(t, e) {
        var i = e.x, o = e.y, n = e.width / 16, r = e.height / 16;
        t.moveTo(i, o + e.height), t.lineTo(i + 5 * n, o + 14 * r), t.lineTo(i + e.width, o + 3 * r), t.lineTo(i + 13 * n, o), t.lineTo(i + 2 * n, o + 11 * r), t.lineTo(i, o + e.height), t.moveTo(i + 6 * n, o + 10 * r), t.lineTo(i + 14 * n, o + 2 * r), t.moveTo(i + 10 * n, o + 13 * r), t.lineTo(i + e.width, o + 13 * r), t.moveTo(i + 13 * n, o + 10 * r), t.lineTo(i + 13 * n, o + e.height)
    }

    function i(t, e) {
        var i = e.x, o = e.y, n = e.width / 16, r = e.height / 16;
        t.moveTo(i, o + e.height), t.lineTo(i + 5 * n, o + 14 * r), t.lineTo(i + e.width, o + 3 * r), t.lineTo(i + 13 * n, o), t.lineTo(i + 2 * n, o + 11 * r), t.lineTo(i, o + e.height), t.moveTo(i + 6 * n, o + 10 * r), t.lineTo(i + 14 * n, o + 2 * r), t.moveTo(i + 10 * n, o + 13 * r), t.lineTo(i + e.width, o + 13 * r)
    }

    function o(t, e) {
        var i = e.x, o = e.y, n = e.width / 16, r = e.height / 16;
        t.moveTo(i + 4 * n, o + 15 * r), t.lineTo(i + 9 * n, o + 13 * r), t.lineTo(i + 14 * n, o + 8 * r), t.lineTo(i + 11 * n, o + 5 * r), t.lineTo(i + 6 * n, o + 10 * r), t.lineTo(i + 4 * n, o + 15 * r), t.moveTo(i + 5 * n, o), t.lineTo(i + 11 * n, o), t.moveTo(i + 5 * n, o + r), t.lineTo(i + 11 * n, o + r), t.moveTo(i, o + 2 * r), t.lineTo(i + e.width, o + 2 * r), t.moveTo(i, o + 5 * r), t.lineTo(i + 3 * n, o + e.height), t.lineTo(i + 13 * n, o + e.height), t.lineTo(i + e.width, o + 5 * r)
    }

    function n(t, e) {
        var i = e.x, o = e.y, n = e.width / 16, r = e.height / 16;
        t.moveTo(i, o + 3 * r), t.lineTo(i + 6 * n, o + 3 * r), t.moveTo(i + 3 * n, o), t.lineTo(i + 3 * n, o + 6 * r), t.moveTo(i + 3 * n, o + 8 * r), t.lineTo(i + 3 * n, o + e.height), t.lineTo(i + e.width, o + e.height), t.lineTo(i + e.width, o + 3 * r), t.lineTo(i + 8 * n, o + 3 * r)
    }

    function r(t, e) {
        var i = e.x, o = e.y, n = e.width / 16, r = e.height / 16;
        t.moveTo(i + 6 * n, o), t.lineTo(i + 2 * n, o + 3 * r), t.lineTo(i + 6 * n, o + 6 * r), t.moveTo(i + 2 * n, o + 3 * r), t.lineTo(i + 14 * n, o + 3 * r), t.lineTo(i + 14 * n, o + 11 * r), t.moveTo(i + 2 * n, o + 5 * r), t.lineTo(i + 2 * n, o + 13 * r), t.lineTo(i + 14 * n, o + 13 * r), t.moveTo(i + 10 * n, o + 10 * r), t.lineTo(i + 14 * n, o + 13 * r), t.lineTo(i + 10 * n, o + e.height)
    }

    function s(t, e) {
        var i = e.x, o = e.y, n = e.width / 16, r = e.height / 16, s = e.width / 2;
        t.lineWidth = 1.5, t.arc(i + s, o + s, s - n, 0, 2 * Math.PI / 3), t.moveTo(i + 3 * n, o + e.height), t.lineTo(i + 0 * n, o + 12 * r), t.lineTo(i + 5 * n, o + 11 * r), t.moveTo(i, o + 8 * r), t.arc(i + s, o + s, s - n, Math.PI, 5 * Math.PI / 3), t.moveTo(i + 13 * n, o), t.lineTo(i + e.width, o + 4 * r), t.lineTo(i + 11 * n, o + 5 * r)
    }

    function a(t, e) {
        var i = e.x, o = e.y, n = e.width / 16, r = e.height / 16;
        t.moveTo(i, o), t.lineTo(i, o + e.height), t.lineTo(i + e.width, o + e.height), t.moveTo(i + 2 * n, o + 14 * r), t.lineTo(i + 7 * n, o + 6 * r), t.lineTo(i + 11 * n, o + 11 * r), t.lineTo(i + 15 * n, o + 2 * r)
    }

    function h(t, e) {
        var i = e.x, o = e.y, n = e.width / 16, r = e.height / 16;
        t.moveTo(i, o), t.lineTo(i, o + e.height), t.lineTo(i + e.width, o + e.height), t.moveTo(i + 3 * n, o + 14 * r), t.lineTo(i + 3 * n, o + 6 * r), t.lineTo(i + 4 * n, o + 6 * r), t.lineTo(i + 4 * n, o + 14 * r), t.moveTo(i + 7 * n, o + 14 * r), t.lineTo(i + 7 * n, o + 2 * r), t.lineTo(i + 8 * n, o + 2 * r), t.lineTo(i + 8 * n, o + 14 * r), t.moveTo(i + 11 * n, o + 14 * r), t.lineTo(i + 11 * n, o + 9 * r), t.lineTo(i + 12 * n, o + 9 * r), t.lineTo(i + 12 * n, o + 14 * r)
    }

    function l(t, e) {
        var i = e.x, o = e.y, n = e.width - 2, r = e.height - 2, s = Math.min(n, r) / 2;
        o += 2, t.moveTo(i + s + 3, o + s - 3), t.arc(i + s + 3, o + s - 3, s - 1, 0, -Math.PI / 2, !0), t.lineTo(i + s + 3, o + s - 3), t.moveTo(i + s, o), t.lineTo(i + s, o + s), t.arc(i + s, o + s, s, -Math.PI / 2, 2 * Math.PI, !0), t.lineTo(i + s, o + s), t.lineWidth = 1.5
    }

    function d(t, e) {
        var i = e.x, o = e.y, n = e.width / 16, r = e.height / 16;
        o -= r, t.moveTo(i + 1 * n, o + 2 * r), t.lineTo(i + 15 * n, o + 2 * r), t.lineTo(i + 14 * n, o + 3 * r), t.lineTo(i + 2 * n, o + 3 * r), t.moveTo(i + 3 * n, o + 6 * r), t.lineTo(i + 13 * n, o + 6 * r), t.lineTo(i + 12 * n, o + 7 * r), t.lineTo(i + 4 * n, o + 7 * r), t.moveTo(i + 5 * n, o + 10 * r), t.lineTo(i + 11 * n, o + 10 * r), t.lineTo(i + 10 * n, o + 11 * r), t.lineTo(i + 6 * n, o + 11 * r), t.moveTo(i + 7 * n, o + 14 * r), t.lineTo(i + 9 * n, o + 14 * r), t.lineTo(i + 8 * n, o + 15 * r), t.lineTo(i + 7 * n, o + 15 * r)
    }

    function c(t, e) {
        var i = e.x, o = e.y, n = e.width, r = e.height, s = n / 16, a = r / 16, h = 2 * Math.min(s, a);
        t.moveTo(i + s + h, o + a + h), t.arc(i + s, o + a, h, Math.PI / 4, 3 * Math.PI), t.lineTo(i + 7 * s - h, o + 6 * a - h), t.arc(i + 7 * s, o + 6 * a, h, Math.PI / 4 * 5, 4 * Math.PI), t.arc(i + 7 * s, o + 6 * a, h / 2, Math.PI / 4 * 5, 4 * Math.PI), t.moveTo(i + 7 * s - h / 2, o + 6 * a + h), t.lineTo(i + s + h, o + 14 * a - h), t.arc(i + s, o + 14 * a, h, -Math.PI / 4, 2 * Math.PI), t.moveTo(i + 7 * s + h / 2, o + 6 * a), t.lineTo(i + 14 * s - h, o + 10 * a - h / 2), t.moveTo(i + 16 * s, o + 10 * a), t.arc(i + 14 * s, o + 10 * a, h, 0, 3 * Math.PI), t.lineWidth = 1.5
    }

    function u(t, e) {
        var i = e.x, o = e.y, n = e.width, r = e.height, s = Math.min(n, r) / 2;
        t.moveTo(i + n, o + r / 2), t.arc(i + s, o + s, s, 0, 2 * Math.PI), t.arc(i + s, o, s, Math.PI / 4, Math.PI / 5 * 4), t.arc(i, o + s, s, -Math.PI / 3, Math.PI / 3), t.arc(i + n, o + r, s, Math.PI, Math.PI / 2 * 3), t.lineWidth = 1.5
    }

    function p(t, e) {
        for (var i = e.x, o = e.y, n = e.width, r = e.height, s = Math.round(r / 3), a = 3; a--;)t.rect(i, o + s * a + 2, n, 2)
    }

    function f(t, e) {
        for (var i = e.x, o = e.y, n = e.width, r = e.height, s = Math.round(n / 3), a = 3; a--;)t.rect(i + s * a, o, 2, r)
    }

    function g(t, e) {
        var i = e.x, o = e.y, n = e.width / 16;
        t.moveTo(i + n, o), t.lineTo(i + n, o + e.height), t.lineTo(i + 15 * n, o + e.height), t.lineTo(i + 15 * n, o), t.lineTo(i + n, o), t.moveTo(i + 3 * n, o + 3 * n), t.lineTo(i + 13 * n, o + 3 * n), t.moveTo(i + 3 * n, o + 6 * n), t.lineTo(i + 13 * n, o + 6 * n), t.moveTo(i + 3 * n, o + 9 * n), t.lineTo(i + 13 * n, o + 9 * n), t.moveTo(i + 3 * n, o + 12 * n), t.lineTo(i + 9 * n, o + 12 * n)
    }

    function m(t, e) {
        var i = e.x, o = e.y, n = e.width / 16, r = e.height / 16;
        t.moveTo(i, o), t.lineTo(i, o + e.height), t.lineTo(i + e.width, o + e.height), t.lineTo(i + e.width, o), t.lineTo(i, o), t.moveTo(i + 4 * n, o), t.lineTo(i + 4 * n, o + 8 * r), t.lineTo(i + 12 * n, o + 8 * r), t.lineTo(i + 12 * n, o), t.moveTo(i + 6 * n, o + 11 * r), t.lineTo(i + 6 * n, o + 13 * r), t.lineTo(i + 10 * n, o + 13 * r), t.lineTo(i + 10 * n, o + 11 * r), t.lineTo(i + 6 * n, o + 11 * r)
    }

    function _(t, e) {
        var i = e.x, o = e.y, n = e.width, r = e.height;
        t.moveTo(i, o + r / 2), t.lineTo(i + n, o + r / 2), t.moveTo(i + n / 2, o), t.lineTo(i + n / 2, o + r)
    }

    function y(t, e) {
        var i = e.width / 2, o = e.height / 2, n = Math.min(i, o);
        t.moveTo(e.x + i + n, e.y + o), t.arc(e.x + i, e.y + o, n, 0, 2 * Math.PI), t.closePath()
    }

    function v(t, e) {
        t.rect(e.x, e.y, e.width, e.height), t.closePath()
    }

    function x(t, e) {
        var i = e.width / 2, o = e.height / 2, n = e.x + i, r = e.y + o, s = Math.min(i, o);
        t.moveTo(n, r - s), t.lineTo(n + s, r + s), t.lineTo(n - s, r + s), t.lineTo(n, r - s), t.closePath()
    }

    function b(t, e) {
        var i = e.width / 2, o = e.height / 2, n = e.x + i, r = e.y + o, s = Math.min(i, o);
        t.moveTo(n, r - s), t.lineTo(n + s, r), t.lineTo(n, r + s), t.lineTo(n - s, r), t.lineTo(n, r - s), t.closePath()
    }

    function T(t, e) {
        var i = e.x, o = e.y, n = e.width / 16;
        t.moveTo(i + 8 * n, o), t.lineTo(i + n, o + e.height), t.lineTo(i + 8 * n, o + e.height / 4 * 3), t.lineTo(i + 15 * n, o + e.height), t.lineTo(i + 8 * n, o), t.closePath()
    }

    function S(e, i) {
        var o = t("zrender/shape/Star"), n = i.width / 2, r = i.height / 2;
        o.prototype.buildPath(e, {x: i.x + n, y: i.y + r, r: Math.min(n, r), n: i.n || 5})
    }

    function C(e, i) {
        var o = t("zrender/shape/Heart");
        o.prototype.buildPath(e, {x: i.x + i.width / 2, y: i.y + .2 * i.height, a: i.width / 2, b: .8 * i.height})
    }

    function z(e, i) {
        var o = t("zrender/shape/Droplet");
        o.prototype.buildPath(e, {x: i.x + .5 * i.width, y: i.y + .5 * i.height, a: .5 * i.width, b: .8 * i.height})
    }

    function w(t, e) {
        var i = e.x, o = e.y - e.height / 2 * 1.5, n = e.width / 2, r = e.height / 2, s = Math.min(n, r);
        t.arc(i + n, o + r, s, Math.PI / 5 * 4, Math.PI / 5), t.lineTo(i + n, o + r + 1.5 * s), t.closePath()
    }

    function E(e, i, o) {
        var n = t("zrender/shape/Image");
        this._imageShape = this._imageShape || new n({style: {}});
        for (var r in i)this._imageShape.style[r] = i[r];
        this._imageShape.brush(e, !1, o)
    }

    function A(t) {
        M.call(this, t)
    }

    var L = t("zrender/tool/util"), M = t("zrender/shape/Base");
    return A.prototype = {
        type: "icon",
        iconLibrary: {
            mark: e,
            markUndo: i,
            markClear: o,
            dataZoom: n,
            dataZoomReset: r,
            restore: s,
            lineChart: a,
            barChart: h,
            pieChart: l,
            funnelChart: d,
            forceChart: c,
            chordChart: u,
            stackChart: p,
            tiledChart: f,
            dataView: g,
            saveAsImage: m,
            cross: _,
            circle: y,
            rectangle: v,
            triangle: x,
            diamond: b,
            arrow: T,
            star: S,
            heart: C,
            droplet: z,
            pin: w,
            image: E
        },
        brush: function (e, i, o) {
            var n = i ? this.highlightStyle : this.style;
            n = n || {};
            var r = n.iconType || this.style.iconType;
            if ("image" === r) {
                var s = t("zrender/shape/Image");
                s.prototype.brush.call(this, e, i, o)
            } else {
                var n = this.beforeBrush(e, i);
                switch (e.beginPath(), this.buildPath(e, n, o), n.brushType) {
                    case"both":
                        e.fill();
                    case"stroke":
                        n.lineWidth > 0 && e.stroke();
                        break;
                    default:
                        e.fill()
                }
                this.drawText(e, n, this.style), this.afterBrush(e)
            }
        },
        buildPath: function (t, e, i) {
            this.iconLibrary[e.iconType] ? this.iconLibrary[e.iconType].call(this, t, e, i) : (t.moveTo(e.x, e.y), t.lineTo(e.x + e.width, e.y), t.lineTo(e.x + e.width, e.y + e.height), t.lineTo(e.x, e.y + e.height), t.lineTo(e.x, e.y), t.closePath())
        },
        getRect: function (t) {
            return t.__rect ? t.__rect : (t.__rect = {
                x: Math.round(t.x),
                y: Math.round(t.y - ("pin" == t.iconType ? t.height / 2 * 1.5 : 0)),
                width: t.width,
                height: t.height
            }, t.__rect)
        },
        isCover: function (t, e) {
            var i = this.getTansform(t, e);
            t = i[0], e = i[1];
            var o = this.style.__rect;
            o || (o = this.style.__rect = this.getRect(this.style));
            var n = o.height < 8 || o.width < 8 ? 4 : 0;
            return t >= o.x - n && t <= o.x + o.width + n && e >= o.y - n && e <= o.y + o.height + n ? !0 : !1
        }
    }, L.inherits(A, M), A
}), define("echarts/util/shape/MarkLine", ["require", "zrender/shape/Base", "./Icon", "zrender/shape/Line", "zrender/shape/BrokenLine", "zrender/tool/matrix", "zrender/tool/area", "zrender/shape/util/dashedLineTo", "zrender/shape/util/smoothSpline", "zrender/tool/util"], function (t) {
    function e(t) {
        i.call(this, t)
    }

    var i = t("zrender/shape/Base"), o = t("./Icon"), n = t("zrender/shape/Line"), r = new n({}), s = t("zrender/shape/BrokenLine"), a = new s({}), h = t("zrender/tool/matrix"), l = t("zrender/tool/area"), d = t("zrender/shape/util/dashedLineTo"), c = t("zrender/shape/util/smoothSpline"), u = t("zrender/tool/util");
    return e.prototype = {
        type: "mark-line", brush: function (t, e) {
            var i = this.style;
            e && (i = this.getHighlightStyle(i, this.highlightStyle || {})), t.save(), this.setContext(t, i), this.setTransform(t), t.save(), t.beginPath(), this.buildLinePath(t, i, this.style.lineWidth || 1), t.stroke(), t.restore(), this.brushSymbol(t, i, 0), this.brushSymbol(t, i, 1), this.drawText(t, i, this.style), t.restore()
        }, buildLinePath: function (t, e, i) {
            var o = e.pointList || this.getPointList(e);
            e.pointList = o;
            var n = Math.min(e.pointList.length, Math.round(e.pointListLength || e.pointList.length));
            if (e.lineType && "solid" != e.lineType) {
                if ("dashed" == e.lineType || "dotted" == e.lineType)if ("spline" !== e.smooth) {
                    var r = i * ("dashed" == e.lineType ? 5 : 1);
                    t.moveTo(o[0][0], o[0][1]);
                    for (var s = 1; n > s; s++)d(t, o[s - 1][0], o[s - 1][1], o[s][0], o[s][1], r)
                } else for (var s = 1; n > s; s += 2)t.moveTo(o[s - 1][0], o[s - 1][1]), t.lineTo(o[s][0], o[s][1])
            } else {
                t.moveTo(o[0][0], o[0][1]);
                for (var s = 1; n > s; s++)t.lineTo(o[s][0], o[s][1])
            }
        }, brushSymbol: function (t, e, i) {
            if ("none" != e.symbol[i]) {
                t.save(), t.beginPath(), t.lineWidth = e.symbolBorder, t.strokeStyle = e.symbolBorderColor, e.iconType = e.symbol[i].replace("empty", "").toLowerCase(), e.symbol[i].match("empty") && (t.fillStyle = "#fff");
                var n, r = Math.min(e.pointList.length, Math.round(e.pointListLength || e.pointList.length)), s = 0 === i ? e.pointList[0][0] : e.pointList[r - 1][0], a = 0 === i ? e.pointList[0][1] : e.pointList[r - 1][1], l = "undefined" != typeof e.symbolRotate[i] ? e.symbolRotate[i] - 0 : 0;
                if (0 !== l && (n = h.create(), h.identity(n), (s || a) && h.translate(n, n, [-s, -a]), h.rotate(n, n, l * Math.PI / 180), (s || a) && h.translate(n, n, [s, a]), t.transform.apply(t, n)), "arrow" == e.iconType && 0 === l)this.buildArrawPath(t, e, i); else {
                    var d = e.symbolSize[i];
                    e.x = s - d, e.y = a - d, e.width = 2 * d, e.height = 2 * d, o.prototype.buildPath(t, e)
                }
                t.closePath(), t.fill(), t.stroke(), t.restore()
            }
        }, buildArrawPath: function (t, e, i) {
            var o = Math.min(e.pointList.length, Math.round(e.pointListLength || e.pointList.length)), n = 2 * e.symbolSize[i], r = e.pointList[0][0], s = e.pointList[o - 1][0], a = e.pointList[0][1], h = e.pointList[o - 1][1], l = 0;
            "spline" === e.smooth && (l = .2);
            var d = Math.atan(Math.abs((h - a) / (r - s)));
            0 === i ? s > r ? h > a ? d = 2 * Math.PI - d + l : d += l : h > a ? d += Math.PI - l : d = Math.PI - d - l : r > s ? a > h ? d = 2 * Math.PI - d + l : d += l : a > h ? d += Math.PI - l : d = Math.PI - d - l;
            var c = Math.PI / 8, u = 0 === i ? r : s, p = 0 === i ? a : h, f = [[u + n * Math.cos(d - c), p - n * Math.sin(d - c)], [u + .6 * n * Math.cos(d), p - .6 * n * Math.sin(d)], [u + n * Math.cos(d + c), p - n * Math.sin(d + c)]];
            t.moveTo(u, p);
            for (var g = 0, m = f.length; m > g; g++)t.lineTo(f[g][0], f[g][1]);
            t.lineTo(u, p)
        }, getPointList: function (t) {
            var e = [[t.xStart, t.yStart], [t.xEnd, t.yEnd]];
            if ("spline" === t.smooth) {
                var i = e[1][0], o = e[1][1];
                e[3] = [i, o], e[1] = this.getOffetPoint(e[0], e[3]), e[2] = this.getOffetPoint(e[3], e[0]), e = c(e, !1), e[e.length - 1] = [i, o]
            }
            return e
        }, getOffetPoint: function (t, e) {
            var i, o = Math.sqrt(Math.round((t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]))) / 3, n = [t[0], t[1]], r = .2;
            if (t[0] != e[0] && t[1] != e[1]) {
                var s = (e[1] - t[1]) / (e[0] - t[0]);
                i = Math.atan(s)
            } else i = t[0] == e[0] ? (t[1] <= e[1] ? 1 : -1) * Math.PI / 2 : 0;
            var a, h;
            return t[0] <= e[0] ? (i -= r, a = Math.round(Math.cos(i) * o), h = Math.round(Math.sin(i) * o), n[0] += a, n[1] += h) : (i += r, a = Math.round(Math.cos(i) * o), h = Math.round(Math.sin(i) * o), n[0] -= a, n[1] -= h), n
        }, getRect: function (t) {
            if (t.__rect)return t.__rect;
            var e = t.lineWidth || 1;
            return t.__rect = {
                x: Math.min(t.xStart, t.xEnd) - e,
                y: Math.min(t.yStart, t.yEnd) - e,
                width: Math.abs(t.xStart - t.xEnd) + e,
                height: Math.abs(t.yStart - t.yEnd) + e
            }, t.__rect
        }, isCover: function (t, e) {
            var i = this.getTansform(t, e);
            t = i[0], e = i[1];
            var o = this.style.__rect;
            return o || (o = this.style.__rect = this.getRect(this.style)), t >= o.x && t <= o.x + o.width && e >= o.y && e <= o.y + o.height ? "spline" !== this.style.smooth ? l.isInside(r, this.style, t, e) : l.isInside(a, this.style, t, e) : !1
        }
    }, u.inherits(e, i), e
}), define("echarts/util/shape/Symbol", ["require", "zrender/shape/Base", "zrender/shape/Polygon", "zrender/tool/util", "./normalIsCover"], function (t) {
    function e(t) {
        i.call(this, t)
    }

    var i = t("zrender/shape/Base"), o = t("zrender/shape/Polygon"), n = new o({}), r = t("zrender/tool/util");
    return e.prototype = {
        type: "symbol", buildPath: function (t, e) {
            var i = e.pointList, o = i.length;
            if (0 !== o)for (var n, r, s, a, h, l = 1e4, d = Math.ceil(o / l), c = i[0]instanceof Array, u = e.size ? e.size : 2, p = u, f = u / 2, g = 2 * Math.PI, m = 0; d > m; m++) {
                t.beginPath(), n = m * l, r = n + l, r = r > o ? o : r;
                for (var _ = n; r > _; _++)if (e.random && (s = e["randomMap" + _ % 20] / 100, p = u * s * s, f = p / 2), c ? (a = i[_][0], h = i[_][1]) : (a = i[_].x, h = i[_].y), 3 > p)t.rect(a - f, h - f, p, p); else switch (e.iconType) {
                    case"circle":
                        t.moveTo(a, h), t.arc(a, h, f, 0, g, !0);
                        break;
                    case"diamond":
                        t.moveTo(a, h - f), t.lineTo(a + f / 3, h - f / 3), t.lineTo(a + f, h), t.lineTo(a + f / 3, h + f / 3), t.lineTo(a, h + f), t.lineTo(a - f / 3, h + f / 3), t.lineTo(a - f, h), t.lineTo(a - f / 3, h - f / 3), t.lineTo(a, h - f);
                        break;
                    default:
                        t.rect(a - f, h - f, p, p)
                }
                if (t.closePath(), d - 1 > m)switch (e.brushType) {
                    case"both":
                        t.fill(), e.lineWidth > 0 && t.stroke();
                        break;
                    case"stroke":
                        e.lineWidth > 0 && t.stroke();
                        break;
                    default:
                        t.fill()
                }
            }
        }, getRect: function (t) {
            return t.__rect || n.getRect(t)
        }, isCover: t("./normalIsCover")
    }, r.inherits(e, i), e
}), define("echarts/util/ecAnimation", ["require", "zrender/tool/util", "zrender/shape/Polygon"], function (t) {
    function e(t, e, i, o, n) {
        var r, s = i.style.pointList, a = s.length;
        if (!e) {
            if (r = [], "vertical" != i._orient)for (var h = s[0][1], l = 0; a > l; l++)r[l] = [s[l][0], h]; else for (var d = s[0][0], l = 0; a > l; l++)r[l] = [d, s[l][1]];
            "half-smooth-polygon" == i.type && (r[a - 1] = f.clone(s[a - 1]), r[a - 2] = f.clone(s[a - 2])), e = {style: {pointList: r}}
        }
        r = e.style.pointList;
        var c = r.length;
        i.style.pointList = c == a ? r : a > c ? r.concat(s.slice(c)) : r.slice(0, a), t.addShape(i), t.animate(i.id, "style").when(o, {pointList: s}).start(n)
    }

    function i(t, e) {
        for (var i = arguments.length, o = 2; i > o; o++) {
            var n = arguments[o];
            t.style[n] = e.style[n]
        }
    }

    function o(t, e, o, n, r) {
        var s = o.style;
        e || (e = {
            position: o.position,
            style: {
                x: s.x,
                y: "vertical" == o._orient ? s.y + s.height : s.y,
                width: "vertical" == o._orient ? s.width : 0,
                height: "vertical" != o._orient ? s.height : 0
            }
        });
        var a = s.x, h = s.y, l = s.width, d = s.height, c = [o.position[0], o.position[1]];
        i(o, e, "x", "y", "width", "height"), o.position = e.position, t.addShape(o), (c[0] != e.position[0] || c[1] != e.position[1]) && t.animate(o.id, "").when(n, {position: c}).start(r), t.animate(o.id, "style").when(n, {
            x: a,
            y: h,
            width: l,
            height: d
        }).start(r)
    }

    function n(t, e, i, o, n) {
        if (!e) {
            var r = i.style.y;
            e = {style: {y: [r[0], r[0], r[0], r[0]]}}
        }
        var s = i.style.y;
        i.style.y = e.style.y, t.addShape(i), t.animate(i.id, "style").when(o, {y: s}).start(n)
    }

    function r(t, e, i, o, n) {
        var r = i.style.x, s = i.style.y, a = i.style.r0, h = i.style.r;
        "r" != i._animationAdd ? (i.style.r0 = 0, i.style.r = 0, i.rotation = [2 * Math.PI, r, s], t.addShape(i), t.animate(i.id, "style").when(o, {
            r0: a,
            r: h
        }).start(n), t.animate(i.id, "").when(Math.round(o / 3 * 2), {rotation: [0, r, s]}).start(n)) : (i.style.r0 = i.style.r, t.addShape(i), t.animate(i.id, "style").when(o, {r0: a}).start(n))
    }

    function s(t, e, o, n, r) {
        e || (e = "r" != o._animationAdd ? {
            style: {
                startAngle: o.style.startAngle,
                endAngle: o.style.startAngle
            }
        } : {style: {r0: o.style.r}});
        var s = o.style.startAngle, a = o.style.endAngle;
        i(o, e, "startAngle", "endAngle"), t.addShape(o), t.animate(o.id, "style").when(n, {
            startAngle: s,
            endAngle: a
        }).start(r)
    }

    function a(t, e, o, n, r) {
        e || (e = {style: {x: "left" == o.style.textAlign ? o.style.x + 100 : o.style.x - 100, y: o.style.y}});
        var s = o.style.x, a = o.style.y;
        i(o, e, "x", "y"), t.addShape(o), t.animate(o.id, "style").when(n, {x: s, y: a}).start(r)
    }

    function h(e, i, o, n, r) {
        var s = t("zrender/shape/Polygon").prototype.getRect(o.style), a = s.x + s.width / 2, h = s.y + s.height / 2;
        o.scale = [.1, .1, a, h], e.addShape(o), e.animate(o.id, "").when(n, {scale: [1, 1, a, h]}).start(r)
    }

    function l(t, e, o, n, r) {
        e || (e = {
            style: {
                source0: 0,
                source1: o.style.source1 > 0 ? 360 : -360,
                target0: 0,
                target1: o.style.target1 > 0 ? 360 : -360
            }
        });
        var s = o.style.source0, a = o.style.source1, h = o.style.target0, l = o.style.target1;
        e.style && i(o, e, "source0", "source1", "target0", "target1"), t.addShape(o), t.animate(o.id, "style").when(n, {
            source0: s,
            source1: a,
            target0: h,
            target1: l
        }).start(r)
    }

    function d(t, e, i, o, n) {
        e || (e = {style: {angle: i.style.startAngle}});
        var r = i.style.angle;
        i.style.angle = e.style.angle, t.addShape(i), t.animate(i.id, "style").when(o, {angle: r}).start(n)
    }

    function c(t, e, i, n, r, s) {
        if (i.style._x = i.style.x, i.style._y = i.style.y, i.style._width = i.style.width, i.style._height = i.style.height, e)o(t, e, i, n, r); else {
            var a = i._x || 0, h = i._y || 0;
            i.scale = [.01, .01, a, h], t.addShape(i), t.animate(i.id, "").delay(s).when(n, {scale: [1, 1, a, h]}).start(r || "QuinticOut")
        }
    }

    function u(t, e, o, n, r) {
        e || (e = {
            style: {
                xStart: o.style.xStart,
                yStart: o.style.yStart,
                xEnd: o.style.xStart,
                yEnd: o.style.yStart
            }
        });
        var s = o.style.xStart, a = o.style.xEnd, h = o.style.yStart, l = o.style.yEnd;
        i(o, e, "xStart", "xEnd", "yStart", "yEnd"), t.addShape(o), t.animate(o.id, "style").when(n, {
            xStart: s,
            xEnd: a,
            yStart: h,
            yEnd: l
        }).start(r)
    }

    function p(t, e, i, o, n) {
        i.style.smooth ? e ? t.addShape(i) : (i.style.pointListLength = 1, t.addShape(i), i.style.pointList = i.style.pointList || i.getPointList(i.style), t.animate(i.id, "style").when(o, {pointListLength: i.style.pointList.length}).start(n || "QuinticOut")) : (i.style.pointList = e ? e.style.pointList : [[i.style.xStart, i.style.yStart], [i.style.xStart, i.style.yStart]], t.addShape(i), t.animate(i.id, "style").when(o, {pointList: [[i.style.xStart, i.style.yStart], [i._x || 0, i._y || 0]]}).start(n || "QuinticOut"))
    }

    var f = t("zrender/tool/util");
    return {
        pointList: e,
        rectangle: o,
        candle: n,
        ring: r,
        sector: s,
        text: a,
        polygon: h,
        ribbon: l,
        gaugePointer: d,
        icon: c,
        line: u,
        markline: p
    }
}), define("echarts/util/ecEffect", ["require", "../util/ecData", "zrender/shape/Circle", "zrender/shape/Image", "../util/shape/Icon", "../util/shape/Symbol", "zrender/tool/env"], function (t) {
    function e(t, e, i, o) {
        var r = i.effect, h = r.color || i.style.strokeColor || i.style.color, d = r.shadowColor || h, c = r.scaleSize, u = "undefined" != typeof r.shadowBlur ? r.shadowBlur : c, p = new a({
            zlevel: o,
            style: {
                brushType: "stroke",
                iconType: "pin" != i.style.iconType && "droplet" != i.style.iconType ? i.style.iconType : "circle",
                x: u + 1,
                y: u + 1,
                n: i.style.n,
                width: i.style._width * c,
                height: i.style._height * c,
                lineWidth: 1,
                strokeColor: h,
                shadowColor: d,
                shadowBlur: u
            },
            draggable: !1,
            hoverable: !1
        });
        l && (p.style.image = t.shapeToImage(p, p.style.width + 2 * u + 2, p.style.height + 2 * u + 2).style.image, p = new s({
            zlevel: p.zlevel,
            style: p.style,
            draggable: !1,
            hoverable: !1
        })), n.clone(i, p), p.position = i.position, e.push(p), t.addShape(p);
        var f = window.devicePixelRatio || 1, g = (p.style.width / f - i.style._width) / 2;
        p.style.x = i.style._x - g, p.style.y = i.style._y - g;
        var m = 100 * (r.period + 10 * Math.random());
        t.modShape(i.id, {invisible: !0});
        var _ = p.style.x + p.style.width / 2 / f, y = p.style.y + p.style.height / 2 / f;
        t.modShape(p.id, {scale: [.1, .1, _, y]}), t.animate(p.id, "", r.loop).when(m, {scale: [1, 1, _, y]}).done(function () {
            i.effect.show = !1, t.delShape(p.id)
        }).start()
    }

    function i(t, e, i, o) {
        var n = i.effect, r = n.color || i.style.strokeColor || i.style.color, s = n.scaleSize, a = n.shadowColor || r, l = "undefined" != typeof n.shadowBlur ? n.shadowBlur : 2 * s, d = window.devicePixelRatio || 1, c = new h({
            zlevel: o,
            position: i.position,
            scale: i.scale,
            style: {
                pointList: i.style.pointList,
                iconType: i.style.iconType,
                color: r,
                strokeColor: r,
                shadowColor: a,
                shadowBlur: l * d,
                random: !0,
                brushType: "fill",
                lineWidth: 1,
                size: i.style.size
            },
            draggable: !1,
            hoverable: !1
        });
        e.push(c), t.addShape(c), t.modShape(i.id, {invisible: !0});
        for (var u = Math.round(100 * n.period), p = {}, f = {}, g = 0; 20 > g; g++)c.style["randomMap" + g] = 0, p = {}, p["randomMap" + g] = 100, f = {}, f["randomMap" + g] = 0, c.style["randomMap" + g] = 100 * Math.random(), t.animate(c.id, "style", !0).when(u, p).when(2 * u, f).when(3 * u, p).when(4 * u, p).delay(Math.random() * u * g).start()
    }

    function o(t, e, i, o) {
        var a, h = i.effect, d = h.color || i.style.strokeColor || i.style.color, c = h.shadowColor || i.style.strokeColor || d, u = i.style.lineWidth * h.scaleSize, p = "undefined" != typeof h.shadowBlur ? h.shadowBlur : u, f = new r({
            zlevel: o,
            style: {x: p, y: p, r: u, color: d, shadowColor: c, shadowBlur: p},
            draggable: !1,
            hoverable: !1
        });
        l ? (f.style.image = t.shapeToImage(f, 2 * (u + p), 2 * (u + p)).style.image, f = new s({
            zlevel: f.zlevel,
            style: f.style,
            draggable: !1,
            hoverable: !1
        }), a = p) : a = 0, n.clone(i, f), f.position = i.position, e.push(f), t.addShape(f), f.style.x = i.style.xStart - a, f.style.y = i.style.yStart - a;
        var g = (i.style.xStart - i.style.xEnd) * (i.style.xStart - i.style.xEnd) + (i.style.yStart - i.style.yEnd) * (i.style.yStart - i.style.yEnd), m = Math.round(Math.sqrt(Math.round(g * h.period * h.period)));
        if (i.style.smooth) {
            var _ = i.style.pointList || i.getPointList(i.style), y = _.length;
            m = Math.round(m / y);
            for (var v = t.animate(f.id, "style", h.loop), x = Math.ceil(y / 8), b = 0; y - x > b; b += x)v.when(m * (b + 1), {
                x: _[b][0] - a,
                y: _[b][1] - a
            });
            v.when(m * y, {x: _[y - 1][0] - a, y: _[y - 1][1] - a}), v.done(function () {
                i.effect.show = !1, t.delShape(f.id)
            }), v.start("spline")
        } else t.animate(f.id, "style", h.loop).when(m, {x: i._x - a, y: i._y - a}).done(function () {
            i.effect.show = !1, t.delShape(f.id)
        }).start()
    }

    var n = t("../util/ecData"), r = t("zrender/shape/Circle"), s = t("zrender/shape/Image"), a = t("../util/shape/Icon"), h = t("../util/shape/Symbol"), l = t("zrender/tool/env").canvasSupported;
    return {point: e, largePoint: i, line: o}
}), define("zrender/shape/Star", ["require", "../tool/math", "./Base", "../tool/util"], function (t) {
    var e = t("../tool/math"), i = e.sin, o = e.cos, n = Math.PI, r = t("./Base"), s = function (t) {
        r.call(this, t)
    };
    return s.prototype = {
        type: "star", buildPath: function (t, e) {
            var r = e.n;
            if (r && !(2 > r)) {
                var s = e.x, a = e.y, h = e.r, l = e.r0;
                null == l && (l = r > 4 ? h * o(2 * n / r) / o(n / r) : h / 3);
                var d = n / r, c = -n / 2, u = s + h * o(c), p = a + h * i(c);
                c += d;
                var f = e.pointList = [];
                f.push([u, p]);
                for (var g, m = 0, _ = 2 * r - 1; _ > m; m++)g = m % 2 === 0 ? l : h, f.push([s + g * o(c), a + g * i(c)]), c += d;
                f.push([u, p]), t.moveTo(f[0][0], f[0][1]);
                for (var m = 0; m < f.length; m++)t.lineTo(f[m][0], f[m][1]);
                t.closePath()
            }
        }, getRect: function (t) {
            if (t.__rect)return t.__rect;
            var e;
            return e = "stroke" == t.brushType || "fill" == t.brushType ? t.lineWidth || 1 : 0, t.__rect = {
                x: Math.round(t.x - t.r - e / 2),
                y: Math.round(t.y - t.r - e / 2),
                width: 2 * t.r + e,
                height: 2 * t.r + e
            }, t.__rect
        }
    }, t("../tool/util").inherits(s, r), s
}), define("zrender/shape/Heart", ["require", "./Base", "./util/PathProxy", "zrender/tool/area", "../tool/util"], function (t) {
    "use strict";
    var e = t("./Base"), i = t("./util/PathProxy"), o = t("zrender/tool/area"), n = function (t) {
        e.call(this, t), this._pathProxy = new i
    };
    return n.prototype = {
        type: "heart", buildPath: function (t, e) {
            var o = this._pathProxy || new i;
            o.begin(t), o.moveTo(e.x, e.y), o.bezierCurveTo(e.x + e.a / 2, e.y - 2 * e.b / 3, e.x + 2 * e.a, e.y + e.b / 3, e.x, e.y + e.b), o.bezierCurveTo(e.x - 2 * e.a, e.y + e.b / 3, e.x - e.a / 2, e.y - 2 * e.b / 3, e.x, e.y), o.closePath()
        }, getRect: function (t) {
            return t.__rect ? t.__rect : (this._pathProxy.isEmpty() || this.buildPath(null, t), this._pathProxy.fastBoundingRect())
        }, isCover: function (t, e) {
            var i = this.getTansform(t, e);
            t = i[0], e = i[1];
            var n = this.getRect(this.style);
            return t >= n.x && t <= n.x + n.width && e >= n.y && e <= n.y + n.height ? o.isInsidePath(this._pathProxy.pathCommands, this.style.lineWidth, this.style.brushType, t, e) : void 0
        }
    }, t("../tool/util").inherits(n, e), n
}), define("zrender/shape/Droplet", ["require", "./Base", "./util/PathProxy", "zrender/tool/area", "../tool/util"], function (t) {
    "use strict";
    var e = t("./Base"), i = t("./util/PathProxy"), o = t("zrender/tool/area"), n = function (t) {
        e.call(this, t), this._pathProxy = new i
    };
    return n.prototype = {
        type: "droplet", buildPath: function (t, e) {
            var o = this._pathProxy || new i;
            o.begin(t), o.moveTo(e.x, e.y + e.a), o.bezierCurveTo(e.x + e.a, e.y + e.a, e.x + 3 * e.a / 2, e.y - e.a / 3, e.x, e.y - e.b), o.bezierCurveTo(e.x - 3 * e.a / 2, e.y - e.a / 3, e.x - e.a, e.y + e.a, e.x, e.y + e.a), o.closePath()
        }, getRect: function (t) {
            return t.__rect ? t.__rect : (this._pathProxy.isEmpty() || this.buildPath(null, t), this._pathProxy.fastBoundingRect())
        }, isCover: function (t, e) {
            var i = this.getTansform(t, e);
            t = i[0], e = i[1];
            var n = this.getRect(this.style);
            return t >= n.x && t <= n.x + n.width && e >= n.y && e <= n.y + n.height ? o.isInsidePath(this._pathProxy.pathCommands, this.style.lineWidth, this.style.brushType, t, e) : void 0
        }
    }, t("../tool/util").inherits(n, e), n
}), define("zrender/tool/math", [], function () {
    function t(t, e) {
        return Math.sin(e ? t * n : t)
    }

    function e(t, e) {
        return Math.cos(e ? t * n : t)
    }

    function i(t) {
        return t * n
    }

    function o(t) {
        return t / n
    }

    var n = Math.PI / 180;
    return {sin: t, cos: e, degreeToRadian: i, radianToDegree: o}
}), define("zrender/shape/util/PathProxy", ["require", "../../tool/vector"], function (t) {
    var e = t("../../tool/vector"), i = function (t, e) {
        this.command = t, this.points = e || null
    }, o = function () {
        this.pathCommands = [], this._ctx = null, this._min = [], this._max = []
    };
    return o.prototype.fastBoundingRect = function () {
        var t = this._min, i = this._max;
        t[0] = t[1] = 1 / 0, i[0] = i[1] = -1 / 0;
        for (var o = 0; o < this.pathCommands.length; o++) {
            var n = this.pathCommands[o], r = n.points;
            switch (n.command) {
                case"M":
                    e.min(t, t, r), e.max(i, i, r);
                    break;
                case"L":
                    e.min(t, t, r), e.max(i, i, r);
                    break;
                case"C":
                    for (var s = 0; 6 > s; s += 2)t[0] = Math.min(t[0], t[0], r[s]), t[1] = Math.min(t[1], t[1], r[s + 1]), i[0] = Math.max(i[0], i[0], r[s]), i[1] = Math.max(i[1], i[1], r[s + 1]);
                    break;
                case"Q":
                    for (var s = 0; 4 > s; s += 2)t[0] = Math.min(t[0], t[0], r[s]), t[1] = Math.min(t[1], t[1], r[s + 1]), i[0] = Math.max(i[0], i[0], r[s]), i[1] = Math.max(i[1], i[1], r[s + 1]);
                    break;
                case"A":
                    var a = r[0], h = r[1], l = r[2], d = r[3];
                    t[0] = Math.min(t[0], t[0], a - l), t[1] = Math.min(t[1], t[1], h - d), i[0] = Math.max(i[0], i[0], a + l), i[1] = Math.max(i[1], i[1], h + d)
            }
        }
        return {x: t[0], y: t[1], width: i[0] - t[0], height: i[1] - t[1]}
    }, o.prototype.begin = function (t) {
        return this._ctx = t || null, this.pathCommands.length = 0, this
    }, o.prototype.moveTo = function (t, e) {
        return this.pathCommands.push(new i("M", [t, e])), this._ctx && this._ctx.moveTo(t, e), this
    }, o.prototype.lineTo = function (t, e) {
        return this.pathCommands.push(new i("L", [t, e])), this._ctx && this._ctx.lineTo(t, e), this
    }, o.prototype.bezierCurveTo = function (t, e, o, n, r, s) {
        return this.pathCommands.push(new i("C", [t, e, o, n, r, s])), this._ctx && this._ctx.bezierCurveTo(t, e, o, n, r, s), this
    }, o.prototype.quadraticCurveTo = function (t, e, o, n) {
        return this.pathCommands.push(new i("Q", [t, e, o, n])), this._ctx && this._ctx.quadraticCurveTo(t, e, o, n), this
    }, o.prototype.arc = function (t, e, o, n, r, s) {
        return this.pathCommands.push(new i("A", [t, e, o, o, n, r - n, 0, s ? 0 : 1])), this._ctx && this._ctx.arc(t, e, o, n, r, s), this
    }, o.prototype.arcTo = function (t, e, i, o, n) {
        return this._ctx && this._ctx.arcTo(t, e, i, o, n), this
    }, o.prototype.rect = function (t, e, i, o) {
        return this._ctx && this._ctx.rect(t, e, i, o), this
    }, o.prototype.closePath = function () {
        return this.pathCommands.push(new i("z")), this._ctx && this._ctx.closePath(), this
    }, o.prototype.isEmpty = function () {
        return 0 === this.pathCommands.length
    }, o.PathSegment = i, o
}), define("zrender/shape/Line", ["require", "./Base", "./util/dashedLineTo", "../tool/util"], function (t) {
    var e = t("./Base"), i = t("./util/dashedLineTo"), o = function (t) {
        this.brushTypeOnly = "stroke", this.textPosition = "end", e.call(this, t)
    };
    return o.prototype = {
        type: "line", buildPath: function (t, e) {
            if (e.lineType && "solid" != e.lineType) {
                if ("dashed" == e.lineType || "dotted" == e.lineType) {
                    var o = (e.lineWidth || 1) * ("dashed" == e.lineType ? 5 : 1);
                    i(t, e.xStart, e.yStart, e.xEnd, e.yEnd, o)
                }
            } else t.moveTo(e.xStart, e.yStart), t.lineTo(e.xEnd, e.yEnd)
        }, getRect: function (t) {
            if (t.__rect)return t.__rect;
            var e = t.lineWidth || 1;
            return t.__rect = {
                x: Math.min(t.xStart, t.xEnd) - e,
                y: Math.min(t.yStart, t.yEnd) - e,
                width: Math.abs(t.xStart - t.xEnd) + e,
                height: Math.abs(t.yStart - t.yEnd) + e
            }, t.__rect
        }
    }, t("../tool/util").inherits(o, e), o
}), define("zrender/shape/BrokenLine", ["require", "./Base", "./util/smoothSpline", "./util/smoothBezier", "./util/dashedLineTo", "./Polygon", "../tool/util"], function (t) {
    var e = t("./Base"), i = t("./util/smoothSpline"), o = t("./util/smoothBezier"), n = t("./util/dashedLineTo"), r = function (t) {
        this.brushTypeOnly = "stroke", this.textPosition = "end", e.call(this, t)
    };
    return r.prototype = {
        type: "broken-line", buildPath: function (t, e) {
            var r = e.pointList;
            if (!(r.length < 2)) {
                var s = Math.min(e.pointList.length, Math.round(e.pointListLength || e.pointList.length));
                if (e.smooth && "spline" !== e.smooth) {
                    var a = o(r, e.smooth, !1, e.smoothConstraint);
                    t.moveTo(r[0][0], r[0][1]);
                    for (var h, l, d, c = 0; s - 1 > c; c++)h = a[2 * c], l = a[2 * c + 1], d = r[c + 1], t.bezierCurveTo(h[0], h[1], l[0], l[1], d[0], d[1])
                } else if ("spline" === e.smooth && (r = i(r), s = r.length), e.lineType && "solid" != e.lineType) {
                    if ("dashed" == e.lineType || "dotted" == e.lineType) {
                        var u = (e.lineWidth || 1) * ("dashed" == e.lineType ? 5 : 1);
                        t.moveTo(r[0][0], r[0][1]);
                        for (var c = 1; s > c; c++)n(t, r[c - 1][0], r[c - 1][1], r[c][0], r[c][1], u)
                    }
                } else {
                    t.moveTo(r[0][0], r[0][1]);
                    for (var c = 1; s > c; c++)t.lineTo(r[c][0], r[c][1])
                }
            }
        }, getRect: function (e) {
            return t("./Polygon").prototype.getRect(e)
        }
    }, t("../tool/util").inherits(r, e), r
}), define("zrender/shape/util/dashedLineTo", [], function () {
    var t = [5, 5];
    return function (e, i, o, n, r, s) {
        if (e.setLineDash)return t[0] = t[1] = s, e.setLineDash(t), e.moveTo(i, o), void e.lineTo(n, r);
        s = "number" != typeof s ? 5 : s;
        var a = n - i, h = r - o, l = Math.floor(Math.sqrt(a * a + h * h) / s);
        a /= l, h /= l;
        for (var d = !0, c = 0; l > c; ++c)d ? e.moveTo(i, o) : e.lineTo(i, o), d = !d, i += a, o += h;
        e.lineTo(n, r)
    }
}), define("zrender/shape/util/smoothSpline", ["require", "../../tool/vector"], function (t) {
    function e(t, e, i, o, n, r, s) {
        var a = .5 * (i - t), h = .5 * (o - e);
        return (2 * (e - i) + a + h) * s + (-3 * (e - i) - 2 * a - h) * r + a * n + e
    }

    var i = t("../../tool/vector");
    return function (t, o) {
        for (var n = t.length, r = [], s = 0, a = 1; n > a; a++)s += i.distance(t[a - 1], t[a]);
        var h = s / 5;
        h = n > h ? n : h;
        for (var a = 0; h > a; a++) {
            var l, d, c, u = a / (h - 1) * (o ? n : n - 1), p = Math.floor(u), f = u - p, g = t[p % n];
            o ? (l = t[(p - 1 + n) % n], d = t[(p + 1) % n], c = t[(p + 2) % n]) : (l = t[0 === p ? p : p - 1], d = t[p > n - 2 ? n - 1 : p + 1], c = t[p > n - 3 ? n - 1 : p + 2]);
            var m = f * f, _ = f * m;
            r.push([e(l[0], g[0], d[0], c[0], f, m, _), e(l[1], g[1], d[1], c[1], f, m, _)])
        }
        return r
    }
}), define("zrender/shape/util/smoothBezier", ["require", "../../tool/vector"], function (t) {
    var e = t("../../tool/vector");
    return function (t, i, o, n) {
        var r, s, a, h, l = [], d = [], c = [], u = [], p = !!n;
        if (p) {
            a = [1 / 0, 1 / 0], h = [-1 / 0, -1 / 0];
            for (var f = 0, g = t.length; g > f; f++)e.min(a, a, t[f]), e.max(h, h, t[f]);
            e.min(a, a, n[0]), e.max(h, h, n[1])
        }
        for (var f = 0, g = t.length; g > f; f++) {
            var r, s, m = t[f];
            if (o)r = t[f ? f - 1 : g - 1], s = t[(f + 1) % g]; else {
                if (0 === f || f === g - 1) {
                    l.push(t[f]);
                    continue
                }
                r = t[f - 1], s = t[f + 1]
            }
            e.sub(d, s, r), e.scale(d, d, i);
            var _ = e.distance(m, r), y = e.distance(m, s), v = _ + y;
            0 !== v && (_ /= v, y /= v), e.scale(c, d, -_), e.scale(u, d, y);
            var x = e.add([], m, c), b = e.add([], m, u);
            p && (e.max(x, x, a), e.min(x, x, h), e.max(b, b, a), e.min(b, b, h)), l.push(x), l.push(b)
        }
        return o && l.push(l.shift()), l
    }
}), define("zrender/shape/Polygon", ["require", "./Base", "./util/smoothSpline", "./util/smoothBezier", "./util/dashedLineTo", "../tool/util"], function (t) {
    var e = t("./Base"), i = t("./util/smoothSpline"), o = t("./util/smoothBezier"), n = t("./util/dashedLineTo"), r = function (t) {
        e.call(this, t)
    };
    return r.prototype = {
        type: "polygon", brush: function (t, e) {
            var i = this.style;
            e && (i = this.getHighlightStyle(i, this.highlightStyle || {})), t.save(), this.setContext(t, i), this.setTransform(t);
            var o = !1;
            ("fill" == i.brushType || "both" == i.brushType || "undefined" == typeof i.brushType) && (t.beginPath(), "dashed" == i.lineType || "dotted" == i.lineType ? (this.buildPath(t, {
                lineType: "solid",
                lineWidth: i.lineWidth,
                pointList: i.pointList
            }), o = !1) : (this.buildPath(t, i), o = !0), t.closePath(), t.fill()), i.lineWidth > 0 && ("stroke" == i.brushType || "both" == i.brushType) && (o || (t.beginPath(), this.buildPath(t, i)), t.stroke()), this.drawText(t, i, this.style), t.restore()
        }, buildPath: function (t, e) {
            var r = e.pointList;
            if (!(r.length < 2))if (e.smooth && "spline" !== e.smooth) {
                var s = o(r, e.smooth, !0, e.smoothConstraint);
                t.moveTo(r[0][0], r[0][1]);
                for (var a, h, l, d = r.length, c = 0; d > c; c++)a = s[2 * c], h = s[2 * c + 1], l = r[(c + 1) % d], t.bezierCurveTo(a[0], a[1], h[0], h[1], l[0], l[1])
            } else if ("spline" === e.smooth && (r = i(r, !0)), e.lineType && "solid" != e.lineType) {
                if ("dashed" == e.lineType || "dotted" == e.lineType) {
                    var u = e._dashLength || (e.lineWidth || 1) * ("dashed" == e.lineType ? 5 : 1);
                    e._dashLength = u, t.moveTo(r[0][0], r[0][1]);
                    for (var c = 1, p = r.length; p > c; c++)n(t, r[c - 1][0], r[c - 1][1], r[c][0], r[c][1], u);
                    n(t, r[r.length - 1][0], r[r.length - 1][1], r[0][0], r[0][1], u)
                }
            } else {
                t.moveTo(r[0][0], r[0][1]);
                for (var c = 1, p = r.length; p > c; c++)t.lineTo(r[c][0], r[c][1]);
                t.lineTo(r[0][0], r[0][1])
            }
        }, getRect: function (t) {
            if (t.__rect)return t.__rect;
            for (var e = Number.MAX_VALUE, i = Number.MIN_VALUE, o = Number.MAX_VALUE, n = Number.MIN_VALUE, r = t.pointList, s = 0, a = r.length; a > s; s++)r[s][0] < e && (e = r[s][0]), r[s][0] > i && (i = r[s][0]), r[s][1] < o && (o = r[s][1]), r[s][1] > n && (n = r[s][1]);
            var h;
            return h = "stroke" == t.brushType || "fill" == t.brushType ? t.lineWidth || 1 : 0, t.__rect = {
                x: Math.round(e - h / 2),
                y: Math.round(o - h / 2),
                width: i - e + h,
                height: n - o + h
            }, t.__rect
        }
    }, t("../tool/util").inherits(r, e), r
}), define("echarts/util/shape/normalIsCover", [], function () {
    return function (t, e) {
        var i = this.getTansform(t, e);
        t = i[0], e = i[1];
        var o = this.style.__rect;
        return o || (o = this.style.__rect = this.getRect(this.style)), t >= o.x && t <= o.x + o.width && e >= o.y && e <= o.y + o.height
    }
}), define("echarts/component/dataView", ["require", "./base", "../config", "zrender/tool/util", "../component"], function (t) {
    function e(t, e, o, n, r) {
        i.call(this, t, e, o, n, r), this.dom = r.dom, this._tDom = document.createElement("div"), this._textArea = document.createElement("textArea"), this._buttonRefresh = document.createElement("button"), this._buttonClose = document.createElement("button"), this._hasShow = !1, this._zrHeight = o.getHeight(), this._zrWidth = o.getWidth(), this._tDom.className = "echarts-dataview", this.hide(), this.dom.firstChild.appendChild(this._tDom), window.addEventListener ? (this._tDom.addEventListener("click", this._stop), this._tDom.addEventListener("mousewheel", this._stop), this._tDom.addEventListener("mousemove", this._stop), this._tDom.addEventListener("mousedown", this._stop), this._tDom.addEventListener("mouseup", this._stop), this._tDom.addEventListener("touchstart", this._stop), this._tDom.addEventListener("touchmove", this._stop), this._tDom.addEventListener("touchend", this._stop)) : (this._tDom.attachEvent("onclick", this._stop), this._tDom.attachEvent("onmousewheel", this._stop), this._tDom.attachEvent("onmousemove", this._stop), this._tDom.attachEvent("onmousedown", this._stop), this._tDom.attachEvent("onmouseup", this._stop))
    }

    var i = t("./base"), o = t("../config"), n = t("zrender/tool/util");
    return e.prototype = {
        type: o.COMPONENT_TYPE_DATAVIEW,
        _lang: ["Data View", "close", "refresh"],
        _gCssText: "position:absolute;display:block;overflow:hidden;transition:height 0.8s,background-color 1s;-moz-transition:height 0.8s,background-color 1s;-webkit-transition:height 0.8s,background-color 1s;-o-transition:height 0.8s,background-color 1s;z-index:1;left:0;top:0;",
        hide: function () {
            this._sizeCssText = "width:" + this._zrWidth + "px;height:0px;background-color:#f0ffff;", this._tDom.style.cssText = this._gCssText + this._sizeCssText
        },
        show: function (t) {
            this._hasShow = !0;
            var e = this.query(this.option, "toolbox.feature.dataView.lang") || this._lang;
            this.option = t, this._tDom.innerHTML = '<p style="padding:8px 0;margin:0 0 10px 0;border-bottom:1px solid #eee">' + (e[0] || this._lang[0]) + "</p>", this._textArea.style.cssText = "display:block;margin:0 0 8px 0;padding:4px 6px;overflow:auto;width:" + (this._zrWidth - 15) + "px;height:" + (this._zrHeight - 100) + "px;";
            var i = this.query(this.option, "toolbox.feature.dataView.optionToContent");
            this._textArea.value = "function" != typeof i ? this._optionToContent() : i(this.option), this._tDom.appendChild(this._textArea), this._buttonClose.style.cssText = "float:right;padding:1px 6px;", this._buttonClose.innerHTML = e[1] || this._lang[1];
            var o = this;
            this._buttonClose.onclick = function () {
                o.hide()
            }, this._tDom.appendChild(this._buttonClose), this.query(this.option, "toolbox.feature.dataView.readOnly") === !1 ? (this._buttonRefresh.style.cssText = "float:right;margin-right:10px;padding:1px 6px;", this._buttonRefresh.innerHTML = e[2] || this._lang[2], this._buttonRefresh.onclick = function () {
                o._save()
            }, this._tDom.appendChild(this._buttonRefresh), this._textArea.readOnly = !1, this._textArea.style.cursor = "default") : (this._textArea.readOnly = !0, this._textArea.style.cursor = "text"), this._sizeCssText = "width:" + this._zrWidth + "px;height:" + this._zrHeight + "px;background-color:#fff;", this._tDom.style.cssText = this._gCssText + this._sizeCssText
        },
        _optionToContent: function () {
            var t, e, i, n, r, s, a = [], h = "";
            if (this.option.xAxis)for (a = this.option.xAxis instanceof Array ? this.option.xAxis : [this.option.xAxis], t = 0, n = a.length; n > t; t++)if ("category" == (a[t].type || "category")) {
                for (s = [], e = 0, i = a[t].data.length; i > e; e++)r = a[t].data[e], s.push("undefined" != typeof r.value ? r.value : r);
                h += s.join(", ") + "\n\n"
            }
            if (this.option.yAxis)for (a = this.option.yAxis instanceof Array ? this.option.yAxis : [this.option.yAxis], t = 0, n = a.length; n > t; t++)if ("category" == a[t].type) {
                for (s = [], e = 0, i = a[t].data.length; i > e; e++)r = a[t].data[e], s.push("undefined" != typeof r.value ? r.value : r);
                h += s.join(", ") + "\n\n"
            }
            var l, d = this.option.series;
            for (t = 0, n = d.length; n > t; t++) {
                for (s = [], e = 0, i = d[t].data.length; i > e; e++)r = d[t].data[e], l = d[t].type == o.CHART_TYPE_PIE || d[t].type == o.CHART_TYPE_MAP ? (r.name || "-") + ":" : "", d[t].type == o.CHART_TYPE_SCATTER && (r = "undefined" != typeof r.value ? r.value : r, r = r.join(", ")), s.push(l + ("undefined" != typeof r.value ? r.value : r));
                h += (d[t].name || "-") + " : \n", h += s.join(d[t].type == o.CHART_TYPE_SCATTER ? "\n" : ", "), h += "\n\n"
            }
            return h
        },
        _save: function () {
            var t = this._textArea.value, e = this.query(this.option, "toolbox.feature.dataView.contentToOption");
            if ("function" != typeof e) {
                t = t.split("\n");
                for (var i = [], n = 0, r = t.length; r > n; n++)t[n] = this._trim(t[n]), "" !== t[n] && i.push(t[n]);
                this._contentToOption(i)
            } else e(t, this.option);
            this.hide();
            var s = this;
            setTimeout(function () {
                s.messageCenter && s.messageCenter.dispatch(o.EVENT.DATA_VIEW_CHANGED, null, {option: s.option}, s.myChart)
            }, s.canvasSupported ? 800 : 100)
        },
        _contentToOption: function (t) {
            var e, i, n, r, s, a, h, l = [], d = 0;
            if (this.option.xAxis)for (l = this.option.xAxis instanceof Array ? this.option.xAxis : [this.option.xAxis], e = 0, r = l.length; r > e; e++)if ("category" == (l[e].type || "category")) {
                for (a = t[d].split(","), i = 0, n = l[e].data.length; n > i; i++)h = this._trim(a[i] || ""), s = l[e].data[i], "undefined" != typeof l[e].data[i].value ? l[e].data[i].value = h : l[e].data[i] = h;
                d++
            }
            if (this.option.yAxis)for (l = this.option.yAxis instanceof Array ? this.option.yAxis : [this.option.yAxis], e = 0, r = l.length; r > e; e++)if ("category" == l[e].type) {
                for (a = t[d].split(","), i = 0, n = l[e].data.length; n > i; i++)h = this._trim(a[i] || ""), s = l[e].data[i], "undefined" != typeof l[e].data[i].value ? l[e].data[i].value = h : l[e].data[i] = h;
                d++
            }
            var c = this.option.series;
            for (e = 0, r = c.length; r > e; e++)if (d++, c[e].type == o.CHART_TYPE_SCATTER)for (var i = 0, n = c[e].data.length; n > i; i++)a = t[d], h = a.replace(" ", "").split(","), "undefined" != typeof c[e].data[i].value ? c[e].data[i].value = h : c[e].data[i] = h, d++; else {
                a = t[d].split(",");
                for (var i = 0, n = c[e].data.length; n > i; i++)h = (a[i] || "").replace(/.*:/, ""), h = this._trim(h), h = "-" != h && "" !== h ? h - 0 : "-", "undefined" != typeof c[e].data[i].value ? c[e].data[i].value = h : c[e].data[i] = h;
                d++
            }
        },
        _trim: function (t) {
            var e = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+$)", "g");
            return t.replace(e, "")
        },
        _stop: function (t) {
            t = t || window.event, t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0
        },
        resize: function () {
            this._zrHeight = this.zr.getHeight(), this._zrWidth = this.zr.getWidth(), this._tDom.offsetHeight > 10 && (this._sizeCssText = "width:" + this._zrWidth + "px;height:" + this._zrHeight + "px;background-color:#fff;", this._tDom.style.cssText = this._gCssText + this._sizeCssText, this._textArea.style.cssText = "display:block;margin:0 0 8px 0;padding:4px 6px;overflow:auto;width:" + (this._zrWidth - 15) + "px;height:" + (this._zrHeight - 100) + "px;")
        },
        dispose: function () {
            window.removeEventListener ? (this._tDom.removeEventListener("click", this._stop), this._tDom.removeEventListener("mousewheel", this._stop), this._tDom.removeEventListener("mousemove", this._stop), this._tDom.removeEventListener("mousedown", this._stop), this._tDom.removeEventListener("mouseup", this._stop), this._tDom.removeEventListener("touchstart", this._stop), this._tDom.removeEventListener("touchmove", this._stop), this._tDom.removeEventListener("touchend", this._stop)) : (this._tDom.detachEvent("onclick", this._stop), this._tDom.detachEvent("onmousewheel", this._stop), this._tDom.detachEvent("onmousemove", this._stop), this._tDom.detachEvent("onmousedown", this._stop), this._tDom.detachEvent("onmouseup", this._stop)), this._buttonRefresh.onclick = null, this._buttonClose.onclick = null, this._hasShow && (this._tDom.removeChild(this._textArea), this._tDom.removeChild(this._buttonRefresh), this._tDom.removeChild(this._buttonClose)), this._textArea = null, this._buttonRefresh = null, this._buttonClose = null, this.dom.firstChild.removeChild(this._tDom), this._tDom = null
        }
    }, n.inherits(e, i), t("../component").define("dataView", e), e
}), define("echarts/util/shape/Cross", ["require", "zrender/shape/Base", "zrender/shape/Line", "zrender/tool/util", "./normalIsCover"], function (t) {
    function e(t) {
        i.call(this, t)
    }

    var i = t("zrender/shape/Base"), o = t("zrender/shape/Line"), n = t("zrender/tool/util");
    return e.prototype = {
        type: "cross", buildPath: function (t, e) {
            var i = e.rect;
            e.xStart = i.x, e.xEnd = i.x + i.width, e.yStart = e.yEnd = e.y, o.prototype.buildPath(t, e), e.xStart = e.xEnd = e.x, e.yStart = i.y, e.yEnd = i.y + i.height, o.prototype.buildPath(t, e)
        }, getRect: function (t) {
            return t.rect
        }, isCover: t("./normalIsCover")
    }, n.inherits(e, i), e
}), define("zrender/shape/Sector", ["require", "../tool/math", "../tool/computeBoundingBox", "../tool/vector", "./Base", "../tool/util"], function (t) {
    var e = t("../tool/math"), i = t("../tool/computeBoundingBox"), o = t("../tool/vector"), n = t("./Base"), r = o.create(), s = o.create(), a = o.create(), h = o.create(), l = function (t) {
        n.call(this, t)
    };
    return l.prototype = {
        type: "sector", buildPath: function (t, i) {
            var o = i.x, n = i.y, r = i.r0 || 0, s = i.r, a = i.startAngle, h = i.endAngle, l = i.clockWise || !1;
            a = e.degreeToRadian(a), h = e.degreeToRadian(h), l || (a = -a, h = -h);
            var d = e.cos(a), c = e.sin(a);
            t.moveTo(d * r + o, c * r + n), t.lineTo(d * s + o, c * s + n), t.arc(o, n, s, a, h, !l), t.lineTo(e.cos(h) * r + o, e.sin(h) * r + n), 0 !== r && t.arc(o, n, r, h, a, l), t.closePath()
        }, getRect: function (t) {
            if (t.__rect)return t.__rect;
            var n = t.x, l = t.y, d = t.r0 || 0, c = t.r, u = e.degreeToRadian(t.startAngle), p = e.degreeToRadian(t.endAngle), f = t.clockWise;
            return f || (u = -u, p = -p), d > 1 ? i.arc(n, l, d, u, p, !f, r, a) : (r[0] = a[0] = n, r[1] = a[1] = l), i.arc(n, l, c, u, p, !f, s, h), o.min(r, r, s), o.max(a, a, h), t.__rect = {
                x: r[0],
                y: r[1],
                width: a[0] - r[0],
                height: a[1] - r[1]
            }, t.__rect
        }
    }, t("../tool/util").inherits(l, n), l
}), define("echarts/util/shape/Candle", ["require", "zrender/shape/Base", "zrender/tool/util", "./normalIsCover"], function (t) {
    function e(t) {
        i.call(this, t)
    }

    var i = t("zrender/shape/Base"), o = t("zrender/tool/util");
    return e.prototype = {
        type: "candle", _numberOrder: function (t, e) {
            return e - t
        }, buildPath: function (t, e) {
            var i = o.clone(e.y).sort(this._numberOrder);
            t.moveTo(e.x, i[3]), t.lineTo(e.x, i[2]), t.moveTo(e.x - e.width / 2, i[2]), t.rect(e.x - e.width / 2, i[2], e.width, i[1] - i[2]), t.moveTo(e.x, i[1]), t.lineTo(e.x, i[0])
        }, getRect: function (t) {
            if (!t.__rect) {
                var e = 0;
                ("stroke" == t.brushType || "fill" == t.brushType) && (e = t.lineWidth || 1);
                var i = o.clone(t.y).sort(this._numberOrder);
                t.__rect = {
                    x: Math.round(t.x - t.width / 2 - e / 2),
                    y: Math.round(i[3] - e / 2),
                    width: t.width + e,
                    height: i[0] - i[3] + e
                }
            }
            return t.__rect
        }, isCover: t("./normalIsCover")
    }, o.inherits(e, i), e
}), define("zrender/tool/computeBoundingBox", ["require", "./vector", "./curve"], function (t) {
    function e(t, e, i) {
        if (0 !== t.length) {
            for (var o = t[0][0], n = t[0][0], r = t[0][1], s = t[0][1], a = 1; a < t.length; a++) {
                var h = t[a];
                h[0] < o && (o = h[0]), h[0] > n && (n = h[0]), h[1] < r && (r = h[1]), h[1] > s && (s = h[1])
            }
            e[0] = o, e[1] = r, i[0] = n, i[1] = s
        }
    }

    function i(t, e, i, o, n, s) {
        var a = [];
        r.cubicExtrema(t[0], e[0], i[0], o[0], a);
        for (var h = 0; h < a.length; h++)a[h] = r.cubicAt(t[0], e[0], i[0], o[0], a[h]);
        var l = [];
        r.cubicExtrema(t[1], e[1], i[1], o[1], l);
        for (var h = 0; h < l.length; h++)l[h] = r.cubicAt(t[1], e[1], i[1], o[1], l[h]);
        a.push(t[0], o[0]), l.push(t[1], o[1]);
        var d = Math.min.apply(null, a), c = Math.max.apply(null, a), u = Math.min.apply(null, l), p = Math.max.apply(null, l);
        n[0] = d, n[1] = u, s[0] = c, s[1] = p
    }

    function o(t, e, i, o, n) {
        var s = r.quadraticExtremum(t[0], e[0], i[0]), a = r.quadraticExtremum(t[1], e[1], i[1]);
        s = Math.max(Math.min(s, 1), 0), a = Math.max(Math.min(a, 1), 0);
        var h = 1 - s, l = 1 - a, d = h * h * t[0] + 2 * h * s * e[0] + s * s * i[0], c = h * h * t[1] + 2 * h * s * e[1] + s * s * i[1], u = l * l * t[0] + 2 * l * a * e[0] + a * a * i[0], p = l * l * t[1] + 2 * l * a * e[1] + a * a * i[1];
        o[0] = Math.min(t[0], i[0], d, u), o[1] = Math.min(t[1], i[1], c, p), n[0] = Math.max(t[0], i[0], d, u), n[1] = Math.max(t[1], i[1], c, p)
    }

    var n = t("./vector"), r = t("./curve"), s = n.create(), a = n.create(), h = n.create(), l = function (t, e, i, o, r, l, d, c) {
        if (s[0] = Math.cos(o) * i + t, s[1] = Math.sin(o) * i + e, a[0] = Math.cos(r) * i + t, a[1] = Math.sin(r) * i + e, n.min(d, s, a), n.max(c, s, a), o %= 2 * Math.PI, 0 > o && (o += 2 * Math.PI), r %= 2 * Math.PI, 0 > r && (r += 2 * Math.PI), o > r && !l ? r += 2 * Math.PI : r > o && l && (o += 2 * Math.PI), l) {
            var u = r;
            r = o, o = u
        }
        for (var p = 0; r > p; p += Math.PI / 2)p > o && (h[0] = Math.cos(p) * i + t, h[1] = Math.sin(p) * i + e, n.min(d, h, d), n.max(c, h, c))
    };
    return e.cubeBezier = i, e.quadraticBezier = o, e.arc = l, e
}), define("echarts/util/shape/Chain", ["require", "zrender/shape/Base", "./Icon", "zrender/shape/util/dashedLineTo", "zrender/tool/util", "zrender/tool/matrix"], function (t) {
    function e(t) {
        i.call(this, t)
    }

    var i = t("zrender/shape/Base"), o = t("./Icon"), n = t("zrender/shape/util/dashedLineTo"), r = t("zrender/tool/util"), s = t("zrender/tool/matrix");
    return e.prototype = {
        type: "chain", brush: function (t, e) {
            var i = this.style;
            e && (i = this.getHighlightStyle(i, this.highlightStyle || {})), t.save(), this.setContext(t, i), this.setTransform(t), t.save(), t.beginPath(), this.buildLinePath(t, i), t.stroke(), t.restore(), this.brushSymbol(t, i), t.restore()
        }, buildLinePath: function (t, e) {
            var i = e.x, o = e.y + 5, r = e.width, s = e.height / 2 - 10;
            if (t.moveTo(i, o), t.lineTo(i, o + s), t.moveTo(i + r, o), t.lineTo(i + r, o + s), t.moveTo(i, o + s / 2), e.lineType && "solid" != e.lineType) {
                if ("dashed" == e.lineType || "dotted" == e.lineType) {
                    var a = (e.lineWidth || 1) * ("dashed" == e.lineType ? 5 : 1);
                    n(t, i, o + s / 2, i + r, o + s / 2, a)
                }
            } else t.lineTo(i + r, o + s / 2)
        }, brushSymbol: function (t, e) {
            var i = e.y + e.height / 4;
            t.save();
            for (var n, r = e.chainPoint, s = 0, a = r.length; a > s; s++) {
                if (n = r[s], "none" != n.symbol) {
                    t.beginPath();
                    var h = n.symbolSize;
                    o.prototype.buildPath(t, {
                        iconType: n.symbol,
                        x: n.x - h,
                        y: i - h,
                        width: 2 * h,
                        height: 2 * h,
                        n: n.n
                    }), t.fillStyle = n.isEmpty ? "#fff" : e.strokeColor, t.closePath(), t.fill(), t.stroke()
                }
                n.showLabel && (t.font = n.textFont, t.fillStyle = n.textColor, t.textAlign = n.textAlign, t.textBaseline = n.textBaseline, n.rotation ? (t.save(), this._updateTextTransform(t, n.rotation), t.fillText(n.name, n.textX, n.textY), t.restore()) : t.fillText(n.name, n.textX, n.textY))
            }
            t.restore()
        }, _updateTextTransform: function (t, e) {
            var i = s.create();
            if (s.identity(i), 0 !== e[0]) {
                var o = e[1] || 0, n = e[2] || 0;
                (o || n) && s.translate(i, i, [-o, -n]), s.rotate(i, i, e[0]), (o || n) && s.translate(i, i, [o, n])
            }
            t.transform.apply(t, i)
        }, isCover: function (t, e) {
            var i = this.style;
            return t >= i.x && t <= i.x + i.width && e >= i.y && e <= i.y + i.height ? !0 : !1
        }
    }, r.inherits(e, i), e
}), define("zrender/shape/Ring", ["require", "./Base", "../tool/util"], function (t) {
    var e = t("./Base"), i = function (t) {
        e.call(this, t)
    };
    return i.prototype = {
        type: "ring", buildPath: function (t, e) {
            t.arc(e.x, e.y, e.r, 0, 2 * Math.PI, !1), t.moveTo(e.x + e.r0, e.y), t.arc(e.x, e.y, e.r0, 0, 2 * Math.PI, !0)
        }, getRect: function (t) {
            if (t.__rect)return t.__rect;
            var e;
            return e = "stroke" == t.brushType || "fill" == t.brushType ? t.lineWidth || 1 : 0, t.__rect = {
                x: Math.round(t.x - t.r - e / 2),
                y: Math.round(t.y - t.r - e / 2),
                width: 2 * t.r + e,
                height: 2 * t.r + e
            }, t.__rect
        }
    }, t("../tool/util").inherits(i, e), i
}), define("echarts/component/axis", ["require", "./base", "zrender/shape/Line", "../config", "../util/ecData", "zrender/tool/util", "zrender/tool/color", "./categoryAxis", "./valueAxis", "../component"], function (t) {
    function e(t, e, o, n, r, s) {
        i.call(this, t, e, o, n, r), this.axisType = s, this._axisList = [], this.refresh(n)
    }

    var i = t("./base"), o = t("zrender/shape/Line"), n = t("../config"), r = t("../util/ecData"), s = t("zrender/tool/util"), a = t("zrender/tool/color");
    return e.prototype = {
        type: n.COMPONENT_TYPE_AXIS, axisBase: {
            _buildAxisLine: function () {
                var t = this.option.axisLine.lineStyle.width, e = t / 2, i = {
                    _axisShape: "axisLine",
                    zlevel: this._zlevelBase + 1,
                    hoverable: !1
                };
                switch (this.option.position) {
                    case"left":
                        i.style = {
                            xStart: this.grid.getX() - e,
                            yStart: this.grid.getYend(),
                            xEnd: this.grid.getX() - e,
                            yEnd: this.grid.getY(),
                            lineCap: "round"
                        };
                        break;
                    case"right":
                        i.style = {
                            xStart: this.grid.getXend() + e,
                            yStart: this.grid.getYend(),
                            xEnd: this.grid.getXend() + e,
                            yEnd: this.grid.getY(),
                            lineCap: "round"
                        };
                        break;
                    case"bottom":
                        i.style = {
                            xStart: this.grid.getX(),
                            yStart: this.grid.getYend() + e,
                            xEnd: this.grid.getXend(),
                            yEnd: this.grid.getYend() + e,
                            lineCap: "round"
                        };
                        break;
                    case"top":
                        i.style = {
                            xStart: this.grid.getX(),
                            yStart: this.grid.getY() - e,
                            xEnd: this.grid.getXend(),
                            yEnd: this.grid.getY() - e,
                            lineCap: "round"
                        }
                }
                "" !== this.option.name && (i.style.text = this.option.name, i.style.textPosition = this.option.nameLocation, i.style.textFont = this.getFont(this.option.nameTextStyle), this.option.nameTextStyle.align && (i.style.textAlign = this.option.nameTextStyle.align), this.option.nameTextStyle.baseline && (i.style.textBaseline = this.option.nameTextStyle.baseline), this.option.nameTextStyle.color && (i.style.textColor = this.option.nameTextStyle.color)), i.style.strokeColor = this.option.axisLine.lineStyle.color, i.style.lineWidth = t, this.isHorizontal() ? i.style.yStart = i.style.yEnd = this.subPixelOptimize(i.style.yEnd, t) : i.style.xStart = i.style.xEnd = this.subPixelOptimize(i.style.xEnd, t), i.style.lineType = this.option.axisLine.lineStyle.type, i = new o(i), this.shapeList.push(i)
            }, _axisLabelClickable: function (t, e) {
                return t ? (r.pack(e, void 0, -1, void 0, -1, e.style.text), e.hoverable = !0, e.clickable = !0, e.highlightStyle = {
                    color: a.lift(e.style.color, 1),
                    brushType: "fill"
                }, e) : e
            }, refixAxisShape: function (t, e) {
                if (this.option.axisLine.onZero) {
                    var i;
                    if (this.isHorizontal() && null != e)for (var o = 0, n = this.shapeList.length; n > o; o++)"axisLine" === this.shapeList[o]._axisShape ? (this.shapeList[o].style.yStart = this.shapeList[o].style.yEnd = this.subPixelOptimize(e, this.shapeList[o].stylelineWidth), this.zr.modShape(this.shapeList[o].id)) : "axisTick" === this.shapeList[o]._axisShape && (i = this.shapeList[o].style.yEnd - this.shapeList[o].style.yStart, this.shapeList[o].style.yStart = e - i, this.shapeList[o].style.yEnd = e, this.zr.modShape(this.shapeList[o].id));
                    if (!this.isHorizontal() && null != t)for (var o = 0, n = this.shapeList.length; n > o; o++)"axisLine" === this.shapeList[o]._axisShape ? (this.shapeList[o].style.xStart = this.shapeList[o].style.xEnd = this.subPixelOptimize(t, this.shapeList[o].stylelineWidth), this.zr.modShape(this.shapeList[o].id)) : "axisTick" === this.shapeList[o]._axisShape && (i = this.shapeList[o].style.xEnd - this.shapeList[o].style.xStart, this.shapeList[o].style.xStart = t, this.shapeList[o].style.xEnd = t + i, this.zr.modShape(this.shapeList[o].id))
                }
            }, getPosition: function () {
                return this.option.position
            }, isHorizontal: function () {
                return "bottom" === this.option.position || "top" === this.option.position
            }
        }, reformOption: function (t) {
            if (!t || t instanceof Array && 0 === t.length ? t = [{type: n.COMPONENT_TYPE_AXIS_VALUE}] : t instanceof Array || (t = [t]), t.length > 2 && (t = [t[0], t[1]]), "xAxis" === this.axisType) {
                (!t[0].position || "bottom" != t[0].position && "top" != t[0].position) && (t[0].position = "bottom"), t.length > 1 && (t[1].position = "bottom" === t[0].position ? "top" : "bottom");
                for (var e = 0, i = t.length; i > e; e++)t[e].type = t[e].type || "category", t[e].xAxisIndex = e, t[e].yAxisIndex = -1
            } else {
                (!t[0].position || "left" != t[0].position && "right" != t[0].position) && (t[0].position = "left"), t.length > 1 && (t[1].position = "left" === t[0].position ? "right" : "left");
                for (var e = 0, i = t.length; i > e; e++)t[e].type = t[e].type || "value", t[e].xAxisIndex = -1, t[e].yAxisIndex = e
            }
            return t
        }, refresh: function (e) {
            var i;
            e && (this.option = e, "xAxis" === this.axisType ? (this.option.xAxis = this.reformOption(e.xAxis), i = this.option.xAxis) : (this.option.yAxis = this.reformOption(e.yAxis), i = this.option.yAxis), this.series = e.series);
            for (var o = t("./categoryAxis"), n = t("./valueAxis"), r = Math.max(i && i.length || 0, this._axisList.length), s = 0; r > s; s++)!this._axisList[s] || !e || i[s] && this._axisList[s].type == i[s].type || (this._axisList[s].dispose && this._axisList[s].dispose(), this._axisList[s] = !1), this._axisList[s] ? this._axisList[s].refresh && this._axisList[s].refresh(i ? i[s] : !1, this.series) : i && i[s] && (this._axisList[s] = "category" === i[s].type ? new o(this.ecTheme, this.messageCenter, this.zr, i[s], this.myChart, this.axisBase) : new n(this.ecTheme, this.messageCenter, this.zr, i[s], this.myChart, this.axisBase, this.series))
        }, getAxis: function (t) {
            return this._axisList[t]
        }, clear: function () {
            for (var t = 0, e = this._axisList.length; e > t; t++)this._axisList[t].dispose && this._axisList[t].dispose();
            this._axisList = []
        }
    }, s.inherits(e, i), t("../component").define("axis", e), e
}), define("echarts/component/grid", ["require", "./base", "zrender/shape/Rectangle", "../config", "zrender/tool/util", "../component"], function (t) {
    function e(t, e, o, n, r) {
        i.call(this, t, e, o, n, r), this.refresh(n)
    }

    var i = t("./base"), o = t("zrender/shape/Rectangle"), n = t("../config"), r = t("zrender/tool/util");
    return e.prototype = {
        type: n.COMPONENT_TYPE_GRID, getX: function () {
            return this._x
        }, getY: function () {
            return this._y
        }, getWidth: function () {
            return this._width
        }, getHeight: function () {
            return this._height
        }, getXend: function () {
            return this._x + this._width
        }, getYend: function () {
            return this._y + this._height
        }, getArea: function () {
            return {x: this._x, y: this._y, width: this._width, height: this._height}
        }, getBbox: function () {
            return [[this._x, this._y], [this.getXend(), this.getYend()]]
        }, refixAxisShape: function (t) {
            for (var e, i, o, r = t.xAxis._axisList.concat(t.yAxis ? t.yAxis._axisList : []), s = r.length; s--;)o = r[s], o.type == n.COMPONENT_TYPE_AXIS_VALUE && o._min < 0 && o._max >= 0 && (o.isHorizontal() ? e = o.getCoord(0) : i = o.getCoord(0));
            if ("undefined" != typeof e || "undefined" != typeof i)for (s = r.length; s--;)r[s].refixAxisShape(e, i)
        }, refresh: function (t) {
            if (t || this._zrWidth != this.zr.getWidth() || this._zrHeight != this.zr.getHeight()) {
                this.clear(), this.option = t || this.option, this.option.grid = this.reformOption(this.option.grid);
                var e = this.option.grid;
                this._zrWidth = this.zr.getWidth(), this._zrHeight = this.zr.getHeight(), this._x = this.parsePercent(e.x, this._zrWidth), this._y = this.parsePercent(e.y, this._zrHeight);
                var i = this.parsePercent(e.x2, this._zrWidth), n = this.parsePercent(e.y2, this._zrHeight);
                this._width = "undefined" == typeof e.width ? this._zrWidth - this._x - i : this.parsePercent(e.width, this._zrWidth), this._width = this._width <= 0 ? 10 : this._width, this._height = "undefined" == typeof e.height ? this._zrHeight - this._y - n : this.parsePercent(e.height, this._zrHeight), this._height = this._height <= 0 ? 10 : this._height, this._x = this.subPixelOptimize(this._x, e.borderWidth), this._y = this.subPixelOptimize(this._y, e.borderWidth), this.shapeList.push(new o({
                    zlevel: this._zlevelBase,
                    hoverable: !1,
                    style: {
                        x: this._x,
                        y: this._y,
                        width: this._width,
                        height: this._height,
                        brushType: e.borderWidth > 0 ? "both" : "fill",
                        color: e.backgroundColor,
                        strokeColor: e.borderColor,
                        lineWidth: e.borderWidth
                    }
                })), this.zr.addShape(this.shapeList[0])
            }
        }
    }, r.inherits(e, i), t("../component").define("grid", e), e
}), define("echarts/component/dataZoom", ["require", "./base", "zrender/shape/Rectangle", "zrender/shape/Polygon", "../util/shape/Icon", "../config", "../util/date", "zrender/tool/util", "../component"], function (t) {
    function e(t, e, o, n, r) {
        i.call(this, t, e, o, n, r);
        var s = this;
        s._ondrift = function (t, e) {
            return s.__ondrift(this, t, e)
        }, s._ondragend = function () {
            return s.__ondragend()
        }, this._fillerSize = 28, this._handleSize = 8, this._isSilence = !1, this._zoom = {}, this.option.dataZoom = this.reformOption(this.option.dataZoom), this.zoomOption = this.option.dataZoom, this.myChart.canvasSupported || (this.zoomOption.realtime = !1), this._location = this._getLocation(), this._zoom = this._getZoom(), this._backupData(), this.option.dataZoom.show && this._buildShape(), this._syncData()
    }

    var i = t("./base"), o = t("zrender/shape/Rectangle"), n = t("zrender/shape/Polygon"), r = t("../util/shape/Icon"), s = t("../config"), a = t("../util/date"), h = t("zrender/tool/util");
    return e.prototype = {
        type: s.COMPONENT_TYPE_DATAZOOM, _buildShape: function () {
            this._buildBackground(), this._buildFiller(), this._buildHandle(), this._buildFrame();
            for (var t = 0, e = this.shapeList.length; e > t; t++)this.zr.addShape(this.shapeList[t]);
            this._syncFrameShape()
        }, _getLocation: function () {
            var t, e, i, o, n = this.component.grid;
            return "horizontal" == this.zoomOption.orient ? (i = this.zoomOption.width || n.getWidth(), o = this.zoomOption.height || this._fillerSize, t = null != this.zoomOption.x ? this.zoomOption.x : n.getX(), e = null != this.zoomOption.y ? this.zoomOption.y : this.zr.getHeight() - o - 2) : (i = this.zoomOption.width || this._fillerSize, o = this.zoomOption.height || n.getHeight(), t = null != this.zoomOption.x ? this.zoomOption.x : 2, e = null != this.zoomOption.y ? this.zoomOption.y : n.getY()), {
                x: t,
                y: e,
                width: i,
                height: o
            }
        }, _getZoom: function () {
            var t = this.option.series, e = this.option.xAxis;
            !e || e instanceof Array || (e = [e], this.option.xAxis = e);
            var i = this.option.yAxis;
            !i || i instanceof Array || (i = [i], this.option.yAxis = i);
            var o, n, r = [], a = this.zoomOption.xAxisIndex;
            if (e && null == a) {
                o = [];
                for (var h = 0, l = e.length; l > h; h++)("category" == e[h].type || null == e[h].type) && o.push(h)
            } else o = a instanceof Array ? a : null != a ? [a] : [];
            if (a = this.zoomOption.yAxisIndex, i && null == a) {
                n = [];
                for (var h = 0, l = i.length; l > h; h++)"category" == i[h].type && n.push(h)
            } else n = a instanceof Array ? a : null != a ? [a] : [];
            for (var d, h = 0, l = t.length; l > h; h++)if (d = t[h], d.type == s.CHART_TYPE_LINE || d.type == s.CHART_TYPE_BAR || d.type == s.CHART_TYPE_SCATTER || d.type == s.CHART_TYPE_K) {
                for (var c = 0, u = o.length; u > c; c++)if (o[c] == (d.xAxisIndex || 0)) {
                    r.push(h);
                    break
                }
                for (var c = 0, u = n.length; u > c; c++)if (n[c] == (d.yAxisIndex || 0)) {
                    r.push(h);
                    break
                }
                null == this.zoomOption.xAxisIndex && null == this.zoomOption.yAxisIndex && d.data && d.data[0] && d.data[0]instanceof Array && (d.type == s.CHART_TYPE_SCATTER || d.type == s.CHART_TYPE_LINE || d.type == s.CHART_TYPE_BAR) && r.push(h)
            }
            var p = null != this._zoom.start ? this._zoom.start : null != this.zoomOption.start ? this.zoomOption.start : 0, f = null != this._zoom.end ? this._zoom.end : null != this.zoomOption.end ? this.zoomOption.end : 100;
            p > f && (p += f, f = p - f, p -= f);
            var g = Math.round((f - p) / 100 * ("horizontal" == this.zoomOption.orient ? this._location.width : this._location.height));
            return {
                start: p,
                end: f,
                start2: 0,
                end2: 100,
                size: g,
                xAxisIndex: o,
                yAxisIndex: n,
                seriesIndex: r,
                scatterMap: this._zoom.scatterMap || {}
            }
        }, _backupData: function () {
            this._originalData = {xAxis: {}, yAxis: {}, series: {}};
            for (var t = this.option.xAxis, e = this._zoom.xAxisIndex, i = 0, o = e.length; o > i; i++)this._originalData.xAxis[e[i]] = t[e[i]].data;
            for (var n = this.option.yAxis, r = this._zoom.yAxisIndex, i = 0, o = r.length; o > i; i++)this._originalData.yAxis[r[i]] = n[r[i]].data;
            for (var a, h = this.option.series, l = this._zoom.seriesIndex, i = 0, o = l.length; o > i; i++)a = h[l[i]], this._originalData.series[l[i]] = a.data, a.data && a.data[0] && a.data[0]instanceof Array && (a.type == s.CHART_TYPE_SCATTER || a.type == s.CHART_TYPE_LINE || a.type == s.CHART_TYPE_BAR) && (this._backupScale(), this._calculScatterMap(l[i]))
        }, _calculScatterMap: function (e) {
            this._zoom.scatterMap = this._zoom.scatterMap || {}, this._zoom.scatterMap[e] = this._zoom.scatterMap[e] || {};
            var i = t("../component"), o = i.get("axis"), n = h.clone(this.option.xAxis);
            "category" == n[0].type && (n[0].type = "value"), n[1] && "category" == n[1].type && (n[1].type = "value");
            var r = new o(this.ecTheme, null, !1, {
                xAxis: n,
                series: this.option.series
            }, this, "xAxis"), s = this.option.series[e].xAxisIndex || 0;
            this._zoom.scatterMap[e].x = r.getAxis(s).getExtremum(), r.dispose(), n = h.clone(this.option.yAxis), "category" == n[0].type && (n[0].type = "value"), n[1] && "category" == n[1].type && (n[1].type = "value"), r = new o(this.ecTheme, null, !1, {
                yAxis: n,
                series: this.option.series
            }, this, "yAxis"), s = this.option.series[e].yAxisIndex || 0, this._zoom.scatterMap[e].y = r.getAxis(s).getExtremum(), r.dispose()
        }, _buildBackground: function () {
            var t = this._location.width, e = this._location.height;
            this.shapeList.push(new o({
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {
                    x: this._location.x,
                    y: this._location.y,
                    width: t,
                    height: e,
                    color: this.zoomOption.backgroundColor
                }
            }));
            for (var i = 0, r = this._originalData.xAxis, a = this._zoom.xAxisIndex, h = 0, l = a.length; l > h; h++)i = Math.max(i, r[a[h]].length);
            for (var d = this._originalData.yAxis, c = this._zoom.yAxisIndex, h = 0, l = c.length; l > h; h++)i = Math.max(i, d[c[h]].length);
            for (var u, p = this._zoom.seriesIndex[0], f = this._originalData.series[p], g = Number.MIN_VALUE, m = Number.MAX_VALUE, h = 0, l = f.length; l > h; h++)u = null != f[h] ? null != f[h].value ? f[h].value : f[h] : 0, this.option.series[p].type == s.CHART_TYPE_K && (u = u[1]), isNaN(u) && (u = 0), g = Math.max(g, u), m = Math.min(m, u);
            var _ = g - m, y = [], v = t / (i - (i > 1 ? 1 : 0)), x = e / (i - (i > 1 ? 1 : 0)), b = 1;
            "horizontal" == this.zoomOption.orient && 1 > v ? b = Math.floor(3 * i / t) : "vertical" == this.zoomOption.orient && 1 > x && (b = Math.floor(3 * i / e));
            for (var h = 0, l = i; l > h; h += b)u = null != f[h] ? null != f[h].value ? f[h].value : f[h] : 0, this.option.series[p].type == s.CHART_TYPE_K && (u = u[1]), isNaN(u) && (u = 0), y.push("horizontal" == this.zoomOption.orient ? [this._location.x + v * h, this._location.y + e - 1 - Math.round((u - m) / _ * (e - 10))] : [this._location.x + 1 + Math.round((u - m) / _ * (t - 10)), this._location.y + x * h]);
            "horizontal" == this.zoomOption.orient ? (y.push([this._location.x + t, this._location.y + e]), y.push([this._location.x, this._location.y + e])) : (y.push([this._location.x, this._location.y + e]), y.push([this._location.x, this._location.y])), this.shapeList.push(new n({
                zlevel: this._zlevelBase,
                style: {pointList: y, color: this.zoomOption.dataBackgroundColor},
                hoverable: !1
            }))
        }, _buildFiller: function () {
            this._fillerShae = {
                zlevel: this._zlevelBase,
                draggable: !0,
                ondrift: this._ondrift,
                ondragend: this._ondragend,
                _type: "filler"
            }, this._fillerShae.style = "horizontal" == this.zoomOption.orient ? {
                x: this._location.x + Math.round(this._zoom.start / 100 * this._location.width) + this._handleSize,
                y: this._location.y,
                width: this._zoom.size - 2 * this._handleSize,
                height: this._location.height,
                color: this.zoomOption.fillerColor,
                text: ":::",
                textPosition: "inside"
            } : {
                x: this._location.x,
                y: this._location.y + Math.round(this._zoom.start / 100 * this._location.height) + this._handleSize,
                width: this._location.width,
                height: this._zoom.size - 2 * this._handleSize,
                color: this.zoomOption.fillerColor,
                text: "::",
                textPosition: "inside"
            }, this._fillerShae.highlightStyle = {
                brushType: "fill",
                color: "rgba(0,0,0,0)"
            }, this._fillerShae = new o(this._fillerShae), this.shapeList.push(this._fillerShae)
        }, _buildHandle: function () {
            this._startShape = {
                zlevel: this._zlevelBase,
                draggable: !0,
                style: {
                    iconType: "rectangle",
                    x: this._location.x,
                    y: this._location.y,
                    width: this._handleSize,
                    height: this._handleSize,
                    color: this.zoomOption.handleColor,
                    text: "=",
                    textPosition: "inside"
                },
                highlightStyle: {text: "", brushType: "fill", textPosition: "left"},
                ondrift: this._ondrift,
                ondragend: this._ondragend
            }, "horizontal" == this.zoomOption.orient ? (this._startShape.style.height = this._location.height, this._endShape = h.clone(this._startShape), this._startShape.style.x = this._fillerShae.style.x - this._handleSize, this._endShape.style.x = this._fillerShae.style.x + this._fillerShae.style.width, this._endShape.highlightStyle.textPosition = "right") : (this._startShape.style.width = this._location.width, this._endShape = h.clone(this._startShape), this._startShape.style.y = this._fillerShae.style.y - this._handleSize, this._startShape.highlightStyle.textPosition = "top", this._endShape.style.y = this._fillerShae.style.y + this._fillerShae.style.height, this._endShape.highlightStyle.textPosition = "bottom"), this._startShape = new r(this._startShape), this._endShape = new r(this._endShape), this.shapeList.push(this._startShape), this.shapeList.push(this._endShape)
        }, _buildFrame: function () {
            var t = this.subPixelOptimize(this._location.x, 1), e = this.subPixelOptimize(this._location.y, 1);
            this._startFrameShape = {
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {
                    x: t,
                    y: e,
                    width: this._location.width - (t > this._location.x ? 1 : 0),
                    height: this._location.height - (e > this._location.y ? 1 : 0),
                    lineWidth: 1,
                    brushType: "stroke",
                    strokeColor: this.zoomOption.handleColor
                }
            }, this._endFrameShape = h.clone(this._startFrameShape), this._startFrameShape = new o(this._startFrameShape), this._endFrameShape = new o(this._endFrameShape), this.shapeList.push(this._startFrameShape), this.shapeList.push(this._endFrameShape)
        }, _syncHandleShape: function () {
            "horizontal" == this.zoomOption.orient ? (this._startShape.style.x = this._fillerShae.style.x - this._handleSize, this._endShape.style.x = this._fillerShae.style.x + this._fillerShae.style.width, this._zoom.start = Math.floor((this._startShape.style.x - this._location.x) / this._location.width * 100), this._zoom.end = Math.ceil((this._endShape.style.x + this._handleSize - this._location.x) / this._location.width * 100)) : (this._startShape.style.y = this._fillerShae.style.y - this._handleSize, this._endShape.style.y = this._fillerShae.style.y + this._fillerShae.style.height, this._zoom.start = Math.floor((this._startShape.style.y - this._location.y) / this._location.height * 100), this._zoom.end = Math.ceil((this._endShape.style.y + this._handleSize - this._location.y) / this._location.height * 100)), this.zr.modShape(this._startShape.id), this.zr.modShape(this._endShape.id), this._syncFrameShape(), this.zr.refresh()
        }, _syncFillerShape: function () {
            var t, e;
            "horizontal" == this.zoomOption.orient ? (t = this._startShape.style.x, e = this._endShape.style.x, this._fillerShae.style.x = Math.min(t, e) + this._handleSize, this._fillerShae.style.width = Math.abs(t - e) - this._handleSize, this._zoom.start = Math.floor((Math.min(t, e) - this._location.x) / this._location.width * 100), this._zoom.end = Math.ceil((Math.max(t, e) + this._handleSize - this._location.x) / this._location.width * 100)) : (t = this._startShape.style.y, e = this._endShape.style.y, this._fillerShae.style.y = Math.min(t, e) + this._handleSize, this._fillerShae.style.height = Math.abs(t - e) - this._handleSize, this._zoom.start = Math.floor((Math.min(t, e) - this._location.y) / this._location.height * 100), this._zoom.end = Math.ceil((Math.max(t, e) + this._handleSize - this._location.y) / this._location.height * 100)), this.zr.modShape(this._fillerShae.id), this._syncFrameShape(), this.zr.refresh()
        }, _syncFrameShape: function () {
            "horizontal" == this.zoomOption.orient ? (this._startFrameShape.style.width = this._fillerShae.style.x - this._location.x, this._endFrameShape.style.x = this._fillerShae.style.x + this._fillerShae.style.width, this._endFrameShape.style.width = this._location.x + this._location.width - this._endFrameShape.style.x) : (this._startFrameShape.style.height = this._fillerShae.style.y - this._location.y, this._endFrameShape.style.y = this._fillerShae.style.y + this._fillerShae.style.height, this._endFrameShape.style.height = this._location.y + this._location.height - this._endFrameShape.style.y), this.zr.modShape(this._startFrameShape.id), this.zr.modShape(this._endFrameShape.id)
        }, _syncShape: function () {
            this.zoomOption.show && ("horizontal" == this.zoomOption.orient ? (this._startShape.style.x = this._location.x + this._zoom.start / 100 * this._location.width, this._endShape.style.x = this._location.x + this._zoom.end / 100 * this._location.width - this._handleSize, this._fillerShae.style.x = this._startShape.style.x + this._handleSize, this._fillerShae.style.width = this._endShape.style.x - this._startShape.style.x - this._handleSize) : (this._startShape.style.y = this._location.y + this._zoom.start / 100 * this._location.height, this._endShape.style.y = this._location.y + this._zoom.end / 100 * this._location.height - this._handleSize, this._fillerShae.style.y = this._startShape.style.y + this._handleSize, this._fillerShae.style.height = this._endShape.style.y - this._startShape.style.y - this._handleSize), this.zr.modShape(this._startShape.id), this.zr.modShape(this._endShape.id), this.zr.modShape(this._fillerShae.id), this._syncFrameShape(), this.zr.refresh())
        }, _syncData: function (t) {
            var e, i, o, n, r;
            for (var a in this._originalData) {
                e = this._originalData[a];
                for (var h in e)r = e[h], null != r && (n = r.length, i = Math.floor(this._zoom.start / 100 * n), o = Math.ceil(this._zoom.end / 100 * n), this.option[a][h].data[0]instanceof Array && this.option[a][h].type != s.CHART_TYPE_K ? (this._setScale(), this.option[a][h].data = this._synScatterData(h, r)) : this.option[a][h].data = r.slice(i, o))
            }
            this._isSilence || !this.zoomOption.realtime && !t || this.messageCenter.dispatch(s.EVENT.DATA_ZOOM, null, {zoom: this._zoom}, this.myChart)
        }, _synScatterData: function (t, e) {
            if (0 === this._zoom.start && 100 == this._zoom.end && 0 === this._zoom.start2 && 100 == this._zoom.end2)return e;
            var i, o, n, r, s, a = [], h = this._zoom.scatterMap[t];
            "horizontal" == this.zoomOption.orient ? (i = h.x.max - h.x.min, o = this._zoom.start / 100 * i + h.x.min, n = this._zoom.end / 100 * i + h.x.min, i = h.y.max - h.y.min, r = this._zoom.start2 / 100 * i + h.y.min, s = this._zoom.end2 / 100 * i + h.y.min) : (i = h.x.max - h.x.min, o = this._zoom.start2 / 100 * i + h.x.min, n = this._zoom.end2 / 100 * i + h.x.min, i = h.y.max - h.y.min, r = this._zoom.start / 100 * i + h.y.min, s = this._zoom.end / 100 * i + h.y.min);
            for (var l, d = 0, c = e.length; c > d; d++)l = e[d].value || e[d], l[0] >= o && l[0] <= n && l[1] >= r && l[1] <= s && a.push(e[d]);
            return a
        }, _setScale: function () {
            var t = 0 !== this._zoom.start || 100 !== this._zoom.end || 0 !== this._zoom.start2 || 100 !== this._zoom.end2, e = {
                xAxis: this.option.xAxis,
                yAxis: this.option.yAxis
            };
            for (var i in e)for (var o = 0, n = e[i].length; n > o; o++)e[i][o].scale = t || e[i][o]._scale
        }, _backupScale: function () {
            var t = {xAxis: this.option.xAxis, yAxis: this.option.yAxis};
            for (var e in t)for (var i = 0, o = t[e].length; o > i; i++)t[e][i]._scale = t[e][i].scale
        }, _getDetail: function () {
            var t = "horizontal" == this.zoomOption.orient ? "xAxis" : "yAxis", e = this._originalData[t];
            for (var i in e) {
                var o = e[i];
                if (null != o) {
                    var n = o.length, r = Math.floor(this._zoom.start / 100 * n), s = Math.ceil(this._zoom.end / 100 * n);
                    return s -= s >= n ? 1 : 0, {
                        start: null != o[r].value ? o[r].value : o[r],
                        end: null != o[s].value ? o[s].value : o[s]
                    }
                }
            }
            var h = this._zoom.seriesIndex[0], l = this.option.series[h][t + "Index"] || 0, d = this.option[t][l].type, c = this._zoom.scatterMap[h][t.charAt(0)].min, u = this._zoom.scatterMap[h][t.charAt(0)].max, p = u - c;
            if ("value" == d)return {start: c + p * this._zoom.start / 100, end: c + p * this._zoom.end / 100};
            if ("time" == d) {
                u = c + p * this._zoom.end / 100, c += p * this._zoom.start / 100;
                var f = a.getAutoFormatter(c, u).formatter;
                return {start: a.format(f, c), end: a.format(f, u)}
            }
            return {start: "", end: ""}
        }, __ondrift: function (t, e, i) {
            this.zoomOption.zoomLock && (t = this._fillerShae);
            var o = "filler" == t._type ? this._handleSize : 0;
            if ("horizontal" == this.zoomOption.orient ? t.style.x + e - o <= this._location.x ? t.style.x = this._location.x + o : t.style.x + e + t.style.width + o >= this._location.x + this._location.width ? t.style.x = this._location.x + this._location.width - t.style.width - o : t.style.x += e : t.style.y + i - o <= this._location.y ? t.style.y = this._location.y + o : t.style.y + i + t.style.height + o >= this._location.y + this._location.height ? t.style.y = this._location.y + this._location.height - t.style.height - o : t.style.y += i, "filler" == t._type ? this._syncHandleShape() : this._syncFillerShape(), this.zoomOption.realtime && this._syncData(), this.zoomOption.showDetail) {
                var n = this._getDetail();
                this._startShape.style.text = this._startShape.highlightStyle.text = n.start, this._endShape.style.text = this._endShape.highlightStyle.text = n.end, this._startShape.style.textPosition = this._startShape.highlightStyle.textPosition, this._endShape.style.textPosition = this._endShape.highlightStyle.textPosition
            }
            return !0
        }, __ondragend: function () {
            this.zoomOption.showDetail && (this._startShape.style.text = this._endShape.style.text = "=", this._startShape.style.textPosition = this._endShape.style.textPosition = "inside", this.zr.modShape(this._startShape.id), this.zr.modShape(this._endShape.id), this.zr.refreshNextFrame()), this.isDragend = !0
        }, ondragend: function (t, e) {
            this.isDragend && t.target && (!this.zoomOption.realtime && this._syncData(), e.dragOut = !0, e.dragIn = !0, this._isSilence || this.zoomOption.realtime || this.messageCenter.dispatch(s.EVENT.DATA_ZOOM, null, {zoom: this._zoom}, this.myChart), e.needRefresh = !1, this.isDragend = !1)
        }, ondataZoom: function (t, e) {
            e.needRefresh = !0
        }, absoluteZoom: function (t) {
            this._zoom.start = t.start, this._zoom.end = t.end, this._zoom.start2 = t.start2, this._zoom.end2 = t.end2, this._syncShape(), this._syncData(!0)
        }, rectZoom: function (t) {
            if (!t)return this._zoom.start = this._zoom.start2 = 0, this._zoom.end = this._zoom.end2 = 100, this._syncShape(), this._syncData(!0), this._zoom;
            var e = this.component.grid.getArea(), i = {x: t.x, y: t.y, width: t.width, height: t.height};
            if (i.width < 0 && (i.x += i.width, i.width = -i.width), i.height < 0 && (i.y += i.height, i.height = -i.height), i.x > e.x + e.width || i.y > e.y + e.height)return !1;
            i.x < e.x && (i.x = e.x), i.x + i.width > e.x + e.width && (i.width = e.x + e.width - i.x), i.y + i.height > e.y + e.height && (i.height = e.y + e.height - i.y);
            var o, n = (i.x - e.x) / e.width, r = 1 - (i.x + i.width - e.x) / e.width, s = 1 - (i.y + i.height - e.y) / e.height, a = (i.y - e.y) / e.height;
            return "horizontal" == this.zoomOption.orient ? (o = this._zoom.end - this._zoom.start, this._zoom.start += o * n, this._zoom.end -= o * r, o = this._zoom.end2 - this._zoom.start2, this._zoom.start2 += o * s, this._zoom.end2 -= o * a) : (o = this._zoom.end - this._zoom.start, this._zoom.start += o * s, this._zoom.end -= o * a, o = this._zoom.end2 - this._zoom.start2, this._zoom.start2 += o * n, this._zoom.end2 -= o * r), this._syncShape(), this._syncData(!0), this._zoom
        }, syncBackupData: function (t) {
            for (var e, i, o = this._originalData.series, n = t.series, r = 0, s = n.length; s > r; r++) {
                i = n[r].data || n[r].eventList, e = o[r] ? Math.floor(this._zoom.start / 100 * o[r].length) : 0;
                for (var a = 0, h = i.length; h > a; a++)o[r] && (o[r][a + e] = i[a])
            }
        }, syncOption: function (t) {
            this.silence(!0), this.option = t, this.option.dataZoom = this.reformOption(this.option.dataZoom), this.zoomOption = this.option.dataZoom, this.myChart.canvasSupported || (this.zoomOption.realtime = !1), this.clear(), this._location = this._getLocation(), this._zoom = this._getZoom(), this._backupData(), this.option.dataZoom && this.option.dataZoom.show && this._buildShape(), this._syncData(), this.silence(!1)
        }, silence: function (t) {
            this._isSilence = t
        }, getRealDataIndex: function (t, e) {
            if (!this._originalData || 0 === this._zoom.start && 100 == this._zoom.end)return e;
            var i = this._originalData.series;
            return i[t] ? Math.floor(this._zoom.start / 100 * i[t].length) + e : -1
        }, resize: function () {
            this.clear(), this._location = this._getLocation(), this._zoom = this._getZoom(), this.option.dataZoom.show && this._buildShape()
        }
    }, h.inherits(e, i), t("../component").define("dataZoom", e), e
}), define("echarts/component/categoryAxis", ["require", "./base", "zrender/shape/Text", "zrender/shape/Line", "zrender/shape/Rectangle", "../config", "zrender/tool/util", "zrender/tool/area", "../component"], function (t) {
    function e(t, e, o, n, r, s) {
        if (n.data.length < 1)return void console.error("option.data.length < 1.");
        i.call(this, t, e, o, n, r), this.grid = this.component.grid;
        for (var a in s)this[a] = s[a];
        this.refresh(n)
    }

    var i = t("./base"), o = t("zrender/shape/Text"), n = t("zrender/shape/Line"), r = t("zrender/shape/Rectangle"), s = t("../config"), a = t("zrender/tool/util"), h = t("zrender/tool/area");
    return e.prototype = {
        type: s.COMPONENT_TYPE_AXIS_CATEGORY, _getReformedLabel: function (t) {
            var e = "undefined" != typeof this.option.data[t].value ? this.option.data[t].value : this.option.data[t], i = this.option.data[t].formatter || this.option.axisLabel.formatter;
            return i && ("function" == typeof i ? e = i.call(this.myChart, e) : "string" == typeof i && (e = i.replace("{value}", e))), e
        }, _getInterval: function () {
            var t = this.option.axisLabel.interval;
            if ("auto" == t) {
                var e = this.option.axisLabel.textStyle.fontSize, i = this.option.data, o = this.option.data.length;
                if (this.isHorizontal())if (o > 3) {
                    var n, r, s = this.getGap(), l = !1, d = Math.floor(.5 / s);
                    for (d = 1 > d ? 1 : d, t = Math.floor(15 / s); !l && o > t;) {
                        t += d, l = !0, n = Math.floor(s * t);
                        for (var c = Math.floor((o - 1) / t) * t; c >= 0; c -= t) {
                            if (0 !== this.option.axisLabel.rotate)r = e; else if (i[c].textStyle)r = h.getTextWidth(this._getReformedLabel(c), this.getFont(a.merge(i[c].textStyle, this.option.axisLabel.textStyle))); else {
                                var u = this._getReformedLabel(c) + "", p = (u.match(/\w/g) || "").length, f = u.length - p;
                                r = p * e * 2 / 3 + f * e
                            }
                            if (r > n) {
                                l = !1;
                                break
                            }
                        }
                    }
                } else t = 1; else if (o > 3) {
                    var s = this.getGap();
                    for (t = Math.floor(11 / s); e > s * t - 6 && o > t;)t++
                } else t = 1
            } else t = t - 0 + 1;
            return t
        }, _buildShape: function () {
            if (this._interval = this._getInterval(), this.option.show) {
                this.option.splitArea.show && this._buildSplitArea(), this.option.splitLine.show && this._buildSplitLine(), this.option.axisLine.show && this._buildAxisLine(), this.option.axisTick.show && this._buildAxisTick(), this.option.axisLabel.show && this._buildAxisLabel();
                for (var t = 0, e = this.shapeList.length; e > t; t++)this.zr.addShape(this.shapeList[t])
            }
        }, _buildAxisTick: function () {
            var t, e = this.option.data.length, i = this.option.axisTick, o = i.length, r = i.lineStyle.color, s = i.lineStyle.width, a = "auto" == i.interval ? this._interval : i.interval - 0 + 1, h = i.onGap, l = h ? this.getGap() / 2 : "undefined" == typeof h && this.option.boundaryGap ? this.getGap() / 2 : 0, d = l > 0 ? -a : 0;
            if (this.isHorizontal())for (var c, u = "bottom" == this.option.position ? i.inside ? this.grid.getYend() - o - 1 : this.grid.getYend() + 1 : i.inside ? this.grid.getY() + 1 : this.grid.getY() - o - 1, p = d; e > p; p += a)c = this.subPixelOptimize(this.getCoordByIndex(p) + (p >= 0 ? l : 0), s), t = {
                _axisShape: "axisTick",
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {xStart: c, yStart: u, xEnd: c, yEnd: u + o, strokeColor: r, lineWidth: s}
            }, this.shapeList.push(new n(t));
            else for (var f, g = "left" == this.option.position ? i.inside ? this.grid.getX() + 1 : this.grid.getX() - o - 1 : i.inside ? this.grid.getXend() - o - 1 : this.grid.getXend() + 1, p = d; e > p; p += a)f = this.subPixelOptimize(this.getCoordByIndex(p) - (p >= 0 ? l : 0), s), t = {
                _axisShape: "axisTick",
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {xStart: g, yStart: f, xEnd: g + o, yEnd: f, strokeColor: r, lineWidth: s}
            }, this.shapeList.push(new n(t))
        }, _buildAxisLabel: function () {
            var t, e, i = this.option.data, n = this.option.data.length, r = this.option.axisLabel.rotate, s = this.option.axisLabel.margin, h = this.option.axisLabel.clickable, l = this.option.axisLabel.textStyle;
            if (this.isHorizontal()) {
                var d, c;
                "bottom" == this.option.position ? (d = this.grid.getYend() + s, c = "top") : (d = this.grid.getY() - s, c = "bottom");
                for (var u = 0; n > u; u += this._interval)"" !== this._getReformedLabel(u) && (e = a.merge(i[u].textStyle || {}, l), t = {
                    zlevel: this._zlevelBase,
                    hoverable: !1,
                    style: {
                        x: this.getCoordByIndex(u),
                        y: d,
                        color: e.color,
                        text: this._getReformedLabel(u),
                        textFont: this.getFont(e),
                        textAlign: e.align || "center",
                        textBaseline: e.baseline || c
                    }
                }, r && (t.style.textAlign = r > 0 ? "bottom" == this.option.position ? "right" : "left" : "bottom" == this.option.position ? "left" : "right", t.rotation = [r * Math.PI / 180, t.style.x, t.style.y]), this.shapeList.push(new o(this._axisLabelClickable(h, t))))
            } else {
                var p, f;
                "left" == this.option.position ? (p = this.grid.getX() - s, f = "right") : (p = this.grid.getXend() + s, f = "left");
                for (var u = 0; n > u; u += this._interval)"" !== this._getReformedLabel(u) && (e = a.merge(i[u].textStyle || {}, l), t = {
                    zlevel: this._zlevelBase,
                    hoverable: !1,
                    style: {
                        x: p,
                        y: this.getCoordByIndex(u),
                        color: e.color,
                        text: this._getReformedLabel(u),
                        textFont: this.getFont(e),
                        textAlign: e.align || f,
                        textBaseline: e.baseline || 0 === u && "" !== this.option.name ? "bottom" : u == n - 1 && "" !== this.option.name ? "top" : "middle"
                    }
                }, r && (t.rotation = [r * Math.PI / 180, t.style.x, t.style.y]), this.shapeList.push(new o(this._axisLabelClickable(h, t))))
            }
        }, _buildSplitLine: function () {
            var t, e = this.option.data.length, i = this.option.splitLine, o = i.lineStyle.type, r = i.lineStyle.width, s = i.lineStyle.color;
            s = s instanceof Array ? s : [s];
            var a = s.length, h = i.onGap, l = h ? this.getGap() / 2 : "undefined" == typeof h && this.option.boundaryGap ? this.getGap() / 2 : 0;
            if (e -= h || "undefined" == typeof h && this.option.boundaryGap ? 1 : 0, this.isHorizontal())for (var d, c = this.grid.getY(), u = this.grid.getYend(), p = 0; e > p; p += this._interval)d = this.subPixelOptimize(this.getCoordByIndex(p) + l, r), t = {
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {
                    xStart: d,
                    yStart: c,
                    xEnd: d,
                    yEnd: u,
                    strokeColor: s[p / this._interval % a],
                    lineType: o,
                    lineWidth: r
                }
            }, this.shapeList.push(new n(t)); else for (var f, g = this.grid.getX(), m = this.grid.getXend(), p = 0; e > p; p += this._interval)f = this.subPixelOptimize(this.getCoordByIndex(p) - l, r), t = {
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {
                    xStart: g,
                    yStart: f,
                    xEnd: m,
                    yEnd: f,
                    strokeColor: s[p / this._interval % a],
                    linetype: o,
                    lineWidth: r
                }
            }, this.shapeList.push(new n(t))
        }, _buildSplitArea: function () {
            var t, e = this.option.splitArea, i = e.areaStyle.color;
            if (i instanceof Array) {
                var o = i.length, n = this.option.data.length, s = e.onGap, a = s ? this.getGap() / 2 : "undefined" == typeof s && this.option.boundaryGap ? this.getGap() / 2 : 0;
                if (this.isHorizontal())for (var h, l = this.grid.getY(), d = this.grid.getHeight(), c = this.grid.getX(), u = 0; n >= u; u += this._interval)h = n > u ? this.getCoordByIndex(u) + a : this.grid.getXend(), t = {
                    zlevel: this._zlevelBase,
                    hoverable: !1,
                    style: {x: c, y: l, width: h - c, height: d, color: i[u / this._interval % o]}
                }, this.shapeList.push(new r(t)), c = h; else for (var p, f = this.grid.getX(), g = this.grid.getWidth(), m = this.grid.getYend(), u = 0; n >= u; u += this._interval)p = n > u ? this.getCoordByIndex(u) - a : this.grid.getY(), t = {
                    zlevel: this._zlevelBase,
                    hoverable: !1,
                    style: {x: f, y: p, width: g, height: m - p, color: i[u / this._interval % o]}
                }, this.shapeList.push(new r(t)), m = p
            } else t = {
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {
                    x: this.grid.getX(),
                    y: this.grid.getY(),
                    width: this.grid.getWidth(),
                    height: this.grid.getHeight(),
                    color: i
                }
            }, this.shapeList.push(new r(t))
        }, refresh: function (t) {
            t && (this.option = this.reformOption(t), this.option.axisLabel.textStyle = a.merge(this.option.axisLabel.textStyle || {}, this.ecTheme.textStyle)), this.clear(), this._buildShape()
        }, getGap: function () {
            var t = this.option.data.length, e = this.isHorizontal() ? this.grid.getWidth() : this.grid.getHeight();
            return this.option.boundaryGap ? e / t : e / (t > 1 ? t - 1 : 1)
        }, getCoord: function (t) {
            for (var e = this.option.data, i = e.length, o = this.getGap(), n = this.option.boundaryGap ? o / 2 : 0, r = 0; i > r; r++) {
                if (e[r] == t || "undefined" != typeof e[r].value && e[r].value == t)return n = this.isHorizontal() ? this.grid.getX() + n : this.grid.getYend() - n;
                n += o
            }
        }, getCoordByIndex: function (t) {
            if (0 > t)return this.isHorizontal() ? this.grid.getX() : this.grid.getYend();
            if (t > this.option.data.length - 1)return this.isHorizontal() ? this.grid.getXend() : this.grid.getY();
            var e = this.getGap(), i = this.option.boundaryGap ? e / 2 : 0;
            return i += t * e, i = this.isHorizontal() ? this.grid.getX() + i : this.grid.getYend() - i
        }, getNameByIndex: function (t) {
            var e = this.option.data[t];
            return "undefined" != typeof e && "undefined" != typeof e.value ? e.value : e
        }, getIndexByName: function (t) {
            for (var e = this.option.data, i = e.length, o = 0; i > o; o++)if (e[o] == t || "undefined" != typeof e[o].value && e[o].value == t)return o;
            return -1
        }, getValueFromCoord: function () {
            return ""
        }, isMainAxis: function (t) {
            return t % this._interval === 0
        }
    }, a.inherits(e, i), t("../component").define("categoryAxis", e), e
}), define("echarts/component/valueAxis", ["require", "./base", "zrender/shape/Text", "zrender/shape/Line", "zrender/shape/Rectangle", "../config", "../util/date", "zrender/tool/util", "../util/smartSteps", "../util/accMath", "../component"], function (t) {
    function e(t, e, o, n, r, s, a) {
        if (!a || 0 === a.length)return void console.err("option.series.length == 0.");
        i.call(this, t, e, o, n, r), this.series = a, this.grid = this.component.grid;
        for (var h in s)this[h] = s[h];
        this.refresh(n, a)
    }

    var i = t("./base"), o = t("zrender/shape/Text"), n = t("zrender/shape/Line"), r = t("zrender/shape/Rectangle"), s = t("../config"), a = t("../util/date"), h = t("zrender/tool/util");
    return e.prototype = {
        type: s.COMPONENT_TYPE_AXIS_VALUE, _buildShape: function () {
            if (this._hasData = !1, this._calculateValue(), this._hasData && this.option.show) {
                this.option.splitArea.show && this._buildSplitArea(), this.option.splitLine.show && this._buildSplitLine(), this.option.axisLine.show && this._buildAxisLine(), this.option.axisTick.show && this._buildAxisTick(), this.option.axisLabel.show && this._buildAxisLabel();
                for (var t = 0, e = this.shapeList.length; e > t; t++)this.zr.addShape(this.shapeList[t])
            }
        }, _buildAxisTick: function () {
            var t, e = this._valueList, i = this._valueList.length, o = this.option.axisTick, r = o.length, s = o.lineStyle.color, a = o.lineStyle.width;
            if (this.isHorizontal())for (var h, l = "bottom" === this.option.position ? o.inside ? this.grid.getYend() - r - 1 : this.grid.getYend() + 1 : o.inside ? this.grid.getY() + 1 : this.grid.getY() - r - 1, d = 0; i > d; d++)h = this.subPixelOptimize(this.getCoord(e[d]), a), t = {
                _axisShape: "axisTick",
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {xStart: h, yStart: l, xEnd: h, yEnd: l + r, strokeColor: s, lineWidth: a}
            }, this.shapeList.push(new n(t)); else for (var c, u = "left" === this.option.position ? o.inside ? this.grid.getX() + 1 : this.grid.getX() - r - 1 : o.inside ? this.grid.getXend() - r - 1 : this.grid.getXend() + 1, d = 0; i > d; d++)c = this.subPixelOptimize(this.getCoord(e[d]), a), t = {
                _axisShape: "axisTick",
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {xStart: u, yStart: c, xEnd: u + r, yEnd: c, strokeColor: s, lineWidth: a}
            }, this.shapeList.push(new n(t))
        }, _buildAxisLabel: function () {
            var t, e = this._valueList, i = this._valueList.length, n = this.option.axisLabel.rotate, r = this.option.axisLabel.margin, s = this.option.axisLabel.clickable, a = this.option.axisLabel.textStyle;
            if (this.isHorizontal()) {
                var h, l;
                "bottom" === this.option.position ? (h = this.grid.getYend() + r, l = "top") : (h = this.grid.getY() - r, l = "bottom");
                for (var d = 0; i > d; d++)t = {
                    zlevel: this._zlevelBase,
                    hoverable: !1,
                    style: {
                        x: this.getCoord(e[d]),
                        y: h,
                        color: "function" == typeof a.color ? a.color(e[d]) : a.color,
                        text: this._valueLabel[d],
                        textFont: this.getFont(a),
                        textAlign: a.align || "center",
                        textBaseline: a.baseline || l
                    }
                }, n && (t.style.textAlign = n > 0 ? "bottom" === this.option.position ? "right" : "left" : "bottom" === this.option.position ? "left" : "right", t.rotation = [n * Math.PI / 180, t.style.x, t.style.y]), this.shapeList.push(new o(this._axisLabelClickable(s, t)))
            } else {
                var c, u;
                "left" === this.option.position ? (c = this.grid.getX() - r, u = "right") : (c = this.grid.getXend() + r, u = "left");
                for (var d = 0; i > d; d++)t = {
                    zlevel: this._zlevelBase,
                    hoverable: !1,
                    style: {
                        x: c,
                        y: this.getCoord(e[d]),
                        color: "function" == typeof a.color ? a.color(e[d]) : a.color,
                        text: this._valueLabel[d],
                        textFont: this.getFont(a),
                        textAlign: a.align || u,
                        textBaseline: a.baseline || 0 === d && "" !== this.option.name ? "bottom" : d === i - 1 && "" !== this.option.name ? "top" : "middle"
                    }
                }, n && (t.rotation = [n * Math.PI / 180, t.style.x, t.style.y]), this.shapeList.push(new o(this._axisLabelClickable(s, t)))
            }
        }, _buildSplitLine: function () {
            var t, e = this._valueList, i = this._valueList.length, o = this.option.splitLine, r = o.lineStyle.type, s = o.lineStyle.width, a = o.lineStyle.color;
            a = a instanceof Array ? a : [a];
            var h = a.length;
            if (this.isHorizontal())for (var l, d = this.grid.getY(), c = this.grid.getYend(), u = 0; i > u; u++)l = this.subPixelOptimize(this.getCoord(e[u]), s), t = {
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {xStart: l, yStart: d, xEnd: l, yEnd: c, strokeColor: a[u % h], lineType: r, lineWidth: s}
            }, this.shapeList.push(new n(t)); else for (var p, f = this.grid.getX(), g = this.grid.getXend(), u = 0; i > u; u++)p = this.subPixelOptimize(this.getCoord(e[u]), s), t = {
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {xStart: f, yStart: p, xEnd: g, yEnd: p, strokeColor: a[u % h], lineType: r, lineWidth: s}
            }, this.shapeList.push(new n(t))
        }, _buildSplitArea: function () {
            var t, e = this.option.splitArea.areaStyle.color;
            if (e instanceof Array) {
                var i = e.length, o = this._valueList, n = this._valueList.length;
                if (this.isHorizontal())for (var s, a = this.grid.getY(), h = this.grid.getHeight(), l = this.grid.getX(), d = 0; n >= d; d++)s = n > d ? this.getCoord(o[d]) : this.grid.getXend(), t = {
                    zlevel: this._zlevelBase,
                    hoverable: !1,
                    style: {x: l, y: a, width: s - l, height: h, color: e[d % i]}
                }, this.shapeList.push(new r(t)), l = s; else for (var c, u = this.grid.getX(), p = this.grid.getWidth(), f = this.grid.getYend(), d = 0; n >= d; d++)c = n > d ? this.getCoord(o[d]) : this.grid.getY(), t = {
                    zlevel: this._zlevelBase,
                    hoverable: !1,
                    style: {x: u, y: c, width: p, height: f - c, color: e[d % i]}
                }, this.shapeList.push(new r(t)), f = c
            } else t = {
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {
                    x: this.grid.getX(),
                    y: this.grid.getY(),
                    width: this.grid.getWidth(),
                    height: this.grid.getHeight(),
                    color: e
                }
            }, this.shapeList.push(new r(t))
        }, _calculateValue: function () {
            if (isNaN(this.option.min - 0) || isNaN(this.option.max - 0)) {
                for (var t, e, i = {}, o = this.component.legend, n = 0, r = this.series.length; r > n; n++)!(this.series[n].type != s.CHART_TYPE_LINE && this.series[n].type != s.CHART_TYPE_BAR && this.series[n].type != s.CHART_TYPE_SCATTER && this.series[n].type != s.CHART_TYPE_K && this.series[n].type != s.CHART_TYPE_EVENTRIVER || o && !o.isSelected(this.series[n].name) || (t = this.series[n].xAxisIndex || 0, e = this.series[n].yAxisIndex || 0, this.option.xAxisIndex != t && this.option.yAxisIndex != e || !this._calculSum(i, n)));
                var a;
                for (var n in i) {
                    a = i[n];
                    for (var h = 0, l = a.length; l > h; h++)if (!isNaN(a[h])) {
                        this._hasData = !0, this._min = a[h], this._max = a[h];
                        break
                    }
                    if (this._hasData)break
                }
                for (var n in i) {
                    a = i[n];
                    for (var h = 0, l = a.length; l > h; h++)isNaN(a[h]) || (this._min = Math.min(this._min, a[h]), this._max = Math.max(this._max, a[h]))
                }
                var d = Math.abs(this._max - this._min);
                this._min = isNaN(this.option.min - 0) ? this._min - Math.abs(d * this.option.boundaryGap[0]) : this.option.min - 0, this._max = isNaN(this.option.max - 0) ? this._max + Math.abs(d * this.option.boundaryGap[1]) : this.option.max - 0, this._min === this._max && (0 === this._max ? this._max = 1 : this._max > 0 ? this._min = this._max / this.option.splitNumber != null ? this.option.splitNumber : 5 : this._max = this._max / this.option.splitNumber != null ? this.option.splitNumber : 5), "time" != this.option.type ? this._reformValue(this.option.scale) : this._reformTimeValue()
            } else this._hasData = !0, this._min = this.option.min - 0, this._max = this.option.max - 0, "time" != this.option.type ? this._customerValue() : this._reformTimeValue()
        }, _calculSum: function (t, e) {
            var i, o, n = this.series[e].name || "kener";
            if (this.series[e].stack) {
                var r = "__Magic_Key_Positive__" + this.series[e].stack, h = "__Magic_Key_Negative__" + this.series[e].stack;
                t[r] = t[r] || [], t[h] = t[h] || [], t[n] = t[n] || [], o = this.series[e].data;
                for (var l = 0, d = o.length; d > l; l++)i = null != o[l].value ? o[l].value : o[l], "-" !== i && (i -= 0, i >= 0 ? null != t[r][l] ? t[r][l] += i : t[r][l] = i : null != t[h][l] ? t[h][l] += i : t[h][l] = i, this.option.scale && t[n].push(i))
            } else if (t[n] = t[n] || [], this.series[e].type != s.CHART_TYPE_EVENTRIVER) {
                o = this.series[e].data;
                for (var l = 0, d = o.length; d > l; l++)i = null != o[l].value ? o[l].value : o[l], this.series[e].type === s.CHART_TYPE_K ? (t[n].push(i[0]), t[n].push(i[1]), t[n].push(i[2]), t[n].push(i[3])) : i instanceof Array ? (-1 != this.option.xAxisIndex && t[n].push("time" != this.option.type ? i[0] : a.getNewDate(i[0])), -1 != this.option.yAxisIndex && t[n].push("time" != this.option.type ? i[1] : a.getNewDate(i[1]))) : t[n].push(i)
            } else {
                o = this.series[e].eventList;
                for (var l = 0, d = o.length; d > l; l++)for (var c = o[l].evolution, u = 0, p = c.length; p > u; u++)t[n].push(a.getNewDate(c[u].time))
            }
        }, _reformValue: function (e) {
            var i = t("../util/smartSteps"), o = this.option.splitNumber;
            !e && this._min >= 0 && this._max >= 0 && (this._min = 0), !e && this._min <= 0 && this._max <= 0 && (this._max = 0);
            var n = i(this._min, this._max, o);
            o = null != o ? o : n.secs, this.option.splitNumber = o, this._min = n.min, this._max = n.max, this._valueList = n.pnts, this._reformLabelData()
        }, _reformTimeValue: function () {
            var t = null != this.option.splitNumber ? this.option.splitNumber : 5, e = a.getAutoFormatter(this._min, this._max, t), i = e.formatter, o = e.gapValue;
            this._valueList = [a.getNewDate(this._min)];
            var n;
            switch (i) {
                case"week":
                    n = a.nextMonday(this._min);
                    break;
                case"month":
                    n = a.nextNthOnMonth(this._min, 1);
                    break;
                case"quarter":
                    n = a.nextNthOnQuarterYear(this._min, 1);
                    break;
                case"half-year":
                    n = a.nextNthOnHalfYear(this._min, 1);
                    break;
                case"year":
                    n = a.nextNthOnYear(this._min, 1);
                    break;
                default:
                    72e5 >= o ? n = (Math.floor(this._min / o) + 1) * o : (n = a.getNewDate(this._min - -o), n.setHours(6 * Math.round(n.getHours() / 6)), n.setMinutes(0), n.setSeconds(0))
            }
            for (n - this._min < o / 2 && (n -= -o), e = a.getNewDate(n), t *= 1.5; t-- >= 0 && (("month" == i || "quarter" == i || "half-year" == i || "year" == i) && e.setDate(1), !(this._max - e < o / 2));)this._valueList.push(e), e = a.getNewDate(e - -o);
            this._valueList.push(a.getNewDate(this._max)), this._reformLabelData(i)
        }, _customerValue: function () {
            var e = t("../util/accMath"), i = null != this.option.splitNumber ? this.option.splitNumber : 5, o = (this._max - this._min) / i;
            this._valueList = [];
            for (var n = 0; i >= n; n++)this._valueList.push(e.accAdd(this._min, e.accMul(o, n)));
            this._reformLabelData()
        }, _reformLabelData: function (t) {
            this._valueLabel = [];
            var e = this.option.axisLabel.formatter;
            if (e)for (var i = 0, o = this._valueList.length; o > i; i++)"function" == typeof e ? this._valueLabel.push(t ? e.call(this.myChart, this._valueList[i], t) : e.call(this.myChart, this._valueList[i])) : "string" == typeof e && this._valueLabel.push(t ? a.format(e, this._valueList[i]) : e.replace("{value}", this._valueList[i])); else if (t)for (var i = 0, o = this._valueList.length; o > i; i++)this._valueLabel.push(a.format(t, this._valueList[i])); else for (var i = 0, o = this._valueList.length; o > i; i++)this._valueLabel.push(this.numAddCommas(this._valueList[i]))
        }, getExtremum: function () {
            return this._calculateValue(), {min: this._min, max: this._max}
        }, refresh: function (t, e) {
            t && (this.option = this.reformOption(t), this.option.axisLabel.textStyle = h.merge(this.option.axisLabel.textStyle || {}, this.ecTheme.textStyle), this.series = e), this.zr && (this.clear(), this._buildShape())
        }, getCoord: function (t) {
            t = t < this._min ? this._min : t, t = t > this._max ? this._max : t;
            var e;
            return e = this.isHorizontal() ? this.grid.getX() + (t - this._min) / (this._max - this._min) * this.grid.getWidth() : this.grid.getYend() - (t - this._min) / (this._max - this._min) * this.grid.getHeight()
        }, getCoordSize: function (t) {
            return Math.abs(this.isHorizontal() ? t / (this._max - this._min) * this.grid.getWidth() : t / (this._max - this._min) * this.grid.getHeight())
        }, getValueFromCoord: function (t) {
            var e;
            return this.isHorizontal() ? (t = t < this.grid.getX() ? this.grid.getX() : t, t = t > this.grid.getXend() ? this.grid.getXend() : t, e = this._min + (t - this.grid.getX()) / this.grid.getWidth() * (this._max - this._min)) : (t = t < this.grid.getY() ? this.grid.getY() : t, t = t > this.grid.getYend() ? this.grid.getYend() : t, e = this._max - (t - this.grid.getY()) / this.grid.getHeight() * (this._max - this._min)), e.toFixed(2) - 0
        }, isMaindAxis: function (t) {
            for (var e = 0, i = this._valueList.length; i > e; e++)if (this._valueList[e] === t)return !0;
            return !1
        }
    }, h.inherits(e, i), t("../component").define("valueAxis", e), e
}), define("echarts/util/date", [], function () {
    function t(t, e, i) {
        i = i > 1 ? i : 2;
        for (var o, n, r, s, a = 0, h = d.length; h > a; a++)if (o = d[a].value, n = Math.ceil(e / o) * o - Math.floor(t / o) * o, Math.round(n / o) <= 1.2 * i) {
            r = d[a].formatter, s = d[a].value;
            break
        }
        return null == r && (r = "year", o = 317088e5, n = Math.ceil(e / o) * o - Math.floor(t / o) * o, s = Math.round(n / (i - 1) / o) * o), {
            formatter: r,
            gapValue: s
        }
    }

    function e(t) {
        return 10 > t ? "0" + t : t
    }

    function i(t, i) {
        ("week" == t || "month" == t || "quarter" == t || "half-year" == t || "year" == t) && (t = "MM - dd\nyyyy");
        var o = l(i), n = o.getFullYear(), r = o.getMonth() + 1, s = o.getDate(), a = o.getHours(), h = o.getMinutes(), d = o.getSeconds();
        return t = t.replace("MM", e(r)), t = t.toLowerCase(), t = t.replace("yyyy", n), t = t.replace("yy", n % 100), t = t.replace("dd", e(s)), t = t.replace("d", s), t = t.replace("hh", e(a)), t = t.replace("h", a), t = t.replace("mm", e(h)), t = t.replace("m", h), t = t.replace("ss", e(d)), t = t.replace("s", d)
    }

    function o(t) {
        return t = l(t), t.setDate(t.getDate() + 8 - t.getDay()), t
    }

    function n(t, e, i) {
        return t = l(t), t.setMonth(Math.ceil((t.getMonth() + 1) / i) * i), t.setDate(e), t
    }

    function r(t, e) {
        return n(t, e, 1)
    }

    function s(t, e) {
        return n(t, e, 3)
    }

    function a(t, e) {
        return n(t, e, 6)
    }

    function h(t, e) {
        return n(t, e, 12)
    }

    function l(t) {
        return t instanceof Date ? t : new Date("string" == typeof t ? t.replace(/-/g, "/") : t)
    }

    var d = [{formatter: "hh : mm : ss", value: 1e3}, {
        formatter: "hh : mm : ss",
        value: 5e3
    }, {formatter: "hh : mm : ss", value: 1e4}, {formatter: "hh : mm : ss", value: 15e3}, {
        formatter: "hh : mm : ss",
        value: 3e4
    }, {formatter: "hh : mm\nMM - dd", value: 6e4}, {
        formatter: "hh : mm\nMM - dd",
        value: 3e5
    }, {formatter: "hh : mm\nMM - dd", value: 6e5}, {
        formatter: "hh : mm\nMM - dd",
        value: 9e5
    }, {formatter: "hh : mm\nMM - dd", value: 18e5}, {
        formatter: "hh : mm\nMM - dd",
        value: 36e5
    }, {formatter: "hh : mm\nMM - dd", value: 72e5}, {
        formatter: "hh : mm\nMM - dd",
        value: 216e5
    }, {formatter: "hh : mm\nMM - dd", value: 432e5}, {formatter: "MM - dd\nyyyy", value: 864e5}, {
        formatter: "week",
        value: 6048e5
    }, {formatter: "month", value: 26784e5}, {formatter: "quarter", value: 8208e6}, {
        formatter: "half-year",
        value: 16416e6
    }, {formatter: "year", value: 32832e6}];
    return {
        getAutoFormatter: t,
        getNewDate: l,
        format: i,
        nextMonday: o,
        nextNthPerNmonth: n,
        nextNthOnMonth: r,
        nextNthOnQuarterYear: s,
        nextNthOnHalfYear: a,
        nextNthOnYear: h
    }
}), define("echarts/util/smartSteps", [], function () {
    function t(t) {
        return w.log(M(t)) / w.LN10
    }

    function e(t) {
        return w.pow(10, t)
    }

    function i(t) {
        return t === A(t)
    }

    function o(t, e, o, n) {
        v = n || {}, x = v.steps || C, b = v.secs || z, o = E(+o || 0) % 99, t = +t || 0, e = +e || 0, T = S = 0, "min"in v && (t = +v.min || 0, T = 1), "max"in v && (e = +v.max || 0, S = 1), t > e && (e = [t, t = e][0]);
        var r = e - t;
        if (T && S)return y(t, e, o);
        if ((o || 5) > r) {
            if (i(t) && i(e))return p(t, e, o);
            if (0 === r)return f(t, e, o)
        }
        return l(t, e, o)
    }

    function n(t, i, o, n) {
        n = n || 0;
        var a = r((i - t) / o, -1), h = r(t, -1, 1), l = r(i, -1), d = w.min(a.e, h.e, l.e);
        s(a, {c: 0, e: d}), s(h, a, 1), s(l, a), n += d, t = h.c, i = l.c;
        for (var c = (i - t) / o, u = e(n), p = 0, f = [], g = o + 1; g--;)f[g] = (t + c * g) * u;
        if (0 > n) {
            p = m(u), c = +(c * u).toFixed(p), t = +(t * u).toFixed(p), i = +(i * u).toFixed(p);
            for (var g = f.length; g--;)f[g] = f[g].toFixed(p), 0 === +f[g] && (f[g] = "0")
        } else t *= u, i *= u, c *= u;
        return b = 0, x = 0, v = 0, {min: t, max: i, secs: o, step: c, fix: p, exp: n, pnts: f}
    }

    function r(o, n, r) {
        n = E(n % 10) || 2, 0 > n && (i(o) ? n = ("" + M(o)).replace(/0+$/, "").length || 1 : (o = o.toFixed(15).replace(/0+$/, ""), n = o.replace(".", "").replace(/^[-0]+/, "").length, o = +o));
        var s = A(t(o)) - n + 1, a = +(o * e(-s)).toFixed(15) || 0;
        return a = r ? A(a) : L(a), !a && (s = 0), ("" + M(a)).length > n && (s += 1, a /= 10), {c: a, e: s}
    }

    function s(t, i, o) {
        var n = i.e - t.e;
        n && (t.e += n, t.c *= e(-n), t.c = o ? A(t.c) : L(t.c))
    }

    function a(t, e, i) {
        t.e < e.e ? s(e, t, i) : s(t, e, i)
    }

    function h(t, e) {
        e = e || C, t = r(t);
        for (var i = t.c, o = 0; i > e[o];)o++;
        if (!e[o])for (i /= 10, t.e += 1, o = 0; i > e[o];)o++;
        return t.c = e[o], t
    }

    function l(t, e, o) {
        var a, l = o || +b.slice(-1), f = h((e - t) / l, x), m = r(e - t), y = r(t, -1, 1), v = r(e, -1);
        if (s(m, f), s(y, f, 1), s(v, f), o ? a = c(y, v, l) : l = d(y, v), i(t) && i(e) && t * e >= 0) {
            if (l > e - t)return p(t, e, l);
            l = u(t, e, o, y, v, l)
        }
        var C = g(t, e, y.c, v.c);
        return y.c = C[0], v.c = C[1], (T || S) && _(t, e, y, v), n(y.c, v.c, l, v.e)
    }

    function d(t, i) {
        for (var o, n, r, s, a = [], l = b.length; l--;)o = b[l], n = h((i.c - t.c) / o, x), n = n.c * e(n.e), r = A(t.c / n) * n, s = L(i.c / n) * n, a[l] = {
            min: r,
            max: s,
            step: n,
            span: s - r
        };
        return a.sort(function (t, e) {
            return t.span - e.span
        }), a = a[0], o = a.span / a.step, t.c = a.min, i.c = a.max, 3 > o ? 2 * o : o
    }

    function c(t, i, o) {
        for (var n, r, s = i.c, a = (i.c - t.c) / o - 1; s > t.c;)a = h(a + 1, x), a = a.c * e(a.e), n = a * o, r = L(i.c / a) * a, s = r - n;
        var l = t.c - s, d = r - i.c, c = l - d;
        return c >= 2 * a && (c = A(c / a) * a, s += c, r += c), t.c = s, i.c = r, a
    }

    function u(t, o, n, r, s, a) {
        var h = s.c - r.c, l = h / a * e(s.e);
        if (!i(l) && (l = A(l), h = l * a, o - t > h && (l += 1, h = l * a, !n && l * (a - 1) >= o - t && (a -= 1, h = l * a)), h >= o - t)) {
            var d = h - (o - t);
            r.c = E(t - d / 2), s.c = E(o + d / 2), r.e = 0, s.e = 0
        }
        return a
    }

    function p(t, e, i) {
        if (i = i || 5, T)e = t + i; else if (S)t = e - i; else {
            var o = i - (e - t), r = E(t - o / 2), s = E(e + o / 2), a = g(t, e, r, s);
            t = a[0], e = a[1]
        }
        return n(t, e, i)
    }

    function f(t, e, i) {
        i = i || 5;
        var o = w.min(M(e / i), i) / 2.1;
        return T ? e = t + o : S ? t = e - o : (t -= o, e += o), l(t, e, i)
    }

    function g(t, e, i, o) {
        return t >= 0 && 0 > i ? (o -= i, i = 0) : 0 >= e && o > 0 && (i -= o, o = 0), [i, o]
    }

    function m(t) {
        return t = (+t).toFixed(15).split("."), t.pop().replace(/0+$/, "").length
    }

    function _(t, e, i, o) {
        if (T) {
            var n = r(t, 4, 1);
            i.e - n.e > 6 && (n = {c: 0, e: i.e}), a(i, n), a(o, n), o.c += n.c - i.c, i.c = n.c
        } else if (S) {
            var s = r(e, 4);
            o.e - s.e > 6 && (s = {c: 0, e: o.e}), a(i, s), a(o, s), i.c += s.c - o.c, o.c = s.c
        }
    }

    function y(t, e, i) {
        var o = i ? [i] : b, a = e - t;
        if (0 === a)return e = r(e, 3), i = o[0], e.c = E(e.c + i / 2), n(e.c - i, e.c, i, e.e);
        M(e / a) < 1e-6 && (e = 0), M(t / a) < 1e-6 && (t = 0);
        var h, l, d, c = [[5, 10], [10, 2], [50, 10], [100, 2]], u = [], p = [], f = r(e - t, 3), g = r(t, -1, 1), m = r(e, -1);
        s(g, f, 1), s(m, f), a = m.c - g.c, f.c = a;
        for (var _ = o.length; _--;) {
            i = o[_], h = L(a / i), l = h * i - a, d = 3 * (l + 3), d += 2 * (i - o[0] + 2), i % 5 === 0 && (d -= 10);
            for (var y = c.length; y--;)h % c[y][0] === 0 && (d /= c[y][1]);
            p[_] = [i, h, l, d].join(), u[_] = {secs: i, step: h, delta: l, score: d}
        }
        return u.sort(function (t, e) {
            return t.score - e.score
        }), u = u[0], g.c = E(g.c - u.delta / 2), m.c = E(m.c + u.delta / 2), n(g.c, m.c, u.secs, f.e)
    }

    var v, x, b, T, S, C = [10, 25, 50], z = [4, 5, 6], w = Math, E = w.round, A = w.floor, L = w.ceil, M = w.abs;
    return o
});