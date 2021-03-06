// Generated by CoffeeScript 1.6.2
(function() {
  window.Quicktour = (function() {
    function Quicktour(options, item_list) {
      options = options || {};
      this.item_list = item_list || [];
      this.init_options(options);
    }

    Quicktour.prototype.init_options = function(options) {
      var _ref;

      this.fade_time = options.fade_time || 500;
      if ((options.frame_opacity != null) && typeof options.frame_opacity === "number" && (1 >= (_ref = options.frame_opacity) && _ref >= 0)) {
        this.frame_opacity = options.frame_opacity;
      } else {
        this.frame_opacity = .7;
      }
      this.padding_dimensions = options.padding_dimensions || {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
      };
      this.border_dimensions = options.border_dimensions || {
        top: 3,
        bottom: 3,
        right: 3,
        left: 3
      };
      this.highlight_color = options.highlight_color || "#36BBCE";
      this.text_color = options.text_color || options.highlight_color || "#36BBCE";
      this.description_offset = options.description_offset || {
        top: 30,
        left: 0
      };
      this.description_font = options.description_font || "'Helvetica Neue', Helvetica, sans-serif";
      this.set_css = options.set_css != null ? options.set_css : true;
      this.step_through = options.step_through != null ? options.step_through : true;
      this.title = options.title;
      return this.title_options = options.title_options || {
        width: "100%",
        padding: "200px",
        font: "'Helvetica Neue', Halvetica, sans-serif"
      };
    };

    Quicktour.prototype.addItem = function(item) {
      if (!item.element instanceof jQuery) {
        return null;
      }
      return this.item_list.push(item);
    };

    Quicktour.prototype.setOption = function(key, value) {
      this.options[key] = value;
      return this.init_options(this.options);
    };

    Quicktour.prototype.resetOptions = function(options) {
      if (options == null) {
        options = {};
      }
      return this.init_options(options);
    };

    Quicktour.prototype.calculate_border = function(item) {
      var bottom, left, right, top, _ref, _ref1, _ref2, _ref3;

      right = (item != null ? (_ref = item.border_dimensions) != null ? _ref.right : void 0 : void 0) || this.border_dimensions.right;
      left = (item != null ? (_ref1 = item.border_dimensions) != null ? _ref1.left : void 0 : void 0) || this.border_dimensions.left;
      top = (item != null ? (_ref2 = item.border_dimensions) != null ? _ref2.top : void 0 : void 0) || this.border_dimensions.top;
      bottom = (item != null ? (_ref3 = item.border_dimensions) != null ? _ref3.bottom : void 0 : void 0) || this.border_dimensions.bottom;
      return {
        top: top,
        bottom: bottom,
        right: right,
        left: left
      };
    };

    Quicktour.prototype.calculate_padding = function(item) {
      var bottom, left, right, rtn, top, _ref, _ref1, _ref2, _ref3;

      right = (item != null ? (_ref = item.padding_dimensions) != null ? _ref.right : void 0 : void 0) || this.padding_dimensions.right;
      left = (item != null ? (_ref1 = item.padding_dimensions) != null ? _ref1.left : void 0 : void 0) || this.padding_dimensions.left;
      top = (item != null ? (_ref2 = item.padding_dimensions) != null ? _ref2.top : void 0 : void 0) || this.padding_dimensions.top;
      bottom = (item != null ? (_ref3 = item.padding_dimensions) != null ? _ref3.bottom : void 0 : void 0) || this.padding_dimensions.bottom;
      rtn = {
        top: top,
        bottom: bottom,
        right: right,
        left: left
      };
      return rtn;
    };

    Quicktour.prototype.stop = function() {
      var frame;

      frame = this.frame;
      return frame.fadeOut(this.fade_time, function() {
        return frame.remove();
      });
    };

    Quicktour.prototype.start = function() {
      var border, height, index, item, new_elem, offset, padding, text_elem, title_elem, title_showing, width, _i, _len, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _this;

      width = $(document).width();
      height = $(document).height();
      if (!this.frame) {
        this.frame = $("<div class='quicktour-frame'></div>");
      }
      this.frame.css("height", height);
      this.frame.css("width", width);
      this.frame.css("background-color", "rgba(0,0,0," + this.frame_opacity + ")");
      this.frame.css("position", "absolute");
      this.frame.css("top", 0);
      this.frame.css("left", 0);
      this.frame.css("display", "none");
      $("body").append(this.frame);
      if (!this.step_through) {
        this.frame.click(function() {
          var _this;

          _this = $(this);
          return _this.fadeOut(this.fade_time, function() {
            return _this.remove();
          });
        });
      }
      _ref = this.item_list;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        if (item.element == null) {
          continue;
        }
        offset = item.element.offset();
        new_elem = $("<div class='quicktour-highlight'></div>");
        new_elem.css("height", item.element.height());
        new_elem.css("width", item.element.width());
        padding = this.calculate_padding(item);
        border = this.calculate_border(item);
        new_elem.css("position", "absolute");
        new_elem.css("left", offset.left - padding.left - border.left + "px");
        new_elem.css("top", offset.top - padding.top - border.top + "px");
        if (this.set_css) {
          new_elem.css("border-width", "" + border.top + "px " + border.right + "px " + border.bottom + "px " + border.left + "px");
          new_elem.css("border-style", "solid");
          new_elem.css("border-color", this.highlight_color);
          new_elem.css("padding", "" + padding.top + "px " + padding.right + "px " + padding.bottom + "px " + padding.left + "px");
        }
        new_elem.data("quicktour-item", item);
        item.highlight_element = new_elem;
        if (item.description == null) {
          continue;
        }
        text_elem = $("<div class='quicktour-description'>" + item.description + "</div>");
        text_elem.css("position", "absolute");
        text_elem.css("top", item.element.outerHeight() + offset.top + (((_ref1 = item.description_options) != null ? (_ref2 = _ref1.offset) != null ? _ref2.top : void 0 : void 0) || this.description_offset.top));
        text_elem.css("left", offset.left + (((_ref3 = item.description_options) != null ? (_ref4 = _ref3.offset) != null ? _ref4.left : void 0 : void 0) || this.description_offset.left));
        if (this.set_css) {
          text_elem.css("width", ((_ref5 = item.description_options) != null ? _ref5.width : void 0) || item.element.outerWidth() || this.description_width);
          text_elem.css("color", "" + this.text_color);
        }
        if (this.set_css) {
          text_elem.css("font-family", ((_ref6 = item.description_options) != null ? _ref6.font : void 0) || this.description_font);
        }
        text_elem.data("quicktour-item", item);
        item.description_element = text_elem;
        if (this.step_through) {
          new_elem.css("display", "none");
          text_elem.css("display", "none");
        }
        this.frame.append(new_elem);
        this.frame.append(text_elem);
      }
      if (this.step_through) {
        index = 0;
        _this = this;
        if (_this.title) {
          title_elem = $("<div class='quicktour-title'>" + _this.title + "</div>");
          if (this.set_css) {
            title_elem.css("color", "" + this.highlight_color);
            title_elem.css("text-align", "center");
            title_elem.css("margin", "0 auto");
            title_elem.css("padding-top", this.title_options.padding || "200px");
            title_elem.css("width", this.title_options.width || "100%");
            title_elem.css("font-family", this.title_options.font || "'Helvetica Neue', Halvetica, sans-serif");
          }
          this.frame.append(title_elem);
        }
        title_showing = true;
        _this.frame.click(function() {
          var $this;

          $this = $(this);
          if (title_showing) {
            _this.item_list[index].highlight_element.fadeIn(_this.fade_time);
            _this.item_list[index].description_element.fadeIn(_this.fade_time);
            if (_this.title) {
              title_elem.fadeOut(_this.fade_time);
            }
            title_showing = false;
            return;
          }
          _this.item_list[index].highlight_element.fadeOut(_this.fade_time, function() {
            if (index < _this.item_list.length - 1) {
              _this.item_list[index + 1].highlight_element.fadeIn(_this.fade_time);
              _this.item_list[index + 1].description_element.fadeIn(_this.fade_time);
            } else {
              $this.fadeOut(_this.fade_time, function() {
                return $this.remove();
              });
            }
            return index++;
          });
          return _this.item_list[index].description_element.fadeOut(_this.fade_time);
        });
        if (!this.title) {
          this.frame.click();
        }
      }
      return this.frame.fadeIn(this.fade_time);
    };

    return Quicktour;

  })();

}).call(this);
