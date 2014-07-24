class CamerasController < ApplicationController
  respond_to :html, :json
  def index
    @cameras = Camera.where(available: true)
    respond_with @cameras
  end
end