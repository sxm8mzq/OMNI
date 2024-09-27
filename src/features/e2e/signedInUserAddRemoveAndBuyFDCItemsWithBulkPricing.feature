Feature: Verify Item Removal Notification And Bulk Pricing Promotion Is Applied For FDC Only ArticleOn Cart With Multiple Items As Reg User

  Background: User launches url
    Given the user launches the url

  @cart @regressionTest @guestUser @bpfd
  Scenario Outline: Verify bulk pricing promotion is applied for fdc only article and Item removal notification on cart as registered user
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the "search" icon at index "2"
    Then the user waits for text "SCARBOROUGH #7001" to be visible
    Then the user click on "Select"
    Then the user click on " Account / Sign In "
    Then the user waits for webelement "acl-mt--x-large acl-mx--medium" with html attribute "class" to be visible
    Then the user enters text "<email>" in the textbox "Email Address"
    Then the user enters text "<password>" in the textbox "Password"
    Then the user waits for webelement "submit" with html attribute "type" to be visible
    Then the user clicks on the webelement with html tag "type" as "submit"
    Then the user waits for webelement "Hi" with html attribute "data-title" to be visible
    Then the user checks if cart is empty
    Then the user enters text "<fdc>" in textbox with placeholder "What can we help you find?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Delivery" to be visible
    Then the user enters value "10 +" in dropdown "Qty"
    Then the user enters the text "<qty>" in the textbox "Qty" at index "1"
    Then the user add product to cart
    Then the user waits for text "Added To Cart" to be visible
    Then the user click on "View Cart"
    Then the user waits for text "My Cart:" to be visible
    Then the user validates if "Promotion(s) Applied" text is visible
    Then the user validates if "Special Offers:" text is visible
    Then the user validates if " You Saved " text is visible
    Then the user clicks on the "hd-logo-en" icon at index "1"
    Then the user presses keyboard key "Escape"
    Then the user enters text "<sth>" in textbox with placeholder "What can we help you find?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Delivery" to be visible
    Then the user click on " Delivery "
    Then the user validates if webelement with html attribute "aria-label" as "Delivery Selected" is visible
    Then the user enters value "10 +" in dropdown "Qty"
    Then the user enters the text "<qty>" in the textbox "Qty" at index "1"
    Then the user add product to cart
    Then the user waits for text "Added To Cart" to be visible
    Then the user click on "View Cart"
    Then the user waits for text "My Cart:" to be visible
    Then the user click on " M1R 4E6 "
    Then the user enters text "<nonFdcPostalCode>" in textbox with placeholder "A1A 1A1"
    Then the user click on "Save"
    Then the user validates if "Unfortunately, we are unable to deliver some product(s) to H4C 1E2. The following product(s) have been removed from your cart:" text is visible
    Then the user validates if "Based on the new postal code, your cart has been updated. Please review." text is visible
    Then the user click on " <nonFdcPostalCode> "
    Then the user enters text "M1R 4E6" in textbox with placeholder "A1A 1A1"
    Then the user click on "Save"
    Then the user checks if cart is empty
    Then the user clicks on the "hd-logo-en" icon at index "1"
    Then the user presses keyboard key "Escape"
    Then the user enters text "<fdc>" in textbox with placeholder "What can we help you find?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Delivery" to be visible
    Then the user enters value "<noOfProduct>" in dropdown "Qty"
    Then the user add product to cart
    Then the user waits for text "Added To Cart" to be visible
    Then the user click on "View Cart"
    Then the user waits for text "My Cart:" to be visible
    Then the user validates if "Promotion(s) Applied" text is visible
    Then the user validates if "Special Offers:" text is visible
    Then the user validates if " You Saved " text is visible
    Then the user click on "My Store:"
    Then the user click on "Change Store"
    Then the user enters text "<vancouverStore>" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the "search" icon at index "2"
    Then the user click on "Select"
    Then the user validates if "Promotion(s) Applied" text is visible
    Then the user validates if "Special Offers:" text is visible
    Then the user validates if " You Saved " text is visible
    Then the user click on "My Store:"
    Then the user click on "Change Store"
    Then the user enters text "<calgaryStore>" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the "search" icon at index "2"
    Then the user click on "Select"
    Then the user validates if "Promotion(s) Applied" text is not visible
    Then the user validates if "Special Offers:" text is not visible
    Then the user validates if " You Saved " text is not visible
    Then the user click on "My Store:"
    Then the user click on "Change Store"
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the "search" icon at index "2"
    Then the user click on "Select"
    Then the user click on "Checkout Now"
    Then the user waits for text " Cart Summary: " to be visible
    Then the user validates if "Delivery:" text is visible
    Then the user click on "Continue"
    Then the user waits for text "Credit Card" to be visible
    Then the user switches to the frame "__zoid__card_sdk"
    Then the user enters the "Hdcc" card details
    Then the user switches to the parent frame
    Then the user enters billing details for "Hdcc" card
    Then the user click on "Continue"
    Then the user waits for text "Place Order " to be visible
    Then the user clicks on text "Place Order" at index "2"
    Then the user waits for text " Confirmation " to be visible
    Then the user waits for text " Your order was successful. " to be visible
    Then the user validates if " Your order was successful. " text is visible
    Then the user validates if the text " Order Number:" is visible at index "1"


    Examples:
      | fdc        | sth        | qty | nonFdcPostalCode | email              | password | noOfProduct | vancouverStore  | calgaryStore |
      | 1000100144 | 1000122342 | 30  | H4C 1E2          | marisa89@gmail.com | Test@123 | 5           |  7042           | 7037         |