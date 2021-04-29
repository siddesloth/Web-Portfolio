// lazy load
'use strict';
function _extends() {
    return (_extends =
        Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (e[a] = r[a]);
            }
            return e;
        }).apply(this, arguments);
}
window.yall = function(e) {
    var a = function(e) {
            if ('IMG' === e.tagName) {
                var t = e.parentNode;
                'PICTURE' === t.tagName &&
                    [].slice.call(t.querySelectorAll('source')).forEach(function(e) {
                        return r(e);
                    }),
                    r(e);
            }
            'VIDEO' === e.tagName &&
                ([].slice.call(e.querySelectorAll('source')).forEach(function(e) {
                    return r(e);
                }),
                r(e),
                !0 === e.autoplay && e.load()),
                'IFRAME' === e.tagName && ((e.src = e.dataset.src), e.removeAttribute('data-src')),
                e.classList.contains(n.lazyBackgroundClass) && (e.classList.remove(n.lazyBackgroundClass), e.classList.add(n.lazyBackgroundLoaded));
        },
        r = function(e) {
            for (var t in e.dataset) -1 !== o.acceptedDataAttributes.indexOf('data-' + t) && (e.setAttribute(t, e.dataset[t]), e.removeAttribute('data-' + t));
        },
        t = function yallBack() {
            var e = !1;
            !1 === e &&
                0 < l.length &&
                ((e = !0),
                setTimeout(function() {
                    l.forEach(function(t) {
                        t.getBoundingClientRect().top <= window.innerHeight + n.threshold &&
                            t.getBoundingClientRect().bottom >= -n.threshold &&
                            'none' !== getComputedStyle(t).display &&
                            (!0 === n.idlyLoad && !0 === o.idleCallbackSupport
                                ? requestIdleCallback(function() {
                                      a(t);
                                  }, i)
                                : a(t),
                            t.classList.remove(n.lazyClass),
                            (l = l.filter(function(e) {
                                return e !== t;
                            })));
                    }),
                        (e = !1),
                        0 === l.length &&
                            !1 === n.observeChanges &&
                            o.eventsToBind.forEach(function(e) {
                                return e[0].removeEventListener(e[1], yallBack);
                            });
                }, n.throttleTime));
        },
        o = {
            intersectionObserverSupport: 'IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype,
            mutationObserverSupport: 'MutationObserver' in window,
            idleCallbackSupport: 'requestIdleCallback' in window,
            ignoredImgAttributes: ['data-src', 'data-sizes', 'data-media', 'data-srcset', 'src', 'srcset'],
            acceptedDataAttributes: ['data-src', 'data-sizes', 'data-media', 'data-srcset', 'data-poster'],
            eventsToBind: [[document, 'scroll'], [document, 'touchmove'], [window, 'resize'], [window, 'orientationchange']]
        },
        n = _extends({ lazyClass: 'lazy', lazyBackgroundClass: 'lazy-bg', lazyBackgroundLoaded: 'lazy-bg-loaded', throttleTime: 200, idlyLoad: !1, idleLoadTimeout: 100, threshold: 200, observeChanges: !1, observeRootSelector: 'body', mutationObserverOptions: { childList: !0 } }, e),
        s = 'img.' + n.lazyClass + ',video.' + n.lazyClass + ',iframe.' + n.lazyClass + ',.' + n.lazyBackgroundClass,
        i = { timeout: n.idleLoadTimeout },
        l = [].slice.call(document.querySelectorAll(s));
    if (!0 === o.intersectionObserverSupport) {
        var c = new IntersectionObserver(
            function(e, r) {
                e.forEach(function(e) {
                    if (!0 === e.isIntersecting || 0 < e.intersectionRatio) {
                        var t = e.target;
                        !0 === n.idlyLoad && !0 === o.idleCallbackSupport
                            ? requestIdleCallback(function() {
                                  return a(t);
                              }, i)
                            : a(t),
                            t.classList.remove(n.lazyClass),
                            r.unobserve(t),
                            (l = l.filter(function(e) {
                                return e !== t;
                            }));
                    }
                });
            },
            { rootMargin: n.threshold + 'px 0%' }
        );
        l.forEach(function(e) {
            return c.observe(e);
        });
    } else
        o.eventsToBind.forEach(function(e) {
            return e[0].addEventListener(e[1], t);
        }),
            t();
    !0 === o.mutationObserverSupport &&
        !0 === n.observeChanges &&
        new MutationObserver(function(e) {
            return e.forEach(function() {
                [].slice.call(document.querySelectorAll(s)).forEach(function(e) {
                    -1 === l.indexOf(e) && (l.push(e), !0 === o.intersectionObserverSupport ? c.observe(e) : t());
                });
            });
        }).observe(document.querySelector(n.observeRootSelector), n.mutationObserverOptions);
};
document.addEventListener('DOMContentLoaded', function() {
    yall({ observeChanges: true });
});

$(document).ready(function() {
    //Page button interaction starts here:
    $('#size-calculator--recalculate').click(showCalculator);

    function showCalculator() {
        var calculationSection = document.getElementById('calculation-section');
        calculationSection.setAttribute('aria-hidden', 'false');
        var calculateButton = document.getElementById('size-calculator--main-button');
        calculateButton.setAttribute('aria-expanded', 'false');
        var calculateButton = document.getElementById('size-calculator--recalculate');
        calculateButton.setAttribute('aria-expanded', 'true');
        var resultsSection = document.getElementById('calculated-results-section');
        resultsSection.setAttribute('aria-hidden', 'true');
        $('#MAF-result--header-image').addClass('hidden');
        $('#MAF-calculate--header-image').removeClass('hidden');
    }

    //Calculation javascript starts here:
    if ($('.size-calculator-modal-content').length > 0) {
        $('.js-invalid-measurement-error').hide();
        $('#sizeCalculatorForm .form-group input').on('keyup change', function() {
            if (validateInputLength()) {
                if (validateInputWidth()) {
                    $('.js-size-calculate')
                        .removeAttr('disabled')
                        .attr('tabindex', 0)
                        .removeClass('disable-input-fields'); //If both valid then calculate button is enabled
                } else {
                    $('.js-size-calculate')
                        .attr('tabindex', -1)
                        .addClass('disable-input-fields'); //If either of the inputs are empty the calculate button is disabled
                }
            } else {
                $('.js-size-calculate')
                    .attr('tabindex', -1)
                    .addClass('disable-input-fields'); //If either of the inputs are empty the calculate button is disabled
            }
        });

        $('.js-size-calculate').on('click', function() {
            //Starts size calculation process
            if (validateInputLength()) {
                if (validateInputWidth()) {
                    getConfimationView();
                } else {
                    console.log('invalid width');
                }
            } else {
                console.log('invalid length');
            }
        });

        $('.js-guage-selection').on('click keypress', function(e) {
            //Gives the gauge images their blue background
            if ((e.type == 'keypress' && e.which == 13) || e.type == 'click') {
                $('.js-guage-selection.active').removeClass('active');
                $(this).addClass('active');
                $('#size-calc--length-field').removeClass('hidden');
                $('#size-calc--width-field').removeClass('hidden');
                $('#measurement-container--step').removeClass('hidden');
                $('#lengthCalculator')
                    .attr('tabindex', 0)
                    .removeClass('disable-input-fields');
                $('#widthCalculator')
                    .attr('tabindex', 0)
                    .removeClass('disable-input-fields');
            }
        });

        $('body').on('click', '.js-editSizeCalculator', function() {
            // ?
            $('.measurement-container').css('margin-bottom', '5px');
            $('.js-invalid-measurement-error').hide();
            hideModal('size-calculator-confirm-modal');
            showModal('size-calculator-modal');
        });
        $('#lengthCalculator').blur(function() {
            //When the length input box loses focus -- validate length input
            validateInputLength();
        });
        $('#widthCalculator').blur(function() {
            //When the width input box loses focus -- validate width input
            validateInputWidth();
        });
    }

    function validateInputLength() {
        //Validate length input
        var formElt = $('#sizeCalculatorForm');
        var length = parseInt(formElt.find('input#lengthCalculator').val());
        if (!$.isNumeric(length)) {
            $('.measurement-container').css('margin-bottom', '0');
            $('.js-invalid-measurement-error').show(); //Show invalid measurement message
            return false;
        } else {
            //If it is between this range
            if (length < 97 || length > 281) {
                //Check the length entered is larger then 97 but smaller than 281 | If not between this range...
                $('.measurement-container').css('margin-bottom', '0');
                $('.js-invalid-measurement-error').show(); //Show invalid measurement message
                return false;
            } else {
                //If it is between this range
                $('.measurement-container').css('margin-bottom', '5px');
                $('.js-invalid-measurement-error').hide(); //Don't show invalid message / hide it
                return true;
            }
        }
    }
    function validateInputWidth() {
        //Validate width input
        var formElt = $('#sizeCalculatorForm');
        var length = parseInt(formElt.find('input#lengthCalculator').val());
        var width = parseInt(formElt.find('input#widthCalculator').val());
        if (!$.isNumeric(width)) {
            $('.measurement-container').css('margin-bottom', '0');
            $('.js-invalid-measurement-error').show(); //Show invalid measurement message
            return false;
        } else {
            //If it is between this range
            if (width > length || (width < 73 || width > 230)) {
                //Check that the width isn't bigger than length and that it is larger than 73 but smaller than 230 | If not between this range...
                $('.measurement-container').css('margin-bottom', '0');
                $('.js-invalid-measurement-error').show(); //Show invalid measurement message
                return false;
            } else {
                //If it is between this range
                $('.measurement-container').css('margin-bottom', '5px');
                $('.js-invalid-measurement-error').hide(); //Don't show invalid message / hide it
                return true;
            }
        }
    }

    function hideCalcAndShow() {
        //hides the size calculator and displays the results section
        var calculationSection = document.getElementById('calculation-section');
        calculationSection.setAttribute('aria-hidden', 'true');
        var calculateButton = document.getElementById('size-calculator--main-button');
        calculateButton.setAttribute('aria-expanded', 'true');
        var calculateButton = document.getElementById('size-calculator--recalculate');
        calculateButton.setAttribute('aria-expanded', 'false');
        var resultsSection = document.getElementById('calculated-results-section');
        resultsSection.setAttribute('aria-hidden', 'false');

        $('#size-calculator--boys-link').removeClass('shop-button--inactive');
        $('#size-calculator--girls-link').removeClass('shop-button--inactive');
        $('#MAF-result--header-image').removeClass('hidden');
        $('#size-calculator--boys-link').addClass('shop-button--active');
        $('#size-calculator--girls-link').addClass('shop-button--active');
        $('#MAF-calculate--header-image').addClass('hidden');

        $('#size-calculator--boys-link').focus(); //Re-positioning for mobile

        var testingForHeader = $('.new-header');
        $('html,body').animate(
            {
                scrollTop: $('#calculated-results-section').offset().top - 200
            },
            300
        );
        testingForHeader.addClass('new-header--sticky-header');
        testingForHeader.addClass('new-header--hide-on-scroll');
        setTimeout(function() {
            testingForHeader.addClass('new-header--sticky-header');
            testingForHeader.addClass('new-header--hide-on-scroll');
        }, 305);
    }

    function hideCalcAndShowMinimal() {
        //Same as above but hides the shop CTAs
        var calculationSection = document.getElementById('calculation-section');
        calculationSection.setAttribute('aria-hidden', 'true');
        var calculateButton = document.getElementById('size-calculator--main-button');
        calculateButton.setAttribute('aria-expanded', 'true');
        var calculateButton = document.getElementById('size-calculator--recalculate');
        calculateButton.setAttribute('aria-expanded', 'false');
        var resultsSection = document.getElementById('calculated-results-section');
        resultsSection.setAttribute('aria-hidden', 'false');

        $('#size-calculator--boys-link').addClass('shop-button--inactive');
        $('#size-calculator--girls-link').addClass('shop-button--inactive');
        $('#size-calculator--boys-link').removeClass('shop-button--active');
        $('#size-calculator--girls-link').removeClass('shop-button--active');

        var testingForHeader = $('.new-header');
        $('html,body').animate(
            {
                scrollTop: $('#calculated-results-section').offset().top - 200
            },
            300
        );
        testingForHeader.addClass('new-header--sticky-header');
        testingForHeader.addClass('new-header--hide-on-scroll');
        setTimeout(function() {
            testingForHeader.addClass('new-header--sticky-header');
            testingForHeader.addClass('new-header--hide-on-scroll');
        }, 305);
    }

    function produceURLS(size, fitting, gauge) {
        //Produces the ULR for the shop CTAs
        var width = fitting.toLowerCase();
        $('#size-calculator--boys-link').removeClass('hidden');
        $('#size-calculator--girls-link').removeClass('hidden');
        $('#size-calculator--help-link-1').addClass('hidden');
        $('#size-calculator--help-link-2').addClass('hidden');
        $('#size-calculator--help-text').addClass('hidden');

        if (gauge == 'Toddler') {
            //changing gauge name to match filters
            gauge = 'infant';
        } else if (gauge == 'Junior') {
            gauge = 'junior';
        }

        var splitSize = size.split(' ');
        if (width == 'd') {
            //When getting a D width we don't put a width on the CTA (limited to no stock)
            if (splitSize.length > 1) {
                //If half size...
                splitSize[1] = '%C2%BD'; //The text version of 1/2
                var newSize = splitSize[0] + splitSize[1];
                //Creating and appending the CTA href and text
                var boysUrl = '/Boys/All-Styles/c/b4?q=:relevance:sizeGroup:' + gauge + '/' + newSize + '&sort=relevance';
                var girlsUrl = '/Girls/All-styles/c/g4?q=:relevance:sizeGroup:' + gauge + '/' + newSize + '&sort=relevance';

                $('#size-calculator--boys-link').attr('href', boysUrl);
                $('#size-calculator--boys-link')
                    .empty()
                    .append('Shop Boys ' + size);

                $('#size-calculator--girls-link').attr('href', girlsUrl);
                $('#size-calculator--girls-link')
                    .empty()
                    .append('Shop Girls ' + size);
            } else {
                var boysUrl = '/Boys/All-Styles/c/b4?q=:relevance:sizeGroup:' + gauge + '/' + size + '&sort=relevance';
                var girlsUrl = '/Girls/All-styles/c/g4?q=:relevance:sizeGroup:' + gauge + '/' + size + '&sort=relevance';

                $('#size-calculator--boys-link').attr('href', boysUrl);
                $('#size-calculator--boys-link')
                    .empty()
                    .append('Shop Boys ' + size);

                $('#size-calculator--girls-link').attr('href', girlsUrl);
                $('#size-calculator--girls-link')
                    .empty()
                    .append('Shop Girls ' + size);
            }
        } else {
            //All other widths will have width in href for CTA
            if (splitSize.length > 1) {
                splitSize[1] = '%C2%BD';
                var newSize = splitSize[0] + splitSize[1];
                if (width == 'e') {
                    //Widths need the letter and the name of the width
                    var widthStr = 'narrow';
                } else if (width == 'f') {
                    var widthStr = 'standard';
                } else if (width == 'g') {
                    var widthStr = 'wide';
                } else {
                    var widthStr = 'extra%20wide';
                }
                var boysUrl = '/Boys/All-Styles/c/b4?q=:relevance:sizeGroup:' + gauge + '/' + newSize + ':width:' + width + '%20(' + widthStr + ')&sort=relevance';
                var girlsUrl = '/Girls/All-styles/c/g4?q=:relevance:sizeGroup:' + gauge + '/' + newSize + ':width:' + width + '%20(' + widthStr + ')&sort=relevance';

                $('#size-calculator--boys-link').attr('href', boysUrl);
                $('#size-calculator--boys-link')
                    .empty()
                    .append('Shop Boys ' + size + ' ' + fitting);

                $('#size-calculator--girls-link').attr('href', girlsUrl);
                $('#size-calculator--girls-link')
                    .empty()
                    .append('Shop Girls ' + size + ' ' + fitting);
            } else {
                if (width == 'e') {
                    var widthStr = 'narrow';
                } else if (width == 'f') {
                    var widthStr = 'standard';
                } else if (width == 'g') {
                    var widthStr = 'wide';
                } else {
                    var widthStr = 'extra%20wide';
                }
                var boysUrl = '/Boys/All-Styles/c/b4?q=:relevance:sizeGroup:' + gauge + '/' + size + ':width:' + width + '%20(' + widthStr + ')&sort=relevance';
                var girlsUrl = '/Girls/All-styles/c/g4?q=:relevance:sizeGroup:' + gauge + '/' + size + ':width:' + width + '%20(' + widthStr + ')&sort=relevance';

                $('#size-calculator--boys-link').attr('href', boysUrl);
                $('#size-calculator--boys-link')
                    .empty()
                    .append('Shop Boys ' + size + ' ' + fitting);

                $('#size-calculator--girls-link').attr('href', girlsUrl);
                $('#size-calculator--girls-link')
                    .empty()
                    .append('Shop Girls ' + size + ' ' + fitting);
            }
        }
    }

    $('body').on('click', '.js-btn-size-shop', function(e) {
        // ?
        e.preventDefault();

        var gauge = $('#size-calculator-confirm-modal').attr('data-gauge');
        var size = $('#size-calculator-confirm-modal').attr('data-size');
        var fit = $('#size-calculator-confirm-modal').attr('data-fit');

        if ($(this).attr('data-type') === 'boys') {
            $(location).attr('href', $('#boysRedirectUrl').val());
        } else {
            $(location).attr('href', $('#girlsRedirectUrl').val());
        }
    });

    var hideInProgress = false;
    var showModalId = '';

    function showModal(elementId) {
        // ?
        if (hideInProgress) {
            showModalId = elementId;
        } else {
            $('#' + elementId).modal('show');
        }
    }

    function hideModal(elementId) {
        // ?
        hideInProgress = true;
        $('#' + elementId).on('hidden.bs.modal', hideCompleted);
        $('#' + elementId).modal('hide');

        function hideCompleted() {
            hideInProgress = false;
            if (showModalId) {
                showModal(showModalId);
            }
            showModalId = '';
            $('#' + elementId).off('hidden.bs.modal');
        }
    }

    function getConfimationView() {
        //This is where we 'calculate' the size & fit
        $('#sizeCalculatorForm')
            .parsley()
            .validate(); //Uses parsley to validate the user's input
        if (
            $('#sizeCalculatorForm')
                .parsley()
                .isValid()
        ) {
            var formElt = $('#sizeCalculatorForm');

            var length = formElt.find('input#lengthCalculator').val(); //Gets length from the length input field
            var width = formElt.find('input#widthCalculator').val(); //Gets width from the width input field
            var gauge = formElt
                .find('.active')
                .find('.image-container')
                .attr('id'); //Gets the type of gauge by whichever image was clicked on (has active class)

            $.ajax({
                type: 'POST',
                url: ACC.config.contextPath + '/calculateSize',
                data: { gaugeType: gauge, length: length, width: width, CSRFToken: $("input[name='CSRFToken']").val() },
                success: function(response) {
                    //Returns a whole HTML document not just the size

                    hideModal('size-calculator-modal');

                    if ($('#size-calculator-confirm-modal').length) {
                        $('#size-calculator-confirm-modal').remove();
                    }

                    $('#isaac-testing-api').append(response); //Append the response html to a hidden div so we can access the data from it

                    showModal('size-calculator-confirm-modal');

                    setTimeout(function() {
                        $('.js-editSizeCalculator a').focus(); //Focus on cta
                    }, 1000);

                    //Below takes the elements from the created page then adds them to a variable
                    if (length > 162 && length < 201) {
                        gauge = 'Toddler';
                    } else {
                        var gauge = $('#size-calculator-confirm-modal').attr('data-gauge');
                    }
                    var size = $('#size-calculator-confirm-modal').attr('data-size');
                    var fit = $('#size-calculator-confirm-modal').attr('data-fit');
                    if (size == 'null') {
                        // catching null values (for when measurements aren't correct)
                        if (fit == 'null') {
                            $('#testing-h2--sizing')
                                .empty()
                                .append('Size & Width out of range <br> Please try again'); //Append size to the page
                            $('#calculated-size--field')
                                .empty()
                                .append('');
                            $('#calculated-width--field')
                                .empty()
                                .append('');
                            hideCalcAndShowMinimal();
                            hideSizesShowHelp();
                        } else {
                            $('#testing-h2--sizing')
                                .empty()
                                .append('Size out of range <br> Please try again');
                            $('#calculated-size--field')
                                .empty()
                                .append('');
                            $('#calculated-width--field')
                                .empty()
                                .append('');
                            hideCalcAndShowMinimal();
                            hideSizesShowHelp();
                        }
                    } else if (fit == 'null') {
                        // catching null values (for when measurements aren't correct)
                        $('#testing-h2--sizing')
                            .empty()
                            .append('Width out of range <br> Please try again');
                        $('#calculated-size--field')
                            .empty()
                            .append('');
                        $('#calculated-width--field')
                            .empty()
                            .append('');
                        hideCalcAndShowMinimal();
                        hideSizesShowHelp();
                    } else {
                        if ($.isNumeric(size)) {
                            $('#testing-h2--sizing')
                                .empty()
                                .append('RESULT!'); //Append h2 to the page
                            $('#calculated-size--field')
                                .empty()
                                .append('Size: ' + size); //Append size to the page
                            $('#calculated-width--field')
                                .empty()
                                .append('Width: ' + fit); //Append width to the page
                            $('#isaac-testing-api').html(''); //Remove temporary content from ajax response
                            produceURLS(size.split('.')[0], fit, gauge);
                            hideCalcAndShow();
                        } else {
                            $('#testing-h2--sizing')
                                .empty()
                                .append('RESULT!'); //Append h2 to the page
                            $('#calculated-size--field')
                                .empty()
                                .append('Size: ' + size); //Append size to the page
                            $('#calculated-width--field')
                                .empty()
                                .append('Width: ' + fit); //Append width to the page
                            $('#isaac-testing-api').html(''); //Remove temporary content from ajax response
                            produceURLS(size, fit, gauge);
                            hideCalcAndShow();
                        }
                    }
                },
                error: function(e) {
                    alert(e);
                }
            });
        }
    }

    function hideSizesShowHelp() {
        $('#size-calculator--boys-link').addClass('hidden');
        $('#size-calculator--girls-link').addClass('hidden');
        $('#size-calculator--help-link-1').removeClass('hidden');
        $('#size-calculator--help-link-2').removeClass('hidden');
        $('#size-calculator--help-text').removeClass('hidden');
    }
});
