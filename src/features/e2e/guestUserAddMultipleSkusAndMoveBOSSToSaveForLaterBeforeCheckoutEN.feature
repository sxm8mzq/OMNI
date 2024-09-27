Feature: Guest User Can Add Multiple Skus BOSS, BOPIS, BODFS And STH To Cart, Move BOSS To Save For Later Before Checkout From Cart In English

  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @boss @bopis @bodfs @sth @guestUser @amex @mCycle
  Scenario Outline: Guest user can add multiple skus boss, bopis, bodfs and sth to cart, move boss to save for later before checkout from cart
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the "search" icon at index "2"
    Then the user waits for text "SCARBOROUGH #7001" to be visible
    Then the user click on "Select"
    Then the user enters text "<Boss>" in textbox with placeholder "What can we help you find?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Add To Cart" to be visible
    Then the user click on " Ship To Store "
    Then the user add product to cart
    Then the user click on "Continue Shopping"
    Then the user clicks on the "hd-logo-en" icon at index "1"
    Then the user presses keyboard key "Escape"
    Then the user enters text "<Bopis>" in textbox with placeholder "What can we help you find?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Add To Cart" to be visible
    Then the user click on " Store Pick-Up "
    Then the user add product to cart
    Then the user click on "Continue Shopping"
    Then the user clicks on the "hd-logo-en" icon at index "1"
    Then the user presses keyboard key "Escape"
    Then the user enters text "<Bodfs>" in textbox with placeholder "What can we help you find?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Add To Cart" to be visible
    Then the user click on " Delivery "
    Then the user add product to cart
    Then the user click on "Continue Shopping"
    Then the user clicks on the "hd-logo-en" icon at index "1"
    Then the user presses keyboard key "Escape"
    Then the user enters text "<Sth>" in textbox with placeholder "What can we help you find?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Add To Cart" to be visible
    Then the user click on " Delivery "
    Then the user add product to cart
    Then the user click on "View Cart"
    Then the user waits for text "My Cart: " to be visible
    Then the user validates if " Arrives in Store: " text is visible
    Then the user click on " Model: FR.120-3GRS "
    Then the user presses key "Tab" "3" times
    Then the user presses keyboard key "Enter"
    Then the user waits until the spinner is no longer visible
    Then the user validates if "3 item(s) " text is visible
    Then the user validates if " 1 item(s) " text is visible
    Then the user validates if "Move to Cart" text is visible
    Then the user click on "Checkout Now"
    Then the user waits for text "Secure Checkout" to be visible
    Then the user click on "Checkout as Guest"
    Then the user waits for text " Cart Summary: " to be visible
    Then the user validates if "Delivery:" text is visible
    Then the user validates if "Store Pick-Up:" text is visible
    Then the user enters text "<firstName>" in the textbox "First Name"
    Then the user enters text "<lastName>" in the textbox "Last Name"
    Then the user enters random email in the textbox "Email Address"
    Then the user enters text "<phoneNum>" in the textbox "Phone"
    Then the user enters text "<city>" in the textbox "City"
    Then the user enters value "<province>" in dropdown "Province"
    Then the user enters text "<postalCode>" in the textbox "Postal Code"
    Then the user enters text "<address>" in textbox with placeholder "Start typing your address..."
    Then the user click on "Continue"
    Then the user validates if " Pick-Up Store " text is visible
    Then the user validates if " Ship to Store " text is not visible
    Then the signed in user selects pickup date
    Then the user click on "Continue"
    Then the user waits for text "Credit Card" to be visible
    Then the user switches to the frame "__zoid__card_sdk"
    Then the user enters the "Amex" card details
    Then the user switches to the parent frame
    Then the user enters billing details for "Amex" card
    Then the user click on "Continue"
    Then the user waits for text "Place Order " to be visible
    Then the user clicks on text "Place Order" at index "2"
    Then the user waits for text " Confirmation " to be visible
    Then the user waits for text " Your order was successful. " to be visible
    Then the user validates if " Your order was successful. " text is visible
    Then the user validates if the text " Order Number:" is visible at index "1"

    Examples:
      | Boss       | Bopis      | Bodfs      | Sth        | firstName | lastName | postalCode | address            | city        | province | phoneNum   |
      | 1000720454 | 1000657245 | 1000100110 | 1001412118 | James     | Evans    | M1R 4E6    | 428 Ellesmere Road | Scarborough | Ontario  | 4123456792 |